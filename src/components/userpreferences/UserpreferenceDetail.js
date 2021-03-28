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
                
        <section className=" d-flex flex-row">
            
            <div className=" d-flex flex-column container "> 
                <div className="d-flex flex-row justify-content-center">
                    <div className="">
                        <i className="fas fa-cog userpreference__hover" onClick={() => history.push(`/userpreferences/user/${currentUserpreference[0].id}`)}></i>
                    </div>
                    
                </div>               
                
                <div className="text-center">
                    <img className="mb-5 rounded-circle " src="https://images.unsplash.com/photo-1614846027182-cecfee3a427b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fHNlbnNvcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                
                
                
            </div>
            
        </section>
    )
}