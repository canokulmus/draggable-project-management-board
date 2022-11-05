import React from 'react'
import { Flex, Heading, Text, Accordion, AccordionItem, AccordionPanel, Box, AccordionButton, AccordionIcon, calc } from '@chakra-ui/react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

export default function Column({ column, tasks, openAddModal, openEditModal, openDetailsModal }) {
    return (
        <Flex rounded={"3px"} bg={"column-bg"} m={5} w="400px" h="620px" flexDir={"column"}>
            <Flex align={"center"} justify="center" minH="60px" bg={"column-header-bg"} rounded="3px 3px 0 0" px={"1.5rem"} position="relative">
                <Text fontSize={"17px"} fontWeight={600} color={"subtle-text"} w="100%" >
                    {column.title}
                </Text>
                <button className='add-task-button' onClick={() => openAddModal(column)}>
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
                        {
                            tasks.length > 0 ? tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                    {(draggableProvided, draggableSnapshot) => (
                                        <Flex
                                            mb="1rem"
                                            bg={"card-bg"}
                                            minH="70px"
                                            rounded={"3px"}
                                            justifyContent="space-between"
                                            alignItems="center"

                                            position="relative"
                                            outline="2px solid"
                                            outlineColor={draggableSnapshot.isDragging ? "blue.400" : "transparent"}
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                            className="task"
                                        >
                                            <Flex
                                                alignItems={"center"}
                                                w={"85%"}
                                                h="100%"

                                            >
                                                <Text
                                                    h="100%"
                                                    onClick={() => openDetailsModal(task, column)}
                                                    // bg="yellow"
                                                    width={"100%"}
                                                    display="flex"
                                                    alignItems="center"
                                                    px={"1rem"}
                                                    className='task-title'
                                                >
                                                    {task.title}
                                                </Text>

                                                <button
                                                    className='edit-task-button'
                                                    onClick={() => openEditModal(task, column)}
                                                >
                                                    <EditIcon w={4} h={4} />
                                                </button>
                                            </Flex>
                                        </Flex>
                                    )}
                                </Draggable>
                            ))
                                :
                                <Flex flexDir={"column"}>
                                    <Text fontSize={"25px"} my={50} textAlign="center" fontWeight={400} color={"subtle-text"} w="100%"  >
                                        Create your first task or drag one here.
                                    </Text>

                                    <button onClick={() => openAddModal(column)}>
                                        <AddIcon className='hover-white' color='subtle-text' w={50} h={50} />
                                    </button>
                                </Flex>
                        }
                    </Flex>
                )}
            </Droppable>
        </Flex >
    )
}