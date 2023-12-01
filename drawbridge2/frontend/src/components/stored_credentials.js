import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';
import CredentialModal from './new_credential_modal';

import '../css/stored_credentials.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
    baseURL: "http://127.0.0.1:8000" // Replace with secret variable before production
});

const CredentialStore = () => {
    const [ credentialList, setCredentialList ] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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
            <button 
                className='button'
                onClick={() => {
                    setOpenModal(true);
                    }
                }
            >
                Add New Credential
            </button>
            {openModal && <CredentialModal closeModal={setOpenModal}/>}
            {credentialList.length > 0 ? (
                <div>
                    {credentialList.map((credential, index) => (
                        <div className='stored_credential' key={index}>
                            <div class="credential-title">{credential.title}</div>
                            <div class="credential-username">{credential.username}</div>
                            <div class="credential-url">{credential.url}</div>
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