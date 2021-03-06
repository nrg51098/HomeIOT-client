import React, { useState } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUserId] = useState({})
    // const [subscriptions, setSubscriptions] = useState([])

    const getUserAdminStatus = () => {
        const body = { "token": `${localStorage.getItem("homeiot_user_id")}` }
        return fetch("http://localhost:8000/is_admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(response => setIsAdmin(response.is_user_admin))
    }

    const getCurrentUser = () => {
        const body = { "token": `${localStorage.getItem("homeiot_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(setCurrentUserId)
    }

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const partialyUpdateUser = (homeiotuserId, partialBody) => {
        return fetch(`http://localhost:8000/users/${homeiotuserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
            },
            body: JSON.stringify(partialBody)
        })
            .then(getUsers)
    }

    // const getSubscriptions = () => {
    //     return fetch("http://localhost:8000/subscriptions", {
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(setSubscriptions)
    // }

    // const subscribeToAuthor = (author_id) => {
    //     return fetch("http://localhost:8000/subscriptions", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
    //         },
    //         body: JSON.stringify({author_id: author_id})
    //     })
    //         .then(getSubscriptions)
    // }

    // const unsubscribeToAuthor = (id) => {
    //     return fetch(`http://localhost:8000/subscriptions/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
    //         },
    //         body: JSON.stringify({ended_on: true})
    //     })
    //         .then(getSubscriptions)
    // }

    return (
        <AuthContext.Provider value={{
            getUserAdminStatus, isAdmin, getUsers, users, getUserById, partialyUpdateUser, getCurrentUser
            
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}