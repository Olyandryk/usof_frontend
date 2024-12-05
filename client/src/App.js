import React, { useEffect, useState } from 'react';
// import axios from "axios";
import "./App.css";
import { Box, Typography, Link } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link as RouterLink} from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Category from './pages/Category';
import Login from './pages/Login.js';
import Register from './pages/Register';

// axios.defaults.baseURL = "http://localhost:3234"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser)  {
      setUser(storedUser);
  }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <Box className="App">
      <Router>
        {/* Header */}
        <Box sx={{
            bgcolor: "primary.main",
            color: "#ffffff",
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center"
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5
            }}>
                <Typography sx={{ fontWeight: "bold" }}>Music Forum</Typography>
                <Link
                    component={RouterLink}
                    to={"/"}
                    sx={{ 
                        fontWeight: "bold", 
                        textDecoration: "none",
                        color: "white"
                    }}>
                    Posts
                </Link>
                {/* <Typography sx={{ fontWeight: "bold" }}>Categories</Typography> */}
                <Link
                    component={RouterLink}
                    to={"/categories"}
                    sx={{ 
                        fontWeight: "bold", 
                        textDecoration: "none",
                        color: "white"
                    }}>
                    Categories
                </Link>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
            {user ? (
              <>
                <Typography>{user.username}</Typography>
                <Typography>{user.role}</Typography>
                {user.avatar && <img src={user.avatar} alt="avatar" style={{ width: '30px', height: '30px' }} />}
                <Link
                  component={RouterLink}
                  to="/"
                  onClick={handleLogout}
                  sx={{ fontWeight: 'bold', color: 'white', ml: 2 }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Box>
                <Link component={RouterLink} to="/login" sx={{ color: 'white', mr: 2 }}>
                  Login
                </Link>
                <Link component={RouterLink} to="/register" sx={{ color: 'white' }}>
                  Register
                </Link>
              </Box>
            )}
          </Box>
        </Box>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path='/posts/:postId' exact element={<Post />}></Route>
          <Route path="/login" exact element={<Login setUser={setUser} />} />
          <Route path="/register" exact element={<Register setUser={setUser} />} />
          <Route path="/categories" exact element={<Category />} />

        </Routes>
      </Router>
    </Box>
  );
}

export default App;
