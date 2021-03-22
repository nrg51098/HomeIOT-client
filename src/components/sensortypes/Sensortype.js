import React from "react"
import "./Sensortype.css"

export default (props) => (
  <div className="sensortypes">
    <div className="sensortypeicon"><i className="fas fa-cog" id={props.sensortype.id} data-sensortypename={props.sensortype.label} onClick={props.editASensortype} ></i></div>
    <div className="sensortypeicon"><i className="far fa-trash-alt" id={props.sensortype.id} onClick={e => {
        props.setDeletedSensortypeId(props.sensortype.id)
        props.deleteSensortypeDialog.current.showModal() 
      }
    }></i></div>
    <div className="sensortypename">{props.sensortype.label}</div>
  </div>
)