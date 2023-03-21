import React from 'react';
import axios from 'axios';

const BanList = ({
    bannedUsers,
    bannedWords,
    bannedHashtags,
    bannedPhrases,
    search,
    setSearch,
    setBannedUsers,
    setBannedWords,
    setBannedHashtags,
    setBannedPhrases,
}) => {
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleBanUser = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5173/api/banlist/user/${search}`);
    };

    const handleBanWord = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5173/api/banlist/word/${search}`);
    };

    const handleBanHashtag = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5173/api/banlist/hashtag/${search}`);
    };

    const handleBanPhrase = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5173/api/banlist/phrase/${search}`);
    };

    const handleUnbanUser = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5173/api/banlist/user/${search}`);
    };

    const handleUnbanWord = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5173/api/banlist/word/${search}`);
    };

    const handleUnbanHashtag = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5173/api/banlist/hashtag/${search}`);
    };

    const handleUnbanPhrase = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5173/api/banlist/phrase/${search}`);
    };





    return (
        <div className="">
            <div className="flex flex-wrap">
                <div className="">
                    <form className="bg-white shadow-md rounded" onSubmit={handleBanUser}>
                        <input
                            className="rounded border border-gray-400 p-2 m-2 flex-auto"
                            type="text"
                            value={search}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                            Ban User
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="button" onClick={handleUnbanUser}>
                            Unban User
                        </button>
                    </form>

                    <form className="bg-white shadow-md rounded" onSubmit={handleBanWord}>
                        <input
                            className="rounded border border-gray-400 p-2 m-2 flex-auto"
                            type="text"
                            value={search}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                            Ban Word
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="button" onClick={handleUnbanWord}>
                            Unban Word
                        </button>
                    </form>

                    <form className="bg-white shadow-md rounded" onSubmit={handleBanHashtag}>
                        <input
                            className="rounded border border-gray-400 m-2 p-2 flex-auto"
                            type="text"
                            value={search}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                            Ban Hashtag
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="button" onClick={handleUnbanHashtag}>
                            Unban Hashtag
                        </button>
                    </form>

                    <form className="bg-white shadow-md rounded" onSubmit={handleBanPhrase}>
                        <input
                            className="rounded border border-gray-400 m-2 p-2 flex-auto"
                            type="text"
                            value={search}
                            onChange={handleChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
                            Ban Phrase
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="button" onClick={handleUnbanPhrase}>
                            Unban Phrase
                        </button>
                    </form>
                </div>
       

            <div className="w-full">
                    <h1 className="text-2xl font-bold">Banned Users</h1>
                    <ul className="list-disc list-inside">

                        {bannedUsers.map((user) => (
                            <li key={user}>{user}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <h1 className="text-2xl font-bold">Banned Words</h1>
                    <ul className="list-disc list-inside">
                        {bannedWords.map((word) => (
                            <li key={word}>{word}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <h1 className="text-2xl font-bold">Banned Hashtags</h1>
                    <ul className="list-disc list-inside">
                        {bannedHashtags.map((hashtag) => (
                            <li key={hashtag}>{hashtag}</li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <h1 className="text-2xl font-bold">Banned Phrases</h1>
                    <ul className="list-disc list-inside">
                        {bannedPhrases.map((phrase) => (
                            <li key={phrase}>{phrase}</li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
 
    );  
};

export default BanList;

