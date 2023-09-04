import React from 'react'
import { useState, useEffect } from 'react';

import axios from "axios";
import Report from '../../Component/Report/Report';
import PopupShowDownCounts from '../../Component/PopupShowDownCounts/PopupShowDownCounts'

import "./OutageReport.css"

const formatDate = (dateString) => {
  return new Date(dateString);
}


const OutageReport = () => {
  const [Payload, setPayload] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [DDownCount, setDDownCount] = useState([{}]);

  const [item, setItem] = useState(() => {
    JSON.parse(localStorage.getItem('Todos')) ?? []
  });

  function UptadeDownTimefromLocalStorage(value) {
    let initialValue = item;
    let duration = 0;
    if(initialValue == {}){
      initialValue = value;
    }else
    {

      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < initialValue.length; j++) {
          z
          if (initialValue[j].id == value[i].id) {
            duration = value[j].basetime -  value[i].DownTime;
            duration =  duration / (1000 * 60);
            console.log(duration)
            initialValue[j].totalDuration += duration
            
            if (initialValue[j].DowTime != 0 && value[i].DownTime == 0) {
              
              duration = value[j].basetime -  initialValue[i].DownTime;
              duration =  duration / (1000 * 60);
              
            initialValue[j].downDuration += duration
            initialValue[j].DowTime = 0;
          }
          else if(initialValue[j].DowTime == 0 && value[i].DownTime != 0)
          {
            initialValue[j].DowTime = value[i].DowTime;
          }
          
          
          break;
          
        }
        
      }
    }
      
    }
    setItem(initialValue);


  }



  async function fetchDeviceData() {
    try {

      const response = await axios.get("/DeviceList");
      const responseStatus = await axios.get("/PingList")
      const data = response.data
      const dataStatus = responseStatus.data
      const newDevices = [];
      let i = 0;
      var DevicesandCountofDown = [];
      while (i < data.length) {
        for (let j = 0; j < dataStatus.length; j++) {
          if (dataStatus[j].pingID == data[i].pingID) {
            newDevices.push({
              id: data[i].pingID,
              name: data[i].cihazAdi,
              date: formatDate(dataStatus[i].zaman).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }),
              cihazTuru: data[i].cihazTuru,
              ip: data[i].ip,
              status: dataStatus[i].status

            });
            DevicesandCountofDown.push({
              "id": data[i].pingID, "name": data[i].cihazAdi, downDuration: 0, totalDuration: 0, basetime: formatDate(dataStatus[i].zaman), 
              DownTime: dataStatus[i].status == "Up" ? 0 : formatDate(dataStatus[i].zaman) 
            });

            break;
          }
        }

        i += 1

      }


      setPayload(newDevices);
      setIsFetched(true);
      setDDownCount(DevicesandCountofDown)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchDeviceData()
    const interval = setInterval(() => {
      fetchDeviceData()
      UptadeDownTimefromLocalStorage(DDownCount);
      console.log(item)
      setDDownCount(item)
     
      localStorage.setItem('CountofDown', JSON.stringify(item));
    }, 5000);
    return () => clearInterval(interval);
  }, [isFetched, DDownCount,item]);



  //end-start aralığında up olduğu zamanların toplamını alarak %kaç verimli çalıştığını göster.
  //eğer %50 ve daha fazla verimsiz çalışıyor ise cihaz yine tabloda göster
  return (
    <div className='OutageReport'>
      <div className="report-table-container">
        <Report Payload={Payload} isFetched={isFetched} />
      </div>
      <PopupShowDownCounts />
    </div>
  )
}

export default OutageReport
