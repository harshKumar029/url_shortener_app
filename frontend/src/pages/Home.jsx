import React, { useState } from 'react';
import { shortenUrl } from './utility/ApiService';

const Home = () => {
    const [originalURL, setOriginalURL] = useState('');

    const handleShortenURL = async (e) => {
        e.preventDefault();
      try {
        const email=localStorage.getItem("email")
        if(email){
        const response = await shortenUrl({ email:email, originalURL:originalURL });
        console.log(response);
        setOriginalURL(`https://x-agc4.onrender.com/${response.shortURL}`);
        }else{alert("Create your account")}
      } catch (error) {
        console.error(error.message); 
      }
    };
    <div>
      
    <input type="text" placeholder="Enter URL" value={originalURL} onChange={(e) => setOriginalURL(e.target.value)} />
    <button onClick={handleShortenURL}>Shorten URL</button>
  </div>
    return (
        <>
            <div className='homepage'>
                <div div className='home_wrapper'>
                <h1>Shorten Your <span>Loooooong</span> URLs <br /> like never before!</h1>
                <p>copy your long boaring url Paste it below.Then 💥 you got it,right?</p>
                <form onSubmit={handleShortenURL} className='formcontainerdata'>
                    <div>
                        <label>Your Url</label>
                        <input type="text" placeholder="Enter the link here" value={originalURL}  onChange={(e) => setOriginalURL(e.target.value)}/>
                    </div>
                    <button type="submit">Shorten now!</button>
                </form>
                <p className='ad_para'>We introduce Anylatics to our user you can view on Dashboard</p>
            </div>
            </div>
        </>
    )
}

export default Home