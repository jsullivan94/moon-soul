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
            {shows}
        </div>
    )
}

export default Home;


