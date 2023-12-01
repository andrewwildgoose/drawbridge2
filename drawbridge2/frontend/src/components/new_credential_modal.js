import React, { useState } from 'react';
import axios from 'axios';

import GeneratorModal from './generator_modal';


import '../css/new_credential_modal.css';
import '../css/modals.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;




function CredentialModal({ closeModal }) {

    const [openGenerator, setOpenGenerator] = useState(false);
    
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000", // TODO:Replace with secret variable before production
        headers: {'X-CSRFToken': extractCSRFToken(document.cookie)},
    });

    // Extract CSRF Token from the session to send with the POST request
    function extractCSRFToken(cookieString) {
        const tokenPrefix = 'csrftoken=';
        const tokenIndex = cookieString.indexOf(tokenPrefix);
    
        if (tokenIndex !== -1) {
            const startIndex = tokenIndex + tokenPrefix.length;
            const token = cookieString.substring(startIndex).trim();
            return token;
        }
    
        return null; // Return null if the token is not found
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('/api/store_credential', formData,);
            console.log("Response: ", response);
            closeModal(false);
            window.location.reload(false);
        } catch (error) {
            console.error('Failed to save new credential: ', error);
        }
    }

    const [formData, setFormData] = useState({
        title: '',
        username: '',
        password: '',
        url: ''
    });

    // Copied Password Logic NEEDS WORK
    const handleAddPassword = (copiedPassword) => {
        console.log("Password in credential modal: ", copiedPassword)
        setFormData({ ...formData, password: copiedPassword })
    };

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='modalCloseButton'>
                    <button className='button' onClick={() => closeModal(false)}> X </button>
                </div>
                <div className='modalTitle'>Add New Credential</div>
                <div className='modalContent'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                            className='credentialInput'
                            type='text'
                            placeholder="Title"
                            name='title'
                            size="30"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                            className='credentialInput'
                            type='text'
                            placeholder="Username"
                            name='username'
                            size="30"
                            
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div className='passwordField'>
                            <input
                            className='credentialInput'
                            type='password'
                            placeholder="Password"
                            name='password'
                            size="30"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button 
                                className='passwordButton' 
                                onClick={() => setOpenGenerator(true)}
                            > 
                                Generate 
                            </button>
                            
                        </div>
                        <div>
                            <input 
                            className='credentialInput'
                            type="text" 
                            name="url" 
                            placeholder="https://example.com" 
                            size="30" 
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>
                        <button className='button' onClick={() => closeModal(false)}> Cancel </button>
                        <button className='button' type='submit'> Save </button>
                    </form>
                </div>
            </div>
        {openGenerator && <GeneratorModal closeGenerator={setOpenGenerator} sendGeneratedPassword={handleAddPassword}/>}
        </div>
    )
}

export default CredentialModal;