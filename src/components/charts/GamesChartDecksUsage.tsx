import { Card, Title, BarChart  } from "@tremor/react";
import {  playersMock, decksMock } from '../../mock/mockData'
export default function GamesChartDecksUsage({data, player}: any){
   
  function formatData(data: any, player: any){
    const ret:any[] = []
    const playerId = playersMock.filter((p:any) => p.name === player)[0].id
    const decksPlayer = decksMock.filter((d:any) => d.ownerId === playerId)
    const games = data.filter((game :any) => checkGamePlayer(game, decksPlayer))
    console.log(games)
    decksPlayer.forEach((deck: any) => {
      const gamesWithDeck = games.filter((game : any) => game.gamePlayers.some((gp: any) => gp.playerName === player && gp.deckName === deck.name)) 
      const newObj: any = { name : deck.name, '%': (gamesWithDeck.length*100/games.length)};
      ret.push(newObj)
    })
    console.log(ret)
    return ret
  }
  function checkGamePlayer(game: any, decks: any){
    const gamePlayer = game.gamePlayers.filter((gp : any) => gp.playerName === player)[0]
    //console.log(decks)
    return decks.map((d:any) => d.name).includes(gamePlayer.deckName)
  }
    
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString() + " %";
  };
  
  return (
  <>
    <Card>
      <BarChart
        className="mt-6"
        data={formatData(data, player)}
        index="name"
        categories={["%"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  </>)
} 