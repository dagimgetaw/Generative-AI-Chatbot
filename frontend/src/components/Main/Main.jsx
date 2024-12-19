import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Header.jsx";
import Body from "../Body/Body.jsx";
import "./Main.css";

const Main = () => {
  const [color, setColor] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  return (
    <div className={`app ${color ? "dark_theme" : "light_theme"}`}>
      <div className={sidebarVisible ? "full_width" : "half_width"}>
        <Sidebar
          color={color}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <Header
          color={color}
          setColor={setColor}
          sidebarVisible={sidebarVisible}
        />
        <Body color={color} sidebarVisible={sidebarVisible} />
      </div>
    </div>
  );
};

export default Main;
