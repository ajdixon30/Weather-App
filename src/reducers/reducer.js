import { createReducer } from "@reduxjs/toolkit";
import { setWeather } from "../actions/actions";

const initialState = {}

const weatherReducer = createReducer(initialState, (builder) => {
    builder.addCase(setWeather, (state, action) => {
        console.log(action);
        state = action.payload;
        return state;
    })
})

export default weatherReducer