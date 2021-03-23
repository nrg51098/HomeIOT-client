import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { SubscriptionContext } from "./SubscriptionProvider"

import { AuthContext } from '../auth/AuthProvider'
import "./Subscriptions.css"

export const SubscriptionTable = () => {
    const { getSubscriptions, subscriptions, deleteSubscription, updateSubscription, getSubscriptionsByCurrentUserId } = useContext(SubscriptionContext)
    
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const deleteSubscriptionModal = useRef();

    const [userId, setUserId] = useState(-1)
    const [filteredSubscriptions, setFiltered] = useState([])
    const [subscriptionToBeDeleted, setSubscriptionToBeDeleted] = useState(0)

    const getUserId = () => {
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
            .then(res => setUserId(res.user_id))
    }

    // Initialization effect hook -> Go get subscription data
    useEffect(() => {
        getSubscriptions()
        getUserId()
    }, [])
      

    const handleIsPublicUpdate = e => {
        const subscriptionId = parseInt(e.target.value)
        const partialObject = {"is_public" : e.target.checked }    
        updateSubscription(subscriptionId, partialObject)        
    }

    return (
        <div>
            <dialog className="dialog dialog--deleteSubscription" ref={deleteSubscriptionModal}>
                <h4>Are you sure you want to delete this subscription?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteSubscription btn btn-outline-primary" onClick={() => {
                        deleteSubscription(subscriptionToBeDeleted)
                            .then(history.push("/subscriptions"))
                            .then(deleteSubscriptionModal.current.close())
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteSubscriptionModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            
            <div className="subscriptions subscription__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Sensortype</th>
                            <th scope="col">Subscriptions</th>
                            {isAdmin ? (<th scope="col">Is_Active</th>) : (<></>) }
                            {isAdmin ? (<th scope="col">Is_Public</th>) : (<></>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredSubscriptions.map(subscription => (
                                <tr key={subscription.id}>
                                    {((subscription.appuser && subscription.appuser.id) == userId) || (isAdmin) ? (
                                        <td className="p-0">
                                            <div className="d-flex flex-row justify-content-around h-100 align-items-center">
                                                <Link to={`subscriptions/edit/${subscription.id}`} ><i className="fas fa-cog"></i></Link>
                                                <i className="far fa-trash-alt text-danger subscription__hover__delete"
                                                    onClick={() => {
                                                        setSubscriptionToBeDeleted(subscription.id)
                                                        deleteSubscriptionModal.current.showModal()
                                                    }}
                                                ></i>
                                            </div>
                                        </td>) : <td></td>}
                                    <td><Link to={`/subscriptions/${subscription.id}`}>{subscription.name}</Link></td>
                                    <td>{subscription.appuser && subscription.appuser.user.first_name} {subscription.appuser && subscription.appuser.user.last_name}</td>
                                    <td>{subscription.created_datetime}</td>
                                    <td>{subscription.location.label}</td>
                                    <td>{subscription.sensor_type.label}</td>
                                    <td>{subscription.tag && subscription.tag.map(tag => (
                                        <div key={tag.id}>{tag.label}</div>
                                    ))}</td>                                    
                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isPublic" checked={subscription.is_public} value={subscription.id} onChange={handleIsPublicUpdate} />
                                        </td>) : (<></>) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}