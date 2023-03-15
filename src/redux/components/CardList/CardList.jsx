import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

function CardList () {
    // 서버-store 연결 or 서버 직접 연결
    const cards = useSelector((state) => state.cards);

    return (
        <div>
            {
                cards.map((card)=> {
                    return <Card key={card.id} card={card} />
                })
            }
        </div>
    );
};

export default CardList;