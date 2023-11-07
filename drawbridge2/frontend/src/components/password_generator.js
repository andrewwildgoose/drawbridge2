import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000" // Replace with secret variable before production
});

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [constraints, setConstraints] = useState({
        length: 12,
        includeLower: true,
        includeUpper: true,
        includeNumber: true,
        includeSpecial: true,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setConstraints({
        ...constraints,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await client.post('/api/generate_password', constraints, { withCredentials: true });
            setPassword(response.data.password);
        } catch (error) {
            console.error('Password generation failed', error);
        }
    };

    return (
        <div>
        <h2>Password Generator</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                Length:
                <input
                type="number"
                name="length"
                value={constraints.length}
                onChange={handleChange}
                />
            </label>
            </div>
            <div>
            <label>
                Include Lowercase:
                <input
                type="checkbox"
                name="includeLower"
                checked={constraints.includeLower}
                onChange={handleChange}
                />
            </label>
            </div>
            <div>
            <label>
                Include Uppercase:
                <input
                type="checkbox"
                name="includeUpper"
                checked={constraints.includeUpper}
                onChange={handleChange}
                />
            </label>
            </div>
            <div>
            <label>
                Include Numbers:
                <input
                type="checkbox"
                name="includeNumber"
                checked={constraints.includeNumber}
                onChange={handleChange}
                />
            </label>
            </div>
            <div>
            <label>
                Include Special Characters:
                <input
                type="checkbox"
                name="includeSpecial"
                checked={constraints.includeSpecial}
                onChange={handleChange}
                />
            </label>
            </div>
            <button type="submit">Generate Password</button>
        </form>
        {password && <div>Generated Password: {password}</div>}
        </div>
    );
};

export default PasswordGenerator;