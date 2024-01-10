import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

function AdminSignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [admin, setAdmin] = useState(false)
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then(() => setAdmin(true));
          }
        });
      }, []);

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
      <EventCard key={show.id} {...show} admin={admin} setEvents={setEvents} events={events} />
      )
  });
    
      function handleSignin(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then(() => setAdmin(true));
          } 
        });
      }

      function handleAddEvent(e) {
        e.preventDefault()
        fetch('/events', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });

      }

      const [formData, setFormData] = useState({
        image_path: '',
        title: '',
        date: '',
        location: '',
        price: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    


    return (
        <div>
          {!admin ?  
            <form onSubmit={handleSignin}>
                <label className="form-label">Enter Username:
                    <input 
                    type="text" 
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className="form-label">Enter Password:
                    <input 
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Submit</button>
                </form>
            : 
            <form onSubmit={handleAddEvent}>
              <h1 className="form-label">New Event</h1>
                <label className="form-label">Enter image path:
                    <input 
                        type="text" 
                        name="image_path"
                        value={formData.image_path}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <label className="form-label">Enter title:
                    <input 
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <label className="form-label">Enter date:
                    <input 
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <label className="form-label">Enter location:
                    <input 
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <label className="form-label">Enter price:
                    <input 
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
          }
          <div>
          {admin ? [shows] : null}
          </div>
        </div> 
    )
} 

export default AdminSignIn