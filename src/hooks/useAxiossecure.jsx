import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-for-recruiter-part3-eta-one.vercel.app/",
  withCredentials: true,
});
const useAxiossecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error caught in interceptor", error);
        if (error.status === 401 || error.status) {
          console.log("log out the user");
          signOutUser()
            .then(() => {
              console.log("log out user");
              navigate("/signIn");
            })
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiossecure;
