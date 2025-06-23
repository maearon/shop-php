// apps\web\store\sessionSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import sessionApi from '@/api/endpoints/sessionApi'

// ---- User model định nghĩa nhất quán với BE JWT response ----
export interface User {
  readonly id: string
  email: string
  name: string
  admin: boolean
  gravatar: string
}

// ---- Slice state ----
export interface UserState {
  loggedIn: boolean
  value: User | null
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: UserState = {
  loggedIn: false,
  value: null,
  status: 'idle',
  error: null,
}

// ---- Async thunk: lấy user hiện tại từ /sessions (dựa vào JWT) ----
export const fetchUser = createAsyncThunk(
  'session/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await sessionApi.me()
      return response.user
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Cannot fetch user')
    }
  }
)

// ---- Slice ----
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false
      state.value = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle'
        state.loggedIn = true
        state.value = action.payload
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.loggedIn = false
        state.value = null
        state.error = action.payload as string
      })
  },
})

// ---- Selector ----
export const selectUser = (state: RootState) => state.session
export const selectCurrentUser = (state: RootState) => state.session.value
export const isAuthenticated = (state: RootState) =>
  !!state.session.loggedIn && !!state.session.value?.email

// ---- Export ----
export const { logout } = sessionSlice.actions
export default sessionSlice.reducer
