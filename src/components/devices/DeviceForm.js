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
        const newDevice = Object.assign({}, device)          // Create copy
        newDevice[event.target.name] = event.target.value    // Modify copy
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
                title: device.title,
                content: device.content,
                category_id: parseInt(device.category_id),
                publication_date: device.publication_date,
                author_id: device.rareuser.id,
                image_url: device.image_url,
                tags: deviceTagsArray
            })
                .then(() => props.history.push(`/devices/${device.id}`))
        } else {
            // POST
            addDevice({
                title: device.title,
                content: device.content,
                category_id: device.category_id,
                image_url: device.image_url,
                tags: deviceTagsArray
            })
                .then((newlyCreatedDevice) => props.history.push(`/devices/${newlyCreatedDevice.id}`))
        }

    }

    return (
        <div className="container w-50">
            <form className="deviceForm">
                <h2 className="deviceForm__title">{editMode ? "Update Device" : "New Device"}</h2>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="title" required autoFocus className="form-control w-75"
                            placeholder="Device title"
                            defaultValue={device.title}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="image_url" className="form-control w-75"
                            placeholder="Image URL"
                            defaultValue={device.image_url}
                            onChange={handleControlledInputChange}>
                        </input>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <textarea rows="7" type="text" name="content" required className="form-control"
                            placeholder="Article content"
                            value={device.content}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>
                
                <fieldset>
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
                    {editMode ? "Save" : "Publish"}
                </button>
                <button type="button" onClick={() => history.goBack()}
                    className="btn btn-secondary ml-5">Cancel</button>
            </form>
        </div>
    )
}