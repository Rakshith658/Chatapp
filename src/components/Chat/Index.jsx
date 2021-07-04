import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import './index.css'
import io from 'socket.io-client'
import InfoBar from '../Infobar/Index'
import Input from '../Input/Index'

let socket;
const Index = ({location}) => {
    const [name, setname] = useState('')
    const [room, setroom] = useState('')
    const [Message, setMessage] = useState('')
    const [Messages, setMessages] = useState([])
    const ENDPOINT ='http://localhost:5000'
    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        setname(name)
        setroom(room)
        socket = io(ENDPOINT);
        // socket.emit("join",{name,room},(e)=>console.log(e))
        socket.emit("join",{name,room})
        return ()=>{
            socket.emit("disconnect")
            socket.off()
        }
    }, [ENDPOINT,location.search])
    useEffect(() => {
        socket.on('message',(message)=>{
            setMessages([...Messages,message])
        })
    }, [Message])
    const sendmessage = (e) => {
        e.preventDefault()
        if (Message) {
            socket.emit('sendMessage',Message ,()=>setMessage(''))
        }
    }
    console.log(Messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Input setMessage={setMessage} sendMessage={sendmessage} message={Message}/>
            </div>
        </div>
    )
}

export default Index
