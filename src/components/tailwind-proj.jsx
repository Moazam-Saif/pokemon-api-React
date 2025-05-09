import { createContext, useState } from "react";
import { use } from "react";

export const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState("dark");

    const handleToggleTheme=()=>{
        setTheme((prevTheme)=>prevTheme==="dark"?"light":"dark");
    }
    return <ThemeContext.Provider value={{theme,handleToggleTheme}}>{children}</ThemeContext.Provider>
};

export const DarkLight=()=>{
    const {theme,handleToggleTheme}=use(ThemeContext);
    return (
        <>
        <div className="theme-contianer" style={{backgroundColor:theme==="dark"?"black":"white"}}>
            <h1 style={{color:theme==="dark"?"solid white":"solid black"}}>{theme} mode</h1><button onClick={handleToggleTheme}>Switch to {theme==="dark"?"light":"dark"} mode</button>
        </div>
        </>
    )
}