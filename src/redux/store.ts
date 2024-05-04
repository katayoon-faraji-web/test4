import { configureStore } from '@reduxjs/toolkit'
import userInforSlice from './reducers/userInforSlice'
import windowReducer from './reducers/windowReducer'
export const store = configureStore({
  reducer: {
    userInfo : userInforSlice,
    windowWidth:windowReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch