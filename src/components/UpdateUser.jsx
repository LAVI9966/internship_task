import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function UpdateUser() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [updateData, setUpdateData] = useState({ name: '', email: '', password: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);

    const { token, setUser, user } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!token) {
                    console.error("No token available!");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/users/singleuser`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setFormData(response.data);
                    setUser(response.data);
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to load user data');
            }
        };

        fetchUserData();
    }, [refresh]);

    // Handle input change for updating profile
    const handleProfileChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    };

    // Handle input change for updating password
    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // Handle profile update submission
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/updateuser',
                { user, formForSending: updateData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                alert("User Updated Successfully");
                setRefresh(!refresh);
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Enter Right Password ");
        }
    };

    // Handle password update submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("passwordData", passwordData);
            const response = await axios.post(
                'http://localhost:5000/api/users/updatepassword',
                { userId: user._id, ...passwordData },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                alert("Password updated successfully");
                setPasswordData({ oldPassword: '', newPassword: '' });
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Error updating password");
        }
    };

    return (
        <div className="update-user-container">
            {/* Section 1: User Details */}
            <div className="user-details">
                <h2>Your Details</h2>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Role:</strong> {formData.role}</p>
            </div>

            {/* Section 2: Update Profile */}
            <div className="update-profile">
                <h2>Update Profile</h2>
                <form onSubmit={handleProfileSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="New Name"
                        value={updateData.name}
                        onChange={handleProfileChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="New Email"
                        value={updateData.email}
                        onChange={handleProfileChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Current Password"
                        value={updateData.password}
                        onChange={handleProfileChange}
                        required
                    />
                    <button type="submit">Update Profile</button>
                </form>
            </div>

            {/* Section 3: Update Password */}
            <div className="update-password">
                <h2>Update Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Current Password"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
