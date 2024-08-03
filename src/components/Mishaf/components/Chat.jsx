import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab, Divider } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Define styles for the chat components
const useStyles = {
  chatSection: {
    width: '100%',
    height: '73vh',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '59vh',
    overflowY: 'auto',
  },
};

const Chat = () => {
  const classes = useStyles;
  const messageEndRef = useRef(null); // Reference to the end of the message list
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey man, What's up ?", sender: 'right', time: '09:30' },
    { id: 2, text: "Hey, I am Good! What about you ?", sender: 'left', time: '09:31' },
    { id: 3, text: "Cool. Are everything good?", sender: 'right', time: '10:30' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Scroll to the bottom of the message list whenever messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Do not send empty messages

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessageObj = { id: messages.length + 1, text: newMessage, sender: 'right', time: currentTime };
    setMessages([...messages, newMessageObj]);
    setNewMessage(''); // Clear the input field
  };

  // Handle input change in the message field
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  // Handle pressing the Enter key to send a message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">Chats</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} style={classes.chatSection}>
        <Grid item xs={4} style={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Mishaf Hasan" src="#" />
              </ListItemIcon>
              <ListItemText primary="Mishaf Hasan" />
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-search" label="Search..." variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="Mishaf Hasan">
              <ListItemIcon>
                <Avatar alt="Mishaf Hasan" src="#" />
              </ListItemIcon>
              <ListItemText primary="Mishaf Hasan" />
              <ListItemText secondary="🟢" align="right" /> {/* Online Status */}
            </ListItem>
            <ListItem button key="Christan Cone">
              <ListItemIcon>
                <Avatar alt="Christan Cone" src="#" />
              </ListItemIcon>
              <ListItemText primary="Christan Cone" />
              <ListItemText secondary="🟢" align="right" /> {/* Online Status */}
            </ListItem>
            <ListItem button key="Saralan">
              <ListItemIcon>
                <Avatar alt="Saralan" src="#" />
              </ListItemIcon>
              <ListItemText primary="Saralan" />
            </ListItem>
            <ListItem button key="Nilakshan">
              <ListItemIcon>
                <Avatar alt="Nilakshan" src="#" />
              </ListItemIcon>
              <ListItemText primary="Nilakshan" />
            </ListItem>
            <ListItem button key="Vishagan">
              <ListItemIcon>
                <Avatar alt="Vishagan" src="#" />
              </ListItemIcon>
              <ListItemText primary="Vishagan" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={8}>
          <List style={classes.messageArea}>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align={message.sender} primary={message.text} />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align={message.sender} secondary={message.time} />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <div ref={messageEndRef} /> {/* Reference to the end of the message list */}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={10}>
              <TextField
                id="outlined-basic-search"
                label="Type Something"
                fullWidth
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </Grid>
            <Grid item xs={2} align="right">
              <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;