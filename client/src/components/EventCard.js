function EventCard({ date, image_path, location, price, title }) {
    return (
        <div className="event-card">
            <img className="event-card-img" src={image_path} alt={title} />
            <div className="event-card-content">
                <h1 className="event-card-title">{title}</h1>
                <h3 className="event-card-date">{date}</h3>
                <h3 className="event-card-location">{location}</h3>
            </div>
            {price ? <h2 className="event-card-price">$ {price}</h2> : null}
           
        </div>
    )
}

export default EventCard;
