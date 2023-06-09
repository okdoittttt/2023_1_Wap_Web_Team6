import React from "react";
import styled from "styled-components";
import { CommentItemProps } from "./type";
import "../css/cmt.css";  
import { useNavigate } from "react-router-dom";

const Cmt = styled.p`
  boarder-right : 2px;
`;


const CommentItem = ({
  Cmtidx,
  CmtWriter,
  CmtComment,
  CmtDate,
  BoardIdx,
  CmtPassword,
  
}: CommentItemProps) => {
  const requestBody = {
    comments_idx: Cmtidx,
    members: localStorage.getItem('loginId'),
    pwd : ''
  };

const navigate = useNavigate();
  const handleValueChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    requestBody['pwd'] = e.target.value;
  };
  const cmtDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // 버튼 클릭의 기본 동작 중지

    fetch("http://localhost:8081/comments/api/commentsDelete", {
      method: "post", // method :통신방법
      headers: {
        // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody), //join 객체를 보냄
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess === "True") {
          console.log('hello')
  window.location.reload(); // 페이지 새로고침
        } else {
          alert(data.isSuccess);
        }
      }).catch(function(err) {
        console.error(` Err: ${err}`);
    })
  }
  return (
  <li> 
    <Cmt>{CmtComment}</Cmt>  
      작성자 : {CmtWriter} 작성일 : {CmtDate}
      <button className='modifybtn'  onClick={cmtDeleteBtnClick}>삭제하기</button>
      <input type='text' className='cmtpassword' name ='pwd' placeholder='비밀번호' onChange={handleValueChange}/>
   </li>
  );
};

export default CommentItem;
