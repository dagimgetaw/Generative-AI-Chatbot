import { useContext, useEffect, useRef } from "react";
import { useAuth } from "../../AuthContext.jsx";
import { Context } from "../../context/Context.jsx";
import send from "../../assets/send.svg";
import user from "../../assets/user-icon.png";
import gpt from "../../assets/chatgptLogo.svg";
import { FaTimes } from "react-icons/fa";
import "./Body.css";

// eslint-disable-next-line react/prop-types
const Body = ({ sidebarVisible }) => {
  const { isAuthenticated, showSignupPopup, setShowSignupPopup } = useAuth(); // Use auth context here
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
      setShowSignupPopup(true); // Show the popup if the user is not authenticated
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
          <div className="chat_help">
            <img src={gpt} alt="chat gpt logo" className="chatgpt_img" />
            <h2 className="help_title">What can I help with?</h2>
          </div>
        )
      ) : (
        <div className="chat_help">
          <img src={gpt} alt="chat gpt logo" className="chatgpt_img" />
          <h2 className="help_title">What can I help with?</h2>
        </div>
      )}

      {showResult && (
        <div className="chats">
          {chats.map((chat, index) => (
            <div
              key={index}
              id={`chat-${chat.id}`}
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
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
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
