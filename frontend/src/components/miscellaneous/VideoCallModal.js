import React, { useState, useEffect, useCallback } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { io } from "socket.io-client";
import LobbyScreen from "./LobbyScreen";

const socket = io("http://localhost:5000");

const VideoCallModal = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Video Call" hasArrow placement="bottom-end">
        <IconButton
          mr={3}
          d={{ base: "flex" }}
          icon={<ChatIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal size="full" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Lobby
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <LobbyScreen />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoCallModal;
