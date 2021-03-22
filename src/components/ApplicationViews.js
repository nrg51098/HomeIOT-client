import React, { useContext } from "react"

import { AuthContext } from "./auth/AuthProvider.js"
import { TagProvider } from "./tags/TagProvider.js"
import { TagList } from "./tags/TagList.js"
import { NavBar } from "./navbar/NavBar"
import { Route, Redirect } from "react-router-dom"
import { DeviceDetails } from "./devices/DeviceDetail.js"
import { DeviceSearch } from "./devices/DeviceSearch.js"
import { DeviceProvider } from "./devices/DeviceProvider.js"
import { DeviceList } from "./devices/DeviceList.js"
import { DeviceTable } from "./devices/DeviceTable.js"
import { DeviceForm } from "./devices/DeviceForm.js"
import { LocationList } from "./locations/LocationList.js"
import { LocationProvider } from "./locations/LocationProvider.js"
import { SensortypeList } from "./sensortypes/SensortypeList.js"
import { SensortypeProvider } from "./sensortypes/SensortypeProvider.js"
import { UserTable } from "./users/UserTable.js"
import { UserProfile } from "./users/UserProfile.js"


export const ApplicationViews = () => {
    const { isAdmin } = useContext(AuthContext);

    return <>
        <NavBar />
        <main style={{
            margin: "1rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
                <TagProvider>
                    
                    <Route exact path="/tags" render={(props) => {
                        return <>
                            {
                                isAdmin
                                    ? <main className="tagsContainer">
                                        <h1>Available Tags</h1>
                                        <TagList {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />
                            <LocationProvider>
                                <SensortypeProvider>
                                    <DeviceProvider>
                                            <Route exact path="/">
                                                <DeviceList />
                                            </Route>
                                            <Route exact path="/user/devices" render={(props) => 
                                            { return <>
                                            {
                                                <DeviceList {...props} />
                                            }
                                                </>
                                            }} />
                                            
                                            <Route path="/user/devices/:userId(\d+)" render={props => <DeviceList {...props} />} />
                                            <Route exact path="/devices" render={(props) => {
                                                return <>
                                                    <main className="deviceContainer">
                                                        <h1>Devices</h1>

                                                        <DeviceSearch />
                                                        <DeviceTable />
                                                    </main>

                                                </>
                                            }} />

                                            <Route exact path="/devices/create" render={(props) => {
                                                return <DeviceForm {...props} />
                                            }} />

                                            <Route path="/devices/:deviceId(\d+)" render={
                                                    props => <DeviceDetails {...props} />
                                                } />
                                                
                                            <Route path="/devices/edit/:deviceId(\d+)" render={
                                                    props => <DeviceForm {...props} />
                                                } />

                                            
                                    </DeviceProvider> 
                                </SensortypeProvider>
                            </LocationProvider>                        
                </TagProvider> 
                <LocationProvider>
                    <Route exact path="/locations" render={(props) => {
                        return <>
                            {
                                isAdmin
                                    ? <main className="locationsContainer">
                                        <h1>Available Locations</h1>
                                        <LocationList {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />  
                
                
                </LocationProvider>  
                <SensortypeProvider>
                    <Route exact path="/sensortypes" render={(props) => {
                        return <>
                            {
                                isAdmin
                                    ? <main className="sensortypesContainer">
                                        <h1>Available Sensortypes</h1>
                                        <SensortypeList {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />  
                
                
                </SensortypeProvider> 

                <Route exact path='/users' render={() => {
                        return <>
                        { 
                        isAdmin 
                            ? <main className="usersContainer">                                
                                <UserTable />
                            </main>
                            : <Redirect to="/" />
                        }
                        </>
                    }} />
               
                <Route path="/users/:userId(\d+)" render={
                        props => <UserProfile {...props} />
                    } 
                /> 
                {/* <Route exact path='/users' render={() => {
                return <>
                    {
                        isAdmin
                            ? <main className="usersContainer">
                                <UserTable />
                            </main>
                            : <Redirect to="/" />
                    }
                </>
            }} />
            <Route path="/users/:userId(\d+)" render={
                props => <UserProfile {...props} />
            }
            />
             */}
            
            
        </main>
    </>
}