// import React, { useState, useEffect } from 'react';
// import { Box, Button, Typography, List, ListItem, ListItemText, TextField, Snackbar, Alert } from '@mui/material';
// import axios from 'axios';

// function Category() {
//     const [categories, setCategories] = useState([]);
//     const [newCategoryTitle, setNewCategoryTitle] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);

//     // Fetch all categories when the component mounts
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3234/api/categories', {
//                     withCredentials: true,
//                 });
//                 setCategories(response.data.categories);
//             } catch (err) {
//                 console.error('Error fetching categories:', err);
//                 setError('Failed to fetch categories.');
//             }
//         };
//         fetchCategories();
//     }, []);

//     // Handle the submission of a new category
//     const handleCreateCategory = async (e) => {
//         e.preventDefault();

//         if (!newCategoryTitle) {
//             setError('Title is required.');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:3234/api/categories',
//                 { title: newCategoryTitle },
//                 { withCredentials: true }
//             );

//             setCategories([...categories, { id: response.data.id, title: newCategoryTitle }]);
//             setNewCategoryTitle('');
//             setError('');
//             setSuccessMessage('Category created successfully!');
//             setOpenSnackbar(true);
//         } catch (err) {
//             console.error('Error creating category:', err);
//             setError('Failed to create category. Please try again.');
//         }
//     };

//     return (
//         <Box sx={{ padding: 3 }}>
//             <Typography variant="h4" sx={{ marginBottom: 2 }}>
//                 Categories
//             </Typography>

//             {/* Display error or success messages */}
//             {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
//             {successMessage && <Typography color="primary" sx={{ marginBottom: 2 }}>{successMessage}</Typography>}

//             {/* Form to create a new category */}
//             <Box component="form" onSubmit={handleCreateCategory} sx={{ marginBottom: 3 }}>
//                 <TextField
//                     label="New Category Title"
//                     fullWidth
//                     value={newCategoryTitle}
//                     onChange={(e) => setNewCategoryTitle(e.target.value)}
//                     sx={{ marginBottom: 2 }}
//                 />
//                 <Button type="submit" variant="contained" color="primary">
//                     Create Category
//                 </Button>
//             </Box>

//             {/* List of categories */}
//             <Typography variant="h6" sx={{ marginBottom: 2 }}>
//                 All Categories
//             </Typography>
//             <List>
//                 {categories.length === 0 ? (
//                     <Typography>No categories available.</Typography>
//                 ) : (
//                     categories.map((category) => (
//                         <ListItem key={category.id}>
//                             <ListItemText primary={category.title} />
//                         </ListItem>
//                     ))
//                 )}
//             </List>

//             {/* Snackbar for success message */}
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={4000}
//                 onClose={() => setOpenSnackbar(false)}
//             >
//                 <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
//                     Category created successfully!
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// }

// export default Category;



import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, TextField, Snackbar, Alert, Card, CardContent } from '@mui/material';
import axios from 'axios';

function Category() {
    const [categories, setCategories] = useState([]);
    const [newCategoryTitle, setNewCategoryTitle] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fetch all categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3234/api/categories', {
                    withCredentials: true,
                });
                setCategories(response.data.categories);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    // Handle the submission of a new category
    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!newCategoryTitle) {
            setError('Title is required.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3234/api/categories',
                { title: newCategoryTitle },
                { withCredentials: true }
            );

            setCategories([...categories, { id: response.data.id, title: newCategoryTitle }]);
            setNewCategoryTitle('');
            setError('');
            setSuccessMessage('Category created successfully!');
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error creating category:', err);
            setError('Failed to create category. Please try again.');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Categories
            </Typography>

            {/* Display error or success messages */}
            {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="primary" sx={{ marginBottom: 2 }}>{successMessage}</Typography>}

            {/* Form to create a new category */}
            <Box component="form" onSubmit={handleCreateCategory} sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="New Category Title"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" size="small">
                    Create Category
                </Button>
            </Box>

            {/* List of categories */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                All Categories
            </Typography>
            <List>
                {categories.length === 0 ? (
                    <Typography>No categories available.</Typography>
                ) : (
                    categories.map((category) => (
                        <ListItem key={category.id}>
                            <Card sx={{ width: '100%', marginBottom: 2 }}>
                                <CardContent>
                                    <ListItemText primary={category.title} />
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))
                )}
            </List>

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Category created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Category;
