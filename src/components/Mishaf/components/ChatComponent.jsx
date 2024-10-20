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
    Paper,
    Divider,
} from "@mui/material";

const ChatComponent = () => {
    // State variables for managing users, messages, and UI state
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

    // Fetch the logged-in user's ID on component mount
    useEffect(() => {
        const fetchLoggedUserId = async () => {
            try {
                const response = await axios.get("http://localhost/backend/Christan/get_session_datas.php", { withCredentials: true });
                const userId = response.data.data.id;
                setLoggedUserId(userId);
            } catch (error) {
                handleError("Failed to fetch user data.");
            }
        };
        fetchLoggedUserId();
    }, []);

    // Fetch users and their unread message counts when the logged-in user ID is available
    useEffect(() => {
        const fetchUsers = async () => {
            if (loggedUserId !== null) {
                try {
                    const usersResponse = await axios.get("http://localhost/backend/Christan/get_admins.php", { withCredentials: true });
                    const usersData = usersResponse.data;
                    console.log(usersData);

                    const unreadCountsResponse = await axios.get("http://localhost/backend/Christan/fetch_unread_counts.php", { withCredentials: true });
                    const unreadCountsData = unreadCountsResponse.data;

                    // Combine user data with unread message counts
                    const combinedUsers = usersData.map(user => {
                        const unreadCountData = unreadCountsData.find(unread => unread.id === user.id);
                        return {
                            ...user,
                            unread_count: unreadCountData ? unreadCountData.unread_count : 0,
                        };
                    });

                    setUsers(combinedUsers);
                    setFilteredUsers(combinedUsers);
                } catch (error) {
                    handleError("Failed to fetch users.");
                }
            }
        };
        fetchUsers();
    }, [loggedUserId]);

    // Fetch messages for the selected user
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser && loggedUserId !== null) {
                try {
                    const response = await axios.post("http://localhost/backend/Christan/get_messages.php", {
                        sender_id: loggedUserId,
                        receiver_id: selectedUser.id,
                    }, { withCredentials: true });
                    setMessages(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    handleError("Failed to fetch messages.");
                }
            }
        };
        fetchMessages();
    }, [selectedUser, loggedUserId]);

    // Poll for new messages and unread counts every 5 seconds
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

            if (loggedUserId) {
                try {
                    const unreadCountsResponse = await axios.get("http://localhost/backend/Christan/fetch_unread_counts.php", { withCredentials: true });
                    const unreadCountsData = unreadCountsResponse.data;

                    // Update users with new unread counts
                    const updatedUsers = users.map(user => {
                        const unreadCountData = unreadCountsData.find(unread => unread.id === user.id);
                        return {
                            ...user,
                            unread_count: unreadCountData ? unreadCountData.unread_count : 0,
                        };
                    });

                    setUsers(updatedUsers);
                    setFilteredUsers(updatedUsers);
                } catch (error) {
                    console.error("Error fetching unread counts:", error);
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedUser, loggedUserId, users]);

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
                    // Update messages with the new message
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
                    setOpenSnackbar(true);
                } else {
                    handleError("Failed to send message.");
                }
            } catch (error) {
                handleError("Error sending message.");
            }
        }
    };

    // Handle errors by displaying a snackbar with the error message
    const handleError = (errorMessage) => {
        console.error(errorMessage);
        setError(errorMessage);
        setOpenSnackbar(true);
    };

    // Filter users based on the search term
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = users.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()));
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    // Handle pagination page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Handle user selection and mark messages as read
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setMessages([]); // Clear messages initially

        const senderId = loggedUserId; // This should be the logged-in user ID
        const receiverId = user.id; // The user that is clicked on

        const payload = {
            sender_id: senderId,
            receiver_id: receiverId,
        };

        // Mark messages as read in the backend
        axios.post("http://localhost/backend/Christan/mark_messages_as_read.php", JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json" // Set Content-Type to application/json
            },
            withCredentials: true // Config option
        })
            .then(response => {
                console.log("Response from mark_messages_as_read:", response.data);
                // Remove the unread count badge
                const updatedUsers = users.map(u => {
                    if (u.id === user.id) {
                        return { ...u, unread_count: 0 }; // Set unread count to 0
                    }
                    return u;
                });
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            })
            .catch(error => {
                console.error("Error calling mark_messages_as_read:", error);
                setError("Failed to mark messages as read. Please try again later.");
                setOpenSnackbar(true);
            });
    };

    // Send message on Enter key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    // Calculate the indices for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* User list section */}
                <Grid item xs={12} md={4}>
                    {/* Search bar for filtering users */}
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* Display list of users with unread message count */}
                    <Paper elevation={3} sx={{ maxHeight: "400px", overflowY: "auto", marginTop: 2 }}>
                        <List>
                            {currentUsers.map((user) => (
                                <ListItem
                                    button
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}
                                    selected={selectedUser?.id === user.id}
                                >
                                    {/* Badge to show unread message count */}
                                    <Badge
                                        color="error"
                                        badgeContent={user.unread_count > 0 ? user.unread_count : null}
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
                    </Paper>
                    {/* Pagination for user list */}
                    <Pagination
                        count={Math.ceil(filteredUsers.length / usersPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ marginTop: 2 }}
                    />
                </Grid>

                {/* Chat section for the selected user */}
                <Grid item xs={12} md={8}>
                    {selectedUser && (
                        <>
                            {/* Display selected user's name */}
                            <Typography variant="h5">{selectedUser.username}</Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            {/* Message display area */}
                            <Box
                                sx={{
                                    maxHeight: "400px",
                                    minHeight: "400px", // Set a minimum height to increase the default height
                                    overflowY: "auto",
                                    padding: 2,
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                {messages.map((msg, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.sender_id === loggedUserId ? 'flex-end' : 'flex-start',
                                            marginBottom: 1,
                                        }}
                                    >
                                        {/* Display individual message */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                backgroundColor: msg.sender_id === loggedUserId ? "#d1f0d1" : "#f0f0f0",
                                                borderRadius: "8px",
                                                padding: 1,
                                                maxWidth: '75%',
                                            }}
                                        >
                                            {msg.message}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            {/* Input field for typing a new message */}
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress} // Send message on Enter key press
                                sx={{ marginTop: 2 }}
                            />
                            {/* Button to send the message */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={sendMessage}
                                sx={{ marginTop: 1 }}
                            >
                                Send
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatComponent;