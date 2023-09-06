import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import Sidebarchat from './Sidebarchat';
import './Sidebar.css'
import db from './firebase';

function Sidebar() {
  const [rooms, setroom] = useState([]);
  useEffect(()=>{
    const unsubscribe = db.collection("rooms")
    .onSnapshot((snapshot)=>
    setroom(
      snapshot.docs.map((doc)=>
      ({
        id: doc.id,
        data: doc.data(),
      }))
     )
     );

     return () =>{
      unsubscribe();
     }
  }, []);
  
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
      <Avatar/>
        <div className='sidebar_headerRight'>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
        <DonutLargeIcon/>
        </IconButton>
        <IconButton>
        <MoreVertIcon/>
        </IconButton> 
        </div>

      </div>
      <div className='sidebar_search'>
          <div className='sidebar_searchcontainer'>
          <SearchIcon/>
          <input type="text" placeholder="Search or start new chat"/>
          </div>
      </div>
      <div className='sidebar_chats'>
            <Sidebarchat addnewchat/>
            {rooms.map((room)=>(
              <Sidebarchat key={room.id} id={room.id} name={room.data.name}/>
            ))}
      </div>
    </div>
  )
}

export default Sidebar;
