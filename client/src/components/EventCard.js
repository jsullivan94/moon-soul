function EventCard({ id, date, image_path, location, price, title, admin, events, setEvents }) {

function handleClick() {
    fetch(`/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete event');
        }
        setEvents(events.filter(event => event.id !== id));
    })
    .catch(error => {
        console.error('There was a problem with the delete operation:', error.message);
    });

}

    return (
        <div className="event-card">
            <img className="event-card-img" src={image_path} alt={title} />
            <div className="event-card-content">
                <h1 className="event-card-title">{title}</h1>
                <h3 className="event-card-date">{date}</h3>
                <h3 className="event-card-location">{location}</h3>
            </div>
            {price ? <h2 className="event-card-price">$ {price}</h2> : null}
            {admin ? <button onClick={handleClick}>delete</button> : null}
        </div>
    )
}

export default EventCard;
