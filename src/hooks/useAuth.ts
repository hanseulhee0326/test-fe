import {User} from '@/types/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  isAuthLoaded: boolean
  login: (userData: User) => Promise<void>
  logout: () => Promise<void>
  initAuth: () => Promise<void>
}

const STORAGE_KEY = 'auth-storage'

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      user: null,
      isAuthLoaded: false,

      login: async (userData: User) => {
        set({isLoggedIn: true, user: userData})
      },

      logout: async () => {
        set({isLoggedIn: false, user: null})
      },

      initAuth: async () => {
        try {
          const json = await AsyncStorage.getItem(STORAGE_KEY)
          if (json) {
            const data = JSON.parse(json)
            set({
              isLoggedIn: data?.isLoggedIn || false,
              user: data?.user || null,
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          set({isAuthLoaded: true})
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
