import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/features/userSlice'


export default function ProtectedRoute({ children }) {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    
    const getUser = async () => {
        try {
            const res = await axios.get("/api/v1/user/getUserData", 
            { token: localStorage.getItem('token') },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                dispatch(setUser(res.data.data))
            }
            else {
                dispatch(Navigate('/login')) // Use dispatch here to navigate
                localStorage.clear()
              }
        } catch (error) {
            localStorage.clear()
            console.log(error);
        }
    }

    useEffect(() => {
        if(!user){
            getUser()
        }
    }, [user, getUser]);

    if(localStorage.getItem("token")){
        return children;
    }
    else{
        return <Navigate to="/login" />;
    }
}