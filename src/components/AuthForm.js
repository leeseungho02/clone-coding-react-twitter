import { authService } from 'fbase';
import React, { useState } from 'react';

function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = null;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Email" name="email" value={email} required onChange={onChange} />
            <input type="password" placeholder="Password" name="password" value={password} required onChange={onChange} />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
        </>
    );
}

export default AuthForm;