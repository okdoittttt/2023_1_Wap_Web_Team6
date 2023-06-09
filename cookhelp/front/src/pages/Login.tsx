import React, { useContext, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: var(--green-color);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: var(--dark-green-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const Login = () => {
  const { setIsLogin } = useContext(AuthContext);

  const [login, setLogin] = useState({
    loginId: "",
    loginPassword: "",
    sessionID: localStorage.getItem("sessionID"),
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const [validId, setvalidId] = useState(false);

  const [validPassword, setvalidPassword] = useState(false);
  //영문자로 시작하는 영문자 또는 숫자 6~20자
  const isId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!regExp.test(e.target.value)) {
      setvalidId(false);
    } else {
      setvalidId(true);
      handleValueChange(e);
    }
  };

  //8 ~ 16자 영문, 숫자 조합
  const isPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    if (!regExp.test(e.target.value)) {
      setvalidPassword(false);
    } else {
      setvalidPassword(true);
      handleValueChange(e);
    }
  };

  const navigate = useNavigate();
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // 버튼 클릭의 기본 동작 중지
    fetch("http://localhost:8081/members/api/login", {
      //auth 주소에서 받을 예정
      method: "post", // method :통신방법
      headers: {
        // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
      },
      body: JSON.stringify(login), //login 객체를 보냄
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin === "True") {
          // localStorage.clear();
          // console.log(data);
          localStorage.setItem("isLogin", data.isLogin);
          localStorage.setItem("loginId", data.loginId);
          // localStorage.setItem("token", data.token);
          alert("로그인 완료되었습니다!");
          setIsLogin(true);
          navigate("/");
        } else {
          console.log(data);
          alert(data.isLogin);
        }
      })
      .catch((error) => console.log("error =>", error));
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Title>Login</Title>
        <Form>
          <FormGroup>
            <Label>아이디 </Label>
            <Input
              onChange={isId}
              type="text"
              name="loginId"
              placeholder="아이디 입력"
            ></Input>
            {!validId && (
              <ErrorMsg>영문 혹은 숫자 6자 이상 20자 이하 입력바람</ErrorMsg>
            )}
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 </Label>
            <Input
              onChange={isPassword}
              type="password"
              name="loginPassword"
              placeholder="비밀번호 입력"
            ></Input>
            {!validPassword && (
              <ErrorMsg>8자 이상 16자 이하의 영문, 숫자 조합 입력</ErrorMsg>
            )}
          </FormGroup>
          <ButtonGroup>
            <Button
              disabled={!validId || !validPassword}
              className="btn"
              type="submit"
              value="로그인"
              onClick={handleBtnClick}
            >
              로그인
            </Button>
            <Link to="/Join">
              <Button>회원가입</Button>
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    </>
  );
};

export default Login;
