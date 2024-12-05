import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function CreateCategory() {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setError("Title is required.");
            return;
        }

        try {
            // Send a POST request to create a new category
            const response = await axios.post(
                'http://localhost:3234/api/categories',
                { title },
                { withCredentials: true } // Ensure cookies are sent with the request
            );

            // On success, reset the form and show a success message
            setSuccessMessage("Category created successfully!");
            setTitle('');
            setError('');
        } catch (err) {
            console.error("Error creating category:", err);
            setError("Failed to create category. Please try again.");
        }
    };

    return (
        <div>
            <Typography variant="h4">Create a New Category</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" type="submit">
                    Create Category
                </Button>
            </form>

            {error && <Typography color="error">{error}</Typography>}
            {successMessage && <Typography color="primary">{successMessage}</Typography>}
        </div>
    );
}

export default CreateCategory;
