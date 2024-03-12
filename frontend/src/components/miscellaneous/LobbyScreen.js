import React, { useState, useCallback, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Button, FormControl, Input } from "@chakra-ui/react";
import RoomPage from "./RoomPage";
const LobbyScreen = () => {
  const { socket, user } = ChatState();
  const [room, setRoom] = useState("");
  const [isJoined, setJoined] = useState(false);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { user, room });
    },
    [user, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { incomingUser, room } = data;
    setJoined(true);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      {!isJoined ? (
        <>
          <div className="Lobby" style={{ display: "flex" }}>
            <FormControl>
              <Input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                mb={2}
              />
            </FormControl>
            <Button ml={2} onClick={handleSubmitForm} colorScheme="blue">
              Join
            </Button>
          </div>
          <div>Your friend will need same Room ID to enter the call</div>
        </>
      ) : (
        <RoomPage />
      )}
    </>
  );
};

export default LobbyScreen;
