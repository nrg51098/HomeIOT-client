import React from "react"
import "./Devices.css"
import { Link } from "react-router-dom"

export default (props) => (
    <section className="device p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="device__title">
                <Link to={`/devices/${props.device.id}`}>
                    {props.device.title}
                </Link>
            </h3>
            <small>Publication Date: {props.device.publication_date}</small>
        </div>
        <div className="d-flex flex-row justify-content-center">
            <img className="mb-5 img-fluid" src="https://via.placeholder.com/400x200" />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="">Author: {props.device.rareuser && props.device.rareuser.user.first_name} {props.device.rareuser && props.device.rareuser.user.last_name}</div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="border rounded-pill p-2"><small># Reaction Count</small></div>
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