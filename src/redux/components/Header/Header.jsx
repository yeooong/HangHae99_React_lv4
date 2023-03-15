import React from "react";
import { BsFillArrowThroughHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
        <header style={{
            border: '1px dotted hotpink',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <BsFillArrowThroughHeartFill 
            style={{
                color: 'hotpink',
                fontSize: '40px',
            }}
            onClick={() => {
                navigate("/");
            }} 
            />
            <div>
                오덕모여
            </div>

        </header>
    )
};

export default Header;