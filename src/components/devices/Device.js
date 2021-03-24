import React from "react"
import "./Devices.css"
import { Link } from "react-router-dom"

export default (props) => (
    <section className="device p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="device__name">
                <Link to={`/devices/${props.device.id}`}>
                    {props.device.name}
                </Link>
            </h3>
            <small>Create DateTime: {props.device.created_datetime}</small>
        </div>
        <div className="d-flex flex-row justify-content-center">
            {/* <img className="mb-5 img-fluid" src="https://via.placeholder.com/400x200" /> */}
            <img className="mb-5 img-fluid" src="https://images.unsplash.com/photo-1614846027182-cecfee3a427b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fHNlbnNvcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="">Author: {props.device.appuser && props.device.appuser.user.first_name} {props.device.appuser && props.device.appuser.user.last_name}</div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                
                <Link to={`/devices/edit/${props.device.id}`}>
                    <div className="deviceicon"><i className="fas fa-cog fa-2x"></i></div>
                </Link>
                <div className="deviceicon"><i className="far fa-trash-alt fa-2x device__hover__delete" id={props.device.id} onClick={e => {
                    props.setDeleteDeviceId(props.device.id)
                    props.deleteDeviceModal.current.showModal()
                }}></i></div>
            </div>
        </div>
    </section>
)