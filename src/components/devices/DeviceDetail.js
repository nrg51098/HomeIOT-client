import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"

import "./Devices.css"

export const DeviceDetails = (props) => {
    const { getDeviceById, releaseDevice } = useContext(DeviceContext)
    
    const history = useHistory();
    const deleteDeviceModal = useRef();

    const [device, setDevice] = useState({})
    

    useEffect(() => {
        const deviceId = parseInt(props.match.params.deviceId)
        getDeviceById(deviceId)
            .then(setDevice)
    }, [])
        

    return (
        <section className="device d-flex flex-row">
            <dialog className="dialog dialog--deleteDevice" ref={deleteDeviceModal}>
                <h4>Are you sure you want to delete this device?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteDevice btn btn-outline-primary" onClick={() => {
                        releaseDevice(device.id)
                            .then(history.push("/devices"))
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteDeviceModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="device_details d-flex flex-column container mr-0">
                <h3 className="device__title text-center">{device.title}</h3>
                <div className="d-flex flex-row justify-content-between">
                    <div className="device__manage__buttons">
                        <i className="fas fa-trash-alt device__hover__delete" onClick={() => {
                            deleteDeviceModal.current.showModal()
                        }}></i>
                        <i className="fas fa-cog device__hover" onClick={() => history.push(`/devices/edit/${device.id}`)}></i>
                    </div>
                    <div>
                        <small>{device.category && device.category.label}</small>
                    </div>
                </div>
                <div className="text-center">
                    <img className="mb-5 img-fluid w-100" src="https://via.placeholder.com/400x100" />
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <small >Created on {device.created_datetime} </small>
                        <small className="d-block"> By {device.appuser && device.appuser.user.first_name} {device.appuser && device.appuser.user.last_name}</small>
                    </div>              
                    
                </div>
                <div className="device__content">
                    {device.location_id}
                </div>
            </div>
            <div className="mr-auto">
                {device.tags && device.tags.map(tag => (
                    <div key={tag.id} className="d-flex align-items-center border border-primary rounded px-5 mb-3">{tag.label}</div>
                ))}
            </div>
        </section>
    )
}