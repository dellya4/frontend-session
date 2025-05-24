import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://127.0.0.1:5000';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));

// Asynchronous action for registration new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, birth_date }, { rejectWithValue }) => {
    try {
      // Get POST-request to backend for registration
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, birth_date }),
      });

      const data = await res.json();
      // Check error
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // If we don't have errors, get user's data
      return { username, email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Asynchronous action for user's login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Send POST-request to backend for login
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      // Check error
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // If we don't have errors, get user's data
      return {
        username: data.username,
        email: data.email,
        role: data.role
      };

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice for manage registration and login
 const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: storedUser || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Action for user's logout
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.success = false;
      state.loading = false;
      localStorage.removeItem('currentUser');
    },
    // Action for clear message
    clearMessages: (state) => {
      state.error = null;
      state.success = false;
    },
    // Action for loading user from localStorage
    setCurrentUserFromStorage: (state) => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      state.currentUser = storedUser || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Register ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Login ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessages, setCurrentUserFromStorage} = authSlice.actions;
export default authSlice.reducer;
