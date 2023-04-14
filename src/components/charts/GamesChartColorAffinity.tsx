import { Card, Title, BarChart  } from "@tremor/react";
import {  playersMock, decksMock } from '../../mock/mockData'
export default function GamesChartColorAffinity({data, player}: any){
   
  function formatData(data: any, player: any){
    var black = 0, blue = 0, red = 0, white = 0, green = 0
    data.forEach((game: any) =>{
      game.gamePlayers.filter((gp:any) => gp.playerName === player).forEach((gp:any) => {
        decksMock.forEach((deck: any) => {
          if(gp.deckName === deck.name){
            if(deck.colors.includes('Black'))black++;
            if(deck.colors.includes('Blue'))blue++;
            if(deck.colors.includes('Red'))red++;
            if(deck.colors.includes('White'))white++;
            if(deck.colors.includes('Green'))green++;
          }
        })
      })
    })
    const ret: any[] = [
      {
        name: 'Black',
        'presence': black
      },
      {
        name: 'Blue',
        'presence': blue
      },
      {
        name: 'Red',
        'presence': red
      },
      {
        name: 'White',
        'presence': white
      },
      {
        name: 'Green',
        'presence': green
      },
    ]
    return ret
  }
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };
  
  return (
  <>
    <Card>
      <BarChart
        className="mt-6"
        data={formatData(data, player)}
        index="name"
        categories={["presence"]}
        colors={["gray","blue","red","yellow","green"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  </>)
} 