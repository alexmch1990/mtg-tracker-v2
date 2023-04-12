import {PayloadAction, createSlice} from "@reduxjs/toolkit"

const DEFAULT_STATE = [
    {date: new Date("01/03/2023").getTime()},
    {date: new Date("04/04/2023").getTime()}
]

export interface Player{
    id: number,
    nombre: string,

}

const initialState: Player[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__players__");
	if (persistedState) {
		return JSON.parse(persistedState).players;
	}
	return DEFAULT_STATE;
})();


export const playerSlice = createSlice({
    name:"player",
    initialState,
    reducers:{
        
    }

})
export default playerSlice.reducer;
export const {  } = playerSlice.actions