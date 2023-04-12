import { Card, Title, TextInput, Button,SelectBox, SelectBoxItem , List, ListItem, Toggle, ToggleItem  } from "@tremor/react";
import {useState} from 'react'
import { playersMock, decksMock } from '../mock/mockData'
export default function Game(){
    const [crossdecks, setCrossdecks] = useState(false)
    const [players, setPlayers] = useState(playersMock)
    const [decks, setDecks] = useState(decksMock)
    const [playerWithDeck, setPlayerWithDeck] = useState([])
    const [playerSelected, setPlayerSelected] = useState("1")
    const [deckSelected, setDeckSelected] = useState("")
    function handleAddPlayerDeckClick(e){
        e.preventDefault()
        console.log(deckSelected)
        if(deckSelected === '')return 
        const dp ={
            id: crypto.randomUUID(),
            player: players.findLast((p)=> p.id === playerSelected)?.name,
            deck: decks.findLast((d)=> d.id===deckSelected)?.name
        }
        setDecks(decks.filter(d=>d.id!==deckSelected))
        setPlayers(players.filter(p=>p.id!==playerSelected))
        setPlayerWithDeck(playerWithDeck.concat(dp))
    }
    return (
        <Card>
            <form>
                <Title>Create new Game</Title>
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </Button>
                <br />
                <label>Turns </label>
                <TextInput placeholder="Number of turns" />
                <label>Player </label>
                <SelectBox onValueChange={(value) => setPlayerSelected(value)} defaultValue={playerSelected} >
                    {players.map((p)=> (<SelectBoxItem value={p.id} text={p.name} />))}
                </SelectBox>
                <label>Deck </label>
                <Toggle color="zinc" defaultValue="1" onValueChange={() => setCrossdecks(!crossdecks)}>
                    <ToggleItem value="1" text="Own Decks" />
                    <ToggleItem value="2" text="Cross Decks" />
                </Toggle>
                <SelectBox onValueChange={(value) => setDeckSelected(value)} defaultValue="-1" >
                    {
                        crossdecks?
                        decks.map((p)=> (<SelectBoxItem value={p.id} text={p.name} />)):
                        decks.filter(d => d.ownerId === playerSelected).map((p)=> (<SelectBoxItem value={p.id} text={p.name} />))
                       
                    }
                </SelectBox>
                <Button onClick={handleAddPlayerDeckClick}>Add</Button>
                <Card className="max-w-xs">
                    <Title>Players</Title>
                    <List>
                        {playerWithDeck.map((p) => (
                            <ListItem key={p.id}>
                                <input type='checkbox'></input>
                                <span>{p.player}</span>
                                <span>{p.deck}</span>
                            </ListItem>
                        ))}
                    </List>
                </Card>
                <Button>Create game</Button>
            </form>
        </Card>
    )
}