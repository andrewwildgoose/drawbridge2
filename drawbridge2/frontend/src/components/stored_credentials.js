import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';

import '../css/stored_credentials.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
    baseURL: "http://127.0.0.1:8000" // Replace with secret variable before production
});

const CredentialStore = () => {
    const [ credentialList, setCredentialList ] = useState([]);

    useEffect(() => {
        const fetchCredentialList = async () => {
        try {
            const response = await client.get('/api/user_saved_credentials', );
            setCredentialList(response.data);
            console.log("Credential list: ", response.data)
        } catch (error) {
            console.error('Failed to fetch credential list', error);
        }
        };

        fetchCredentialList();
    }, []);

    return (
        <div className='credential_store'>
        <h2>Credentials</h2>
            {credentialList.length > 0 ? (
                <div>
                    {credentialList.map((credential, index) => (
                        <div key={index}>
                            <p>{credential.title}</p>
                            {/* Render other credential details here */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No stored credentials found.</p>
            )}
        </div>
    );
}

export default CredentialStore;