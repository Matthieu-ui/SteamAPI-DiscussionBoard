//get tweets from user input
import React from "react";
import axios from "axios";

const UserTweets = () => {
    const [tweets, setTweets] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [error, setError] = React.useState("");

    const getTweets = async (screenName) => {
        try {
            const res = await axios.get(`/api/tweets/${screenName}`);
            setTweets(res.data);
            setError("");
        } catch (err) {
            setError("User not found");
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getTweets(input);
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const noUser = (

        <div className='pl-2 pr-2 pb-2 m-3 rounded-md drop-shadow-mdmax-w-sm'>
            <h2 className='text-xl font-bold text-right p-4'>No User Found..</h2>
        </div>

    )

    const hideTweetsBtn = () => {
        const hideTweetsBtn = document.getElementById('hideTweetsBtn');

        if (tweets.length === 0) {
            hideTweetsBtn.style.display = 'none';
        } else {
            hideTweetsBtn.style.display = 'block';
        }


     


    }


    const hideTweets = () => {
        if (tweets.length === 0) {
            return (
                <div className='display-none'></div>
            )

        }


    }

    const displayTweets = tweets.map((tweet, i) => {

        if (tweet.entities.media) {
            return (
                <div className='pl-2 pr-2 pb-2 m-3 rounded-md drop-shadow-mdmax-w-sm' key={i}>
                    <h2 className='text-xl font-bold text-right p-4'>{tweet.user.name}</h2>
                    <p className='text-right p-4'>{tweet.text}</p>

                    </div>
            )
        } else {
            return (
                <div className='pl-2 pr-2 pb-2 m-3 rounded-md drop-shadow-mdmax-w-sm' key={i}>
                    <h2 className='text-xl font-bold text-right p-4'>{tweet.user.name}</h2>
                    <p className='text-right p-4'>{tweet.text}</p>
                </div>
            )
        }
    })

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-center p-4'>Twitter User Tweets</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>

                    <input
                        type='text'
                        placeholder='Enter Twitter Username'
                        value={input}
                        onChange={handleChange}
                        className='p-2 m-2 rounded-md'
                    />
                    <button type='submit' className='p-2 m-2 rounded-md bg-blue-500 text-white'>Submit</button>
                </form>
                <button id='hideTweetsBtn' onClick={hideTweetsBtn} className='p-2 m-2 rounded-md bg-blue-500 text-white'>Hide Tweets</button>
            </div>
            <div className='flex flex-col items-center justify-center'>
                {error ? noUser : displayTweets}
            </div>
        </div>
    )
}

export default UserTweets;


