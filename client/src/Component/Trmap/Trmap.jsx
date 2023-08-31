import React, { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { trMill } from "@react-jvectormap/turkey";
import axios from "axios";
import Loading from "../Loading/Loading"




const Trmap = () => {


    const [Payload, setPayload] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [delayTime, setDelayTime] = useState(60000)
   



    async function fetchDeviceData() {
        try {

            const response = await axios.get("/DeviceList");
            const responseStatus = await axios.get("/PingList")
            const data = response.data;
            const dataStatus = responseStatus.data;
            let status = 1;
            const newDevices = [];
            let i = 0;
            let j = 0;
            let value;
            let value2;
            while (i < data.length) {
                if (data[i].enlem != "" && data[i].boylam != "") {
                    value = parseFloat(data[i].enlem.replace(/,/g, ''))
                    value2 = parseFloat(data[i].boylam.replace(/,/g, ''))
                    value = value / 1000000000000000;
                    value2 = value2 / 1000000000000000;
                    for (let j = 0; j < dataStatus.length; j++) {
                        if (dataStatus[j].pingID == data[i].pingID) {
                            if(dataStatus[j].status == "Up"){

                                status = 1;
                            }else{

                                status = 0;
                            }
                            break;
                        }
                    }

                    newDevices.push({
                        id: data[i].pingID,
                        name: data[i].cihazAdi,
                        latLng: [value, value2],
                        cihazTuru: data[i].cihazTuru,
                        ip:data[i].ip,
                        status: status
                    });
                    j += 1
                }
                i += 1
            }

            setPayload(newDevices);
            setIsFetched(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }


    useEffect(() => {
        fetchDeviceData()
        const interval = setInterval(() => {
            fetchDeviceData()
        }, delayTime);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [isFetched]);

    return (
        <div style={{ margin: '90px', width: "90vw", height: "56vh" }}>

            {
                isFetched ?
                    <VectorMap
                        backgroundColor="#cce7e8"
                        map={trMill}
                        normalizeFunction='polynomial'
                        hoverOpacity={0.7}
                        hoverColor={false}
                        containerStyle={{
                            width: "10px",
                            height: "90px"
                        }}
                        markers={Payload}
                        labels={{
                            markers: {
                                render: function render(index) { return Payload[index].name },
                                
                            }
                        }}


                        markersSelectable={true}
                        series={{
                            markers: [{
                                attribute: 'fill',
                                scale: ['#FF0000', '#008000'],
                                values: Payload.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),
                                min: 0,
                                max: 1,
                               
                            }],
                        }}

                        onMarkerTipShow={function markerTip(event, label, code) {
                            return label.html(`
                        <div style="background-color: white; border-radius: 6px; min-height: 55px; width: 125px; color: black !important; padding-left: 10px">
                            <p style="color: black !important;">
                                <b>${label.html()}</b>
                                <br><b> Cihaz Türü:</b> ${Payload[code]?.cihazTuru || ''}</br>
                                <b>ip:</b> ${Payload[code]?.ip || ''}
                            </p>
                        </div>
                    `);
                        }}
                    />


                    : <Loading />


            }
        </div>
    );
}

export default Trmap;
