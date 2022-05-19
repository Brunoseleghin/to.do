import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let taskFound: boolean = false;
    const AllTasks = tasks.map(task => ({ ...task }));

    AllTasks.find((task) => {
      if(task.title.toLowerCase() === newTaskTitle.toLowerCase()) {
        Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome.');
        taskFound = !taskFound;
      }
    });

    if (!taskFound) {
      const dataNewTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }

      setTasks(oldTasks => [...oldTasks, dataNewTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.find((task) => {
      if (task.id === id) {
        task.done = !task.done
      }
    })

    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: remove
        }
      ]
    );

    function remove() {
      setTasks(oldTasks => oldTasks.filter(
        task => task.id !== id
      ));
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})