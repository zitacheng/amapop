import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from './services/auth'
import authReducer from './slices/authslice'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
}))


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({serializableCheck: false}).concat(api.middleware).concat(thunk)
  }
    ,
})

export const persistor = persistStore(store)


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
