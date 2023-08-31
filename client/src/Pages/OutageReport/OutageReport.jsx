import React from 'react'
import { useState, useEffect } from 'react';

import axios from "axios";
import Report from '../../Component/Report/Report';


import "./OutageReport.css"

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const OutageReport = () => {
  const [Payload, setPayload] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  async function fetchDeviceData() {
    try {

      const response = await axios.get("/DeviceList");
      const responseStatus = await axios.get("/PingList")
      const data = response.data
      const dataStatus = responseStatus.data
      const newDevices = [];
      let i = 0;
      let time;
      while (i < data.length) {
        // This would be the timestamp you want to format

        for (let j = 0; j < dataStatus.length; j++) {
          if (dataStatus[j].pingID == data[i].pingID) {
            newDevices.push({
              id: data[i].pingID,
              name: data[i].cihazAdi,
              date: formatDate(dataStatus[i].zaman),
              cihazTuru: data[i].cihazTuru,
              ip: data[i].ip,
              status: dataStatus[i].status
            });
            break;
          }
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

      console.log(Payload)
    }, 5000);
    return () => clearInterval(interval);
  }, [isFetched]);



  //end-start aralığında up olduğu zamanların toplamını alarak %kaç verimli çalıştığını göster.
 //eğer %50 ve daha fazla verimsiz çalışıyor ise cihaz yine tabloda göster
  return (
    <div className='OutageReport'>
      <div className="report-table-container">
        <Report Payload={Payload} isFetched={isFetched}/>
      </div>


      
    

    </div>
  )
}

export default OutageReport
