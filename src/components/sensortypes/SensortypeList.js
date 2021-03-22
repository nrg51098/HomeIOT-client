import React, { useContext, useState, useEffect, useRef } from "react"
import { SensortypeContext } from "./SensortypeProvider"
import Sensortype from "./Sensortype"

export const SensortypeList = (props) => {
  const editSensortypeDialog = useRef()
  const deleteSensortypeDialog = useRef()
  const { sensortypes, getSensortypes, createSensortype, updateSensortype, deleteSensortype } = useContext(SensortypeContext)
  const [newSensortype, setNewSensortype] = useState("")
  const [editedSensortype, setEditSensortype] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editSensortypeId, setEditSensortypeId] = useState(0)
  const [deletedSensortypeId, setDeletedSensortypeId] = useState(0) 

  const handleInput = (e) => {
      if (isEditing) {
        updateSensortype({ id: editSensortypeId, label: editedSensortype })
        .then(editSensortypeDialog.current.close())
        .then(setEditSensortype(""))
        .then(setIsEditing(false))
      } else {
        createSensortype({ label: newSensortype })
        .then(setNewSensortype(""))
      }
  }

  const editASensortype = (e) => {
    setEditSensortype(e.target.dataset.sensortypename)
    setEditSensortypeId(e.target.id)
    setIsEditing(true)
    editSensortypeDialog.current.showModal()
  }

  const deleteASensortype = (e) => {
    deleteSensortype(deletedSensortypeId)
    .then(deleteSensortypeDialog.current.close())
    .then(setDeletedSensortypeId(0))
  }

  useEffect(() => {
    getSensortypes()
  }, [])

  return (
      <div className="d-flex flex-row justify-content-around">
        <dialog className="dialog dialog--editSensortype" ref={editSensortypeDialog}>
              <div className="d-flex flex-column justify-content-around align-items-center">
                <h4>Edit this sensortype</h4>
                <input className="editSensortypeInput form-control mb-5" type="text" placeholder="Add text" value={editedSensortype} onChange={e => {
                  setEditSensortype(e.target.value)
                }}></input>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="createSensortype btn btn-outline-primary" onClick={handleInput}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => editSensortypeDialog.current.close()}>Close</button>
                </div>
              </div>
            </dialog>
            <dialog className="dialog dialog--deleteSensortype text-center" ref={deleteSensortypeDialog}>
                <h4>Are you sure you want to delete this sensortype?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="deleteSensortype btn btn-outline-primary" onClick={deleteASensortype}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => deleteSensortypeDialog.current.close()}>Close</button>
                </div>
            </dialog>
        <div className="allSensortypes">
          {
            sensortypes.map(sensortype => <Sensortype key={sensortype.id} sensortype={sensortype} deleteSensortypeDialog={deleteSensortypeDialog} setDeletedSensortypeId={setDeletedSensortypeId} editASensortype={editASensortype} />)
          }
        </div>
        <div> 
          <div className="addSensortypeForm d-flex flex-column justify-content-around align-items-center">
            <h2>Create a new sensortype</h2>
            <input className="sensortypeInput" type="text" placeholder="Add text" value={newSensortype} onChange={e => {
              setNewSensortype(e.target.value)
            }}></input>
            <button className="createSensortype" onClick={handleInput}>Create</button>
          </div>
        </div>
      </div>
  )
}