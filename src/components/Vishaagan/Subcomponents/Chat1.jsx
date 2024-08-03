import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab, Divider } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

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

const Chat1 = () => {
  const classes = useStyles;
  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey man, What's up ?", sender: 'right', time: '09:30' },
    { id: 2, text: "Hey, I am Good! What about you ?", sender: 'left', time: '09:31' },
    { id: 3, text: "Cool. I am good, let's catch up!", sender: 'right', time: '10:30' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessageObj = { id: messages.length + 1, text: newMessage, sender: 'right', time: currentTime };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">Parents' Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} style={classes.chatSection}>
        <Grid item xs={3} style={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="John Wick" />
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp" />
              <ListItemText secondary="online" align="right" />
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </ListItemIcon>
              <ListItemText primary="Alice" />
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
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
            <div ref={messageEndRef} />
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </Grid>
            <Grid item xs={1} align="right">
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

export default Chat1;