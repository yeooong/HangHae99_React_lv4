import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeCard } from "../../modules/cards";
import Button from "../common/Button";
import { Link } from "react-router-dom";

// 여기는 왜 {}로 넣어줘야 할까?
function Card({ card }) {
  // const dispatch = useDispatch();

  console.log('card-->', card)

  //삭제 확인 용 메세지
  const CONFIRM_MESSAGE = `[삭제 확인]\n\n"${card.title}" 에 대한 평가를 정말로 삭제하시겠습니까?\n삭제를 원치 않으시면 [취소] 버튼을 눌러주세요.`

  // //  삭제 버튼 선택 시 호출되는 함수
  // const removeCardHandler = () => {
  //     if (window.confirm(CONFIRM_MESSAGE)) 
  //     dispatch(removeCard(card.id));
  //     // console.log('button was Clicked!!!')
  // }

  const removeCardHandler = () => {
    if (window.confirm(CONFIRM_MESSAGE))
      axios.delete(`${process.env.REACT_APP_WEBTOON}/webtoon/${card.id}`)
  };

  return (
    <StyledDiv>
      <div>
        <Link to={`/Detail/${card.id}`}>상세보기</Link>
        <h1>{card.title}</h1>
      </div>
      <div>
        <Button
          backgroundColor="hotpink"
          type="button"
          onClick={removeCardHandler}
        >
          삭제</Button>
      </div>
    </StyledDiv>
  )
};

export default Card;

const StyledDiv = styled.div`
    width: 200px;
    height: 200px;
    border: 1px solid hotpink;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

