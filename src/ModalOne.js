
import React from 'react';
import { ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'


const ModalOne = ({ currentColumn, isOpen, onClose, handleAddTask, mode, currentTask, setCurrentTask, handleEditTask, deleteTask }) => {
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg='yellow.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent w={500} bg="column-droppable-snapshot" style={{ minWidth: 600, }} color="white">
                <ModalHeader>{currentColumn ? currentColumn.title : "Task Management"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired mt={5}>
                        <FormLabel>Task Name</FormLabel>
                        <Input
                            placeholder='Database Design etc.'
                            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                            value={currentTask.title}

                        />
                    </FormControl>
                    <FormControl mt={10}>
                        <FormLabel>Notes</FormLabel>
                        <Textarea
                            placeholder='- Important Note'
                            onChange={(e) => setCurrentTask({ ...currentTask, notes: e.target.value })}
                            value={currentTask.notes}
                            rows={6}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    {mode === 0 ? <Button colorScheme='blue' onClick={handleAddTask}>Add Task</Button> : ""}
                    {mode === 1 ? <Button colorScheme='red' mr={3} onClick={() => deleteTask(currentTask.id)}>Delete Task</Button> : null}
                    {mode === 1 ? <Button colorScheme='purple' onClick={handleEditTask}>Save Changes</Button> : ""}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalOne;
