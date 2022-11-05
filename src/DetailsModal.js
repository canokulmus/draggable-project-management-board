
import React from 'react';
import { Text, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'


const DetailsModal = ({ isOpen2, onClose2, currentTask, currentColumn, openEditModal, deleteTask }) => {
    return (
        <Modal isCentered isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay
                bg='yellow.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent w={500} bg="column-droppable-snapshot" style={{ minWidth: 600, }} color="white">
                <ModalHeader color={"yellow"} m={0} p={5}>Task Title</ModalHeader>
                <ModalHeader m="0" py={0} >{currentTask ? currentTask.title : ""}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text color={"yellow"} mt={5} mb={3} >Notes</Text>
                    <Text >{currentTask ?
                        currentTask.notes.split("\n").map((item, i) => {
                            return <Text key={i}>{item}</Text>
                        }) : ""}
                    </Text>
                </ModalBody>

                <ModalFooter >
                    <Button
                        mr={2}
                        colorScheme='red'
                        onClick={() => {
                            onClose2()
                            deleteTask(currentTask.id)
                        }}
                    >
                        Delete Task
                    </Button>
                    <Button
                        colorScheme='purple'
                        onClick={() => {
                            onClose2()
                            openEditModal(currentTask, currentColumn)
                        }}
                    >
                        Edit Task
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DetailsModal;
