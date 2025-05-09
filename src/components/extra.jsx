import { useId, useRef } from "react";
export const UseRef=()=>{
    const username=useRef(null);
    const password=useRef(null);

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(username.current.value,password.current.value);
        
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <InputComponent type="text" label="username" ref={username}/>
            <InputComponent type="password" label="password" ref={password}/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

const InputComponent=(props)=>{
    const id=useId();
    return(
        <>
        <label htmlFor={id}>{props.label}</label>
        <input type={props.type} id={id} ref={props.ref}></input>
        </>
    )
}