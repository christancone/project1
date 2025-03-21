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
                handleError("Failed to fetch user data.");
            }
        };
        fetchLoggedUserId();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (loggedUserId !== null) {
                try {
                    const usersResponse = await axios.get("http://localhost/backend/Christan/fetchForParents.php", { withCredentials: true });
                    const usersData = usersResponse.data;

                    const unreadCountsResponse = await axios.get("http://localhost/backend/Christan/fetch_unread_counts.php", { withCredentials: true });
                    const unreadCountsData = unreadCountsResponse.data;

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
                    setOpenSnackbar(true);
                } else {
                    handleError("Failed to send message.");
                }
            } catch (error) {
                handleError("Error sending message.");
            }
        }
    };

    const handleError = (errorMessage) => {
        console.error(errorMessage);
        setError(errorMessage);
        setOpenSnackbar(true);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = users.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()));
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

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

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Box
            sx={{
                position: "relative",
                top: "15vh", // Moves the component 30% down the page
                left: 0, // Align to the left
                width: "75vw", // 80% of the screen width
                marginLeft: "22vw", // Center the component by pushing it 10vw from the left (since it's 80vw wide)
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Paper elevation={3} sx={{ maxHeight: "400px", overflowY: "auto", marginTop: 2 }}>
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
                    <Pagination
                        count={Math.ceil(filteredUsers.length / usersPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ marginTop: 2 }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        {selectedUser ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Chat with {selectedUser.username}
                                </Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <Box sx={{ maxHeight: "300px", overflowY: "auto", marginBottom: 2 }}>
                                    {messages.map((message, index) => (
                                        <Box key={index} sx={{ marginBottom: 2 }}>
                                            <Typography
                                                align={message.sender_id === loggedUserId ? "right" : "left"}
                                                color={message.sender_id === loggedUserId ? "primary" : "textSecondary"}
                                            >
                                                {message.message}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Type a message"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button variant="contained" color="primary" onClick={sendMessage}>
                                    Send
                                </Button>
                            </>
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                Select a user to start chatting.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"}>
                    {error || "Message sent successfully!"}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Chat;
