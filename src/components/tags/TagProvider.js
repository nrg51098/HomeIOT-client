import React, { useState } from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {
  const [tags, setTags] = useState([])
  const [deviceTags, setDeviceTags] = useState([])
  const [searchTags, setSearchTags] = useState("")

  const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
          "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTags)
  }

  const createTag = tag => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(tag)
    })
      .then(getTags)
  }

  const createDeviceTag = devicetag => {
    return fetch("http://localhost:8000/devicetags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(devicetag)
    })
      .then()
  }

  const updateTag = tag => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      },
      body: JSON.stringify(tag)
    })
      .then(getTags)
  }

  const deleteTag = id => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Token ${localStorage.getItem("homeiot_user_id")}`
      }
    })
      .then(getTags)
  }

  const deleteDeviceTag = (id, deviceId) => {
    return fetch(`http://localhost:8000/devicetags/${id}`, {
      method: "DELETE",
    })
      .then()
  }

  return (
    <TagContext.Provider value={{
      tags, deviceTags, setDeviceTags, getTags, createTag, deleteTag, updateTag, deleteDeviceTag,
      createDeviceTag, searchTags, setSearchTags
    }}>
      {props.children}
    </TagContext.Provider>
  )


}