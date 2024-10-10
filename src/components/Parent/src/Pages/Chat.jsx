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
    Badge,
} from "@mui/material";

const Chat = () => {
    const [users, setUsers] = useState([]); // Store all users
    const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users based on search
    const [messages, setMessages] = useState([]); // Store messages for the selected user
    const [selectedUser, setSelectedUser] = useState(null); // Store the currently selected user
    const [messageInput, setMessageInput] = useState(""); // Input for new messages
    const [error, setError] = useState(""); // Error message state
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [loggedUserId, setLoggedUserId] = useState(null); // Store the logged-in user's ID
    const [currentPage, setCurrentPage] = useState(1); // Current pagination page
    const [usersPerPage] = useState(7); // Users per page for pagination
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering users

    // Fetch logged user ID from session
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

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            if (loggedUserId !== null) {
                try {
                    const response = await axios.get("http://localhost/backend/Christan/fetchForAttendants.php", { withCredentials: true });
                    const allUsers = response.data;
                    setUsers(allUsers);
                    setFilteredUsers(allUsers);
                } catch (error) {
                    setError("Failed to fetch users. Please try again later.");
                    setOpenSnackbar(true);
                }
            }
        };

        fetchUsers();
    }, [loggedUserId]);

    // Fetch messages when a user is selected
    useEffect(() => {
        if (selectedUser && loggedUserId !== null) {
            const fetchMessages = async () => {
                if (loggedUserId == null || selectedUser == null) {
                    console.error("User IDs are not set");
                    return;
                }

                try {
                    const response = await axios.post("http://localhost/backend/Christan/get_messages.php", {
                        sender_id: loggedUserId,
                        receiver_id: selectedUser.id,
                    }, { withCredentials: true });

                    setMessages(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                    setError("Failed to fetch messages. Please try again later.");
                    setOpenSnackbar(true);
                }
            };

            fetchMessages();
        }
    }, [selectedUser, loggedUserId]);

    // Polling for new messages every 5 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            if (selectedUser) {
                try {
                    const response = await axios.post("http://localhost/backend/Christan/get_messages.php", {
                        sender_id: loggedUserId,
                        receiver_id: selectedUser.id,
                    }, { withCredentials: true });
                    setMessages(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error("Error fetching messages during polling:", error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedUser, loggedUserId]);

    // Send a message to the selected user
    const sendMessage = async () => {
        if (messageInput.trim() && selectedUser) {
            try {
                const formData = new FormData();
                formData.append("sender_id", loggedUserId);
                formData.append("receiver_id", selectedUser.id);
                formData.append("message", messageInput);

                const response = await axios.post("http://localhost/backend/Christan/send_messages.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
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
                    setError("Message sent successfully!"); // Add success feedback
                    setOpenSnackbar(true);
                } else {
                    setError("Failed to send message. Please try again later.");
                    setOpenSnackbar(true);
                }
            } catch (error) {
                console.error("Error sending message:", error);
                setError("Error sending message. Please try again later.");
                setOpenSnackbar(true);
            }
        }
    };

    // Handle user search
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = users.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()));
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Handle pagination
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Handle user selection
    const handleUserClick = (user) => {
        setSelectedUser(user);

        // Reset unread count on user selection
        if (user.unread_count > 0) {
            const updatedUser = { ...user, unread_count: 0 }; // Set unread count to 0
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
            );

            // Log the API call
            console.log("Marking messages as read for user:", user.id, "loggedUserId:", loggedUserId);

            // Update the backend to mark messages as read
            axios.post("http://localhost/backend/Christan/mark_messages_as_read.php", {
                sender_id: user.id,
                receiver_id: loggedUserId,
                withCredentials: true,
            }, { withCredentials: true })
                .then(response => {
                    console.log("Response from mark_messages_as_read:", response.data);
                })
                .catch(error => {
                    console.error("Error calling mark_messages_as_read:", error);
                    setError("Failed to mark messages as read. Please try again later.");
                    setOpenSnackbar(true);
                });
        }
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <List>
                        {currentUsers.map((user) => (
                            <ListItem
                                button
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                selected={selectedUser?.id === user.id}
                            >
                                <Badge
                                    color="error"
                                    badgeContent={user.unread_count}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    {user.username}
                                </Badge>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(filteredUsers.length / usersPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedUser ? (
                        <>
                            <Typography variant="h6">
                                Chatting with {selectedUser.username}
                            </Typography>
                            <Box
                                sx={{
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                {messages.map((msg, index) => (
                                    <Typography
                                        key={index}
                                        align={msg.sender_id === loggedUserId ? "right" : "left"}
                                    >
                                        {msg.message}
                                    </Typography>
                                ))}
                            </Box>
                            <TextField
                                label="Type a message"
                                variant="outlined"
                                fullWidth
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={sendMessage}>
                                Send
                            </Button>
                        </>
                    ) : (
                        <Typography>Select a user to start chatting</Typography>
                    )}
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Chat;
