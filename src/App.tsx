import { Card, Title, Text, Tab, TabList, Grid } from "@tremor/react";
import GameSession from './components/GameSession'
import Game from './components/Game'
import Decks from './components/Decks'
import Stats from './components/Stats'
import { useState } from "react";

export default function App() {
  const [selectedView, setSelectedView] = useState("2");
  return (
    <main>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Manage" />
        <Tab value="2" text="Stats" />
      </TabList>

      {selectedView === "1" ? (
        
        <Card>
          <Grid numColsMd={2} numColsLg={3} className="gap-6 mt-6">
            <GameSession />
            <Game />
            <Decks />
          </Grid>
        </Card>
      ) : (  
        <div className="mt-6">
          <Card>
            <Title>Stats</Title>
            <Stats />
          </Card>
        </div>
      )}
    </main>
  );
}