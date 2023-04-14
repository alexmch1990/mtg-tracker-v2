import {AreaChart, Card, Title, BarChart  } from "@tremor/react";
import {  playersMock, decksMock } from '../../mock/mockData'
export default function GamesChartDecksUsage({data, player}: any){
  const playerId = playersMock.filter((p:any) => p.name === player)[0].id
  const decksPlayer = decksMock.filter((d:any) => d.ownerId === playerId)
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
  function aaa(data: any, player: any){
    const gameSessionDates = data.map((d: any) => d.gameSessionDate)
    const uniqueGameSessionDates =  [...new Set(gameSessionDates)];
    

    const gameSessionsWithDeckUsage: any[] = []
    uniqueGameSessionDates.forEach((gsd: any) => {
        const gameSessionWithPlayersWinratio: any[] = [];
        const games = data.filter((game :any) => checkGamePlayer(game, decksPlayer))
        const gamesUntilDate = games.filter((game: any) => game.gameSessionDate <= gsd)
        
        decksPlayer.forEach((deck: any) => {
          const gamesWithDeck = gamesUntilDate.filter((game : any) => game.gamePlayers.some((gp: any) => gp.playerName === player && gp.deckName === deck.name)) 

          gameSessionWithPlayersWinratio.push({
            'deck': deck.name,
            'usage': (gamesWithDeck.length*100/games.length)
          })

        })
        gameSessionsWithDeckUsage.push({'gameSession': gsd, 'decks': gameSessionWithPlayersWinratio})
    })
    gameSessionsWithDeckUsage.sort((a,b) => a.gameSession < b.gameSession?-1:1)
    const formatedChartData: any[] = []
    gameSessionsWithDeckUsage.forEach((gameSession: any) => {
        const newObj: any = { gameSession : new Date(gameSession.gameSession).toLocaleDateString() };
        gameSession.decks.forEach((deck: any) => {
            newObj[deck.deck] = deck.usage ;
        });
        formatedChartData.push(newObj)
    })

    return formatedChartData
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
    <AreaChart
            className="h-72 mt-4"
            data={aaa(data, player)}
            index="gameSession"
            categories={decksPlayer.map(d => d.name)}
            colors={["indigo", "cyan", "fuchsia","rose", "yellow", "emerald", "purple"]}
            valueFormatter={dataFormatter}
        />
    </Card>
  </>)
} 