import React, { useState } from "react";
import { Box, Button, Typography, TextField, IconButton, Paper, Grid2 } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { AppProvider } from './AppContext'; // Import the AppProvider

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
        const response = await fetch("YOUR_MODEL_ENDPOINT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: msg }),
        });

        const data = await response.json();

        const newMessages = [
            ...messages,
            { type: "userMsg", text: msg },
            { type: "responseMsg", text: data.response },
        ];

        setMessages(newMessages);
        setIsResponseScreen(true);
        setMessage(""); // Clear the input field
        console.log(data.response);
    } catch (error) {
        console.error("Error generating response:", error);
    }
};

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  };

  return (
    <AppProvider>
      <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: "#0E0E0E", color: "white", display: "flex", flexDirection: "column" }}>
        {isResponseScreen ? (
          <Box sx={{ flex: 1, py: 3, px: { xs: 2, md: 12 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h4">AssistMe</Typography>
              <Button variant="contained" onClick={newChat} sx={{ bgcolor: "#181818", borderRadius: "30px" }}>
                New Chat
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              {messages.map((msg, index) => (
                <Typography key={index} sx={{ p: 2, bgcolor: msg.type === "userMsg" ? "#1e1e1e" : "#252525", borderRadius: 2, mb: 2 }}>
                  {msg.text}
                </Typography>
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <Typography variant="h3">AssistMe</Typography>
            <Grid2 container spacing={2} sx={{ mt: 3, maxWidth: 600 }}>
              {[ 
                { text: "What is coding?\nHow can we learn it?" },
                { text: "Which is the red planet of the solar system?" },
                { text: "In which year was Python invented?" },
                { text: "How can we use AI for adoption?" },
              ].map((card, index) => (
                <Grid2 item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2, bgcolor: "#181818", color: "white", borderRadius: 2, cursor: "pointer", "&:hover": { bgcolor: "#201f1f" } }}>
                    <Typography variant="body1">{card.text}</Typography>
                    <Box sx={{ textAlign: "right", mt: 1, fontSize: "1.5rem" }}>{card.icon}</Box>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        )}

        <Box sx={{ p: 3, textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#181818", borderRadius: "30px", px: 2 }}>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              variant="standard"
              Input={{ disableUnderline: true, sx: { color: "white", px: 2 } }}
              sx={{ flex: 1 }}
            />
            {message && (
              <IconButton onClick={hitRequest} sx={{ color: "green" }}>
                <SendIcon />
              </IconButton>
            )}
          </Box>
          <Typography variant="caption" color="gray" sx={{ mt: 2 }}>
            AssistMe is developed by Mo. Mahdi Farooqui. This AI uses the Gemini API for responses.
          </Typography>
        </Box>
      </Box>
    </AppProvider>
  );
};

export default App;
