

function EventCard({ date, image_path, location, price, title }) {
    return (
        <div>
            <h1>{title}</h1>
            <h3>{date}</h3>
            <h3>{image_path}</h3>
            <h3>{location}</h3>
            <h2>$ {price}</h2>
        </div>
    )



}


export default EventCard