import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyExistingTask = tasks.find(task => task.title.toLowerCase() === newTaskTitle.toLowerCase());

    if(alreadyExistingTask) {
      return Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome.');
    }

    const dataNewTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, dataNewTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.find((task) => {
      if (task.id === id) {
        task.done = !task.done
      }
    });

    setTasks([...updatedTasks]);
  }

  function handleEditTask({taskId, taskNewTitle} : EditTaskArgs) {
    const alreadyExistingTask = tasks.find(task => task.title === taskNewTitle);
  
    if(alreadyExistingTask) {
      return Alert.alert('Task já cadastrada!', 'Você não pode cadastrar uma task com o mesmo nome.');
    }

    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.find((task) => {
      if (task.id === taskId) {
        task.title = taskNewTitle;
      }
    });

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
          style: 'destructive',
          onPress: () => {
            setTasks(oldTasks => oldTasks.filter(
              task => task.id !== id
            ));
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={() => handleEditTask}
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