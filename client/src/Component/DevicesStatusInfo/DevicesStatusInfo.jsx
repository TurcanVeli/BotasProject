import React from "react";

//Css
import './DevicesStatusInfo.css'



const DevicesStatusInfo = () => {

    return (


        <div className="DevicesStatusInfo-container">
            <div className="info-title">
                Status
            </div>
            <div className="statusinfo-wrapper">
                <div className="marker">
                    <div className="icon"></div>
                    <p className="status-desc">Up</p>
                </div>
                <div className="marker">
                    <div className="icon"></div>
                    <p className="status-desc">Down</p>
                </div>

            </div>
        </div>
    )

}




export default DevicesStatusInfo