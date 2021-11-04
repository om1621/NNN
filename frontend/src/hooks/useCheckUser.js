import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_AUTH_SUCCESS, USER_AUTH_FAILED } from "../actions/actionTypes";
import User from "../api/User";

const useCheckUser = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await User.get(`/${token}`);
        if (data.success) {
          dispatch({
            type: USER_AUTH_SUCCESS,
            value: data.user,
          });
        } else {
          dispatch({
            type: USER_AUTH_FAILED,
            value: data.err,
          });
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getUser();
  }, [dispatch, token]);

  return [loading];
};

export default useCheckUser;
