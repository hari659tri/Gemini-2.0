import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const Sidebar = () => {
  const [extended, setextended] = useState(0);
  const{onSent,prevPrompts,setRecentPrompt}=useContext(Context);


  
  const loadPrompt=async (prompt)=>{
      setRecentPrompt(prompt);
    await onSent(prompt);
  }
  return (

    <div className="sidebar">
  <div className="top">
    <img onClick={()=>setextended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="menu_icon" />
    <div  className="new-chat">
      <img src={assets.plus_icon} alt="plus_icon" />
      {extended ? <p>New Chat</p> : null}
    </div>
    {extended ? (
      <div className="recent">
        <p className="recent-title">Recent</p>
        {prevPrompts.map((item, index) => {
           return (
            
            <div onClick={()=>loadPrompt(item)}className="recent-entry" key={index}>
              <img src={assets.message_icon} alt="message_icon" />
        
              <p>{item.slice(0,19)} ...</p>
            </div>
           );
        })}
        
      </div>
    ) : null}
  </div>

  <div className="bottom">
    <div className="bottom-item recent-entry">
      <img src={assets.question_icon} alt="question_icon" />
     {extended? <p>Help</p>:null}
    </div>

    <div className="bottom-item recent-entry">
      <img src={assets.history_icon} alt="question_icon"/>
      {extended?<p>Activity</p>:null}
    </div>

    <div className="bottom-item recent-entry">
      <img src={assets.setting_icon} alt="question_icon"/>
      {extended?<p>Settings</p>:null}
    </div>
  </div>

</div>

  );
};

export default Sidebar;
