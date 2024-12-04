import send from "../../assets/send.svg";
import user from "../../assets/user-icon.png";
import gpt from "../../assets/chatgptLogo.svg";
import "./Body.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../../AuthContext.jsx";
import { FaTimes } from "react-icons/fa";
import { Context } from "../../context/Context.jsx";

const Body = ({ sidebarVisible }) => {
  const { isAuthenticated } = useAuth(); // Access authentication state
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const { chats, onSent, showResult, loading, input, setInput } =
    useContext(Context);
  const msgEnd = useRef(null);

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, loading]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowSignupPopup(true); // Show signup popup if the user is not authenticated
      return;
    }
    onSent(input); // Send the input if the user is authenticated
    setInput("");
  };

  const closePopup = () => {
    setShowSignupPopup(false); // Close the popup
  };

  return (
    <div className={sidebarVisible ? "body" : "body"}>
      {showSignupPopup && (
        <div className="dark_overlay" onClick={closePopup}></div>
      )}

      {isAuthenticated ? (
        !showResult && (
          <>
            <img src={gpt} alt="chat gpt logo" className="chatgpt_img" />
            <h2 className="help_title">What can I help with?</h2>
          </>
        )
      ) : (
        <>
          <img src={gpt} alt="chat gpt logo" className="chatgpt_img" />
          <h2 className="help_title">What can I help with?</h2>
        </>
      )}

      {showResult && (
        <div className="chats">
          {chats.map((chat, index) => (
            <div
              key={index}
              id={`chat-${chat.id}`} // Ensure each chat has a unique ID
              className={`chat ${chat.type === "ai" ? "chatgpt_answer" : ""}`}
            >
              <img
                src={chat.type === "ai" ? gpt : user}
                alt={`${chat.type} profile`}
                className="chatimg"
              />
              <p
                className={`message ${
                  chat.type === "ai" ? "gpt_answer" : "user_question"
                }`}
                dangerouslySetInnerHTML={{ __html: chat.message }}
              />
            </div>
          ))}
          <div ref={msgEnd} />
          {loading && (
            <div className="chat chatgpt_answer">
              <img src={gpt} alt="chatgpt logo" className="chatimg" />
              <p className="message gpt_answer">Loading...</p>
            </div>
          )}
        </div>
      )}

      <div className="chat_footer">
        <div className="inp">
          <input
            type="text"
            placeholder="Send message"
            onChange={(e) => setInput(e.target.value)} // Update input
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(); // Trigger handleSubmit when Enter is pressed
              }
            }}
          />
          <button className="send" onClick={handleSubmit}>
            <img src={send} alt="Send button" />
          </button>
        </div>
      </div>

      {showSignupPopup && (
        <div className="signup_popup">
          <div className="popup_content">
            <FaTimes className="popup_close_icon" onClick={closePopup} />
            <h3>You need to sign up or log in to ask a question</h3>
            <button className="popup_signup">
              <a href="/signup">Sign Up</a>
            </button>
            <button className="popup_login">
              <a href="/login">Log In</a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
