import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useAtom } from 'jotai'
import { tasks } from '../atom/task'
//dynamic imports
const Column = dynamic(() => import('../src/Column'), { ssr: false })



export default function Home() {

  const [taskState, setTaskState] = useAtom(tasks);


  const onDragEnd = (result) => {
    const { destination, source } = result

    //If user drops outside of droppable area
    if (!destination) return;

    //If the user drops the item in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // If the user drops the item in the same column but in the different position 
    if (destination.droppableId === source.droppableId) {
      const column = taskState.columns[source.droppableId]
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1) //remove the item from the source index
      newTaskIds.splice(destination.index, 0, result.draggableId) //add the item to the destination index

      const newColumn = {
        ...column,
        taskIds: newTaskIds
      }

      const newState = {
        ...taskState,
        columns: {
          ...taskState.columns,
          [newColumn.id]: newColumn

        }
      }
      setTaskState(newState)
      return
    }

    //If the user moves from one column to another
    const sourceCol = taskState.columns[source.droppableId];
    const destinationCol = taskState.columns[destination.droppableId];


    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...taskState,
      columns: {
        ...taskState.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setTaskState(newState);


  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flexDir={"column"}
        bg={"main-bg"}
        minH={"100vh"}
        w={"full"}
        color={"white-text"}
        pb="rem"
      >
        <Flex py={"3rem"} flexDir={"column"} align={"center"}>
          <Heading fontSize={"3xl"} fontWeight={600}>
            Draggable Project Management Board
          </Heading>

          <Text fontSize={"20px"} mt="20px" fontWeight={600} color="subtle-text">
            {/* {"(If you refresh the page, your changes will remain the same)"} */}
          </Text>
        </Flex>

        <Flex justify={"space-around"} px={"4rem"} wrap="wrap">

          {taskState.columnOrder.map((columnId) => {
            const column = taskState.columns[columnId]
            const tasks = column.taskIds.map(taskId => taskState.tasks[taskId])

            return <Column
              key={column.id}
              column={column}
              tasks={tasks}
              taskState={taskState}
              setTaskState={setTaskState}
            />
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  )
}
