import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '@/components/shared/api/index';
import { RootState } from '@/store/store';
import sessionApi from '@/components/shared/api/sessionApi';

export interface User {
  readonly id: string
  email: string
  name: string
  admin: boolean
}

export interface UserState {
  loggedIn: boolean
  value: User
  status: 'idle' | 'loading' | 'failed'
  error: string
}

const initialState: UserState = {
  loggedIn: false,
  value: {} as User,
  status: 'idle',
  error: ''
};

export const fetchUser = createAsyncThunk('session/getCurrentUser', async (_, thunkAPI) => {
  try {
    const response = await sessionApi.index();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Cannot fetch user');
  }
});

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action: any) => {
        state.status = 'idle'
        state.loggedIn = true
        state.value = action.payload.user
        state.error = ''
      })
      .addCase(fetchUser.rejected, (state, action: any) => {
        state.status = 'idle'
        state.loggedIn = false
        state.value = {} as User
        state.error = action.payload
      });
  },
});

export const selectUser = (state: RootState) => state.session;

export default sessionSlice.reducer;
