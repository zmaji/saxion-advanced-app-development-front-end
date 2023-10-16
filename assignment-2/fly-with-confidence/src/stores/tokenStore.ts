// tokenStore.ts
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
    token: string | null,
}

const initialState: AppState = {
    token: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = tokenSlice.actions;

const tokenStore = configureStore({
    reducer: {
        token: tokenSlice.reducer,
    },
});

export default tokenStore;
