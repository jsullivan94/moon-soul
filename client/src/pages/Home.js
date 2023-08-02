import EventCard from "../components/EventCard";
import { useState, useEffect } from 'react';



function Home() {
    const [events, setEvents] = useState([])


    useEffect(() => {
        fetch('/events')
        .then(r => r.json())
        .then(r => setEvents(r))
    }, [])

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


