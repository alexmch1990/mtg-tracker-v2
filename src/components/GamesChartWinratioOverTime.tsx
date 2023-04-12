import { Card, Title, AreaChart } from "@tremor/react";
import { gamesMock, playersMock } from '../mock/mockData'
export default function GamesChartWinratioOverTime({data}){
   
  function formatData(data){
    const gameSessionDates = data.map(d => d.gameSessionDate)
    const uniqueGameSessionDates =  [...new Set(gameSessionDates)];
    
    const gameSessionsWithPlayerWinratio= []
    uniqueGameSessionDates.forEach(gsd => {
        const gameSessionWithPlayersWinratio = [];
        const gamesUntilDate = data.filter(game => game.gameSessionDate <= gsd)
        
        playersMock.forEach(player => {
            const gamesCount = gamesUntilDate.filter(game => game.gamePlayers.some(gp => gp.playerName === player.name))
            const winsCount = gamesUntilDate.filter(game => game.winnerPlayerName === player.name)
            //console.log(gamesCount)
            gameSessionWithPlayersWinratio.push({
            'player': player.name,
            'gamesCount': gamesCount.length,
            'winsCount': winsCount.length
            })
        })
        gameSessionsWithPlayerWinratio.push({'gameSession': gsd, 'players': gameSessionWithPlayersWinratio})
    })
    gameSessionsWithPlayerWinratio.sort((a,b) => a.gameSession < b.gameSession?-1:1)
    const formatedChartData = []
    gameSessionsWithPlayerWinratio.forEach(gameSession => {
        const newObj = { gameSession: new Date(gameSession.gameSession).toLocaleDateString() };
        gameSession.players.forEach(player => {
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