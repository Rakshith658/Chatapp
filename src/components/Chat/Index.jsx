import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import './index.css'
import io from 'socket.io-client'
import InfoBar from '../Infobar/Index'
import Input from '../Input/Index'
import TextContainer from '../TextContainer/Index'
import Messages from '../Messages/Index'

let socket;
const Index = ({location}) => {
    const [name, setname] = useState('')
    const [room, setroom] = useState('')
    const [Message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('');
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
            setMessages([...messages,message])
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [])
    const sendmessage = (e) => {
        e.preventDefault()
        if (Message) {
            socket.emit('sendMessage',Message ,()=>setMessage(''))
        }
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input setMessage={setMessage} sendMessage={sendmessage} message={Message}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Index
