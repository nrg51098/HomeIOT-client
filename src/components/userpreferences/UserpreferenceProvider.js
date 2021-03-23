import React, { useState } from "react"

export const UserpreferenceContext = React.createContext()

export const UserpreferenceProvider = (props) => {
  const [userpreferences, setUserpreferences] = useState([]) 
  const [currentUserpreference, setCurrentUserpreference] = useState([]) 
  

  const getUserpreferences = () => {
    return fetch("http://localhost:8000/userpreferences", {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setUserpreferences)
  }

  const getCurrentUserpreference = () => {
    const body = { "token": `${localStorage.getItem("homeiot_user_id")}` }
    return fetch("http://localhost:8000/get_current_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => {
            fetch(`http://localhost:8000/userpreferences?user=${res.user_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
                }
            })
                .then(res => res.json())
                .then(setCurrentUserpreference)
        })
  }

//   const createUserpreference = userpreference => {
//     return fetch("http://localhost:8000/userpreferences", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
//       },
//       body: JSON.stringify(userpreference)
//     })
//       .then(getUserpreferences)
//   }

  

  const updateUserpreference = userpreference => {
    return fetch(`http://localhost:8000/userpreferences/${userpreference.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(userpreference)
    })
      .then(getUserpreferences)
  } 

  
  return (
    <UserpreferenceContext.Provider value={{
      getUserpreferences, updateUserpreference, getCurrentUserpreference, userpreferences, currentUserpreference
    }}>
      {props.children}
    </UserpreferenceContext.Provider>
  )


}