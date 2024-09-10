import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [createdUsers, setCreatedUsers] = useState([]);

  return (
    <UserContext.Provider
      value={{ users, setUsers, createdUsers, setCreatedUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
