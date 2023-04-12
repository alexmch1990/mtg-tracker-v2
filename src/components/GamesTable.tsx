import { Card, Title,Badge,Text, Table,TableHead,TableHeaderCell,TableBody,TableRow,TableCell} from "@tremor/react";

export default function GamesTable({data}){
    return (
        <Card>
        <Title>Aaa</Title><Badge>{data.length}</Badge>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Players</TableHeaderCell>
              <TableHeaderCell>Starting Player</TableHeaderCell>
              <TableHeaderCell>Winner</TableHeaderCell>
              <TableHeaderCell>Turn</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.gameSessionDate}</TableCell>
                <TableCell>
                    {d.gamePlayers.map((gp)=>(<><span><span>{gp.playerName}</span><span> - </span><span>{gp.deckName}</span></span><span> | </span></>))}
                </TableCell>
                <TableCell>
                    <Text>{d.winnerPlayerName}</Text>
                </TableCell>
                <TableCell>
                    <Text>{d.startingPlayerName}</Text>
                </TableCell>
                <TableCell>
                    <Text>{d.turns}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )
}