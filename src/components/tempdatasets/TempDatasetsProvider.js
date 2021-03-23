import React, { useState } from "react"

export const TempDatasetsContext = React.createContext()

export const TempDatasetsProvider = (props) => {
  const [tempDatasets, setTempDatasets] = useState([])
  

  const getTempDatasetsByDeviceId = (deviceId) => {
    return fetch(`http://localhost:8000/tempdatasets?device_id=${deviceId}`, {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTempDatasets)
  }

  const createTempDataset = tempDataset => {
    //   to add the dataset the user has to be creator of the device and should pass the token in the headers
    return fetch("http://localhost:8000/tempdatasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(tempDataset)
    })
    //   .then(getTempDatasets)
  }

  
  
  

  
  return (
    <TempDatasetsContext.Provider value={{
      tempDatasets, getTempDatasetsByDeviceId, createTempDataset,
      
    }}>
      {props.children}
    </TempDatasetsContext.Provider>
  )


}