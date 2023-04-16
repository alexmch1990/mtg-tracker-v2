import { Col, List, ListItem, Grid,DateRangePicker, DateRangePickerValue,Button,Text, Card, TabList, Tab, Title, MultiSelectBox, MultiSelectBoxItem , Badge, SelectBox, SelectBoxItem} from "@tremor/react";
import { useState } from 'react'
import { gamesMock, playersMock, decksMock } from '../mock/mockData'
import GamesTable from '../components/GamesTable'
import GamesChartWinratioOverTime from './charts/GamesChartWinratioOverTime'
import GamesChartDecksUsage from './charts/GamesChartDecksUsage'
import GamesChartDecksUsageOverTime from './charts/GamesChartDecksUsageOverTime'
import GamesChartColorPresence from './charts/GamesChartColorPresence'
import GamesChartColorAffinity from './charts/GamesChartColorAffinity'
import GamesChartDeckWinratioOverTime from './charts/GamesChartDeckWinratioOverTime'

export default function Stats (){
    const [chartSelected, setChartSelected] = useState("WinratioOverTime")
    const [selectedView, setSelectedView] = useState("1");
    const [multiValuePlayers, setMultiValuePlayers] = useState(playersMock.map(p => p.name));
    const [playerSelected, setPlayerSelected] = useState(playersMock[0].name)
    const [multiValueDecks, setMultiValueDecks] = useState(decksMock.map(p => p.name));
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([new Date(2023, 0 , 1),new Date(),]);
    const selectedChart = () => {
        switch(chartSelected){
            case 'WinratioOverTime':
                return getWinratioOverTimeChart();
            case 'DecksUsage':
                return (<Card><GamesChartDecksUsage 
                                data={gamesMock
                                        .filter((g : any)=> g.gamePlayers.some((gp : any) => gp.playerName === playerSelected))
                                        .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                                        .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))}
                                player={playerSelected}/></Card>)
            case 'DecksUsageOverTime':
                return (<Card><GamesChartDecksUsageOverTime 
                                data={gamesMock
                                    .filter((g : any)=> g.gamePlayers.some((gp : any) => gp.playerName === playerSelected))
                                    .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                                    .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))}

                                player={playerSelected}/></Card>)
            case 'ColorAffinity':
                return (<Card><GamesChartColorAffinity
                    data={
                            gamesMock
                                .filter((g : any)=> g.gamePlayers.some((gp : any) => gp.playerName === playerSelected))
                                .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                                .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                        } player={playerSelected}/>
                            </Card>)
            case 'ColorPresence':
                return (<Card><GamesChartColorPresence 
                    data={
                            gamesMock
                                .filter(g => g.gamePlayers.map(gg => gg.playerName).every(pn => multiValuePlayers.includes(pn)))
                                .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                                .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                        }/></Card>)
            case 'DeckWinratioOverTime':{
                return (<Card>
                    {
                        <GamesChartDeckWinratioOverTime data={
                            gamesMock
                                .filter((g : any)=> g.gamePlayers.some((gp : any) => gp.playerName === playerSelected))
                                .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                                .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                            } player={playersMock.filter(p => p.name === playerSelected)[0].id} />
                    }
                </Card>)
            }
            default:
                return

        }
    }
    const selectedFilters = () => {
        switch(chartSelected){
            case 'WinratioOverTime':
            case 'ColorPresence':
                return getFiltersMultiplayer();
            case 'ColorAffinity':
            case 'DecksUsage':
            case 'DecksUsageOverTime':
            case 'DeckWinratioOverTime':
                return getFiltersSingleplayer();
            default:
                return

        }
    }
    const getWinratioOverTimeChart = () => {
        return (<div className="mt-6">
                <TabList defaultValue="1" onValueChange={(value) => setSelectedView(value)} className="mt-6">
                    <Tab value="1" text="Charts" />
                    <Tab value="2" text="Details" />
                </TabList>
                {selectedView === "1" ? (
                        <Card>
                            {
                                
                                <GamesChartWinratioOverTime data={
                                    gamesMock
                                        .filter(g => g.gamePlayers.map(gg => gg.playerName).every(pn => multiValuePlayers.includes(pn)))
                                        .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                                        .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                                    }/>
                                
                            }
                        </Card>
                    ):(
                        <Card>
                            <GamesTable data={
                                gamesMock
                                    .filter(g => g.gamePlayers.map(gg => gg.playerName).every(pn => multiValuePlayers.includes(pn)))
                                    .filter(g => g.gamePlayers.map(gg => gg.deckName).every(pn => multiValueDecks.includes(pn)))
                                    .filter(g => new Date(g.gameSessionDate) > dateRange[0]! && new Date(g.gameSessionDate) < dateRange[1]!)
                                }/>
                        </Card>
                    )
                }
            </div>)
    }
    const getFiltersMultiplayer = () =>{
        return (
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
        )
    }
    const getFiltersSingleplayer = () =>{
        return (
            <Card >
                    <Title>Filtros</Title>
                    <Text>Dates</Text>
                    <DateRangePicker className="max-w-sm mx-auto" enableDropdown={false} value={dateRange} onValueChange={setDateRange}/>
                    
                    <Title>Players</Title>
                    <SelectBox onValueChange={(v) => setPlayerSelected(v)} defaultValue={playerSelected} >
                            { playersMock.map(p => <SelectBoxItem key={p.name} value={p.name} text={p.name}/>) }
                    </SelectBox>
                    
                    <Title>Decks</Title>
                    <MultiSelectBox value={multiValueDecks} onValueChange={setMultiValueDecks}>
                        { decksMock.map(d => <MultiSelectBoxItem key={d.name} value={d.name} text={d.name} />) }
                    </MultiSelectBox>
                    
                    <Button style={{"marginTop":"8px"}}>Reset</Button>
                    <div className="h-28" />
                </Card>
        )
    }
    const getFiltersNoplayer = () =>{
        return (
            <Card >
                    <Title>Filtros</Title>
                    <Text>Dates</Text>
                    <DateRangePicker className="max-w-sm mx-auto" enableDropdown={false} value={dateRange} onValueChange={setDateRange}/>
                    
                    <Title>Decks</Title>
                    <MultiSelectBox value={multiValueDecks} onValueChange={setMultiValueDecks}>
                        { decksMock.map(d => <MultiSelectBoxItem key={d.name} value={d.name} text={d.name} />) }
                    </MultiSelectBox>
                    
                    <Button style={{"marginTop":"8px"}}>Reset</Button>
                    <div className="h-28" />
                </Card>
        )
    }
    return (
        <>
            <Grid numColsLg={3} className="mt-6 gap-6">
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card >
                        <Title>Graficos</Title>
                        <List>   
                            <ListItem><button onClick={()=>{setChartSelected("WinratioOverTime")}}>Winratio over time</button></ListItem>
                            <ListItem><button onClick={()=>{setChartSelected("DecksUsage")}}>Decks usage</button></ListItem>
                            <ListItem><button onClick={()=>{setChartSelected("DecksUsageOverTime")}}>Decks usage over time</button></ListItem>
                            <ListItem><button onClick={()=>{setChartSelected("DeckWinratioOverTime")}}>Decks winratio over time</button></ListItem>
                            <ListItem><button onClick={()=>{setChartSelected("ColorPresence")}}>Color presence</button></ListItem>
                            <ListItem><button onClick={()=>{setChartSelected("ColorAffinity")}}>Color affinity</button></ListItem>
                            
                        </List>
                        <div className="h-28" />
                    </Card>
                </Col>
                {selectedFilters()}
                
            </Grid>
            {selectedChart()}
        </>
    )
}