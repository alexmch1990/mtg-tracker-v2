import { Card, Title, AreaChart } from "@tremor/react";
import { gamesMock, playersMock } from '../mock/mockData'
export default function GamesChartWinratioOverTime({data}: any){
   
  function formatData(data: any){
    const gameSessionDates = data.map((d: any) => d.gameSessionDate)
    const uniqueGameSessionDates =  [...new Set(gameSessionDates)];
    
    const gameSessionsWithPlayerWinratio: any[] = []
    uniqueGameSessionDates.forEach((gsd: any) => {
        const gameSessionWithPlayersWinratio: any[] = [];
        const gamesUntilDate = data.filter((game: any) => game.gameSessionDate <= gsd)
        
        playersMock.forEach((player: any) => {
            const gamesCount = gamesUntilDate.filter((game: any) => game.gamePlayers.some((gp: any) => gp.playerName === player.name))
            const winsCount = gamesUntilDate.filter((game: any) => game.winnerPlayerName === player.name)
            gameSessionWithPlayersWinratio.push({
            'player': player.name,
            'gamesCount': gamesCount.length,
            'winsCount': winsCount.length
            })
        })
        gameSessionsWithPlayerWinratio.push({'gameSession': gsd, 'players': gameSessionWithPlayersWinratio})
    })
    gameSessionsWithPlayerWinratio.sort((a,b) => a.gameSession < b.gameSession?-1:1)
    const formatedChartData: any[] = []
    gameSessionsWithPlayerWinratio.forEach((gameSession: any) => {
        const newObj: any = { gameSession : new Date(gameSession.gameSession).toLocaleDateString() };
        gameSession.players.forEach((player: any) => {
            newObj[player.player] = player.gamesCount !==0?(player.winsCount*100/player.gamesCount):0 ;
        });
        formatedChartData.push(newObj)
    })

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
            categories={playersMock.map(p => p.name)}
            colors={["indigo", "cyan", "fuchsia","rose", "yellow", "emerald", "purple"]}
            valueFormatter={dataFormatter}
        />
  </Card>)
}