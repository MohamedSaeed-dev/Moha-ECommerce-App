
import { createContext, useState } from 'react';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [showDrawer, setShowDrawer] = useState("w-0");
    const [showAdminDrawer, setShowAdminDrawer] = useState("w-0");
    const [drawer, setDrawer] = useState("cart");
    const [showProfile, setShowProfile] = useState(false);

    const updateShowDrawer = (newData) => {
        setShowDrawer(newData);
    }

    const updateShowAdminDrawer = (newData) => {
        setShowAdminDrawer(newData);
    }
    const updateDrawer = (newData) => {
        setDrawer(newData);
    }
    const updateShowProfile = (newData) => {
        setShowProfile(newData);
    }
  

  return (
    <DataContext.Provider value={{ showDrawer, updateShowDrawer, drawer, updateDrawer, showProfile, updateShowProfile, updateShowAdminDrawer, showAdminDrawer }}>
      {children}
    </DataContext.Provider>
  );
};