import React, { useContext, useState, useEffect, useRef } from "react"
import { LocationContext } from "./LocationProvider"
import Location from "./Location"

export const LocationList = (props) => {
  const editLocationDialog = useRef()
  const deleteLocationDialog = useRef()
  const { locations, getLocations, createLocation, updateLocation, deleteLocation } = useContext(LocationContext)
  const [newLocation, setNewLocation] = useState("")
  const [editedLocation, setEditLocation] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editLocationId, setEditLocationId] = useState(0)
  const [deletedLocationId, setDeletedLocationId] = useState(0) 

  const handleInput = (e) => {
      if (isEditing) {
        updateLocation({ id: editLocationId, label: editedLocation })
        .then(editLocationDialog.current.close())
        .then(setEditLocation(""))
        .then(setIsEditing(false))
      } else {
        createLocation({ label: newLocation })
        .then(setNewLocation(""))
      }
  }

  const editALocation = (e) => {
    setEditLocation(e.target.dataset.locationname)
    setEditLocationId(e.target.id)
    setIsEditing(true)
    editLocationDialog.current.showModal()
  }

  const deleteALocation = (e) => {
    deleteLocation(deletedLocationId)
    .then(deleteLocationDialog.current.close())
    .then(setDeletedLocationId(0))
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
      <div className="d-flex flex-row justify-content-around">
        <dialog className="dialog dialog--editLocation" ref={editLocationDialog}>
              <div className="d-flex flex-column justify-content-around align-items-center">
                <h4>Edit this location</h4>
                <input className="editLocationInput form-control mb-5" type="text" placeholder="Add text" value={editedLocation} onChange={e => {
                  setEditLocation(e.target.value)
                }}></input>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="createLocation btn btn-outline-primary" onClick={handleInput}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => editLocationDialog.current.close()}>Close</button>
                </div>
              </div>
            </dialog>
            <dialog className="dialog dialog--deleteLocation text-center" ref={deleteLocationDialog}>
                <h4>Are you sure you want to delete this location?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="deleteLocation btn btn-outline-primary" onClick={deleteALocation}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => deleteLocationDialog.current.close()}>Close</button>
                </div>
            </dialog>
        <div className="allLocations">
          {
            locations.map(location => <Location key={location.id} location={location} deleteLocationDialog={deleteLocationDialog} setDeletedLocationId={setDeletedLocationId} editALocation={editALocation} />)
          }
        </div>
        <div> 
          <div className="addLocationForm d-flex flex-column justify-content-around align-items-center">
            <h2>Create a new location</h2>
            <input className="locationInput" type="text" placeholder="Add text" value={newLocation} onChange={e => {
              setNewLocation(e.target.value)
            }}></input>
            <button className="createLocation" onClick={handleInput}>Create</button>
          </div>
        </div>
      </div>
  )
}