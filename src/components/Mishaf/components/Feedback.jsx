import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Menu, MenuItem, Card, CardContent, Typography, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch('http://localhost/backend/mishaf/fetch_feedback.php')
      .then(response => response.json())
      .then(data => setFeedbackData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  const filteredFeedback = feedbackData.filter(item => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    const matchesSearchTerm = item.parent_name?.toLowerCase().includes(lowercasedSearchTerm) || 
                              item.comments?.toLowerCase().includes(lowercasedSearchTerm);

    const matchesRating = filterRating === '' || item.rating === parseFloat(filterRating);

    return matchesRating && matchesSearchTerm;
  });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRatingFilter = (rating) => {
    setFilterRating(rating);
    handleClose(); // Close the menu after selection
  };

  return (
    <div className="p-4">
      <Container className='text-4xl mb-5'>Reviews</Container>
      <div className="flex justify-between mb-4">
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4"
        />
        <IconButton onClick={handleFilterClick}>
          <FilterAltIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleRatingFilter(1)}>1 Star</MenuItem>
          <MenuItem onClick={() => handleRatingFilter(2)}>2 Stars</MenuItem>
          <MenuItem onClick={() => handleRatingFilter(3)}>3 Stars</MenuItem>
          <MenuItem onClick={() => handleRatingFilter(4)}>4 Stars</MenuItem>
          <MenuItem onClick={() => handleRatingFilter(5)}>5 Stars</MenuItem>
          <MenuItem onClick={() => handleRatingFilter('')}>All Ratings</MenuItem> {/* Option to clear filter */}
        </Menu>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredFeedback.map(item => (
          <Card key={item.id} className="shadow-md">
            <CardContent>
              <Typography variant="h6">{item.parent_name}</Typography>
              <Typography variant="body2">{item.comments}</Typography>
              <Typography variant="caption">
                {new Date(item.created_at).toLocaleString()}  {/* Displays both date and time */}
              </Typography>
              <div>
                {[...Array(Math.round(item.rating))].map((_, index) => (
                  <StarIcon key={index} color="primary" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feedback;