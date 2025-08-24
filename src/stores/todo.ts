import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface TodoType {
  id: string
  title: string
  content: string
  category: string
  startDate: Date | null
  endDate: Date | null
  priority: string
  completedDate?: Date | null
  createdAt: Date
}

export interface TodoStore {
  todos: TodoType[]
  addTodo: (todo: TodoType) => void
  getTodoById: (id: string) => TodoType | undefined
  markComplete: (id: string) => void
  updateTodo: (id: string, updated: Partial<TodoType>) => void
  deleteTodo: (id: string) => void
  clearTodos: () => void
}

const stores = {}

export const useTodoStore = (userEmail: string) => {
  if (!stores[userEmail]) {
    stores[userEmail] = create<TodoStore>()(
      persist(
        (set, get) => ({
          todos: [],
          addTodo: (todo: TodoType) => set(state => ({todos: [...state.todos, todo]})),
          getTodoById: (id: string) => get().todos.find(t => t.id === id),
          markComplete: (id: string) =>
            set(state => ({
              todos: state.todos.map(t => (t.id === id ? {...t, completedDate: new Date()} : t)),
            })),
          updateTodo: (id: string, updated: Partial<TodoType>) =>
            set(state => ({
              todos: state.todos.map(t => (t.id === id ? {...t, ...updated} : t)),
            })),
          deleteTodo: (id: string) =>
            set(state => ({
              todos: state.todos.filter(t => t.id !== id),
            })),
          clearTodos: () => set({todos: []}),
        }),
        {
          name: `todo-storage-${userEmail}`,
          storage: createJSONStorage(() => AsyncStorage),
        },
      ),
    )
  }

  return stores[userEmail]
}
