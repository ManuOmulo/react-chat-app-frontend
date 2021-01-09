import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import moment from "moment"

import "./App.scss"
import ChatTemplate from "./Templates/chats"
import LocationTemplate from "./Templates/location"

const socket = io("http://localhost:4000")

const App = () => {
  const [messages, setMessages] = useState([])
  const [state, setState] = useState("")
  const [myLocation, setMyLocation] = useState([])

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages([...messages, newMessage])
    })
  })

  useEffect(() => {
    socket.on("locationMessage", (position) => {
      setMyLocation([...myLocation, position])
    })
  })

  const handleChange = (e) => {
    setState([...state, {[e.target.name]: e.target.value}])
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    const clientMessage = e.target.elements.message.value
    socket.emit("sendMessage", clientMessage)
  }

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      return alert("You do not have locaton services")
    }

    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      const location = {
        longitude,
        latitude
      }
      socket.emit("sendLocation", location)
    })
  }

  const chats = messages.map((message, index) => (
    <div key={index}>
      <p>{moment(message.createdAt).format("h:mm a")} - {message.text}</p>
    </div>
  ))

  const currentLocation =  myLocation.map((location, index) => (
    <div key={index}>
      <p>{moment(location.createdAt).format("h:mm a")} - <a href={location.url} target="blank">My Location</a></p>
    </div>
  ))


  return (
    <div className="main-container">
      <ChatTemplate
        handleChange={handleChange}
        handleMessageSubmit={handleMessageSubmit}
        chats={chats}
      />
      <LocationTemplate
        handleSendLocation={handleSendLocation}
        currentLocation={currentLocation}
      />
    </div>
  )
}

export default App