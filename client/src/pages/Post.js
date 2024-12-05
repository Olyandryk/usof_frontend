import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3234"

function Post() {
    let { postId } = useParams();
    const [postObject, setPostObject] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get(`/api/posts/${postId}`)
        .then((response) => {
            setPostObject(response.data);
        })
        .catch((error) => {
            console.error("Error fetching post:", error);
        });

        axios.get(`/api/posts/${postId}/comments`)
        .then((response) => {
            setComments(response.data.comments || []);
        })
        .catch((error) => {
            console.error('Error fetching comments:', error);
        });
    }, [postId]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if (newComment.trim()) {
            // Create a new comment object
            const comment = {
              content: newComment,
              author: 'Current User', // You can replace this with the actual user info
            };
      
            // Post the new comment to the backend
            axios.post(`/api/posts/${postId}/comments`, comment)
              .then((response) => {
                // On success, add the new comment to the state
                setComments([comment, ...comments]); // Add new comment at the top
                setNewComment(''); // Clear the input field
              })
              .catch((error) => {
                console.error('Error submitting comment:', error);
              });
          }
    };

    if(!postObject) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
          {/* Left panel for the post */}
          <Box sx={{
            flex: 1,
            p: 3,
            overflowY: 'auto',
            borderRight: '2px solid #ddd',
            height: '100vh',
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {postObject.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Author ID: {postObject.author_id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {postObject.content}
            </Typography>
          </Box>
    
          {/* Right panel for the comments */}
          <Box sx={{
            flex: 1,
            p: 3,
            overflowY: 'scroll',
            height: '100vh',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Comments
            </Typography>
    
            {/* Comment input field */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Write a comment"
                fullWidth
                multiline
                rows={2}
                value={newComment}
                onChange={handleCommentChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                Submit Comment
              </Button>
            </Box>
    
            {/* Display comments */}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Paper key={index} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {comment.author}
                  </Typography>
                  <Typography variant="body2">
                    {comment.content}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No comments yet.</Typography>
            )}
          </Box>
        </Box>
    );
}

export default Post
