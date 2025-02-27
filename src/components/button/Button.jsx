import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

import "./Button.css";

export const Button = ({ onClick, children, ...props }) => {
   
    const {theme} = useContext(ThemeContext)
    
    return (
        <>
            <Button {...props} onClick={onClick} style={{color: theme.color, backgroundColor: theme.background}}>
                {children}
            </Button>
        </>
    );
};