import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import "./OutageReport.css"



const OutageReport = () => {
  const [Devices, setDevices] = useState([]);
  const [isFetchedapi, setIsFetchedapi] = useState(false);

  async function fetchDeviceData() {
    try {

      const response = await axios.get("/DeviceList");
      const responseStatus = await axios.get("/PingList")
      const data = response.data
      const dataStatus = responseStatus.data
      const newDevices = [];
      let i = 0;
      let j = 0;
      let value;
      let value2;
      //Düzelt
      while (i < data.length) {
          value = parseFloat(data[i].enlem.replace(/,/g, ''))
          value2 = parseFloat(data[i].boylam.replace(/,/g, ''))
          value = value / 1000000000000000;
          value2 = value2 / 1000000000000000;
          for (let j = 0; j < dataStatus.length; j++) {
            if (dataStatus[j].pingID == data[i].pingID) {
              newDevices.push({
                id: data[i].pingID,
                name: data[i].cihazAdi,
                date: data[i].zaman,
                cihazTuru: data[i].cihazTuru,
                ip: data[i].ip,
                status: data[i].status
              });
              break;
            }
          }
          
          j += 1
        }
        i += 1
      

      setDevices(newDevices);
      setIsFetchedapi(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchDeviceData()
    const interval = setInterval(() => {
      fetchDeviceData()

      console.log(Devices)
    }, 50000);
    //Clearing the interval
    return () => clearInterval(interval);
  }, [isFetchedapi]);



  return (
    <div className='OutageReport'>
      en çok kesinti yapan 10 cihaz
      containerın içinde cihazların tarihleri ile up down durumu.
      Down olduğunda containerın kırmızıza dönmesi
    </div>
  )
}

export default OutageReport
