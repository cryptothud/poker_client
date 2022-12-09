import React, { useState, useEffect } from 'react'
import Card from './Card'
import Spinner from '../utils/Spinner'
import {
    HStack,
    VStack,
    Flex,
    Heading,
} from '@chakra-ui/react'

export default function Cards({ numberOfTurns, player1Deck, player2Deck, player3Deck, player4Deck, houseDeck, gameOver, currentUser, player1Chips, player2Chips, player3Chips, player4Chips, turn, winner, player1Name, player2Name, player3Name, player4Name }) {
    const [p1Heading, setP1Heading] = useState()
    const [p2Heading, setP2Heading] = useState()
    const [p3Heading, setP3Heading] = useState()
    const [p4Heading, setP4Heading] = useState()
    const [houseHeading, setHouseHeading] = useState()

    useEffect(() => {
        if (numberOfTurns < 4) setHouseHeading('Buy In to reveal cards')
        else if (numberOfTurns >= 4 && numberOfTurns < 8) setHouseHeading('Flop')
        else if (numberOfTurns >= 8 && numberOfTurns < 12) setHouseHeading('Turn')
        else if (numberOfTurns >= 12 && numberOfTurns < 16) setHouseHeading('River')
        else if (numberOfTurns >= 16) setHouseHeading('Game Over!')
    }, [numberOfTurns])

    useEffect(() => {
        if (currentUser === 'Player 1' && winner === player1Name) setP1Heading(`👑 ${player1Name} (You)`)
        else if (currentUser === 'Player 1') setP1Heading(`${player1Name} (You)`)
        else if (winner === player1Name) setP1Heading(`👑 ${player1Name}`)
        else setP1Heading(player1Name)
        if (currentUser === 'Player 2' && winner === player2Name) setP2Heading(`👑 ${player2Name} (You)`)
        else if (currentUser === 'Player 2') setP2Heading(`${player2Name} (You)`)
        else if (winner === player2Name) setP2Heading(`👑 ${player2Name}`)
        else setP2Heading(player2Name)

        if (currentUser === 'Player 3' && winner === player3Name) setP3Heading(`👑 ${player3Name} (You)`)
        else if (currentUser === 'Player 3') setP3Heading(`${player3Name} (You)`)
        else if (winner === player3Name) setP3Heading(`👑 ${player3Name}`)
        else setP3Heading(player3Name)
        if (currentUser === 'Player 4' && winner === player4Name) setP4Heading(`👑 ${player4Name} (You)`)
        else if (currentUser === 'Player 4') setP4Heading(`${player4Name} (You)`)
        else if (winner === player4Name) setP4Heading(`👑 ${player4Name}`)
        else setP4Heading(player4Name)
    }, [winner, player1Name, player2Name, player3Name, player4Name, currentUser])

    return (
        <Flex justify="center" align="center" flexDir="column">

            <Heading my="0.5rem" fontFamily="inherit" size="md">{houseHeading}</Heading>
            <Flex justify="center" align="center" flexDir="row" gridGap="1rem" flexWrap="wrap">
                {houseDeck && houseDeck.map(item => {
                    if (item) return <Card value={item.value} suit={(numberOfTurns >= 4) ? item.suit : "BACK"} className="card" />
                })}
            </Flex>


            <div className="player1Cards">
                <Heading textAlign={"center"} fontFamily="inherit" size="md" style={{ color: (winner === 'Player 1') ? "#FFD700" : "inherit" }}>{p1Heading}</Heading>
                <HStack spacing="1.5rem" position={"relative"}>
                    {currentUser !== 'Player 1' && turn === 'Player 1' && gameOver === false && <Spinner />}
                    <VStack className="chipsCountWrapper">
                        <Heading size="md" fontWeight="semibold" fontFamily="inherit" className="chipsCount">{player1Chips}</Heading>
                    </VStack>
                    <HStack className='cardHolder'>
                        {player1Deck && player1Deck.map(item => {
                            if (((currentUser === 'Player 1') || (gameOver === true)) && item) return <Card className="player-card" value={item.value} suit={item.suit} />
                            else return <Card className="player-card-back" suit='BACK' />
                        })}
                    </HStack>
                </HStack>
            </div>
            <div className="player2Cards">
                <Heading textAlign={"center"} fontFamily="inherit" size="md" style={{ color: (winner === 'Player 2') ? "#FFD700" : "inherit" }}>{p2Heading}</Heading>
                <HStack spacing="1.5rem" position={"relative"}>
                    {currentUser !== 'Player 2' && turn === 'Player 2' && gameOver === false && <Spinner />}
                    <VStack className="chipsCountWrapper">
                        <Heading size="md" fontWeight="semibold" fontFamily="inherit" className="chipsCount">{player2Chips}</Heading>
                    </VStack>
                    <HStack className='cardHolder'>
                        {player2Deck && player2Deck.map(item => {
                            if (((currentUser === 'Player 2') || (gameOver === true)) && item) return <Card className="player-card" value={item.value} suit={item.suit} />
                            else return <Card className="player-card-back" suit='BACK' />
                        })}
                    </HStack>
                </HStack>
            </div>
            <div className="player3Cards">
                <Heading textAlign={"center"} fontFamily="inherit" size="md" style={{ color: (winner === 'Player 3') ? "#FFD700" : "inherit" }}>{p3Heading}</Heading>
                <HStack spacing="1.5rem" position={"relative"}>
                    {currentUser !== 'Player 3' && turn === 'Player 3' && gameOver === false && <Spinner />}
                    <VStack className="chipsCountWrapper">
                        <Heading size="md" fontWeight="semibold" fontFamily="inherit" className="chipsCount">{player3Chips}</Heading>
                    </VStack>
                    <HStack className='cardHolder'>
                        {player3Deck && player3Deck.map(item => {
                            console.log(item)
                            if (((currentUser === 'Player 3') || (gameOver === true)) && item) return <Card className="player-card" value={item.value} suit={item.suit} />
                            else return <Card className="player-card-back" suit='BACK' />
                        })}
                    </HStack>
                </HStack>
            </div>
            <div className="player4Cards">
                <Heading textAlign={"center"} fontFamily="inherit" size="md" style={{ color: (winner === 'Player 4') ? "#FFD700" : "inherit" }}>{p4Heading}</Heading>
                <HStack spacing="1.5rem" position={"relative"}>
                    {currentUser !== 'Player 4' && turn === 'Player 4' && gameOver === false && <Spinner />}
                    <VStack className="chipsCountWrapper">
                        <Heading size="md" fontWeight="semibold" fontFamily="inherit" className="chipsCount">{player4Chips}</Heading>
                    </VStack>
                    <HStack className='cardHolder'>
                        {player4Deck && player4Deck.map(item => {
                            if (((currentUser === 'Player 4') || (gameOver === true)) && item) return <Card className="player-card" value={item.value} suit={item.suit} />
                            else return <Card className="player-card-back" suit='BACK' />
                        })}
                    </HStack>
                </HStack>
            </div>
        </Flex>
    )
}
