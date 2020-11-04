import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';

function Home({ userObj }) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            // ... => spread attribute 기능
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(nweetArray);
            setNweets(nweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (result) => {
            
        }
        reader.readAsDataURL(file);
    };

    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={nweet} placeholder="What's on you mind?" onChange={onChange} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map(nweet => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
            ))}
        </div>
    </div>;
}

export default Home;
