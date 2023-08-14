import React, { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { trMill } from "@react-jvectormap/turkey";
import axios from "axios";
import Loading from "../Loading/Loading"



const Trmap = () => {

    //const [count, setCount] = useState(0);
    const [Devices, setDevices] = useState([]);
    const [DevicesInfos, setDevicesInfos] = useState({});
    const [isFetchedapi, setIsFetchedapi] = useState(false);

    
    async function fetchUserData() {
        try {
            
            const response = await axios.get("/DeviceList");
            const data = response.data;

            //setCount(2);

            const newDevices = [];
            const newDevicesInfos = {};
            let i = 0;
            let j = 0;
            let value;
            let value2;
            while(i < data.length){
                if (data[i].enlem != "" && data[i].boylam != "") {
                 
                    value = parseFloat(data[i].enlem.replace(/,/g, ''))
                    value2 = parseFloat(data[i].boylam.replace(/,/g, ''))
                    value = value / 1000000000000000; 
                    value2 = value2 / 1000000000000000;
                    newDevices.push({
                        name: data[i].cihazAdi,
                        latLng: [value, value2]
                    });

                    newDevicesInfos[j] = {
                        cihazTuru: data[i].cihazTuru,
                        ip: data[i].ip
                    };
                    j+=1
                }
                i+=1
            }
            setDevices(newDevices);
            setDevicesInfos(newDevicesInfos);
            setIsFetchedapi(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }


    useEffect(() => {     
        fetchUserData() 
       console.log(DevicesInfos)
       console.log(Devices)

    }, [isFetchedapi]);

    return (
        <div style={{ margin: '30px', width: "50wh", height: "50vh" }}>
            
            {
                isFetchedapi ?
                <VectorMap
                backgroundColor="#3fOac"
                map={trMill}
                containerStyle={{
                    width: "100%",
                    height: "50%"
                }}
                markers={Devices}
                markerStyle={{
                    initial: {
                        fill: "red",
                    },
                }}
                markersSelectable={true}
                series={{
                    markers: [],
                }}
                onMarkerTipShow={function markerTip(event, label, code) {
                    return label.html(`
                        <div style="background-color: white; border-radius: 6px; min-height: 55px; width: 125px; color: black !important; padding-left: 10px">
                            <p style="color: black !important;">
                                <b>${label.html()}</b>
                                <br><b> Cihaz Türü:</b> ${DevicesInfos[code]?.cihazTuru || ''}</br>
                                <b>ip:</b> ${DevicesInfos[code]?.ip || ''}
                            </p>
                        </div>
                    `);
                }}
            />


                :<Loading/>

                
            }
                    </div>
    );
}

export default Trmap;
