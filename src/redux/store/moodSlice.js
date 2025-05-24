import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const username = currentUser?.username || null;

// Create unique key for saving mood in localStorage
const moodKey = username ? `mood-${username}` : null;

// Take saving mood
let stored = moodKey ? JSON.parse(localStorage.getItem(moodKey)) : null;
const now = Date.now();
// Check if this data is actual
const isValid = stored && now - stored.timestamp < 30 * 60 * 1000; // 30 минут

// Slice for manage mood
const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    mood: isValid ? stored.value : null
  },
  reducers: {
    // Action for set new mood
    setMood: (state, action) => {
      state.mood = action.payload;
      if (moodKey) {
        localStorage.setItem(moodKey, JSON.stringify({
          value: action.payload,
          timestamp: Date.now()
        }));
      }
    },
    // Action for clear mood
    clearMood: (state) => {
      state.mood = null;
      if (moodKey) {
        localStorage.removeItem(moodKey);
      }
    }
  }
});

export const { setMood, clearMood } = moodSlice.actions;
export default moodSlice.reducer;
