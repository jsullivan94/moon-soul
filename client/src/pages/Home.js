import { useState, useEffect } from 'react';

import EventCard from "../components/EventCard";

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
            <div class="home-content-container">
    <div class="home-text-content">
        <h1 className='home-title'>MOON SOUL</h1>
        <hr class="home-separator-line"></hr>
        <p className='home-text'>Moon Soul is a raw, psychedelic soul band from New York City -- a spontaneous, high-energy outfit that blends the sounds of The Zombies, Fela Kuti, Tame Impala, and Sly & the Family Stone into something funky and totally original.</p>
    </div>
    <div class="home-image-content">
        <img className="home-image" src="pictures/RNI-Films-IMG-DC2A4323-26B0-4762-B251-CD8A0AE4943C.jpg" />
    </div> 
        </div>
            {shows}
        </div>
    )
}

export default Home;




