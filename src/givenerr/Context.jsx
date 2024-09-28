import { createContext } from "react";
import PropTypes from "prop-types";  // Import PropTypes
import run from "../config/gemini";
import { useState } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  
    const[input,setInput]=useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompts,setPrevPrompts]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setloading]=useState(false);
    const[resultData,setResultData]=useState("");

   const delayPara=(index,nextWord)=>{
    setTimeout(function(){
        setResultData(prev=>prev+nextWord);
    },75*index)
   }
   
    // const run=()=>{
    //     setloading(true);
    //     setShowResult(true);
    // }
    const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
         response=await run(prompt);
         setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response= await run(input);
        }
        
       let responseArray=response.split("**");
       let newresponse = "";
       for(let i=0;i<responseArray.length;i++){
        if(i==0||i%2!=1){
            newresponse+=responseArray[i];
        }
        else{
            newresponse+="<b>"+responseArray[i]+"</b>"
        }
       }
      let newResponse2 = newresponse.split("*").join('</br>');

    //    setResultData(newResponse2);
    let newResponseArray=newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
       const nextWord=newResponseArray[i];
       delayPara(i,nextWord+" ");
    }
       setloading(false);
       setInput("");

      };
    
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    run
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

// Add prop types validation
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validate the 'children' prop
};

export default ContextProvider;
