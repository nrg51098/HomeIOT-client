import React, { useState, useContext, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"
import { AuthContext } from '../auth/AuthProvider'
import Device from "./Device"
import "./Devices.css"

export const DeviceList = (props) => {
    const { getDevices, devices, searchTerms, getDevicesByUserId, getDevicesByCurrentUserId, releaseDevice } = useContext(DeviceContext)
    const { getUserById } = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState({})

    const history = useHistory()
    const deleteDeviceModal = useRef()

    const [filteredDevices, setFiltered] = useState([])
    const [deleteDeviceId, setDeleteDeviceId] = useState(0)

    const deleteADevice = (id) => {
        releaseDevice(deleteDeviceId)
            .then(setDeleteDeviceId())
            .then(deleteDeviceModal.current.close())
    }

    // Initialization effect hook -> Go get device data
    useEffect(() => {
        if (props.location && props.location.pathname === '/user/devices') {
            getDevicesByCurrentUserId()
        } else {
            // get all devices
            getDevices()
        }
    }, [])

    useEffect(() => {
        devices.sort((a, b) => (a.created_datetime > b.created_datetime) ? -1 : 1)
        const matchingDevices = devices.filter(device => device.name.toLowerCase().includes(searchTerms.toLowerCase()))
        const validDevices = matchingDevices.filter((device) => (Date.parse(device.created_datetime) < Date.now()) )
        setFiltered(validDevices)
    }, [searchTerms])

    useEffect(() => {
        devices.sort((a, b) => (a.created_datetime > b.created_datetime) ? -1 : 1)
        const validDevices = devices.filter((device) => (Date.parse(device.created_datetime) < Date.now()) )
        setFiltered(validDevices)
    }, [devices])

    useEffect(() => {
        const userId = props.match && parseInt(props.match.params.userId)
        if(userId){
            getUserById(userId)
                .then(setUserProfile)
            }
    }, [])


    return (
        <div>
            <div className="d-flex flex-row justify-content-end">
                <button className="d-flex flex-row justify-content-center align-items-center device__add btn btn-primary mr-5"
                    onClick={() => history.push("/devices/create")}
                >
                    Add Device
                    <i className="fas fa-plus ml-4 mr-2"></i>
                </button>
            </div>
            <dialog className="dialog dialog--deleteDevice" ref={deleteDeviceModal}>
                <h4>Are you sure you want to delete this device?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteDevice btn btn-outline-primary" onClick={deleteADevice}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteDeviceModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="devices device__list mt-5 mx-5 px-3">
                <h2>{
                    props.location && props.location.pathname.includes('/user/devices')
                    && userProfile.user && `${userProfile.user.first_name} ${userProfile.user.last_name}'s Devices`
                }</h2>
                {
                    filteredDevices.map(device => <Device key={device.id} device={device} setDeleteDeviceId={setDeleteDeviceId} deleteDeviceModal={deleteDeviceModal} />)
                }
            </div>
        </div>
    )
}