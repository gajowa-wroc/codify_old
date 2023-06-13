import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { getFirebase, actionTypes as rrfActionTypes } from 'react-redux-firebase'
import { constants as rfConstants } from 'redux-firestore'

import userReducer from './redux/userSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    //blacklist: [pokemonApi.reducerPath],    // strongly recommended to blacklist any api(s) 
};

const rootReducer = combineReducers({
    
    user: userReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    // just ignore every redux-firebase and react-redux-firebase action type
                    ...Object.keys(rfConstants.actionTypes).map(
                        (type) => `${rfConstants.actionsPrefix}/${type}`
                    ),
                    ...Object.keys(rrfActionTypes).map(
                        (type) => `@@reactReduxFirebase/${type}`
                    ),
                ],
                //ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                //ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: ['firebase', 'firestore'],
            },

            thunk: {
                extraArgument: {
                    getFirebase,
                },
            },
        }),
})

const persistor = persistStore(store)

export { store, persistor }