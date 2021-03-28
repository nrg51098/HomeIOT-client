import React, { useState } from "react"

export const ButtonDatasetsContext = React.createContext()

export const ButtonDatasetsProvider = (props) => {
  const [buttonDatasets, setButtonDatasets] = useState([])
  

  const getButtonDatasetsByDeviceId = (deviceId) => {
    return fetch(`http://localhost:8000/buttondatasets?device_id=${deviceId}`, {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setButtonDatasets)
  }

  const createButtonDataset = buttonDataset => {
    //   to add the dataset the user has to be creator of the device and should pass the token in the headers
    return fetch("http://localhost:8000/buttondatasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(buttonDataset)
    })
    //   .then(getButtonDatasets)
  }

  
  
  

  
  return (
    <ButtonDatasetsContext.Provider value={{
      buttonDatasets, getButtonDatasetsByDeviceId, createButtonDataset,
      
    }}>
      {props.children}
    </ButtonDatasetsContext.Provider>
  )


}