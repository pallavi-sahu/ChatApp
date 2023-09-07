import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
// import firebase from './firebase';
import { serverTimestamp } from '@firebase/firestore'

function Chat() {

const [seed, setseed] = useState("");
const [input, setinput] = useState("");
const {roomId} = useParams();
const [roomName, setroomName] = useState("");
const [massages, setMassages] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(()=>{
    if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
            setroomName(snapshot.data().name)
        })
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
            setseed(Math.floor(Math.random()*5000));
        })

        db.collection('rooms')
        .doc(roomId)
        .collection("massages").orderBy("timestamp","asc")
        .onSnapshot((snapshot)=>
            setMassages(snapshot.docs.map((doc)=>doc.data()))
        );
    }
     
}, [roomId])


const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed", input);
        db.collection('rooms').doc(roomId).collection('massages').add({
            massage:input,
            name: user.displayName,
            timestamp: serverTimestamp()

        })
        setinput("");
}

  return (
    <div className='chat'>
      
        <div className='chat_header'> 
            <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chat_headerinfo'>
                <h3>{roomName}</h3>
                <p>last seen {" "}{
                    new Date(
                        massages[massages.length-1]?.timestamp?.toDate()
                    ).toUTCString()}
                </p>
            </div>

            <div className='chat_headerRight'>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                    
                <IconButton>
                    <AttachFile/>
                </IconButton>

                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>

        <div className='chat_body'>
        {massages.map((massage)=>(
            <p className={`chat_massage ${massage.name===user.displayName 
            && "chat_reciever"}`}>

            <span className='chat_name'>{massage.name}</span>
                {massage.massage}
                <span className='chat_timestamp'>
                {new Date(massage.timestamp?.toDate()).toUTCString()}</span>
            </p>
        ))}
           
        </div>

        <div className='chat_footer'>
            <InsertEmoticon/>
            <form>
                <input 
                value={input}
                onChange={(e) => setinput(e.target.value)}
                type="text" 
                placeholder='Type a massage'
                />
                <button onClick={sendMessage}
                type='submit' >send massage</button>
            </form>
            <MicIcon/>
        </div>

    </div>
  )
}

export default Chat
