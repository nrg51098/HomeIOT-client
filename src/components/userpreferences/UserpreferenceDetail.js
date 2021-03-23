import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { UserpreferenceContext } from "./UserpreferenceProvider"

import "./Userpreferences.css"

export const UserpreferenceDetail = (props) => {
    const { getUserpreferences, updateUserpreference, getCurrentUserpreference, userpreferences, currentUserpreference } = useContext(UserpreferenceContext)
    
    const history = useHistory();
    
    const [userpreference, setUserpreference] = useState({})
    
    


    useEffect(() => {
        getCurrentUserpreference()         
    }, [])

    
    return (
                
        <section className="userpreference d-flex flex-row">
            
            <div className="userpreference_details d-flex flex-column container mr-0">                
                <div className="d-flex flex-row justify-content-between">
                    <div className="userpreference__manage__buttons">
                        <i className="fas fa-cog userpreference__hover" onClick={() => history.push(`/userpreferences/user/${currentUserpreference[0].id}`)}></i>
                    </div>
                    <div>
                        <small>{userpreference.unit }</small>
                   </div>
                </div>
                <div className="text-center">
                    <img className="mb-5 img-fluid w-100" src="https://via.placeholder.com/400x100" />
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <small >Created on {userpreference.fail_notification} </small>
                        <small className="d-block"> By {userpreference.appuser && userpreference.appuser.user.first_name} {userpreference.appuser && userpreference.appuser.user.last_name}</small>
                    </div>              
                    
                </div>
                <div className="userpreference__content">
                    {userpreference.location_id}
                </div>
            </div>
            <div className="mr-auto">
                {userpreference.userpreferences && userpreference.userpreferences.map(userpreference => (
                    <div key={userpreference.id} className="d-flex align-items-center border border-primary rounded px-5 mb-3">{userpreference.label}</div>
                ))}
            </div>
        </section>
    )
}