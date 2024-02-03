import { useState, useEffect } from 'react';

import EventCard from "../components/EventCard";
import VinylAd from '../components/VinylAd';

function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/events')
        .then(response => response.json())
        .then(data => {
            setEvents(data);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
    }, []);

    const shows = events.map(show => {
        return(
        <EventCard key={show.id} {...show} />
        )
    });

    return (    
        <div>
            <div className="home-content-container">
    <div className="home-text-content">
        <h1 className='home-title'>MOON SOUL</h1>
        <hr className="home-separator-line"></hr>
        <p className='home-text'>Moon Soul is a raw, psychedelic soul band from New York City -- a spontaneous, high-energy outfit that blends the sounds of The Zombies, Fela Kuti, Tame Impala, and Sly & the Family Stone into something funky and totally original.</p>
    </div>
    <div className="home-image-content" >
        <img className="home-image" src="/photos/RNI-Films-IMG-DC2A4323-26B0-4762-B251-CD8A0AE4943C.jpg" alt='band' />
    </div> 
    
        </div>
        <VinylAd />   
        {shows}
        </div>
    )
}

export default Home;




