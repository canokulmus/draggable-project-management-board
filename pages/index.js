import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Flex, Heading, Text, useDisclosure, } from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useAtom } from 'jotai'
import { tasks } from '../atom/task'
import ModalOne from '../src/ModalOne'
import DetailsModal from '../src/DetailsModal'
//dynamic imports
const Column = dynamic(() => import('../src/Column'), { ssr: false })


const Home = () => {

  const [taskState, setTaskState] = useAtom(tasks);
  const [mode, setMode] = useState(false); // 0 = add, 1 = edit
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentTask, setCurrentTask] = useState(emptyTask);
  //modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  //second modal
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()


  const openAddModal = (column) => {
    setMode(0);
    setCurrentColumn(column);
    onOpen();
  }
  const openEditModal = (task, column) => {
    setMode(1);
    setCurrentTask(task);
    setCurrentColumn(column);
    onOpen();
  }

  const openDetailsModal = (task, column) => {
    setCurrentTask(task);
    setCurrentColumn(column);
    onOpen2();
  }

  const handleEditTask = () => {
    const newState = {
      ...taskState,
      tasks: {
        ...taskState.tasks,
        [currentTask.id]: { ...currentTask },
      },
    }

    setTaskState(newState);
    setCurrentColumn(null)
    setCurrentTask(emptyTask);
    onClose();
  }

  const deleteTask = (id) => {

    const newState = {
      ...taskState,
      tasks: {
        ...taskState.tasks,
      },
      columns: {
        ...taskState.columns,
        [currentColumn.id]: {
          ...currentColumn,
          taskIds: currentColumn.taskIds.filter((taskId) => taskId !== id),
        },
      },
    }

    delete newState.tasks[id];
    console.log(newState);
    setTaskState(newState);
    onClose();
  }

  const handleAddTask = () => {

    //create unique id and check if it is unique
    const id = Math.floor(Math.random() * 10000) + 1;
    const isUnique = taskState.tasks[id] ? false : true;

    while (!isUnique) {
      id = Math.floor(Math.random() * 10000) + 1;
      isUnique = taskState.tasks[id] ? false : true;
    }

    //set current task id
    setCurrentTask({ ...currentTask, id: id });

    const newState = {
      ...taskState,
      tasks: {
        ...taskState.tasks,
        [id]: { ...currentTask, id: id },
      },
      columns: {
        ...taskState.columns,
        [currentColumn.id]: {
          ...currentColumn,
          taskIds: [...currentColumn.taskIds, id], //add new task id to column
        }
      }
    }
    setTaskState(newState);


    setCurrentColumn(null)
    setCurrentTask(emptyTask);
    onClose();
    setMode(0);
  }

  //cases for drag and drop
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex flexDir={"column"}
          minH={"100vh"}
          w={"full"}
          color={"white-text"}
        >
          <Flex py={"3rem"} flexDir={"column"} align={"center"}>
            <Heading fontSize={"3xl"} fontWeight={600} textAlign={"center"}>
              Draggable Project Management Board
            </Heading>
            <Text fontSize={"20px"} mt="20px" fontWeight={600} color="subtle-text">
            </Text>
          </Flex>

          <Flex justify={"center"} px={"4rem"} pb={10} wrap="wrap">
            {taskState.columnOrder.map((columnId) => {
              const column = taskState.columns[columnId]
              const tasks = column.taskIds.map(taskId => taskState.tasks[taskId])
              return <Column
                key={column.id}
                column={column}
                tasks={tasks}
                taskState={taskState}
                setTaskState={setTaskState}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onOpen2={onOpen2}
                openAddModal={openAddModal}
                openEditModal={openEditModal}
                openDetailsModal={openDetailsModal}
              />
            })}
          </Flex>
        </Flex>
      </DragDropContext>

      <ModalOne
        isOpen={isOpen}
        onClose={() => {
          setCurrentTask(emptyTask);
          setCurrentColumn(null);
          setMode(0);
          onClose();
        }}
        handleAddTask={handleAddTask}
        currentColumn={currentColumn}
        mode={mode}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleEditTask={handleEditTask}
        deleteTask={deleteTask}
      />

      <DetailsModal
        isOpen2={isOpen2}
        onClose2={() => {
          setCurrentTask(emptyTask);
          onClose2();
        }}
        openEditModal={openEditModal}
        currentTask={currentTask}
        currentColumn={currentColumn}
        deleteTask={deleteTask}
      />
    </>
  )
}

const emptyTask = {
  title: "",
  notes: "",
}

export default Home;

