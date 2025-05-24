import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous action for loading users from backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const response = await fetch(`http://127.0.0.1:5000/auth/profile?email=${currentUser.email}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format');
    return data;
});
// Slise for manage list of users
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;
