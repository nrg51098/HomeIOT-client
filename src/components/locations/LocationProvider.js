import React, { useState } from "react"

export const LocationContext = React.createContext()

export const LocationProvider = (props) => {
  const [locations, setLocations] = useState([])
  const [searchLocations, setSearchLocations] = useState("")

  const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setLocations)
  }

  const createLocation = location => {
    return fetch("http://localhost:8000/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(location)
    })
      .then(getLocations)
  }

  const updateLocation = location => {
    return fetch(`http://localhost:8000/locations/${location.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(location)
    })
      .then(getLocations)
  }

  const deleteLocation = id => {
    return fetch(`http://localhost:8000/locations/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
    })
      .then(getLocations)
  }
  

  return (
    <LocationContext.Provider value={{
      locations, getLocations, createLocation, deleteLocation, updateLocation
    }}>
      {props.children}
    </LocationContext.Provider>
  )


}