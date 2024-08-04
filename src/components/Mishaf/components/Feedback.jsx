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
    fetch('http://localhost/tinytoes/fetch_feedback.php')
      .then(response => response.json())
      .then(data => setFeedbackData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
    handleFilterClose();
  };

  const filteredFeedback = feedbackData.filter(item => {
    return (
      (filterRating === '' || item.rating === parseFloat(filterRating)) &&
      (searchTerm === '' || item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.comments.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          {[1, 2, 3, 4, 5].map(rating => (
            <MenuItem key={rating} value={rating} onClick={handleFilterChange}>{rating} Stars</MenuItem>
          ))}
          <MenuItem onClick={() => { setFilterRating(''); handleFilterClose(); }}><em>Clear Filter</em></MenuItem>
        </Menu>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredFeedback.map(item => (
          <Card key={item.id} className="shadow-md">
            <CardContent>
              <Typography variant="h6">{item.parent_name}</Typography>
              <Typography variant="body2">{item.comments}</Typography>
              <Typography variant="caption">{new Date(item.created_at).toLocaleDateString()}</Typography>
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