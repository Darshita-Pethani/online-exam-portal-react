// response through data malta hoy ane jene dispatch ma set karayu hoy a payload ma baki je initial state ma ane
// set karati vakhte je type sathe je key define kari hoy a varible name lakjvannu action. je dispatch ma lakhyu hoy a

import { combineReducers, legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import customizationReducer from './customizationReducer'
import userReducer from './userReducer'
import commonReducer from './commonReducer'

// set reducer to the localStorage
const persistConfig = {
    key: 'userData',
    storage,
    whitelist: ['user', 'customization'],
}
const rootReducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    common: commonReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
