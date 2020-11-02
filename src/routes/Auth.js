import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Email" name="email" value={email} required onChange={onChange} />
            <input type="password" placeholder="Password" name="password" value={password} required onChange={onChange} />
            <input type="submit" value="Log In" />
        </form>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
    </div>;
}

export default Auth;
