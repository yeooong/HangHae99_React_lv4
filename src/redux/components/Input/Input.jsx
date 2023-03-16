import React from "react";
import { useState } from "react";
import nextId from "react-id-generator";
// import { useDispatch } from "react-redux";
// import { addCard } from "../../modules/cards";
import Button from "../common/Button";
import RightMarginBox from "../common/RightMarginBox";
import axios from "axios";

function Input () {
    const id = nextId();

    // const dispatch = useDispatch();

    // 컴포넌트 내부에서 사용할 state(제목, 코멘트)
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState("");

    // const [card, setCard] = useState({});

    // title의 변경을 감지하는 함수
    const onChangeTitleHandler = (e) => {
        setTitle(e.target.value);
    };

    // comment의 변경을 감지하는 함수
    const onChangeCommenstHandler = (e) => {
        setComments(e.target.value);
    };

    // 에러 메세지 발생 함수
    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n\n제목과 내용은 모두 입력돼야 합니다. 입력값을 확인해주세요. \n입력된 값(제목 " '${params.title}, 내용 : '${params.comments}`
                );

        }
    }

    // // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    // const onSubmitHandler = (e) => {
    //     // submit의 고유 기능인 새로고침(refresh)을 막아주는 역할
    //     e.preventDefault();

    //     // title과 comments가 하나라도 없는 경우 오류발생
    //     if (!title || !comments) {
    //         return getErrorMsg("01", {title, comments})
    //     }

    //     // 추가하려는 card를 newTodo라는 객체로 새로 만듦
    //     const newCard = {
    //         title,
    //         comments,
    //         id,
    //     };

    //     // card를 추가하는 reducer 호출
    //     // 인자 : payload
    //     dispatch(addCard(newCard));

    //     // // state 두 개를 초기화
    //     setTitle("");
    //     setComments("");

    // };

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        if (!title || !comments) {
            return getErrorMsg("01", { title, comments })
        };

        const newCard = {
            title,
            comments,
            id,
        };
    
        await axios.post(`${process.env.REACT_APP_WEBTOON}/webtoon`, newCard);
        
        setTitle("");
        setComments("");
    };


    return (
        <div>
            <form 
            onSubmit={onSubmitHandler}>
                <RightMarginBox margin={10}>
                    <label>컨텐츠 제목</label>
                    <input
                        placeholder="컨텐츠 제목을 입력해주세요."
                        value={title}
                        onChange={onChangeTitleHandler}
                        minlength="10" required
                    />
                    <label>컨텐츠 평가</label>
                    <input
                        placeholder="컨텐츠에 대한 평가를 입력해주세요."
                        value={comments}
                        onChange={onChangeCommenstHandler}
                        required

                    />
                    <Button type="submit" backgroundColor="hotpink" >평가완료</Button>
                </RightMarginBox>
            </form>
        </div>
    )
}

export default Input;