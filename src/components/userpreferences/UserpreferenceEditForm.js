import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { UserpreferenceContext } from "./UserpreferenceProvider"


export const UserpreferenceEditForm = (props) => {

    const unit = useRef()
    const fail_notification = useRef()
    const threshold_notification = useRef()

    
    const { getCurrentUserpreference, currentUserpreference, updateUserpreference } = useContext(UserpreferenceContext)
    const [selectedUserpreferences, setSelectedUserpreference] = useState({})

    useEffect(() => {
        getCurrentUserpreference()
               
    },[])   

    useEffect(() => {
        setSelectedUserpreference(currentUserpreference[0]) 
        console.log(currentUserpreference)              
    },[currentUserpreference]) 

    const handleControlledInputChange = (event) => {
        const newSelectedUserpreferences = Object.assign({}, selectedUserpreferences)  
        
        newSelectedUserpreferences[event.target.name] = event.target.value
            setSelectedUserpreference(newSelectedUserpreferences)
    }
    
    const handleCheckboxChange = (event) => {
        
        const newSelectedUserpreferences = Object.assign({}, selectedUserpreferences)          // Create copy
        newSelectedUserpreferences[event.target.name] = event.target.checked    // Modify copy
        setSelectedUserpreference(newSelectedUserpreferences)                                 // Set copy as new state
    }

    const handleChange = (e) => {
        e.preventDefault()

           console.log(selectedUserpreferences)
        
            const modifiedUserpreference = {
                "id":selectedUserpreferences.id,
                "unit": unit.current.value,
                "fail_notification":fail_notification.current.checked,
                "threshold_notification":threshold_notification.current.checked,                
        }

        console.log(modifiedUserpreference)

        updateUserpreference(modifiedUserpreference)
            .then(() => props.history.push((`/userpreferences`)))            
    
    }

    return (
        <main className="container-md vh-100">
            
            <header className="mt-5 text-center">
                <h1>HomeIOT</h1>
            </header>
            <form className="form--login" onSubmit={handleChange}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                    <div className="d-flex flex-column text-center mr-5">
                            <fieldset>
                            <div className="form-group">
                                <select ref={unit} name="unit" className="form-control" value={selectedUserpreferences && selectedUserpreferences.unit ? selectedUserpreferences.unit : "" } onChange={handleControlledInputChange} >
                                    <option value="0" disabled>Select Unit System</option>                            
                                        <option key={0} value={"SI"}>Metric</option>
                                        <option key={1} value={"IN"}>Imperial</option>
                                    ))
                                </select>
                            </div>
                            </fieldset>

                            <fieldset>
                            <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                                
                                <input ref={fail_notification} type="checkbox" name="fail_notification" className="form-check-input" checked={selectedUserpreferences && selectedUserpreferences.fail_notification ? selectedUserpreferences.fail_notification : "" } onChange={handleCheckboxChange}                    
                                    placeholder="fail_notification">                          
                                </input>
                                <label htmlFor="fail_notification" className="form-check-label"> Fail notification</label>
                            </div>
                            </fieldset>
                            <fieldset>
                            <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                                
                                <input ref={threshold_notification} type="checkbox" name="threshold_notification" className="form-check-input" checked={selectedUserpreferences && selectedUserpreferences.threshold_notification ? selectedUserpreferences.threshold_notification : ""}  onChange={handleCheckboxChange}                      
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