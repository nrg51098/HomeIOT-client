import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"

import "./Devices.css"

export const DeviceDetails = (props) => {
    const { getDeviceById, releaseDevice } = useContext(DeviceContext)
    
    const history = useHistory();
    const deleteDeviceModal = useRef();

    const [device, setDevice] = useState({})

    const [reactionCounts, setReactionCounts] = useState([])
    const [showReactionSelector, setShowReactionSelector] = useState(false)
    const [currentUserDeviceReactions, setCurrentUserDeviceReactions] = useState([])

    useEffect(() => {
        const deviceId = parseInt(props.match.params.deviceId)
        getDeviceById(deviceId)
            .then(setDevice)
    }, [])

    

    const getReactionCounts = (reactionsArray) => {
        var reactionCountsArray = [];
        var reactionCounts = {}

        // Initialize the reactionCounts array with the reaction and its respective count
        reactionsArray.forEach(reaction => {
            reactionCounts[reaction.reaction.id] = { ...reaction.reaction, "count": 0 }
        })

        // Loop over each reaction on the device and count the unique reactions
        reactionsArray.forEach(reaction => {
            reactionCounts[reaction.reaction.id].count += 1
            // reactionCounts[reaction.reaction.id].users.push(reaction.user.id)
        })

        Object.keys(reactionCounts).forEach(reaction => {
            reactionCountsArray.push(reactionCounts[reaction])
        })

        // Set the counts of the unique reactions
        setReactionCounts(reactionCountsArray)
    }

    useEffect(() => {
        device.reactions && getReactionCounts(device.reactions)
    }, [device])

    useEffect(() => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                const userReactions = [];
                device.reactions && device.reactions.forEach(deviceReaction => {
                    if (deviceReaction.user.id === res.user_id) {
                        userReactions.push(deviceReaction.reaction.id)
                    }
                })
                setCurrentUserDeviceReactions(userReactions);
            })
    }, [reactionCounts])

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
                        <small >Published on {device.publication_date} </small>
                        <small className="d-block"> By {device.rareuser && device.rareuser.user.first_name} {device.rareuser && device.rareuser.user.last_name}</small>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary mt-0" onClick={() => history.push(`/device/${device.id}/comments`)}>View Comments</button>
                    </div>
                    
                </div>
                <div className="device__content">
                    {device.content}
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