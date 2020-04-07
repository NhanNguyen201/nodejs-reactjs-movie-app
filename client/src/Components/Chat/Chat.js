import React, { useState, useEffect, useRef } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import MessageInput from '../MessageInput/MessageInput';
import MessageContainer from '../MessageContainer/MessageContainer';
import SearchDrawer from '../SearchDrawer/SearchDrawer';
import CurrentVideo from '../CurrentVideo/CurrentVideo';
import UserOnlineContainer from '../UserOnlineContainer/UserOnlineContainer';
import RoomName from '../RoomName/RoomName';
import ControlPanel from '../ControlPanel/ControlPanel';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');   
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [roomOwn, setRoomOwn] = useState('');
    //
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Current Video
    const [videoSelect, setVideoSelect] = useState('');
    //
    // video manipulation
    const [isPause, setIsPause]  = useState(true);
    const [videoVolume, setVideoVolume] = useState(1);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    //
    // const ENDPOINT = 'http://localhost:5000/';
    const ENDPOINT = 'https://moviee-app.herokuapp.com/';
    
    const player = useRef();
    // JOIN
    useEffect(() => {
        const { name, roomHost } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setRoom(roomHost);
        setRoomOwn(roomHost);
        setName(name);

        socket.emit('join', { name, roomHost }, (error) => {
            if(error) {
                alert(error);
            }
        });
        socket.emit('getOnJoin');
    }, [ENDPOINT, location.search]);
    //

    // MESSAGE
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        
        socket.on('roomData', ({users}) => {
            setUsers(users);
        })
        
        return () => {
            socket.emit('disconnect');   
            socket.off();
        }
    }, [messages]);
    
    // Change and Submit the room name
    const roomNameSubmit = e => {
        e.preventDefault();
        const newName = e.target.parentElement.parentElement.previousElementSibling.children[1].children[1].children[0].value;
        if( newName !== ''){
            socket.emit('changeRoomNameReq', {newName: newName})
        }
    };

    // SEND VIDEO
    const selectVideo = (video) => {
        socket.emit('sendVideo', { video: video})
    };
    
    // SEND MESSAGE
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
    };
    ///////////////////////
    useEffect(() => {
        // Change Name
        socket.on('changeRoomNameRes', ({newRoomName}) => {
            setRoom(newRoomName);
        })
        // Receive video when some one change video
        socket.on('receiveVideo', ({video}) => {
            setVideoSelect(video);
        })
        // Get video when join
            // Send 
        socket.on('getOnJoinServerReq',({newId}) => {
            socket.emit('getOnJoinClientRes', {
                newId: newId,
                currentVideo: videoSelect,
                roomName: room,
                playState: isPause,
                played: played
            })
        })
            //Get
        socket.on('getOnJoinServerRes',({currentVideo, roomName, playState, played_rep}) => {
            setVideoSelect(currentVideo);
            setRoom(roomName);
            setIsPause(playState);
            setPlayed(played_rep);
            if (player.current) {
                player.current.seekTo(parseFloat(played_rep), 'fraction');
                setPlayed(parseFloat(played_rep)); 
            }
        })  
        //Video manipulation
        socket.on('seekVideoFromServer', ({val}) => {
            if (player.current) {
                player.current.seekTo(parseFloat(val), 'fraction');
                setPlayed(parseFloat(val)); 
            }    
        })
        socket.on('pauseVideoFromServer', ({setPause}) => {
            setIsPause(!setPause)
        })
    })
    //////////////////////

    // Video manipulation
    const seekInput = (e) => {
        const val = e.target.previousElementSibling.value / 100;
        socket.emit('seekVideo', {val: val})
        // setPlayed(parseFloat(val));   
    }
    const volumnInput = (e) => {
        const value = e.target.previousElementSibling.value / 100;
        setVideoVolume(value);
    }
    const pauseClick = () => {   
        setIsPause(!isPause);
        socket.emit('pauseVideo', {isPause : isPause})
    }
    const getVideoState = status => {
        setPlayed(status.played.toFixed(3));
        setLoaded(status.loaded.toFixed(3));
    }

    return(
        <Grid container justify="center" alignContent="center" spacing={5} style={{height:'100vh', boxSizing:'border-box',padding:'15px', backgroundColor: '#a8a8a8'}}>
            <Grid item xs={12} style={{height:'10%'}} >
                <Paper elevation={5} style={{padding:'10px'}}>
                    <div style={{height: '100%', width:'100%', display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                        <div style={{height: '100%', width:'60%', display: 'flex', alignItems: 'center', justifyContent:'flex-start',padding:'0 20px'}}>
                            <Paper  style={{padding:'10px 20px ', marginRight: '20px', borderLeft: '5px solid #bdbdbd', borderBottom: '2px solid #bdbdbd'}}>
                                <Typography>
                                    <b>Room: {room}</b>
                                </Typography>
                            </Paper>
                            <RoomName name={room} onNameSubmit={roomNameSubmit}/>
                        </div>
                        <div style={{height: '100%', width:'40%', display: 'flex', alignItems: 'center', justifyContent:'flex-end', padding:'0 20px'}}>
                            <Button variant="outlined" color="primary" style={{marginRight: '20px'}}>
                                <a href="/" style={{textDecoration: 'none'}}>Exit</a>
                            </Button>
                            <SearchDrawer onVideoSelect={selectVideo}/>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={7} style={{height:'60%'}}>
                <Paper elevation={5} style={{height: '100%', width: '100%', boxSizing: 'border-box', display: 'grid', justifyItems: 'center', paddingTop: '2.5%'}}>
                    {
                        videoSelect 
                        ?   <CurrentVideo 
                                refer={player}
                                video={videoSelect}
                                volume={videoVolume}  
                                isPause={isPause}
                                style={{pointerEvents: 'none'}}
                                getVideoState={getVideoState}
                            />
                        :   <Skeleton variant="rect" style={{ height: '95%', width: '95%' }} animation="wave"/>
                    }
                </Paper>
            </Grid>
            <Grid item xs={5} style={{height:'60%'}}>
                <Paper elevation={5} style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column',justifyContent: 'space-between', boxSizing:'border-box', padding:'5px'}}>
                    <MessageContainer messages={messages} name={name} />
                    <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </Paper>
            </Grid>
            <Grid item xs={9} style={{height:'30%'}}>
                <Paper elevation={5} style={{height: '100%', width: '100%', boxSizing :'border-box', padding: '20px'}}>
                    <ControlPanel 
                        pauseClick={pauseClick} 
                        isPause={isPause}
                        seekInput={seekInput}
                        volumnInput={volumnInput}
                        played={played}
                        loaded={loaded}
                    />
                </Paper> 
            </Grid>
            <Grid item xs={3} style={{height:'30%'}}>
                <UserOnlineContainer users={users} roomHost={roomOwn}/>   
            </Grid>
        </Grid>
    )
}

export default Chat;