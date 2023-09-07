import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Sidebarchat.css"
import db from './firebase';
import {Link} from 'react-router-dom';


function Sidebarchat({id, name, addnewchat}) {

  const [seed, setSeed] = useState("");
  const [massages, setMassages] = useState("");

  useEffect(()=>{
    if(id){
      db.collection("rooms").doc(id)
      .collection("massages").orderBy("timestamp", "desc")
      .onSnapshot((snapshot)=>setMassages(snapshot.docs.map((doc)=>
      doc.data()))
      );
    }
  }, [id])

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
        <p>{massages[0]?.massage}</p>
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

