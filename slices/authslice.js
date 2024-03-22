import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, { payload: { user, jwt } }) => {
        // console.log('setCredentials', user, token);
      state.user = user
      state.token = jwt
    },
    setUser: (
      state,
      { payload: { user } }
    ) => {
        // console.log('setCredentials', user, token);
      state.user = user
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, setUser, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
