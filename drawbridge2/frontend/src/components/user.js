import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
    baseURL: "http://127.0.0.1:8000" // Replace with secret variable before production
});

const UserInfo = () => {
    const [user, setUser] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        console.log("Current user on user page: ", currentUser);
        const fetchUserInfo = async () => {
        try {
            console.log("trying to fetch user info")
            const response = await client.get('/api/user', );
            setUser(response.data.user);
            console.log("user: ", response.data)
        } catch (error) {
            console.error('Failed to fetch user information', error);
        }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
        <h2>User Information</h2>
        {user && (
            <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            </div>
        )}
        </div>
    );
};

export default UserInfo;
