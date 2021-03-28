import React, { useState } from "react"

export const TempThresholdContext = React.createContext()

export const TempThresholdProvider = (props) => {
  const [tempThresholds, setTempThresholds] = useState([])
  

  const getTempThresholds = () => {
    return fetch("http://localhost:8000/tempthresholds", {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTempThresholds)
  }


  const getTempThresholdsByAppuserId = (appuserId) => {
    return fetch(`http://localhost:8000/tempthresholds?appuser_id=${appuserId}`, {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTempThresholds)
  }

//   const createtempThreshold = tempthreshold => {
//     return fetch("http://localhost:8000/tempthresholds", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
//       },
//       body: JSON.stringify(tempthreshold)
//     })
//       .then(getTempThresholds)
//   }

  
  const updateTempThreshold = tempthreshold => {
    return fetch(`http://localhost:8000/tempthresholds/${tempthreshold.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(tempthreshold)
    })
      .then(getTempThresholds)
  }

//   const deletetempThreshold = id => {
//     return fetch(`http://localhost:8000/tempthresholds/${id}`, {
//       method: "DELETE",
//       headers: {
//       "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
//       }
//     })
//       .then(getTempThresholds)
//   }

//   const getTempThresholdsByCurrentUserId = () => {
//     const body = { "token": `${localStorage.getItem("homeiot_user_id")}` }
//     return fetch("http://localhost:8000/get_current_user", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
//         },
//         body: JSON.stringify(body)
//     })
//         .then(res => res.json())
//         .then(res => {


//             fetch(`http://localhost:8000/tempthresholds?user=${res.user_id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
//                 }
//             })
//                 .then(res => res.json())
//                 .then(res => settempThresholds(res))
//         })
// }

  

  
  return (
    <TempThresholdContext.Provider value={{
      tempThresholds, getTempThresholds, updateTempThreshold, getTempThresholdsByAppuserId 
      
    }}>
      {props.children}
    </TempThresholdContext.Provider>
  )


}