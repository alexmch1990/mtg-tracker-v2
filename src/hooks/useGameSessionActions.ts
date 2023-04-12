import {useAppDispatch, useAppSelector } from "../hooks/store"
import {type GameSession, addNewGameSession} from "../store/GameSession/slice"
export const useGameSessionActions = () => {
    const dispatch = useAppDispatch();

    const addGameSession = (date: GameSession) =>{
        dispatch(addNewGameSession({date}))
    }
    return { addGameSession }
}