import { BrowserRouter, Route, Routes } from "react-router-dom"
import PokemonList from "./PokemonList/PokemonList"
import Pokemon from "./pokemon/Pokemon"

const AppRoutes = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<PokemonList/>} />
                <Route exact path='/pokemon/:id' element={<Pokemon/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRoutes}