import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Sidebarchat.css"
import db from './firebase';
import {Link} from 'react-router-dom';


function Sidebarchat({id, name, addnewchat}) {

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  }, []);

 const createChat = () => {
   const roomName = prompt("please enter name for chat room");
   console.log("chatelement: ",addnewchat)
   console.log(roomName)
   if(roomName){
      db.collection('rooms').add({
        name: roomName,
      });
   }
 };
  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
      <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`}/>
      <div className='sidebarchat_info'>
        <h2>{name}</h2>
        <p>last massage...</p>
      </div>
    </div>
    </Link>
  ) : (
      <div className='sidebarChat' onClick={createChat}>
          <h2>Add new Chat</h2>   
      </div>
  )
}

export default Sidebarchat;

