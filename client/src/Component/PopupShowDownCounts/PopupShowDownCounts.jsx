import React from "react";
import { useEffect, useState } from "react";




const PopupShowDownCounts=() =>{

    const [item, setItem] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("CountofDown");
        const initialValue = JSON.parse(saved);
        return initialValue || ""});



    useEffect(() => {

        const interval = setInterval(() => {
    
          
        },5000);
        return () => clearInterval(interval);
      }, [item]);
    

    return <div>
        top 10 downBoard
    </div>

}

export default PopupShowDownCounts;