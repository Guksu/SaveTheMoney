import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LoginStlye from "../styles/LoginStyle";

const { LoginBtn, LoginInput, Input, BtnDiv, RegBtn } = LoginStlye;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setIslogin] = useState(false);
  const history = useHistory();

  const onLoginClick = async () => {
    await Axios.post("http://localhost:4000/login", {
      id: id,
      password: password,
    })
      .then((res) => {
        setIslogin(true);
        sessionStorage.setItem("id", id);
      })
      .catch((err) => {
        alert("다시 로그인하세요");
      });
  };

  useEffect(() => {
    if (islogin) {
      history.push("/home");
      window.location.reload();
    }
  });

  return (
    <>
      <LoginInput>
        <Input
          type="text"
          placeholder="아이디를 입력하세요"
          required
          name="id"
          onChange={(event) => {
            setId(event.target.value);
          }}
        ></Input>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></Input>
      </LoginInput>
      <BtnDiv>
        <LoginBtn onClick={onLoginClick}>로그인</LoginBtn>
        <Link to="/register">
          <RegBtn>회원가입</RegBtn>
        </Link>
      </BtnDiv>
    </>
  );
};

export default Login;
