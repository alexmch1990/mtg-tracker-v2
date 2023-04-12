import {useAppDispatch, useAppSelector } from "../hooks/store"
import { addNewGameSession} from "../store/GameSession/slice"
export const useGameSessionActions = () => {
    const dispatch = useAppDispatch();

    const addGameSession = (date: any) =>{
        dispatch(addNewGameSession({date}))
    }
    return { addGameSession }
}