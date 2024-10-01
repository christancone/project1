import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextFieldOutlined from './TextFieldOutlined';
import CheckboxList from './CheckboxList.jsx';
import IconLabelButtons from './IconLabelButtons.jsx';

function Nap() {
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [checked, setChecked] = useState([]);
  const [children, setChildren] = useState([]);
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState(null); // State for submission error

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('http://localhost/backend/Christan/fetch_children_list.php');
        if (response.data.status === 'success') {
          setChildren(response.data.children); // Set the array of children
        } else {
          setError('Error fetching child data: ' + response.data.message);
        }
      } catch (error) {
        setError('Error fetching child data.');
        console.error('Fetch error:', error);
      }
    };

    fetchChildren();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Function to format time in HH:mm:ss
  const formatTime = (time) => {
    return time ? new Date(time).toTimeString().split(' ')[0] : null;
  };

  const handleSubmit = async () => {
    const dataToSend = {
      fromTime: formatTime(fromTime), // Send only time in HH:mm:ss format
      toTime: formatTime(toTime), // Send only time in HH:mm:ss format
      notes,
      children: checked,
    };

    console.log('Data to be sent:', JSON.stringify(dataToSend, null, 2));

    try {
      const response = await axios.post('http://localhost/backend/Christan/process_nap.php', dataToSend);
      if (response.data.status === 'success') {
        console.log('Data submitted successfully');
        setSubmissionError(null); // Clear any previous submission errors
      } else {
        throw new Error(response.data.message || 'Unknown error occurred'); // Throw an error if response is not success
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmissionError('Submission error: ' + (error.response?.data?.message || error.message)); // Update submission error state
    }
  };

  return (
      <div style={{ backgroundColor: '#f4f6f8', height: '100%' }}>
        <TextFieldOutlined
            fromTime={fromTime}
            toTime={toTime}
            notes={notes}
            handleFromTimeChange={setFromTime}
            handleToTimeChange={setToTime}
            handleNotesChange={setNotes}
        />
        <CheckboxList
            checked={checked}
            handleToggle={handleToggle}
            children={children}
            error={error}
        />
        {submissionError && <div style={{ color: 'red' }}>{submissionError}</div>} {/* Display submission error */}
        <IconLabelButtons onClick={handleSubmit} />
      </div>
  );
}

export default Nap;
