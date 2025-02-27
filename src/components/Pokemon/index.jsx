import { useEffect, useState } from "react";
import { baseUrl } from "../../services/FetchApi";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components'
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button";



async function getPokemon(id) {
    const response = await fetch(`${baseUrl}/pokemon/${id}`)
    return response.json()
}

const PokemonDetails = () => {

    const { id } = useParams()

    const [Pokemon, setPokemon] = useState({
        id: [id],
        name: '',
        moves: [],
        abilities: [],
        type: [],
        image: null,
        gif: null,
    });


    useEffect(() => {
        async function fetchData() {
            const pokemon = await getPokemon(id)

            setPokemon({
                id: pokemon.id,
                name: pokemon.name,
                moves: pokemon.moves.map(e => e.move.name),
                abilities: pokemon.abilities.map(ability => ability.ability.name) || [],
                type: pokemon.types.map(type => type.type.name) || [],
                image: pokemon.sprites.other['official-artwork'].front_default || "",
                gif: pokemon.sprites.other['showdown'].front_default || "",
            })


        }
        fetchData()
    }, [id]);


    return (
        <>
            <Div>
                <DivTheme>
                <ThemeTogglerButton/>
                </DivTheme>
                <Link to={`/`}>
                    <H1>Pokedex</H1>
                </Link>
                <ul>
                    <Li>
                        <Img src={Pokemon.image} alt={Pokemon.name} />
                        <div>
                            <DivName>
                                <H2><B>Name:</B> {Pokemon.name.toUpperCase()}</H2>
                                <P><B>Type:</B> {Pokemon.type.join(',').toUpperCase()}</P>
                            </DivName>
                            <P><B>Abilities:</B></P>
                            <Ul>
                                {Pokemon.abilities.map((abilities, index) => ( <li key={index}>{abilities}</li> ))}
                            </Ul>
                            <P><B>Moves: </B></P>
                            <Ul>
                                {Pokemon.moves.map((move, index) => ( <li key={index}>{move}</li> ))}
                            </Ul>
                        </div>

                    </Li>

                </ul>
            </Div>
        </>
    );
};

const Div = styled.div`
    height: 100%;
    padding:30px;
    background-color: #142433 ;
    font-family: Poppins, sans-serif;
    text-align: center;        
`

const DivTheme = styled.div`    
  text-align: start;
`

const H1 = styled.h1`
    font-size: 40px;
    font-weight: bolder;
    color: #bd2f28;
    margin-bottom: 20px;
`

const Ul = styled.ul`
    display: flex;
    list-style: disc;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 10px;
    justify-content: center;
`

const Li = styled.li`
 color: #fad9a6
`

const Img = styled.img`
    width: 150px ;
`

const DivName = styled.div`
 display:flex;
 justify-content: center;
`

const H2 = styled.h2`
    margin: 20px;
    font-weight: bolder;
    
`

const P = styled.p`
    margin: 20px;
`

const B = styled.b`
    font-weight: bolder;
    color: #bd2f28;
`

export default PokemonDetails;
