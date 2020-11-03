import { dbService } from 'fbase';
import React from 'react';

function Home() {
    const [nweet, setNweet] = useState("");
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
    </div>;
}

export default Home;
