import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCard } from '../../modules/cards'

// cardBox : card.id, 뒤로가기 , card.title, card.comments
// buttonBox : 수정버튼, 삭제버튼
function DetailBox() {
    const dispatch = useDispatch()

    // 이전 컴포넌트에서 넘어온 parameter를 조회
    const params = useParams();
    console.log('params ->', params); // {id: 1}

    const filteredCards = useSelector((state) => {
        console.log('state.cards ==>', state.cards) // array
        return state.cards.filter((card) => card.id === +(params.id))
        // card.id = 1인데, params.id = '1'로 string이라서 ==로 조건완화(?)
        // 혹은 params.id를 +로 숫자로 만들어주기
    });
    console.log('filteredCards->', filteredCards) // 배열>> [{}];

    const card = filteredCards[0];
    console.log('card =>', card)

    //삭제 확인 용 메세지
    const CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?\n삭제를 원치 않으시면 [취소] 버튼을 눌러주세요."

    // 삭제하기
    const removeCardHandlerButton = () => {
        if (window.confirm(CONFIRM_MESSAGE))
            dispatch(removeCard(card.id))
    }

    return (
        <DetailContainer>
            <CardBox>
                <tr>
                    <th>TITLE :{card.title}</th>
                </tr>
                <tr>
                    <td>ID :{card.id}</td>
                </tr>
                <tr>
                    <td>COMMENTS :</td>
                    <td>{card.comments}</td>
                </tr>
            </CardBox>
            <ButtonBox>
                <Button>수정하기</Button>
                <Button
                    backgroundColor="hotpink"
                    type="button"
                    onClick={removeCardHandlerButton} >
                    삭제하기
                </Button>
            </ButtonBox>
        </DetailContainer >
    )
};

export default DetailBox;

const DetailContainer = styled.div`
    border: 1px solid hotpink;
    height: 500px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`

const CardBox = styled.table`
    border: 2px dotted violet;
    height: 450px;
    width: 400px;
`

const ButtonBox = styled.div`
    background-color: hotpink;
`