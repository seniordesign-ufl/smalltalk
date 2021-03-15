import React, { useContext, useEffect } from "react";
import { API, AppContext } from "../AppContext";
import '../Styling/index.css';

//Components

import Header from '../components/Header';
import EnterDisplayName from "./EnterDisplayName";
import RoomHomeScreen from "./RoomHomeScreen";

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext);

    //Sets room key for users joining from link
    useEffect(() => {
        dispatch({ type: 'join-room', roomKey: props.match.params.roomID });
    }, [])

    return (
        <div className="room-page">
            <Header roomKey={contextState.roomKey} />
            {contextState.displayName !== null ?
                <RoomHomeScreen /> : <EnterDisplayName {...props} />}
        </div>
    );
}

export default Room;
