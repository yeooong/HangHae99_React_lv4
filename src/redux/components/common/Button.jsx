import React from "react";
import styled from "styled-components";

function Button ({backgroundColor, children }) {
    return <StyledButton 
    backgroundColor={backgroundColor}
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