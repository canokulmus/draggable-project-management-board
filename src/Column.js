import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

export default function Column({ column, tasks }) {
    return (
        <Flex rounded={"3px"} bg={"column-bg"} w="400px" h="620px" flexDir={"column"}>
            <Flex align={"center"} justify="center" h="60px" bg={"column-header-bg"} rounded="3px 3px 0 0" px={"1.5rem"} position="relative">
                <Text fontSize={"17px"} fontWeight={600} color={"subtle-text"} w="100%" >
                    {column.title}
                </Text>
                <button className='add-task-button' onClick={() => alert(column.title)}>
                    <AddIcon w={3} h={3} />
                </button>
            </Flex>
            <Droppable droppableId={column.id}>
                {(droppableProvided, droppableSnapshot) => (
                    <Flex
                        px={"1.5rem"}
                        pt="20px"
                        flex={1}
                        flexDir="column"
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        bg={droppableSnapshot.isDraggingOver ? "column-droppable-snapshot" : "column-bg"}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <Flex
                                        mb="1rem"
                                        bg={"card-bg"}
                                        minH="70px"
                                        rounded={"3px"}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p={"1.2rem"}
                                        position="relative"
                                        outline="2px solid"
                                        outlineColor={draggableSnapshot.isDragging ? "blue.400" : "transparent"}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        className="task"
                                    >
                                        <Text >
                                            {task.content}
                                        </Text>

                                        <button className='edit-task-button'>
                                            <EditIcon w={4} h={4} />
                                        </button>

                                    </Flex>
                                )}
                            </Draggable>
                        ))}
                    </Flex>
                )}
            </Droppable>
        </Flex>
    )
}
