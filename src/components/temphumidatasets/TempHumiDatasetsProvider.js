import React, { useState } from "react"

export const TempHumiDatasetsContext = React.createContext()

export const TempHumiDatasetsProvider = (props) => {
  const [tempHumiDatasets, setTempHumiDatasets] = useState([])
  

  const getTempHumiDatasetsByDeviceId = (deviceId) => {
    return fetch(`http://localhost:8000/temphumidatasets?device_id=${deviceId}`, {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTempHumiDatasets)
  }

  const createTempHumiDataset = tempHumiDataset => {
    //   to add the dataset the user has to be creator of the device and should pass the token in the headers
    return fetch("http://localhost:8000/temphumidatasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(tempHumiDataset)
    })
    //   .then(getTempHumiDatasets)
  }

  
  
  

  
  return (
    <TempHumiDatasetsContext.Provider value={{
      tempHumiDatasets, getTempHumiDatasetsByDeviceId, createTempHumiDataset,
      
    }}>
      {props.children}
    </TempHumiDatasetsContext.Provider>
  )


}