import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const UserDetail = () => {
  const { id } = useParams();
  const { createdUsers } = useUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userFromList = createdUsers.find((user) => user.id === parseInt(id));
    if (userFromList) {
      setUser(userFromList);
      setLoading(false);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id, createdUsers]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      {user && (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <Link to="/">Back to List</Link>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
