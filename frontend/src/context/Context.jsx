import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to clear chats
  const clearChats = () => {
    setChats([]); // Reset the chat history to an empty array
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);

    // Generate a unique ID for this chat
    const chatId = Date.now();

    // Add user input to the chat history
    const userChat = { id: chatId, type: "user", message: prompt };
    setChats((prevChats) => [...prevChats, userChat]);

    // Get AI response from backend API
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      const aiResponse = data.response;

      // Process the response string (formatting)
      let responseArray = aiResponse.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let formattedResponse = newResponse.split("*").join("<br>");
      const aiChat = {
        id: Date.now() + 1,
        type: "ai",
        message: formattedResponse,
      };

      // Add AI response to the chat history
      setChats((prevChats) => [...prevChats, aiChat]);
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear the input field after sending
    }
  };

  const contextValue = {
    chats,
    onSent,
    loading,
    input,
    setInput,
    showResult,
    clearChats,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
