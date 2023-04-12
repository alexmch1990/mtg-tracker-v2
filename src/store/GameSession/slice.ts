import {PayloadAction, createSlice} from "@reduxjs/toolkit"

const DEFAULT_STATE = [
    {date: new Date("01/03/2023").getTime()},
    {date: new Date("04/04/2023").getTime()}
]


const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).gameSession;
	}
	return DEFAULT_STATE;
})();


export const gameSessionSlice = createSlice({
    name:"gameSession",
    initialState,
    reducers:{
        addNewGameSession: (state, action) =>{
            return [...state, {...action.payload}]
        }
    }

})
export default gameSessionSlice.reducer;
export const { addNewGameSession } = gameSessionSlice.actions