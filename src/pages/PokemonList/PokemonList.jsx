import { useContext, useEffect, useState } from "react";
import FetchData from "../../services/FetchApi";
import { Button } from "../../components/button/Button";
import { Link, } from "react-router-dom";
import { ThemeContext } from "../../components/contexts/theme-context";
import { ThemeTogglerButton } from "../../components/theme-toggler-button/theme-toggler-button";
import styled from 'styled-components';


const PokemonList = () => {

    const [listPokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(1);
    const { theme } = useContext(ThemeContext);

    const loadPokemons = async (start) => {
        const pokemonsData = await FetchData(start);
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsData]);
    };

    useEffect(() => {    
      loadPokemons(offset);
    }, []);

    const handleLoadMore = () => {
        const newOffset = offset + 10;
        setOffset(newOffset);
        loadPokemons(newOffset);
    };

    return (
        <>
            <Div style={{ backgroundColor: theme.backgroundTheme }}>
                <DivTheme>
                    <ThemeTogglerButton />
                </DivTheme>
                <H1>Pokedex</H1>
                <Ul>
                    {listPokemons.map((pokemon, index) => (
                        <Li key={index} className="pokemonList" style={{ backgroundColor: theme.background }} >
                            <Link to={`/pokemon/${pokemon.id}`} >
                                <Img src={pokemon.sprites.other['dream_world'].front_default} alt={pokemon.name} />
                                <H2 style={{ color: theme.color }}>{pokemon.name}</H2>
                            </Link>
                        </Li>
                    ))}
                </Ul>
                <Button onClick={handleLoadMore}>Carregar mais</Button>
            </Div>
        </>
    );
};

const Div = styled.div`
    height: 100dvh;
    padding:30px;
    font-family: Poppins, sans-serif;
    text-align: center;  
    text-decoration: none;

    @media only screen and (max-width: 1440px){
    height: 100%;
    }
`

const DivTheme = styled.div`
text-align: start;
`

const H1 = styled.h1`
    font-size: 40px;
    font-weight: bolder;
    color: #bd2f28;
    margin-bottom: 20px;

    @media only screen and (min-width: 2560px){
       font-size: 100px
    }
`

const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center
`

const Li = styled.li`
    width: 225px;
    height: 235px;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;

    @media only screen and (max-width: 2560px){
        width: 325px;
        height: 335px;
        border-radius: 20px;
    }
    
`

const Img = styled.img`
    width: 90%;
    height: 90%;
`

const H2 = styled.h2`
    font-weight: bolder;

    @media only screen and (max-width: 2560px){
        font-size: 40px;
    }
`




export default PokemonList;
