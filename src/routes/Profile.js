import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Profile({ refreshUser, userObj }) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyNweets();
    }, []);
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }

    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;
