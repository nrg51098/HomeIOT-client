import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"
import { SubscriptionContext } from "../subscriptions/SubscriptionProvider"
import { TempDatasetsContext } from "../tempdatasets/TempDatasetsProvider"
import { TempHumiDatasetsContext } from "../temphumidatasets/TempHumiDatasetsProvider"
import App from "./SampleChart"
import moment from 'moment';

import "./Devices.css"

export const DeviceDetails = (props) => {
    const { getDeviceById, releaseDevice } = useContext(DeviceContext)
    const { getSubscriptionsByCurrentUserId, subscriptions, deleteSubscription, createSubscription } = useContext(SubscriptionContext)
    const { tempDatasets, getTempDatasetsByDeviceId } = useContext(TempDatasetsContext)
    const { tempHumiDatasets, getTempHumiDatasetsByDeviceId } = useContext(TempHumiDatasetsContext)
    
    const history = useHistory();
    const deleteDeviceModal = useRef();

    const [myDatasets, setMyDatasets] = useState([])
    const [device, setDevice] = useState({})
    const [currentSub, setCurrentSub] = useState(-1)
    const [isDeviceSubscribed, setIsDeviceSubscribed] = useState(false)
    

    useEffect(() => {
        const deviceId = parseInt(props.match.params.deviceId)
        getDeviceById(deviceId)
            .then(setDevice)

        getSubscriptionsByCurrentUserId()
    }, [])

    useEffect(() =>{
        
        const deviceId = parseInt(props.match.params.deviceId)
        console.log(device)
        if(device.sensor_type){
            console.log(device.sensor_type.id)
            if(device.sensor_type.id === 1){                          
                getTempDatasetsByDeviceId(deviceId)               
            }
            else if(device.sensor_type.id === 2){                          
                getTempHumiDatasetsByDeviceId(deviceId)               
            }              
        }
        
    }, [device])



    useEffect(() =>{
        const deviceId = parseInt(props.match.params.deviceId)
        
        if (subscriptions) {
            const tempSub = subscriptions.filter(sub => sub.device.id === deviceId)
            
            if(tempSub && tempSub.length > 0){
                setIsDeviceSubscribed(true)                
                setCurrentSub(tempSub[0].id)                
            }
        } else{
            setIsDeviceSubscribed(false)
        }       
        
    }, [subscriptions])


    useEffect(()=>{
        if(tempDatasets){
            setMyDatasets(tempDatasets)
        }
    }, [tempDatasets])

    useEffect(()=>{
        if(tempHumiDatasets){
            setMyDatasets(tempHumiDatasets)
        }
    }, [tempHumiDatasets])    
    
    const handleCheckboxChange = (event) => {
        if(event.target.checked){
            if(isDeviceSubscribed === false){
                const newSubscriptionObject = {
                    "device_id": device.id,
                    "device_notification": true
                }
                createSubscription(newSubscriptionObject)
                console.log(newSubscriptionObject)
            }  
            setIsDeviceSubscribed(true)        
        }
        else {
            if(subscriptions && isDeviceSubscribed === true){
                deleteSubscription(currentSub)
                console.log(currentSub)
            }
            setIsDeviceSubscribed(false)
        }                                       
    }



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
                <h3 className="device__title text-center">Device Name: {device.name}</h3>

                
                {myDatasets.length > 0 ?
                <div className="d-flex flex-row justify-content-center">
                    <App {...props} myDatasets={myDatasets} sensor_type_id={device.sensor_type.id}/>
                    </div>
                :
                <div className="text-center">
                <img className="mb-5 rounded w-50" src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhcGh8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>                
                }
                

                
                <div className="d-flex flex-row justify-content-center">
                    <div className="device__manage__buttons">
                        <i className="fas fa-trash-alt device__hover__delete" onClick={() => {
                            deleteDeviceModal.current.showModal()
                        }}></i>
                        <i className="fas fa-cog device__hover" onClick={() => history.push(`/devices/edit/${device.id}`)}></i>
                    </div>
                    
                </div>



                <fieldset>
                    <div className="d-flex justify-content-center">
                        <div className="form-check form-check-inline mb-3">
                                <input type="checkbox" className="form-check-input" name="isDeviceSubscribed" checked={isDeviceSubscribed} value={isDeviceSubscribed} onChange={handleCheckboxChange}></input>
                                <label htmlFor="isDeviceSubscribed" className="form-check-label">Device Subscription</label>                      
                                
                        </div> 
                    </div> 
                </fieldset>

                

                

                <div className="d-flex justify-content-center text-center">
                        <div >Location: {device.location && device.location.label}</div>
                </div>

                <div className="d-flex justify-content-center">               
                       
                By {device.appuser && device.appuser.user.first_name} {device.appuser && device.appuser.user.last_name}                                
                    
                </div> 
                
                <div className="d-flex justify-content-center text-center">Created on {moment(device.created_datetime).format('lll')}</div> 

                

                <div className="d-flex justify-content-center text-center">Tags:</div>  
                <div className="d-flex justify-content-center text-center">           
                    {device.tag && device.tag.map(tg => (
                        <div key={tg.id} className="border border-dark rounded px-5 m-3">{tg.label}</div>
                    ))} 
                </div> 

                
                
                 
                
            </div>

        </section>
    )
}