import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
  const [subscriptions, setSubscriptions] = useState([])
  

  const getSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions", {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setSubscriptions)
  }

  const createSubscription = subscription => {
    return fetch("http://localhost:8000/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(subscription)
    })
      .then(getSubscriptions)
  }

  
  const updateSubscription = subscription => {
    return fetch(`http://localhost:8000/subscriptions/${subscription.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(subscription)
    })
      .then(getSubscriptions)
  }

  const deleteSubscription = id => {
    return fetch(`http://localhost:8000/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
    })
      .then(getSubscriptions)
  }

  const getSubscriptionsByCurrentUserId = () => {
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
            fetch(`http://localhost:8000/subscriptions?user=${res.appuser_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
                }
            })
                .then(res => res.json())
                .then(res => setSubscriptions(res.subscriptions))
        })
}

  

  
  return (
    <SubscriptionContext.Provider value={{
      subscriptions, getSubscriptions, createSubscription, deleteSubscription, updateSubscription, getSubscriptionsByCurrentUserId,
      
    }}>
      {props.children}
    </SubscriptionContext.Provider>
  )


}