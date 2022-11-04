import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, guestInstance } from "../../network/request";

export const signUp = createAsyncThunk("SIGNUP", async (JoinInfo) => {
  const res = await guestInstance.post(`/api/auth/register`, JoinInfo);
  return res.data;
});

export const logIn = createAsyncThunk("LOGIN", async (loginInfo) => {
  const res = await guestInstance.post(`/api/auth/login`, loginInfo);

  const accessToken = res.headers.authorization;
  const refreshToken = res.headers["refresh-token"];

  if (accessToken && refreshToken) {
    localStorage.setItem("Authorization", `${accessToken}`);
    localStorage.setItem("refreshToken", `${refreshToken}`);
  }
  return res.data;
});

export const logOut = createAsyncThunk("LOGOUT", async () => {
  localStorage.setItem("Authorization", ``);
  localStorage.setItem("refreshToken", ``);
  return;
});

export const mypage = createAsyncThunk("MYPAGE", async () => {
  const res = await instance.get(`/api/auth/mypage`);
  return res.data.success === true ? res.data.data : false;
});

export const changeUserInfo = createAsyncThunk("CHANGE_USERINFO", async (userInfo) => {
  const res = await instance.put(`/api/auth/mypage`, userInfo);
  console.log("mypage > ", res.data);
  return res.data;
});

export const emailConfirm = createAsyncThunk("CONFIRM_EMAIL", async (email) => {
  console.log("email :>> ", email);
  const res = await guestInstance.post(`/api/auth/email`, { email });
  console.log("res email > ", res.data);
  return res.data;
});

export const nicknameConfirm = createAsyncThunk("CONFIRM_NiCKNAME", async (nickname) => {
  const res = await guestInstance.post(`/api/auth/nickname`, { nickname });
  console.log("res email > ", res.data);
  return res.data;
});

// TODO: user default 값 수정해야 함. 일단 로그인 된 상태로 테스트하기 위해 값 넣어둠
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { isAuthenticated: false, nickname: "" },
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      console.log("action.payload :>> ", action.payload);
      if (action.payload.success) {
        state.user.isAuthenticated = action.payload.success;
        state.user.nickname = action.payload.data.nickname;
      } else {
        return;
      }
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user.isAuthenticated = false;
      state.user.nickname = "";
    });
  },
});

export default authSlice.reducer;
