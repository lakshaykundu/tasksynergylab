import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const UserForm = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const addUser = location.state?.addUser; // Get the addUser function from location state

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://jsonplaceholder.typicode.com/users/${id}`
      : "https://jsonplaceholder.typicode.com/users";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(id ? "User updated" : "User created");
        if (addUser) {
          addUser(data); // Add the new user to the list
        }
        navigate("/");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{id ? "Update User" : "Create User"}</button>
    </form>
  );
};

export default UserForm;
