import { Card, Title, Button,Divider, List, ListItem   } from "@tremor/react";

import { useGameSessionActions } from "../hooks/useGameSessionActions"
import { useAppSelector } from "../hooks/store";

export default function GameSession(){ 
    const { addGameSession } = useGameSessionActions()
    const dates = useAppSelector((state) => state.gameSession);
    console.log(dates)
    
    function handleOnSubmit(event: any){
        event.preventDefault()
        const form = event.target;
		const formData = new FormData(form);
        const fecha = formData.get("fecha") as string;
        addGameSession(new Date(fecha).getTime())
    }
    return (
        <Card>
            <Title>Create new game session</Title>
            {/* Placeholder to set height */}
            <div className="h-28" />
            <form onSubmit={handleOnSubmit}>
            <input type='date' 
                style={{ 'padding': '10px', 'border': '1px solid #6b7280','borderRadius': '5px', 'width': '240px','marginBottom': '20px'}}
                id='fecha' name='fecha' required/>
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Button>
                <Divider />
                <List>
                    {
                    dates.map((d: any) => (
                        <ListItem key={d.date}>
                            <span>{new Date(d.date).toLocaleDateString()}</span>
                        </ListItem>
                    ))}
                </List>
            </form>

        </Card>
    )
}