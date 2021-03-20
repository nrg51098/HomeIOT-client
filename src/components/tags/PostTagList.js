import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import DeviceTag from "./DeviceTag"
import ListTags from "./ListTags"

export const DeviceTagList = (props) => {
  const { tags, getTags, deviceTags, deleteDeviceTag, createDeviceTag } = useContext(TagContext)

  const deleteADeviceTag = (e) => {
    e.preventDefault()
    deleteDeviceTag(e.target.id, e.target.dataset.deviceid)
  }

  const addADeviceTag = (e) => {
    e.preventDefault()
    const newDeviceTag = {
      "tag_id": e.target.value,
      "device_id": props.deviceId
    }
    if (e.target.value !== "ignore") {
      createDeviceTag(newDeviceTag)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <React.Fragment>
      <select onChange={addADeviceTag}>
        <option value="ignore">Add a tag to device</option>
        {
          tags.map(tag => <ListTags key={tag.id} tag={tag} addADeviceTag={addADeviceTag} />)
        }
      </select>
      <div className="deviceTags">
        {
          deviceTags.map(deviceTag => <DeviceTag key={deviceTag.id} deviceTag={deviceTag} deleteADeviceTag={deleteADeviceTag} />)
        }
      </div>
    </React.Fragment>
  )
}