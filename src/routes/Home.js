import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import React, { useState, useEffect } from 'react';
import NweetFactory from 'components/NweetFactory';

function Home({ userObj }) {
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
    return <div>
        <div>
            <NweetFactory userObj={userObj} />
            {nweets.map(nweet => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
            ))}
        </div>
    </div>;
}

export default Home;
