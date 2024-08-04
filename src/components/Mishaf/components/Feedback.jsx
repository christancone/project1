import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Typography, IconButton, Menu, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import 'tailwindcss/tailwind.css';

// Sample feedback data
const feedbackData = [
  { id: 1, parent: 'John Doe', feedback: 'Great school!', rating: 5 },
  { id: 2, parent: 'Jane Smith', feedback: 'Needs improvement in sports.', rating: 3 },
  { id: 3, parent: 'Alice Johnson', feedback: 'Excellent teachers.', rating: 5 },
  { id: 4, parent: 'Robert Brown', feedback: 'More extracurricular activities needed.', rating: 2 },
  { id: 5, parent: 'Emily Davis', feedback: 'Very supportive staff.', rating: 4 },
  { id: 6, parent: 'Michael Wilson', feedback: 'Better cafeteria food.', rating: 2 },
  { id: 7, parent: 'Sarah Miller', feedback: 'Great learning environment.', rating: 5 },
  { id: 8, parent: 'David Anderson', feedback: 'More focus on arts.', rating: 3 },
  { id: 9, parent: 'Laura Thomas', feedback: 'Wonderful community.', rating: 4 },
  { id: 10, parent: 'James Jackson', feedback: 'Improve the playground.', rating: 2 },
  { id: 11, parent: 'Linda White', feedback: 'Fantastic curriculum.', rating: 5 },
  { id: 12, parent: 'Daniel Harris', feedback: 'More parent-teacher meetings.', rating: 3 },
  { id: 13, parent: 'Barbara Martin', feedback: 'Great school spirit.', rating: 5 },
  { id: 14, parent: 'Paul Thompson', feedback: 'Better communication needed.', rating: 2 },
  { id: 15, parent: 'Nancy Garcia', feedback: 'Excellent facilities.', rating: 5 },
  { id: 16, parent: 'Mark Martinez', feedback: 'More field trips.', rating: 3 },
  { id: 17, parent: 'Susan Robinson', feedback: 'Very inclusive environment.', rating: 5 },
  { id: 18, parent: 'Steven Clark', feedback: 'Improve the library.', rating: 2 },
  { id: 19, parent: 'Karen Rodriguez', feedback: 'Great support for students.', rating: 4 },
  { id: 20, parent: 'Charles Lewis', feedback: 'More sports activities.', rating: 3 },
  { id: 21, parent: 'Patricia Lee', feedback: 'Wonderful teachers.', rating: 5 },
  { id: 22, parent: 'Christopher Walker', feedback: 'Better parking facilities.', rating: 2 }
];

const Feedback = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for filter rating
  const [filterRating, setFilterRating] = useState('');
  // State for anchor element of the filter menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle filter button click
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing of filter menu
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
    handleFilterClose();
  };

  // Filter feedback based on search term and rating
  const filteredFeedback = feedbackData.filter(item => {
    return (
      (filterRating === '' || item.rating === parseInt(filterRating)) &&
      (searchTerm === '' || item.parent.toLowerCase().includes(searchTerm.toLowerCase()) || item.feedback.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="p-4">
      <Container className='text-4xl mb-5'>Reviews</Container>
      <div className="flex justify-between mb-4">
        {/* Search input field */}
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4"
        />
        {/* Filter button */}
        <IconButton onClick={handleFilterClick}>
          <FilterAltIcon />
        </IconButton>
        {/* Filter menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem value="" onClick={handleFilterChange}><em>None</em></MenuItem>
          <MenuItem value="1" onClick={handleFilterChange}>1 Star</MenuItem>
          <MenuItem value="2" onClick={handleFilterChange}>2 Stars</MenuItem>
          <MenuItem value="3" onClick={handleFilterChange}>3 Stars</MenuItem>
          <MenuItem value="4" onClick={handleFilterChange}>4 Stars</MenuItem>
          <MenuItem value="5" onClick={handleFilterChange}>5 Stars</MenuItem>
        </Menu>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* Display filtered feedback */}
        {filteredFeedback.map(item => (
          <Card key={item.id} className="shadow-md">
            <CardContent>
              <Typography variant="h6">{item.parent}</Typography>
              <Typography variant="body2">{item.feedback}</Typography>
              <div>
                {/* Display star icons based on rating */}
                {[...Array(item.rating)].map((_, index) => (
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