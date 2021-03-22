import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import { User } from "../users/User"
import "./Users.css"

export const UserTable = (props) => {
    const { currentUser, getCurrentUser, isAdmin, getUsers, users, partialyUpdateUser } = useContext(AuthContext)
    
   

    const [sortedUsers, setSortedUsers] = useState([])   
    const deleteUserModal = useRef(); 
    const tempPopupModal = useRef();
    const changeUserTypeModal = useRef();
    const history = useHistory();

    const [selectedUser, setSelectedUser] = useState(0)
    const [checkboxStatus, setCheckboxStatus] = useState(true)
    const [adminRadioStatus, setAdminRadioStatus] = useState(false)
    

    useEffect(() => {
        getUsers()
        getCurrentUser()
           
    }, [])

    useEffect(() => {
        const tempSortedUsers = users.sort((a, b) => (a.user.username.toLowerCase() < b.user.username.toLowerCase()) ? -1 : 1)
        setSortedUsers(tempSortedUsers)       
    }, [users])    

    
    

    const handleUserType = e => {
        const appuserId = selectedUser
        const selectedRareuser = users.find((appuser)=> appuser.id === appuserId)
        const userId = selectedRareuser.user.id
        const partialObject = {"user" : {"is_staff" : adminRadioStatus, "id": userId} }   
        partialyUpdateUser(appuserId, partialObject)
            .then(history.push("/users"))
            .then(changeUserTypeModal.current.close())              
    }

    const showDeactivated = e => {
        const deactivatedUsers = users.filter((appuser) => (appuser.user.is_active !== true))
        if(deactivatedUsers.length === 0){
            tempPopupModal.current.showModal()
        } 
        setSortedUsers(deactivatedUsers)                     
    }
    const showAll = e => {
        getUsers()
            .then(history.push("/users"))                     
    }

    const handleIsActive = e => {
        const appuserId = selectedUser
        const selectedRareuser = users.find((appuser)=> appuser.id === appuserId)
        const userId = selectedRareuser.user.id
        const partialObject = {"user" : {"is_active" : checkboxStatus, "id": userId} }   
        partialyUpdateUser(appuserId, partialObject)
            .then(history.push("/users"))
            .then(deleteUserModal.current.close())
    }

  

    return (
        <div>
            <dialog className="dialog dialog--deleteUser" ref={deleteUserModal}>
                { checkboxStatus ?
                <h4>Are you sure you want to reactivate this user?</h4>:
                <h4>Are you sure you want to deactivate this user?</h4>
                }                
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteUser btn btn-outline-primary" onClick={handleIsActive}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteUserModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <dialog className="dialog " ref={changeUserTypeModal}>
                { adminRadioStatus ?
                <h4>Are you sure you want to promote this user to admin?</h4>:
                <h4>Are you sure you want to demote this user to author?</h4>                
                }                
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="btn btn-outline-primary" onClick={handleUserType}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => changeUserTypeModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <dialog className="dialog" ref={tempPopupModal}>                
                <h4>There are no deactivated users to show</h4>                               
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="btn btn-outline-primary" onClick={e => tempPopupModal.current.close()}>Ok</button>
                </div>
            </dialog>
            <div className="d-flex justify-content-center mt-5">
            <h1>Users</h1>
            </div>
            <div className="mx-3 px-3">
            <button className="btn btn-outline-primary mr-3" onClick={showDeactivated}>Show deactivated</button>
            <button className="btn btn-outline-primary" onClick={showAll}>Show all</button>
            </div>  

            <div className="users user__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                   
                    <tbody>
                        {
                            sortedUsers.map(appuser => (                                
                                <User key={appuser.id} appuser={appuser} deleteUserModal={deleteUserModal} 
                                changeUserTypeModal={changeUserTypeModal} setSelectedUser={setSelectedUser} 
                                setCheckboxStatus={setCheckboxStatus} setAdminRadioStatus={setAdminRadioStatus} />                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}