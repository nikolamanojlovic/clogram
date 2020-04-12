import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistanceConfig = {
    key: 'cloggram',
    storage: storage,
};

function configureStore(initialState = {}) {
    const store = createStore(
        persistReducer(persistanceConfig, rootReducer),
        initialState,
        applyMiddleware(thunk)
        + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );

    persistStore(store);
    return store;
}

export const store = configureStore();