import React from "react"
import "./tag.css"

export default (props) => (
  <div className="tags">
    <div className="tagname">{props.deviceTag.name}</div>
    <div className="tagicon"><i className="far fa-trash-alt" id={props.deviceTag.id} data-deviceid={props.deviceTag.deviceId} onClick={props.deleteAPostTag}></i></div>
  </div>
)