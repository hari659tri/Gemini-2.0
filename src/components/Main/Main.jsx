import './Main.css'
import { assets } from '../../assets/assets';
import { Context } from '../../givenerr/Context';
import { useContext } from 'react'
const Main = () => {
    const {onSent,recentPrompt, showResult, loading, resultData,setInput,input}=useContext(Context);
  return (
    <div className='main'>
    <div className="nav">
        <p>Gemini@2.0</p>
        <img src={assets.user_icon} alt="user_icon" />
    </div> 
    <div className="main-container">
        {!showResult
          ?<>
          <div className="greet">
          <p><span>Hello,Harikesh.</span></p>
          <p>How can I help you today?</p>
      </div>
      <div className="cards">
        
      <div className="card">
         <p>Suggest beautiful places to see on an upcoming road trip</p>
         <img src={assets.compass_icon} alt="compass_icon" />
      </div>
     
      <div className="card">
         <p>How to start full stack Web devlopment as Candidate Master</p>
         <img src={assets.bulb_icon} alt="compass_icon" />
      </div>

      <div className="card">
         <p>How to Start Machine Learning Provide road map to enchanced my skill set</p>
         <img src={assets.message_icon} alt="compass_icon" />
      </div>
   
      <div className="card">
         <p>Find the bug or logical error in the provided code</p>
         <img src={assets.code_icon} alt="compass_icon" />
      </div>

     </div>
     </>:<div className='result'>
      
        <div className="result-title">
            <img src={assets.user_icon} alt="icon"/>
            <p>{recentPrompt}</p>
        </div>
         <div className="result-data">
            <img src= {assets.gemini_icon} alt="icon" />
            {loading?<div className='loader'>
                <hr />
                <hr />
                <hr />
            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            
         </div>
     </div>
        }
       
        
        <div className="main-bottom">
            <div className="search-box">
             <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
             <div>
                <img src={assets.gallery_icon} alt="icon" />

                <img src= {assets.mic_icon} alt="icon" />

               {input?<img onClick={()=>onSent()} src= {assets.send_icon} alt="icon" />:null} 
             </div>

            </div>
            <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.Your privacy and Gemini Apps
            </p>
        </div>
    </div>
    </div>
  )
}

export default Main
