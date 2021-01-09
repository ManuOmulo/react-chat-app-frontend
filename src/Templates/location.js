import React from "react"

const LocationTemplate = (props) => {
  return (
    <div className="location-container">
      <i className="fas fa-map-marker-alt"></i>
      <button onClick={props.handleSendLocation}>Send Location</button>
      {props.currentLocation}
    </div>
  )
}

export default LocationTemplate