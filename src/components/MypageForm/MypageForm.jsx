import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import loginImg from "../../imgs/login_img.png";
import {
  mypage,
  nicknameConfirm,
  changeUserInfo,
} from "../../redux/modules/authSlice";

const MypageForm = () => {
  const REGEX_NICKNAME = /[ㄱ-ㅎ|가-힣]+$/;
  const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [user, setUser] = useState("");

  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [save, setSave] = useState(false);

  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [availableNickname, setAvailableNickname] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypage()).then((res) => setUser(res.payload));
  }, []);

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      setEmail(email);
      setNickname(nickname);
    }
  }, [user]);

  const onSave = (event) => {
    event.preventDefault();
    const pwd_check = password_check();
    if (pwd_check !== true) {
      return;
    }
    if (newNickname !== availableNickname) {
      alert("닉네임 중복체크를 해주세요.");
      return;
    }
    if (save) {
      alert("회원정보 변경 가능!");
      dispatch(
        changeUserInfo({ email, nickname: newNickname, password: newPassword })
      );
    } else {
      alert("회원정보 변경 안됨!");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "newNickname":
        return setNewNickname(value);
      case "newPassword":
        return setNewPassword(value);
      case "passwordConfirm":
        return setPasswordConfirm(value);
      default:
    }
  };

  const validation = (text, regex) => {
    const helperText = regex.test(text) ? false : true;
    return text ? helperText : false;
  };

  const validation_nickname = useCallback(() => {
    return validation(newNickname, REGEX_NICKNAME);
  }, [newNickname, REGEX_NICKNAME]);

  const validation_password = useCallback(() => {
    return validation(newPassword, REGEX_PASSWORD);
  }, [newPassword, REGEX_PASSWORD]);

  useEffect(() => {
    newNickname && validation_nickname() === false
      ? setIsNickname(true)
      : setIsNickname(false);
  }, [newNickname, validation_nickname]);

  useEffect(() => {
    newPassword && validation_password() === false
      ? setIsPassword(true)
      : setIsPassword(false);
  }, [newPassword, validation_password]);

  useEffect(() => {
    if (isNickname && isPassword) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [isNickname, isPassword]);

  const nicknameCheck = async () => {
    // 값 받아와서 true 면? available nickname 에 현재 nickname 넣기
    const result = await dispatch(nicknameConfirm(newNickname));
    console.log(result);
    if (result.payload) {
      // if (true) {
      alert("사용 가능한 닉네임입니다.");
      setAvailableNickname(newNickname);
    } else {
      alert("사용할 수 없는 닉네임입니다.");
    }
  };

  const password_check = () => {
    if (newPassword === passwordConfirm) {
      return true;
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setPasswordConfirm("");
      return false;
    }
  };

  return (
    <BoxContainer>
      <Boxs>
        <Box>
          <LoginImg src={loginImg} alt="login"></LoginImg>
        </Box>
        <Box component="form" onSubmit={onSave} sx={{ ml: 2 }}>
          🌱 안녕하세요 {nickname} 님!
          <TextField fullWidth margin="normal" disabled value={email} />
          <TextField
            margin="normal"
            required
            value={newNickname}
            label="Nick Name"
            name="newNickname"
            placeholder={`${nickname}`}
            onChange={onChange}
            error={validation_nickname()}
            helperText={
              validation_nickname() ? "한글만 입력할 수 있습니다." : ""
            }
          />
          <Button
            variant="outlined"
            disabled={isNickname ? false : true}
            sx={{ mt: 3, ml: 0.9 }}
            onClick={nicknameCheck}
          >
            중복확인
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            value={newPassword}
            name="newPassword"
            label="Change Password"
            type="text"
            onChange={onChange}
            error={validation_password()}
            helperText={
              validation_password() ? "8자리 이상 영문, 숫자만 입력하세요." : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={passwordConfirm}
            name="passwordConfirm"
            label="Change Password Confirm"
            type="text"
            onChange={onChange}
          />
          <Button fullWidth type="submit" variant="contained">
            SAVE
          </Button>
        </Box>
      </Boxs>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Boxs = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  border: 0.5px solid gainsboro;
  margin: auto;
  padding: 2em;
  border-radius: 1em;
`;

const LoginImg = styled.img`
  max-width: 300px;
`;

export default MypageForm;
