import React from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
//Css
import './Report.css'

//Tüm cihazların isimleri ve zaman status dönecek




const Report = ({ Payload, isFetched }) => {



    return (


        <div className="report-container">
        
            {
                isFetched ?

                    <table className="table-fill">

                        <thead>
                            <tr>

                                <th>ID</th>
                                <th>DEVICES NAME</th>
                                <th>DEVICES TYPE</th>
                                <th>DATE</th>
                                <th>STATUS</th>


                            </tr>
                        </thead>

                        <tbody className="table-hover">
                            {Payload.map((val, key) => {
                                return (
                                    <tr  key={key}>
                                        <td className="text-left">{val.id}</td>
                                        <td className="text-left">{val.name}</td>
                                        <td className="text-left">{val.cihazTuru}</td>
                                        <td className="text-left">{val.date}</td>
                                        <td className="text-left" style={val.status == "Down" ?  {backgroundColor: "#EB212E",color:"white" } : {}}>{val.status}</td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table>

                    : <Loading />
            }


        </div>
    )

}




export default Report