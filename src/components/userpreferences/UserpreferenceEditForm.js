import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { UserpreferenceContext } from "./UserpreferenceProvider"


export const UserpreferenceEditForm = (props) => {

    const unit = useRef()
    const fail_notification = useRef()
    const threshold_notification = useRef()

    const { getCurrentUserpreference, currentUserpreference, updateUserpreference } = useContext(UserpreferenceContext)
    const [selectedUserpreference, setSelectedUserpreference] = useState({})

    useEffect(() => {
        getCurrentUserpreference()
    },[])       

    useEffect(() => {
        setSelectedUserpreference(currentUserpreference)
        
    },[])  

    
   

    const handleChange = (e) => {
        e.preventDefault()

        
        {
            const modifiedUserpreference = {
                "id":selectedUserpreference.id,
                "unit": unit.current.value,
                "fail_notification":fail_notification.checked,
                "threshold_notification":threshold_notification.checked,                
        }

        updateUserpreference(modifiedUserpreference)
            .then(() => props.history.push((`/userpreferences`)))            
    }
    }

    return (
        <main className="container-md vh-100">
            
            <header className="mt-5 text-center">
                <h1>HomeIOT</h1>
            </header>
            <form className="form--login" onSubmit={handleChange}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                    <div className="d-flex flex-column w-100 text-center mr-5">
                    <fieldset>
                    <div className="form-group">
                        <select ref={unit} name="unit" className="form-control w-50" value={selectedUserpreference.unit} >
                            <option value="0" disabled>Select Unit System</option>                            
                                <option key={0} value={"SI"}>Metric</option>
                                <option key={1} value={"IN"}>Imperial</option>
                            ))
                        </select>
                    </div>
                </fieldset>

                    <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        
                        <input ref={fail_notification} type="checkbox" name="fail_notification" className="form-check-input" checked={selectedUserpreference.fail_notification} value={selectedUserpreference.fail_notification}                   
                            placeholder="fail_notification">                          
                        </input>
                        <label htmlFor="fail_notification" className="form-check-label"> Fail notification</label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        
                        <input ref={threshold_notification} type="checkbox" name="threshold_notification" className="form-check-input" checked={selectedUserpreference.threshold_notification} value={selectedUserpreference.threshold_notification}                          
                            placeholder="threshold_notification">                          
                        </input>
                        <label htmlFor="threshold_notification" className="form-check-label"> Threshold notification</label>
                    </div>
                </fieldset>
                        
                        
                        
                    </div>
                    
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary w-50" type="submit">Change preferences</button>
                </div>
            </form>
        </main>
    )
}