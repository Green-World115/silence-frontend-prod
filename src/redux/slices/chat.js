/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as chatApi from "../../api/chat";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import store from "../store";

export const getGroups = createAsyncThunk("chat/getGroups", async (_, { rejectWithValue }) => {
  try {
    const userId = store.getState().user.id;
    const response = await chatApi.getGroupsByUser(userId);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getPosts = createAsyncThunk("chat/getPosts", async (groupId, { rejectWithValue }) => {
  try {
    const response = await chatApi.getPostsByGroup(groupId);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      time: formatDistanceToNow(doc.data()?.createdAt?.toDate()),
      comments: [],
      commentsLoading: false,
    }));
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getComments = createAsyncThunk("chat/getComments", async ({ groupId, postId }, { rejectWithValue }) => {
  try {
    const response = await chatApi.getCommentsByPost(groupId, postId);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      time: formatDistanceToNow(doc.data()?.createdAt?.toDate()),
    }));
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  posts: {
    loading: true,
    data: [],
  },

  groups: {
    loading: true,
    data: [],
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getGroups.pending, (state) => {
      state.groups.loading = true;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups.loading = true;
      state.groups.data = action.payload;
    });
    builder.addCase(getGroups.rejected, (state) => {
      state.groups.loading = false;
    });

    builder.addCase(getPosts.pending, (state) => {
      state.posts.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts.loading = true;
      state.posts.data = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.posts.loading = false;
    });

    builder.addCase(getComments.pending, (state, action) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data.map((item) => {
            if (item.id === action.meta.arg.postId) {
              return { ...item, commentsLoading: true };
            }
            return item;
          }),
        },
      };
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data.map((item) => {
            if (item.id === action.meta.arg.postId) {
              return { ...item, commentsLoading: false, comments: action.payload };
            }
            return item;
          }),
        },
      };
    });
    builder.addCase(getComments.rejected, (state, action) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data.map((item) => {
            if (item.id === action.meta.arg.postId) {
              return { ...item, commentsLoading: true };
            }
            return item;
          }),
        },
      };
    });
  },
});

export const selectGroups = (state) => state.groups;

export const {} = chatSlice.actions;

export default chatSlice.reducer;
