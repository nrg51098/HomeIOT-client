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
import { UserpreferenceDetail } from "./userpreferences/UserpreferenceDetail.js"
import { UserpreferenceEditForm } from "./userpreferences/UserpreferenceEditForm.js"
import { UserpreferenceProvider } from "./userpreferences/UserpreferenceProvider.js"
import { SubscriptionTable } from "./subscriptions/SubscriptionTable.js"
import { SubscriptionProvider } from "./subscriptions/SubscriptionProvider.js"
import { TempDatasetsProvider } from "./tempdatasets/TempDatasetsProvider.js"
import { TempHumiDatasetsProvider } from "./temphumidatasets/TempHumiDatasetsProvider.js"
import { ButtonDatasetsProvider } from "./buttondatasets/ButtonDatasetsProvider.js"


export const ApplicationViews = () => {
    const { isAdmin } = useContext(AuthContext);

    return <>
    <div className="d-flex flex-wrap w-100">
        <NavBar />
        </div>
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
                                        <h1 className="ml-5">Available Tags</h1>
                                        <TagList {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />
                            <LocationProvider>
                                <SensortypeProvider>
                                    <DeviceProvider>
                                        <SubscriptionProvider>
                                            <TempDatasetsProvider>
                                                <TempHumiDatasetsProvider>
                                                    <ButtonDatasetsProvider>
                                                            <Route exact path="/">
                                                                <DeviceList />
                                                            </Route>
                                                            <Route exact path="/user/devices" render={(props) => <DeviceList {...props} />} />                                            
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
                                                    </ButtonDatasetsProvider> 
                                                </TempHumiDatasetsProvider>           
                                            </TempDatasetsProvider>
                                        </SubscriptionProvider>    
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
                                        <h1 className="ml-5">Available Locations</h1>
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
                                        <h1 className="ml-5">Available Sensortypes</h1>
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
                <UserpreferenceProvider>
                <Route exact path="/userpreferences" render={
                        props => <UserpreferenceDetail {...props} />
                    } />
                                                
                <Route path="/userpreferences/user/:userpreferenceId(\d+)" render={
                        props => <UserpreferenceEditForm {...props} />
                    } />
                </UserpreferenceProvider>
                <SubscriptionProvider>
                <Route exact path="/subscriptions" render={
                        props => <SubscriptionTable {...props} />
                    } />
                </SubscriptionProvider>
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