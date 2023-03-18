import ApiError from "backend/utils/api-error";
import { supabase } from "backend/utils/superbase-admin-client";
import { head } from "lodash";
import commentService from "backend/services/comment-service";

const deletePost = async (id) => {
  await commentService.deleteCommentsByPostId(id);
  const { data, error } = await supabase.from("posts").delete().eq("id", id).select();
  if (error) throw error;
  if (!head(data)) throw new ApiError("Post not found", httpStatus.NOT_FOUND);
  return null;
};

export default { deletePost };
