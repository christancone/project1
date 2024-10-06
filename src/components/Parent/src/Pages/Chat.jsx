import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    List,
    ListItem,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Grid,
    Pagination,
} from "@mui/material";

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLoggedUserId = async () => {
            try {
                const response = await axios.get("http://localhost/backend/Christan/get_session_datas.php", { withCredentials: true });
                const userId = response.data.data.id;
                setLoggedUserId(userId);
            } catch (error) {
                setError("Failed to fetch user data. Please try again later.");
                setOpenSnackbar(true);
            }
        };

        fetchLoggedUserId();
    }, []);

    useEffect(() => {
        if (loggedUserId !== null) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get("http://localhost/backend/Christan/get_users.php");
                    const filteredUsers = response.data.filter(user => user.id !== loggedUserId);
                    setUsers(filteredUsers);
                    setFilteredUsers(filteredUsers); // Initialize filtered users
                } catch (error) {
                    setError("Failed to fetch users. Please try again later.");
                    setOpenSnackbar(true);
                }
            };

            fetchUsers();
        }
    }, [loggedUserId]);

    useEffect(() => {
        if (selectedUser && loggedUserId !== null) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.post("http://localhost/backend/Christan/get_messages.php", {
                        sender_id: loggedUserId,
                        receiver_id: selectedUser.id
                    });
                    if (Array.isArray(response.data)) {
                        setMessages(response.data);
                    } else {
                        setMessages([]);
                    }
                } catch (error) {
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
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (messageInput.trim() && selectedUser) {
            try {
                const formData = new FormData();
                formData.append('sender_id', loggedUserId);
                formData.append('receiver_id', selectedUser.id);
                formData.append('message', messageInput);

                const response = await axios.post("http://localhost/backend/Christan/send_message.php", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.status === "success") {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            sender_id: loggedUserId,
                            receiver_id: selectedUser.id,
                            message: messageInput,
                            timestamp: new Date().toISOString(),
                        },
                    ]);
                    setMessageInput("");
                } else {
                    setError("Failed to send message. Please try again later.");
                    setOpenSnackbar(true);
                }
            } catch (error) {
                setError("Error sending message. Please try again later.");
                setOpenSnackbar(true);
            }
        } else {
            setError("Message cannot be empty and no user selected.");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to first page when search changes
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'flex-end', width: '100%', marginTop: 20 }}>
            <Grid container sx={{ width: '80%' }}>
                <Grid item xs={12} md={4} sx={{ bgcolor: 'background.paper', p: 2, borderRight: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Select a User to Chat
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search Users"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <List sx={{ bgcolor: 'background.default', borderRadius: 2, p: 1 }}>
                        {currentUsers.map(user => (
                            <ListItem
                                key={user.id}
                                sx={{
                                    bgcolor: selectedUser?.id === user.id ? 'primary.main' : 'background.default',
                                    color: selectedUser?.id === user.id ? 'white' : 'text.primary',
                                    mb: 1,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                                }}
                                onClick={() => setSelectedUser(user)}
                            >
                                {user.username}
                            </ListItem>
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(filteredUsers.length / usersPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}
                    />
                </Grid>

                <Grid item xs={12} md={8} sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                    {selectedUser ? (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Chat with {selectedUser.username}
                            </Typography>
                            <Box sx={{
                                flexGrow: 1,
                                bgcolor: 'background.default',
                                p: 2,
                                borderRadius: 2,
                                overflowY: 'auto',
                                maxHeight: '60vh',
                                border: 1,
                                borderColor: 'divider',
                                mb: 2,
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
                                                bgcolor: msg.sender_id === loggedUserId ? 'primary.main' : 'grey.300',
                                                color: 'text.primary',
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
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={messageInput}
                                    onKeyPress={handleKeyPress}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message"
                                />
                                <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
                                    Send
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography>Select a user to start chatting.</Typography>
                    )}
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Chat;
