import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCard } from '../../modules/cards'
import { useState, useEffect } from "react";
import axios from "axios";

// cardBox : card.id, 뒤로가기 , card.title, card.comments
// buttonBox : 수정버튼, 삭제버튼
function DetailBox() {
    // const dispatch = useDispatch()

    // 이전 컴포넌트에서 넘어온 parameter를 조회
    const params = useParams();
    // console.log('params ->', params); // {id: 1}

    // const filteredCards = useSelector((state) => {
    //     console.log('state.cards ==>', state.cards) // array
    //     return state.cards.filter((card) => card.id === +(params.id))
    //     // card.id = 1인데, params.id = '1'로 string이라서 ==로 조건완화(?)
    //     // 혹은 params.id를 +로 숫자로 만들어주기
    // });
    // console.log('filteredCards->', filteredCards) // 배열>> [{}];

    const [cards, setCards] = useState(null);


    const [targetId, setTargetId] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editComments, setEditComments] = useState("");
    const edit = {
        "id": targetId,
        "title": editTitle,
        "comments": editComments,
      }

    const fetchCards = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_WEBTOON}/webtoon`);
        console.log('data',data)
        setCards(data);
        
    }

    // const newCards = JSON.stringify([...cards])

    // dependency array에 card 넣어줬더니 무한반복 ㅠ >> 배열/객체라서..!
    useEffect(() => {
        console.log('useEffect 들어가니?')
        fetchCards();
    },[]);
    
    console.log('axios cards ->', cards);

    // const card = cards?.filter((card)=> card.id === +(params.id));
    // server에서 불러오기 전까지 로딩화면 보여주기 구현
    const card = cards?.find((card)=> card.id == params.id);
    // console.log('card->', card); // [{}]
    // console.log('card[0]->', card[0]); // {}
    // console.log('card[0].id->', card[0].id);


    //삭제 확인 용 메세지
    const CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?\n삭제를 원치 않으시면 [취소] 버튼을 눌러주세요."

    // // 삭제하기
    // const removeCardHandlerButton = () => {
    //     if (window.confirm(CONFIRM_MESSAGE))
    //         dispatch(removeCard(card.id))
    // }

    const removeCardHandler = () => {
        console.log('removeCardHandler working!')
        if (window.confirm(CONFIRM_MESSAGE)) axios.delete(`${process.env.REACT_APP_WEBTOON}/webtoon/${card.id}`)
        fetchCards();
      };



    const editCardHandler = (id, edit) => {
        axios.patch(`${process.env.REACT_APP_WEBTOON}/webtoon/${id}`, edit);

        setTargetId("");
        setEditTitle("");
        setEditComments("");
        fetchCards();
    };

    return (
        <DetailContainer>
            <CardBox>
                <div>
                    <h1>TITLE : {card?.title}</h1>
                </div>
                <div>
                    <h5>ID : {card?.id}</h5>
                </div>
                <Commentdiv>
                    <h5>{card?.comments}</h5>
                </Commentdiv>
            </CardBox>
            <div>
                <input
                    type="text"
                    value={targetId}
                    placeholder="수정하고 싶은 ID를 복사 후 붙여넣기 하세요."
                    onChange={(e) => {
                        setTargetId(e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={editTitle}
                    placeholder="제목을 수정해 주세요."
                    onChange={(e) => {
                        setEditTitle(e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={editComments}
                    placeholder="평가를 수정해 주세요."
                    onChange={(e) => {
                        setEditComments(e.target.value);
                    }}
                />
            </div>
            <ButtonBox>
                <Button
                    backgroundColor="hotpink"
                    type="button"
                    onClick={()=> editCardHandler(targetId, edit)}

                >
                    수정하기
                </Button>
                <Button
                    backgroundColor="hotpink"
                    type="button"
                    onClick={removeCardHandler}
                >
                    삭제하기
                </Button>
            </ButtonBox>
        </DetailContainer >
    )
};

export default DetailBox;

const DetailContainer = styled.div`
    border: 1px solid hotpink;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: auto;
`

const CardBox = styled.table`
    border: 2px dotted blueviolet;
    height: 500px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Commentdiv = styled.div`
    border: 1px dotted blueviolet;
    height: 350px;
    width: 300px;
    overflow-y: auto;
    margin: auto;
    padding: 10px;
`

const ButtonBox = styled.div`
    background-color: hotpink;
`