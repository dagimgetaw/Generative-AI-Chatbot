import { FaCog, FaPhone, FaEnvelope, FaChevronRight } from "react-icons/fa";
import "./Sidebar.css";

const chat_history = [
  { id: 1, title: "something something" },
  { id: 2, title: "something something" },
  { id: 3, title: "something something" },
  { id: 4, title: "something something" },
  { id: 5, title: "something something" },
  { id: 6, title: "something something" },
  { id: 7, title: "something something" },
  { id: 8, title: "something something" },
  { id: 9, title: "something something" },
  { id: 10, title: "something something" },
  { id: 11, title: "something something" },
  { id: 12, title: "something something" },
];

// eslint-disable-next-line react/prop-types
const Side = ({ color }) => {
  return (
    <div>
      <aside
        className={color ? "side_menu dark_theme" : "side_menu light_theme"}
      >
        <div className="new_chat">
          <button>
            <a href="#">New Chat</a>
          </button>
        </div>
        <div className="chat_history_title">
          <h2>
            <span>Chat History</span>
          </h2>
        </div>
        <div className="chat_history_list">
          <ul>
            {chat_history.map((item) => (
              <li key={item.id}>
                <FaChevronRight className="right_arrow" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom_links">
          <FaCog className="icon" />
          <FaPhone className="icon" />
          <FaEnvelope className="icon" />
        </div>
      </aside>
    </div>
  );
};

export default Side;
