import { createStore } from 'redux';
import authReducer from './reducers/auth';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

// const persistedReducer = persistReducer(persistConfig, authReducer)

const store = createStore(authReducer);
// export default () => {
//     const store = createStore(persistedReducer);
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }
  
export default store;