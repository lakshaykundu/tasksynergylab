import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import { useUserContext } from "../contexts/UserContext";

const UserList = () => {
  const { users, setUsers, createdUsers, setCreatedUsers } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (editingUser) {
      setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser
      ? `https://jsonplaceholder.typicode.com/users/${editingUser.id}`
      : "https://jsonplaceholder.typicode.com/users";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser || newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingUser) {
          setUsers(users.map((user) => (user.id === data.id ? data : user)));
          setEditingUser(null);
        } else {
          setUsers([...users, data]);
          setCreatedUsers([...createdUsers, data]);
          setNewUser({ name: "", email: "", phone: "" });
        }
        alert(editingUser ? "User updated" : "User created");
      })
      .catch((error) => alert(error.message));
  };

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter((user) => user.id !== id));
        setCreatedUsers(createdUsers.filter((user) => user.id !== id));
      })
      .catch((error) => alert(error.message));
  };

  const startEdit = (user) => {
    setEditingUser(user);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingUser ? "Edit User" : "Create User"}</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={editingUser ? editingUser.phone : newUser.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {editingUser ? "Update User" : "Create User"}
        </button>
        {editingUser && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h1>User List</h1>

      {loading ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width="150px" />
                </td>
                <td>
                  <Skeleton width="200px" />
                </td>
                <td>
                  <Skeleton width="150px" />
                </td>
                <td>
                  <Skeleton width="100px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => startEdit(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  <Link to={`/details/${user.id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
