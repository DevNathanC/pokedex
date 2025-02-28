import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";
import styled from 'styled-components';

export const Button = ({ onClick, children, ...props }) => {
   
    const {theme} = useContext(ThemeContext)
    
    return (
        <>
            <ButtonDefault {...props} onClick={onClick} style={{color: theme.color, backgroundColor: theme.background}}>
                {children}
            </ButtonDefault>
        </>
    );
};


const ButtonDefault = styled.button`



padding: 5px ;
    width: 170px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    font-size:25px;
    box-shadow: inset 0 0 0 0 ;
    -webkit-transition: ease-out 0.4s;
    -moz-transition: ease-out 0.4s;
     transition: ease-out 0.4s;

    &:hover{
    box-shadow: inset 400px 0 0 0 #5a0f94 ;
    };
    
`

