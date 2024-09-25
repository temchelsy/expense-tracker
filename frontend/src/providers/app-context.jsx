import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "./api";

const AppContext = createContext(null);

function AppContextProvider ({ children })  {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    fetchCurrentUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContextProvider };