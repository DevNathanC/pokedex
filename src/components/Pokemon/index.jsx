import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../../services/FetchApi";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components'
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button";
import { ThemeContext } from "../../components/contexts/theme-context";



async function getPokemon(id) {
    const response = await fetch(`${baseUrl}/pokemon/${id}`)
    return response.json()
}

async function getAbilityDescription(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.effect_entries.find(entry => entry.language.name === 'en').effect;
}

const PokemonDetails = () => {

    const { theme } = useContext(ThemeContext);
    const { id } = useParams()

    const [Pokemon, setPokemon] = useState({
        id: [id],
        name: '',
        moves: [],
        abilities: [],
        descAbilities: [],
        type: [],
        image: null,
        gif: null,
    });


    useEffect(() => {
        async function fetchData() {
            const pokemon = await getPokemon(id)

            const abilitiesDesc = await Promise.all(
                pokemon.abilities.map(async (e) => {
                    const description = await getAbilityDescription(e.ability.url);
                    return { name: e.ability.name, description };
                })
            );

            setPokemon({
                id: pokemon.id,
                name: pokemon.name,
                moves: pokemon.moves.map(e => e.move.name),
                abilities: pokemon.abilities.map(ability => ability.ability.name) || [],
                descAbilities: abilitiesDesc.map(ability => ability.description) || [],
                type: pokemon.types.map(type => type.type.name) || [],
                image: pokemon.sprites.other['official-artwork'].front_default || "",
                gif: pokemon.sprites.other['showdown'].front_default || "",
            })
        }
        fetchData()
    }, [id]);


    return (
        <>
            <Div style={{ backgroundColor: theme.backgroundTheme }}>
                <DivTheme>
                <ThemeTogglerButton/>
                </DivTheme>
                <Link to={`/`}>
                    <H1>Pokedex</H1>
                </Link>
                <ul>
                    <Li>
                        <Img src={Pokemon.image} alt={Pokemon.name} />
                        <DivInfos>
                            <DivName>
                                <H2><B>Name:</B> {Pokemon.name.toUpperCase()}</H2>
                                <P><B>Type:</B> {Pokemon.type.join(',').toUpperCase()}</P>
                            </DivName>
                            <P><B>Abilities:</B></P>
                            <UlAbilities>
                                {Pokemon.abilities.map((abilities, index) => ( <li key={index}><B>{abilities}</B>: {Pokemon.descAbilities[index]}</li> ))}
                            </UlAbilities>
                            <P><B>Moves: </B></P>
                            <Ul>
                                {Pokemon.moves.map((move, index) => ( <li key={index}>{move}</li> ))}
                            </Ul>
                        </DivInfos>

                    </Li>

                </ul>
            </Div>
        </>
    );
};

const Div = styled.div`    
    height: 100dvh;
    padding: 10px;
    background-color: #142433 ;
    font-family: Poppins, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 768px){
    height: 100%;
    }
`

const DivTheme = styled.div`    
  text-align: start;
  width:90%;
`

const H1 = styled.h1`
    width:90%;
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
    list-style: disc;
    flex-wrap: wrap;
    gap: 30px;
    font-size: 15px;
    justify-content: center;
    width:90%; 

    @media only screen and (min-width: 2560px){
        font-size: 40px;
        gap: 50px;
    }
`
const UlAbilities = styled(Ul)`
    list-style: none;
`

const Li = styled.li`
 color: #fad9a6
`

const Img = styled.img`
    width: 150px ;

    @media only screen and (min-width: 2560px){
       width: 450px ;
    }
`

const DivInfos = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width: 2560px){
        font-size: 60px;
        margin: 100px;
    }

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

    @media only screen and (min-width: 2560px){
        font-size: 70px;
    }
`

export default PokemonDetails;
