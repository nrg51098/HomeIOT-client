import React, { useState } from "react"

export const SensortypeContext = React.createContext()

export const SensortypeProvider = (props) => {
  const [sensortypes, setSensortypes] = useState([])
  const [searchSensortypes, setSearchSensortypes] = useState("")

  const getSensortypes = () => {
    return fetch("http://localhost:8000/sensortypes", {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setSensortypes)
  }

  const createSensortype = sensortype => {
    return fetch("http://localhost:8000/sensortypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(sensortype)
    })
      .then(getSensortypes)
  }

  
  const updateSensortype = sensortype => {
    return fetch(`http://localhost:8000/sensortypes/${sensortype.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(sensortype)
    })
      .then(getSensortypes)
  }

  const deleteSensortype = id => {
    return fetch(`http://localhost:8000/sensortypes/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
    })
      .then(getSensortypes)
  }

  return (
    <SensortypeContext.Provider value={{
      sensortypes, getSensortypes, createSensortype, deleteSensortype, updateSensortype
    }}>
      {props.children}
    </SensortypeContext.Provider>
  )


}