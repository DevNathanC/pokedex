import { createContext, useState } from "react";
export const themes = {
    light: {
        color: '#89373d',
        background: '#fad9a6',
        backgroundTheme: '#295264'
    },
    dark: {
        color: '#fad9a6',
        background: '#89373d',
        backgroundTheme: '#12122b'
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.dark)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>

    )

}

