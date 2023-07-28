import { useRouter } from "next/router";
import EditorCapturePlugin from "components/lexical/editor-capture-plugin";
import { useRef, useState, forwardRef } from "react";
import { useSearchUser } from "./use-search-user";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useQueryClient } from "@tanstack/react-query";

import SubmitPlugin from "components/lexical/submit-plugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { AutoLinkNode } from "@lexical/link";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import MentionsPlugin from "components/lexical/mentions-plugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $isRootTextContentEmptyCurry } from "@lexical/text";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { InputContainer, Placeholder, StyledContentEditable } from "./styled";
import useToggle from "hooks/useToggle";
import Button from "components/Button";
import { useCreatePost } from "../hooks/use-post-action";
import Upload from "./Upload";
import { useSnackbar } from "notistack";
import { useUser } from "feature/auth/context";
import * as postApi from "@api/post";
import * as notificationApi from '@api/notification';
import * as fileApi from "@api/file";

//TODO update regex to match any url
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
      attributes: { rel: "noopener", target: "_blank" },
    };
  },
];

const editorConfig = {
  onError(error) {
    throw error;
  },
  nodes: [MentionNode, AutoLinkNode],
};

const NewPost = forwardRef(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [showFiles, toggleFiles] = useToggle(false);
  const [files, setFiles] = useState([]);

  const editorRef = useRef();

  const router = useRouter();
  const { id: groupId } = router.query;
  const user = useUser();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const searchUserQuery = useSearchUser(searchQuery);

  const createPostMutation = useCreatePost(groupId);

  const checkEmpty = () => {
    const editor = editorRef.current;
    const isComposing = editor.isComposing();
    const editorState = editor.getEditorState();
    return editorState.read($isRootTextContentEmptyCurry(isComposing, true));
  };

  const handleChange = () => setIsEmpty(checkEmpty());

  const handleSubmit = async () => {
    if (!checkEmpty()) {
      try {
        const editor = editorRef.current;
        const editorState = editor.getEditorState();
        const mentions = editorState?.toJSON()?.root?.children[0]?.children?.filter((item) => item.type === "mention")
        const media = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const { data: response, error } = await fileApi.uploadPostImage(user.id, file);
          if (error) throw error;
          media.push(`${response.path}`);
        }      
        const result = await postApi.createPost({ userId: user.id, groupId, content: JSON.stringify(editorState.toJSON()), media: media });
        queryClient.invalidateQueries(["posts", groupId]);
  
        const addedPostId = result.data[0].id
        if (mentions.length > 0) {
          const mentionIds = mentions.map((mention) => mention.mention.id);
          
          await notificationApi.sendPostNotification(user, mentionIds, groupId, addedPostId);
        }
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        setFiles([]);
        if (showFiles) toggleFiles();
      } catch (error) {
        enqueueSnackbar("An error occured! Please try again!", { variant: "error" });
      }
    }
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <LexicalComposer initialConfig={editorConfig}>
        <EditorCapturePlugin ref={editorRef} />
        <InputContainer>
          <PlainTextPlugin
            contentEditable={<StyledContentEditable />}
            placeholder={
              <Placeholder>
                <Typography color="text.disabled">What's on your mind..</Typography>
              </Placeholder>
            }
          />
        </InputContainer>

        <AutoLinkPlugin matchers={MATCHERS} />
        <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchQuery} />
        <SubmitPlugin onSubmit={handleSubmit} />
        <ClearEditorPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
      {!showFiles && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <IconButton onClick={toggleFiles}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Box>
      )}
      {showFiles && <Upload onChangeFiles={setFiles} files={files} />}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button disabled={isEmpty} onClick={handleSubmit} loading={createPostMutation.isLoading}>
          Post
        </Button>
      </Box>
    </Card>
  );
});

export default NewPost;
