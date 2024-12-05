// 

import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, Chip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3234";

function CreatePost() {
    const [formData, setFormData] = useState({ title: "", content: "", categories: [] });
    const [previewMode, setPreviewMode] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data.categories);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
    };

    const handleCategoryToggle = (categoryId) => {
        setFormData((prevState) => {
            const selectedCategories = prevState.categories.includes(categoryId)
                ? prevState.categories.filter((id) => id !== categoryId)
                : [...prevState.categories, categoryId];
            return { ...prevState, categories: selectedCategories };
        });
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError("Title is required.");
            return false;
        }
        if (!formData.content.trim()) {
            setError("Content is required.");
            return false;
        }
        if (formData.categories.length === 0) {
            setError("At least one category must be selected.");
            return false;
        }
        return true;
    };

    const handlePreview = () => {
        if (validateForm()) {
            setPreviewMode(true);
        }
    };

    const handleEdit = () => {
        setPreviewMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        // Get the token from the cookies
        const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
        if (!token) {
            setError("You must be logged in to create a post.");
            return;
        }
    
        try {
            const response = await axios.post(
                "/api/posts", // Ensure this is the correct route for creating posts
                formData, // Your post data (title, content, etc.)
                {
                    withCredentials: true // Send cookies (including token) with the request
                }
            );
            console.log("Post created successfully:", response.data);
            setFormData({ title: "", content: "", categories: [] });
            setPreviewMode(false);
            navigate("/"); // Redirect to home or another page after successful post creation
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create the post. Please try again.");
        }
    };
    

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
            {!previewMode ? (
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Create a Post
                    </Typography>
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Content"
                        name="content"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.content}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Select Categories
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
                        {categories.map((category) => (
                            <Chip
                                key={category.id}
                                label={category.title}
                                color={formData.categories.includes(category.id) ? "primary" : "default"}
                                onClick={() => handleCategoryToggle(category.id)}
                                clickable
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handlePreview}>
                            Preview
                        </Button>
                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </Box>
                </form>
            ) : (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                        {formData.title || "No Title"}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", marginBottom: 2 }}>
                        {formData.content || "No Content"}
                    </Typography>
                    <Typography variant="h6">Categories:</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {formData.categories.map((categoryId) => {
                            const category = categories.find((cat) => cat.id === categoryId);
                            return <Chip key={categoryId} label={category?.title || "Unknown"} />;
                        })}
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Paper>
            )}
            {error && <Typography color="error" sx={{ my: 2 }}>{error}</Typography>}
        </Box>
    );
}

export default CreatePost;

