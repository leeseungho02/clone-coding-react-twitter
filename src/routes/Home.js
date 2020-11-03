import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';

function Home() {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            // ... => spread attribute 기능
            const nweetObject = {
                ...document.data(),
                id: document.id
            };
            setNweets(prev => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet: nweet,
            createAt: Date.now()
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };

    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={nweet} placeholder="What's on you" onChange={onChange} />
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map(nweet => (
                <div key={nweet.id}>
                    <h4>{nweet.nweet}</h4>
                </div>
            ))}
        </div>
    </div>;
}

export default Home;
