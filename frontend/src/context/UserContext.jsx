import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // clear user data
  const clearData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
