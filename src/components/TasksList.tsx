import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, editTask, removeTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              index={index}
              task={item}
              toggleTaskDone={toggleTaskDone}
              editTask={() => editTask}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}