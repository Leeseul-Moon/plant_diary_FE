import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../network/request";

export const getComments = createAsyncThunk("GET_COMMENTS", async (id) => {
  const res = await instance.get(`/api/comments?postId=${id}`);
  return res.data;
});

export const postComment = createAsyncThunk("POST_COMMENTS", async (idComment) => {
  const res = await instance.post(`/api/comments`, idComment);
  return res.data;
});

export const deleteComment = createAsyncThunk("DELETE_COMMENTS", async (id) => {
  const res = await instance.delete(`/api/comments/${id}`);
  return res.data;
});

export const updateComment = createAsyncThunk("UPDATE_COMMENTS", async (editInfo) => {
  const res = await instance.put(`/api/comments/${editInfo.id}`, editInfo.requestData);
  return res.data;
});

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comment = [...action.payload];
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comment.push(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comment = state.comment.filter((comment) => comment.id !== action.meta.arg);
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.comment.map((comment) =>
        comment.id === action.meta.arg.id
          ? (comment.content = action.meta.arg.requestData.content)
          : comment.content
      );
    });
  },
});

export default commentSlice.reducer;
