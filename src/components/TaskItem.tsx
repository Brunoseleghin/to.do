import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import penEditIcon from '../assets/icons/edit/penEdit.png';
import trashIcon from '../assets/icons/trash/trash.png'
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({ index, task, toggleTaskDone, editTask, removeTask } : TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue});
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
        </TouchableOpacity>

        <TextInput
          style={task.done ? styles.taskTextDone : styles.taskText}
          ref={textInputRef}
          value={taskNewTitleValue}
          editable={isEditing}
          onChangeText={setTaskNewTitleValue}
          onSubmitEditing={handleSubmitEditing}
          onEndEditing={handleCancelEditing}
        />
      </View>
      
      <View style={styles.wrapperButton}>
        { 
          isEditing ? (
            <TouchableOpacity
            style={styles.editButton}
            onPress={handleCancelEditing}
            activeOpacity={0.5}
            >
              <Icon 
                name="x"
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity> 
          ) : (
            <TouchableOpacity
            style={styles.editButton}
            onPress={handleStartEditing}
            activeOpacity={0.5}
            >
              <Image 
                source={penEditIcon}
              />
            </TouchableOpacity> 
          )
        }

        <View style={styles.dividerButtons} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={styles.removeButton}
          onPress={() => removeTask(task.id)}
          activeOpacity={0.5}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskButton: {
    paddingLeft: 24,
    paddingVertical: 18,
    marginBottom: 4,
    borderRadius: 4,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    paddingVertical: 0,
    width: 230
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    paddingVertical: 0,
    width: 230
  },
  wrapperButton: {
    flexDirection: 'row',
  },
  editButton: {
    paddingRight: 12,
    paddingLeft: 24
  },
  dividerButtons: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  removeButton: {
    paddingRight: 24,
    paddingLeft: 12
  }
})