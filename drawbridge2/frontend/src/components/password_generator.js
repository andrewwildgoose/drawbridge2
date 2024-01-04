import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';
import ClipboardJS from 'clipboard';

import '../css/password_generator.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



const PasswordGenerator = ({ onPasswordChange }) => {
    const { currentUser } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [constraints, setConstraints] = useState({
        length: 12,
        include_lower: true,
        include_upper: true,
        include_number: true,
        include_special: true,
    });
    
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000", // Replace with secret variable before production
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

    // Copy the password to the user's clipboard
    useEffect(() => {
        const clipboard = new ClipboardJS('#copy_button');
        clipboard.on('success', (e) => {
            e.clearSelection();
        });
    
        return () => {
            clipboard.destroy(); // Clean up the ClipboardJS instance when the component unmounts.
        };
    }, []);
    

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log(event.target)
        setConstraints({
        ...constraints,
        [name]: type === 'checkbox' ? checked : value,
        });
        console.log(constraints)
        // handleSubmit(event);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Error handling for password request with no constraints
        if (
            !constraints.include_lower &&
            !constraints.include_upper &&
            !constraints.include_number &&
            !constraints.include_special
        ) {
            setError('Please select at least one constraint');
            setPassword(null)
            return;
        } else {
            setError(null)
        }
        // API call to generate password using the constraints and the headers config
        try {
            const response = await client.post('/api/generate_password', constraints);
            setPassword(response.data.password);
            onPasswordChange(response.data.password);
        } catch (error) {
            console.error('Password generation failed', error);
        }
    };

    // Copy the password to the user's clipboard

    return (
        <div className='generator'>
        {!password && <h2>Password Generator</h2>}
        {error && <p>{error}</p>}
        {password && <div className='result'>
            <div className='generated_password'>
                {password}
            </div>
            <div className="copy_button">
                <button id="copy_button" data-clipboard-target=".generated_password">
                Copy
                </button>    
            </div>
        </div>}
            <form onSubmit={handleSubmit}>
            <div className='input_pair'>
            <input
                type="number"
                name="length"
                value={constraints.length}
                onChange={handleChange}
                />
            <label>
                Length
            </label>
            </div>
            <div className='input_pair'>
            <input
                type="checkbox"
                name="include_lower"
                checked={constraints.include_lower}
                onChange={handleChange}
                />
            <label>
                Include Lowercase   
            </label>
            </div>
            <div className='input_pair'>
            <input
                type="checkbox"
                name="include_upper"
                checked={constraints.include_upper}
                onChange={handleChange}
                />
            <label>
                Include Uppercase
            </label>
            </div>
            <div className='input_pair'>
            <input
                type="checkbox"
                name="include_number"
                checked={constraints.include_number}
                onChange={handleChange}
                />
            <label>
                Include Numbers
            </label>
            </div>
            <div className='input_pair'>
            <input
                type="checkbox"
                name="include_special" 
                checked={constraints.include_special}
                onChange={handleChange}
                />
            <label>
                Include Special Characters
            </label>
            </div>
            <button type="submit" className='button'>Generate Password</button>
        </form>
        </div>
    );
};

export default PasswordGenerator;