import React, { useContext, useState, useEffect, Fragment } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"
import { TagContext } from "../tags/TagProvider"


export const DeviceForm = (props) => {
    // Use the required context providers for data
    const { addDevice, devices, updateDevice, getDevices } = useContext(DeviceContext)
    // const { profile, getProfile } = useContext(ProfileContext)

    // Tags data
    const { tags, getTags } = useContext(TagContext)


    // Component state
    const [device, setDevice] = useState({})
    const [newTags, setNewTags] = useState([])

    // History
    const history = useHistory();

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("deviceId")  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newDevice = Object.assign({}, device)  
        if( event.target.name == "location_id" || event.target.name == "sensor_type_id") 
        {
            newDevice[event.target.name] = parseInt(event.target.value)
        }  
        else {
            newDevice[event.target.name] = event.target.value
        }     // Create copy
            // Modify copy
        setDevice(newDevice)                                 // Set copy as new state
    }

    const handleTagUpdate = e => {
        const updatedTagArray = []
        newTags.forEach(loopTag => {
            const newTag = {
                id: loopTag.id,
                label: loopTag.label,
                isChecked: parseInt(e.target.value) === loopTag.id ?
                    e.target.checked
                        ? true : false
                    : loopTag.isChecked ? true : false
            }
            updatedTagArray.push(newTag)
        })
        setNewTags(updatedTagArray)
    }

    const handleCheckboxChange = (event) => {
        
        const newDevice = Object.assign({}, device)          // Create copy
        newDevice[event.target.name] = event.target.checked    // Modify copy
        setDevice(newDevice)                                 // Set copy as new state
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an device.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the device.
            3. Update component state variable.
    */
    const getDeviceInEditMode = () => {
        if (editMode) {
            const deviceId = parseInt(props.match.params.deviceId)
            const selectedDevice = devices.find(a => a.id === deviceId) || {}
            selectedDevice.category
                ? selectedDevice.category_id = selectedDevice.category.id
                : selectedDevice.category_id = 0
            setDevice(selectedDevice)
        }
    }

    const createNewTags = () => {
        const tempTags = []
        tags && tags.map(tag => tempTags.push({ id: tag.id, label: tag.label, isChecked: device.tags && device.tags.find(t => t.id === tag.id) ? true : false }))
        setNewTags(tempTags)
    }

    // Get data from API when component initilizes
    useEffect(() => {
        getDevices();
        getTags();
        
    }, [])

    // Once provider state is updated, determine the device (if edit)
    useEffect(() => {
        getDeviceInEditMode()
    }, [devices])

    useEffect(() => {
        createNewTags()
    }, [device, tags])


    const constructNewDevice = () => {
        const deviceTagsArray = newTags.filter(pt => pt.isChecked === true).map(nt => nt.id)

        if (editMode) {
            // PUT
            updateDevice({
                id: device.id,
                name: device.name,
                location_id: device.location_id,
                sensor_type_id: device.sensor_type_id,
                hardware_number: device.hardware_number, // category_id: parseInt(device.category_id),
                created_datetime: device.created_datetime,
                appuser_id: device.homeiotuser.id,
                device_img_url: device.device_img_url,
                is_active:device.is_active,
                is_public:device.is_public,
                tag: deviceTagsArray
            })
                .then(() => props.history.push(`/devices/${device.id}`))
        } else {
            // POST
            addDevice({
                name: device.name,
                location_id: device.location_id,
                sensor_type_id: device.sensor_type_id,
                hardware_number: device.hardware_number,
                device_img_url: device.device_img_url,
                is_active:device.is_active,
                is_public:device.is_public,
                tag: deviceTagsArray
            })
                .then((newlyCreatedDevice) => props.history.push(`/devices/${newlyCreatedDevice.id}`))
        }

    }

    return (
        <div className="container w-50">
            <form className="deviceForm">
                <h2 className="deviceForm__name">{editMode ? "Update Device" : "New Device"}</h2>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="name" required autoFocus className="form-control" 
                            placeholder="Device name"
                            defaultValue={device.name}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="device_img_url" className="form-control"
                            placeholder="Image URL"
                            defaultValue={device.device_img_url}
                            onChange={handleControlledInputChange}>
                        </input>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <div className="form-group">
                        <select name="location_id" className="form-control w-50" value={device.location_id || ((device.location && device.location.id) || "0")} onChange={handleControlledInputChange}>
                            <option value="0" disabled>Location Select</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="sensor_type_id" className="form-control w-50" value={device.sensor_type_id || ((device.sensor_type && device.sensor_type.id) || "0")} onChange={handleControlledInputChange}>
                            <option value="0" disabled>SensorType Select</option>
                            {sensortypes.map(sensor_type => (
                                <option key={sensor_type.id} value={sensor_type.id}>{sensor_type.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>                 */}
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="hardware_number" className="form-control" required 
                            placeholder="Hardware Number"
                            defaultValue={device.hardware_number}
                            onChange={handleControlledInputChange}>
                        </input>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        <input type="checkbox" name="is_active" className="form-check-input" defaultValue={device.is_active} required                         
                            placeholder="Is Active"                            
                            onChange={handleCheckboxChange}>
                        </input>
                        <label htmlFor="is_active" className="form-check-label"> Is Active</label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        <input type="checkbox" name="is_public" className="form-check-input" defaultValue={device.is_public} required
                            placeholder="Is Public"
                            onChange={handleCheckboxChange}>
                        </input>
                        <label htmlFor="is_public" className="form-check-label">Is Public</label>
                    </div>
                </fieldset>
                
                <fieldset>
                    <h6 className="mt-3">Select Tags:</h6>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        {
                            newTags.map(tag => (
                                <Fragment key={tag.id}>
                                    <input type="checkbox" name="tags" className="form-check-input" value={tag.id} checked={tag.isChecked} onChange={handleTagUpdate} />
                                    <label htmlFor="tagsToAdd" className="form-check-label">{tag.label}</label>
                                </Fragment>
                            ))
                        }
                    </div>
                </fieldset>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewDevice()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Save" : "Create"}
                </button>
                <button type="button" onClick={() => history.goBack()}
                    className="btn btn-secondary ml-5">Cancel</button>
            </form>
        </div>
    )
}