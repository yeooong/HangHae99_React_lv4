import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import axios from "axios";

// 추가하기 버튼을 누르면 갱신되는 이유가 리렌더링 때문인가?
function CardList () {
    // // 서버-store 연결 or 서버 직접 연결
    // const cards = useSelector((state) => state.cards);
    // 전역 store에 axios로 받아온 데이터를 넣어서 다른 컴포넌트에서 활용할 수 있을지?
    // 만약 그렇다면 어디 파일에서 그 데이터를 store에 넣어주는게 좋은지.

    // useState 초깃값이 왜 null?
    const [cards, setCards] = useState(null);

    const fetchCards = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_WEBTOON}/webtoon`);
        // env파일 변경했으면 서버 껐다 키기!
        setCards(data);
    }

    // dependence array에 card 넣어줬더니 무한반복 ㅠ 
    useEffect(() => {
        fetchCards();
    },[])

    console.log('axios cards ->', cards);


    return (
        <div>
            {
                // cards 뒤에 ? 안 넣으면 됐다가 안 됐다가 함. 
                // 원인은 아마 서버와의 통신에 걸리는 시간 때문인 듯!
                cards?.map((card)=> {
                    return <Card key={card.id} card={card} />
                })
            }
        </div>

    );
};

export default CardList;