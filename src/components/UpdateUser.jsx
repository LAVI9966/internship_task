// src/components/UpdateUser.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { userId } = useParams();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/users/${userId}`, {
                name,
                email,
                password
            });
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError('Failed to update user');
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Update User</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>User updated successfully!</p>}
        </div>
    );
}

export default UpdateUser;