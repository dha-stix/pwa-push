import React, {useEffect} from 'react'

const ChatBar = ({socket}) => {
    useEffect(()=> {
        socket.on("newUserResponse", data => localStorage.setItem("users", data.toString()))
    }, [socket])
let users = localStorage.getItem("users") || null
  return (
    <div className='chat__sidebar'>
        <h2>Open Chat</h2>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users?.split(",").map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar