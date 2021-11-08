import styled from "styled-components";

const LoginInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  border: 0px;
  border-bottom: 2px solid #324b4d;
  display: flex;
  margin-top: 5%;
  font-size: 20px;
  text-align: center;
  color: #34846f;
  ::placeholder {
    color: #34846f;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
`;
const LoginBtn = styled.button`
  width: 120px;
  font-size: 18px;
  border-radius: 10px;
  margin-right: 1%;
  color: #34846f;
  border: 2px solid #324b4d;
`;
const RegBtn = styled.button`
  width: 130px;
  font-size: 18px;
  border-radius: 10px;
  color: #34846f;
  border: 2px solid #324b4d;
`;

const LoginStlye = { LoginBtn, LoginInput, Input, BtnDiv, RegBtn };

export default LoginStlye;
