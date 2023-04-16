import { Card, Title, AreaChart } from "@tremor/react";
import { decksMock } from '../../mock/mockData'
export default function GamesChartDeckWinratioOverTime({data, player}: any){
   
  function formatData(data: any){
    const gameSessionDates = data.map((d: any) => d.gameSessionDate)
    const uniqueGameSessionDates =  [...new Set(gameSessionDates)];
    
    const gameSessionWithDecksWinratio: any[] = []
    uniqueGameSessionDates.forEach((gsd: any) => {
        const gameSessionWithDeckWinratio: any[] = [];
        const gamesUntilDate = data.filter((game: any) => game.gameSessionDate <= gsd)
        
        decksMock.filter((d:any)=> d.ownerId === player).forEach((deck: any) => {
            const gamesCount = gamesUntilDate.filter((game: any) => game.gamePlayers.some((gp: any) => gp.deckName === deck.name))
            const winsCount = gamesUntilDate.filter((game: any) => game.winnerDeckName === deck.name)
            gameSessionWithDeckWinratio.push({
            'deck': deck.name,
            'gamesCount': gamesCount.length,
            'winsCount': winsCount.length
            })
        })
        gameSessionWithDecksWinratio.push({'gameSession': gsd, 'decks': gameSessionWithDeckWinratio})
    })
   //console.log(gameSessionWithDecksWinratio)
    gameSessionWithDecksWinratio.sort((a,b) => a.gameSession < b.gameSession?-1:1)
    const formatedChartData: any[] = []
    gameSessionWithDecksWinratio.forEach((gameSession: any) => {
        const newObj: any = { gameSession : new Date(gameSession.gameSession).toLocaleDateString() };
        gameSession.decks.forEach((deck: any) => {
            newObj[deck.deck] = deck.gamesCount !==0?(deck.winsCount*100/deck.gamesCount):0 ;
        });
        formatedChartData.push(newObj)
    })
    console.log(formatedChartData)
    return formatedChartData
  }
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString() + " %";
  };
  
  return (<Card>
        <Title>Winratio over time</Title>
        <AreaChart
            className="h-72 mt-4"
            data={formatData(data)}
            index="gameSession"
            categories={decksMock.filter((d:any)=> d.ownerId === player).map((d: any) => d.name)}
            colors={["indigo", "cyan", "fuchsia","rose", "yellow", "emerald", "purple"]}
            valueFormatter={dataFormatter}
        />
  </Card>)
}