import { useContext } from "react"
import { ThemeContext, themes } from "../contexts/theme-context"
import { Button } from "../button/Button";

export const ThemeTogglerButton = () =>{

    const {theme, setTheme} = useContext(ThemeContext)
    
    return(
        <>
            <Button onClick={()=> setTheme( theme === themes.light? themes.dark : themes.light)}>Mudar Tema</Button>
        </>
    )
   
}