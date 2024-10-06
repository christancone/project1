import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, List, ListItem, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { purple } from "@mui/material/colors";

const ChatComponent = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const loggedUserId = 1; // Replace with dynamic user ID if available

    useEffect(() => {
        // Fetch users
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost/Christan/get_users.php");
                const filteredUsers = response.data.filter(user => user.id !== loggedUserId);
                setUsers(filteredUsers);
            } catch (error) {
                setError("Failed to fetch users. Please try again later.");
                setOpenSnackbar(true);
                console.log(filteredUsers);
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [loggedUserId]);
    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.post("http://localhost/Christan/get_messages.php", {
                        sender_id: loggedUserId,
                        receiver_id: selectedUser.id
                    });
                    if (Array.isArray(response.data)) {
                        setMessages(response.data);
                    } else {
                        setMessages([]);
                    }
                } catch (error) {
                    console.error("Error fetching messages:", error.response?.data || error.message);
                    setError("Failed to fetch messages. Please try again later.");
                    setOpenSnackbar(true);
                    setMessages([]);
                }
            };

            fetchMessages();
        }
    }, [selectedUser, loggedUserId]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents default behavior (such as form submission)
            sendMessage(); // Call the sendMessage function when Enter is pressed
        }
    };


    const sendMessage = async () => {
        if (messageInput.trim() && selectedUser) {
            try {
                // Use FormData to send the POST request
                const formData = new FormData();
                formData.append('sender_id', loggedUserId);
                formData.append('receiver_id', selectedUser.id);
                formData.append('message', messageInput);

                const response = await axios.post("http://localhost/Christan/send_message.php", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for sending form data
                    },
                });

                // Check if the message was successfully sent
                if (response.data.status === "success") {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            sender_id: loggedUserId,
                            receiver_id: selectedUser.id,
                            message: messageInput,
                            timestamp: new Date().toISOString(), // Adding current timestamp
                        },
                    ]);
                    setMessageInput(""); // Clear the input field
                } else {
                    setError("Failed to send message. Please try again later.");
                    setOpenSnackbar(true);
                }
            } catch (error) {
                // Handle network or server errors
                setError("Error sending message. Please try again later.");
                setOpenSnackbar(true);
                console.error("Error sending message:", error);
            }
        } else {
            // Handle case when message is empty or no user is selected
            setError("Message cannot be empty and no user selected.");
            setOpenSnackbar(true);
        }
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: purple[50] }}>
            <Box sx={{ width: '30%', bgcolor: purple[100], p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: purple[900] }}>
                    Select a User to Chat
                </Typography>
                <List sx={{ bgcolor: purple[200], borderRadius: 2, p: 1 }}>
                    {users.map(user => (
                        <ListItem
                            key={user.id}
                            sx={{
                                bgcolor: selectedUser?.id === user.id ? purple[400] : purple[300],
                                color: selectedUser?.id === user.id ? purple[50] : purple[900],
                                mb: 1,
                                borderRadius: 1,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: purple[400], color: purple[50] }
                            }}
                            onClick={() => setSelectedUser(user)}
                        >
                            {user.username}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ width: '70%', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: purple[50] }}>
                {selectedUser ? (
                    <>
                        <Typography variant="h6" sx={{ color: purple[900], mb: 2 }}>
                            Chat with {selectedUser.username}
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            bgcolor: purple[100],
                            p: 2,
                            borderRadius: 2,
                            overflowY: 'auto',
                            maxHeight: '60vh',
                        }}>
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.sender_id === loggedUserId ? 'flex-end' : 'flex-start',
                                            mb: 1
                                        }}
                                    >
                                        <Box sx={{
                                            bgcolor: msg.sender_id === loggedUserId ? purple[400] : purple[300],
                                            color: purple[50],
                                            p: 1,
                                            borderRadius: 2,
                                            maxWidth: '70%',
                                            wordBreak: 'break-word'
                                        }}>
                                            {msg.message}
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No messages yet.</Typography>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={messageInput}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ ml: 2 }}
                                onClick={sendMessage}
                            >
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography>Select a user to start chatting.</Typography>
                )}
            </Box>

            {/* Snackbar for error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChatComponent;
