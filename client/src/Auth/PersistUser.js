import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { AuthContext } from "./AuthContext";
import axiosAPI, { setupInterceptors } from "../Admin/axiosAPI";

const PersistUser = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupInterceptors(updateUser);
    const refresh = async () => {
      try {
        const response = await axiosAPI.get('/refresh');
        Cookies.remove("Bearer");
        Cookies.set('Bearer', response.data.accessToken);
        updateUser(prev => ({
          user: response.data.user,
          token: response.data.accessToken,
        }));
      } catch (error) {
        console.error('Error refreshing token:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkAndRefreshToken = async () => {
      if (!user.token) {
        Cookies.remove("Bearer");
        await refresh();
      } else {
        setLoading(false);
      }
    };

    checkAndRefreshToken();

    const timer = setInterval(() => {
      checkAndRefreshToken();
    }, 1000 * 10); // Adjust the interval as necessary, e.g., every 5 minutes

    return () => {
      clearInterval(timer);
    };
  }, [user.token, updateUser]);

  return !loading ? <Outlet /> : <Loading />;
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default PersistUser;
