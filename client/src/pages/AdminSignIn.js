import { useState, useEffect } from "react";

function AdminSignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((admin) => setAdmin(admin));
          }
        });
      }, []);
    
      function handleSubmit(e) {
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
            r.json().then((admin) => setAdmin(admin));
          } 
        });
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            <div className="form-label">
            {admin ? 'Yes' : 'No'}
            </div>
            
        </div>
    )
} 

export default AdminSignIn