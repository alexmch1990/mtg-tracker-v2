import { Grid,DateRangePicker, DateRangePickerValue,Button,Text, Card, TabList, Tab, Title, MultiSelectBox, MultiSelectBoxItem , Badge} from "@tremor/react";
import { useState } from 'react'
import { gamesMock, playersMock, decksMock } from '../mock/mockData'
import GamesTable from '../components/GamesTable'
import GamesChartWinratioOverTime from './GamesChartWinratioOverTime'

export default function Stats (){
    const [selectedView, setSelectedView] = useState("1");
    const [multiValuePlayers, setMultiValuePlayers] = useState(playersMock.map(p => p.name));
    const [multiValueDecks, setMultiValueDecks] = useState(decksMock.map(p => p.name));
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([new Date(2023, 0 , 1),new Date(),]);
    return (
        <>
          <Grid numColsLg={3} className="mt-6 gap-6">
            <Card>
                <Title>Graficos</Title>
                <div className="h-28" />
            </Card>
            <Card >
                <Title>Filtros</Title>
                <Text>Dates</Text>
                <DateRangePicker className="max-w-sm mx-auto" enableDropdown={false} value={dateRange} onValueChange={setDateRange}/>
                
                <Title>Players</Title>
                <MultiSelectBox value={multiValuePlayers} onValueChange={setMultiValuePlayers}>
                    { playersMock.map(p => <MultiSelectBoxItem key={p.name} value={p.name} text={p.name}/>) }
                </MultiSelectBox>
                
                <Title>Decks</Title>
                <MultiSelectBox value={multiValueDecks} onValueChange={setMultiValueDecks}>
                    { decksMock.map(d => <MultiSelectBoxItem key={d.name} value={d.name} text={d.name} />) }
                </MultiSelectBox>
                
                <Button style={{"marginTop":"8px"}}>Reset</Button>
                <div className="h-28" />
            </Card>
            <Card>
                <Title>Graficos</Title>
                <div className="h-28" />
            </Card>
          </Grid>

          <div className="mt-6">
            <TabList defaultValue="1" onValueChange={(value) => setSelectedView(value)} className="mt-6">
                <Tab value="1" text="Charts" />
                <Tab value="2" text="Details" />
            </TabList>
            {selectedView === "1" ? (
                <Card>
                    <GamesChartWinratioOverTime data={
                        gamesMock
                            .filter(g => g.gamePlayers.map(gg => gg.playerName).every(pn => multiValuePlayers.includes(pn)))
                            .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                            .filter(g => new Date(g.gameSessionDate) > dateRange[0] && new Date(g.gameSessionDate) < dateRange[1])
                        }/>
                </Card>
            ):(
                <Card>
                    <GamesTable data={
                        gamesMock
                            .filter(g => g.gamePlayers.map(gg => gg.playerName).every(pn => multiValuePlayers.includes(pn)))
                            .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                            .filter(g => new Date(g.gameSessionDate) > dateRange[0] && new Date(g.gameSessionDate) < dateRange[1])
                        }/>
                </Card>
            )
            }
          </div>
        </>
    )
}