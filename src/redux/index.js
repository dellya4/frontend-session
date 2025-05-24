import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import moodReducer from './store/moodSlice';
import usersReducer from './store/usersSlice'
import themeReducer from './store/themeSlice';

// Store, which join all redusers and we add sets
const store = configureStore({
    reducer: {
        auth: authReducer, // Authorized
        mood: moodReducer, // Mood
        users: usersReducer, // Users
        theme: themeReducer, // Theme
    },
});

export default store;
