import React from 'react'
import axios from "axios";
import { useEffect, useState }  from "react";
import { Typography, Box, Paper } from "@mui/material";
// import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3234"

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get("/api/posts")
      .then((response) => {
        console.log(response.data); // Log the API response for debugging
        setListOfPosts(response.data.posts || []); // Extract posts array or default to empty array
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Left menu bar */}
        <Box sx={{
            p: 2,
            // borderRight: "5px solid",
            // borderColor: "primary.main",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: 'auto',
            maxWidth: '100%'
        }}>
            <Link
                component={RouterLink}
                to={"/createPost"}
                sx={{ 
                    fontWeight: "bold", 
                    textDecoration: "none",
                    color: "black",
                    display: "block",
                    whiteSpace: "nowrap"
                }}>
                Create a post
            </Link>
            {/* <Typography>Sort</Typography>
            <Typography>Filter</Typography> */}
        </Box>
        {/* List of the posts */}
        <Box sx={{
                mb: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column', // Stack elements vertically
                justifyContent: 'flex-start',
                gap: 2
                }}>
            {/* Render posts */}
            {listOfPosts.map((post, index) => (
            <Paper elevation={3}>
                <Box key={index} className="post" onClick={() => {
                    navigate(`/posts/${post.id}`);
                }} sx={{
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
                }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                    Author ID: {post.author_id}
                    </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {post.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {post.content}
                </Typography>
                </Box>
            </Paper>

            ))}
        </Box>
    </Box>
  );
}

export default Home

