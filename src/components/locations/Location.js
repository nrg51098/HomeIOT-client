import React from "react"
import "./Location.css"

export default (props) => (
  <div className="locations">
    <div className="locationicon"><i className="fas fa-cog" id={props.location.id} data-locationname={props.location.label} onClick={props.editALocation} ></i></div>
    <div className="locationicon"><i className="far fa-trash-alt" id={props.location.id} onClick={e => {
        props.setDeletedLocationId(props.location.id)
        props.deleteLocationDialog.current.showModal() 
      }
    }></i></div>
    <div className="locationname">{props.location.label}</div>
  </div>
)