import { useEffect, useState } from "react"
import { PokemonCard } from "./pokemon-card";
import "./index.css";

export const FetchApi=()=>{
    const [pokemon,setPokemon]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [searchInput,setSearchInput]=useState("");

    const apiKey="https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon=async ()=>{
        try{
            const result=await fetch(apiKey);
            const data=await result.json();
            console.log(data);
            const pokemonData=data.results.map(async (pokemon)=>{
                const result=await fetch(pokemon.url);
                const data=await result.json();
                return data;
            });
            const finalData=await Promise.all(pokemonData);
            setPokemon(finalData);
            console.log(pokemon);
            setLoading(false);
            
        }
        catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(()=>{
        fetchPokemon()},[]
    );
    useEffect(() => {
        if (pokemon) {
            console.log(pokemon);
        }
    }, [pokemon]);
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>Error:{error.message}</h1>
    }

    const filteredPokemon = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
        <section className="container">
            <div className="pokemon-search">
                <input 
                    type="text" 
                    placeholder="Search Pokemon" 
                    value={searchInput} 
                    onChange={(e)=>setSearchInput(e.target.value)} 
                />
            </div>
            <ul className="cards">
                {filteredPokemon.map((curPokemon) => {
                    return <PokemonCard key={curPokemon.id} pokemon={curPokemon} />
                })}
            </ul>
        </section>
    )
    
}