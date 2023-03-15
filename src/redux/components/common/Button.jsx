import React from "react";
import styled from "styled-components";

// button컴포넌트에서 속성값을 안 내려줬더니 추가적으로 속성값을 넣을 수는 없었다.
function Button ({ backgroundColor, children, type, onClick }) {
    return <StyledButton 
    backgroundColor={backgroundColor}
    type={type}
    onClick={onClick}
    >
        {children}
    </StyledButton>;
};

export default Button;

const StyledButton = styled.button`
    background-color: ${(props) => props.backgroundColor};
    border: none;
    border-radius: 10px;
    color: white;
`