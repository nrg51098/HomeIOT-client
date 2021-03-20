import React, { useContext } from "react"
import { DeviceContext } from "./DeviceProvider"
import { TagContext } from "../tags/TagProvider"

export const DeviceSearch = () => {
    const { setTerms } = useContext(DeviceContext)
    const { setSearchTags } = useContext(TagContext)

    return (
        <>
            <div>Search for a device</div>
            <input type="text" className="devices__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                        setSearchTags(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string or tag here..." />
        </>
    )
}