import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import randomCodeGenerator from '../../utils/randomCodeGenerator'
import './Homepage.css'
import io from 'socket.io-client'
import { UserContext } from '../../utils/UserContext'
import SignIn from '../../components/auth/SignIn'
import {
    Heading,
    VStack,
    Spacer,
    Flex
} from '@chakra-ui/react'
import WaitingButton from './WaitingButton'
import GameCodeModal from './GameCodeModal'
import SignUp from '../auth/SignUp'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

let socket
const ENDPOINT = process.env.REACT_APP_ENDPOINT

const Homepage = () => {
    const [waiting, setWaiting] = useState([])
    const [waitingToggle, setWaitingToggle] = useState(false)
    const [code, setCode] = useState('')
    const { user } = useContext(UserContext)

    const { publicKey } = useWallet()

    useEffect(() => {
        const connectionOptions = {
            "forceNew": true,
            "reconnectionAttempts": "Infinity",
            "transports": ["websocket"]
        }
        socket = io.connect(ENDPOINT, connectionOptions)

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('waitingDisconnection')
            //shut down connnection instance
            socket.off()
        }
    }, [])

    useEffect(() => {
        socket.on('waitingRoomData', ({ waiting }) => {
            console.log(waiting)
            waiting && setWaiting(waiting)
        })
        socket.on('randomCode', ({ code }) => {
            code && setCode(code)
        })
    }, [])

    useEffect(() => {
        !waitingToggle && socket.emit('waitingDisconnection')
        waitingToggle && socket.emit('waiting')
    }, [waitingToggle])

    if (waiting.length >= 2) {
        const users = waiting.slice(0, 2)
        socket.emit('randomCode', {
            id1: users[0],
            id2: users[1],
            code: randomCodeGenerator(3)
        })
        if (users[0] === socket.id && code !== '') {
            socket && socket.emit('waitingDisconnection', (users[0]))
            return <Redirect to={`/play?roomCode=${code}`} />
        }
        else if (users[1] === socket.id && code !== '') {
            socket && socket.emit('waitingDisconnection', (users[0]))
            return <Redirect to={`/play?roomCode=${code}`} />
        }
    }

    return (
        <div className="Homepage">
            <Flex className="noselect" justify="center" align="center" flexDir="column" flexWrap="wrap">
                <img className="mainLogo" src="/lucky.png" />
                <h1>POKER Lucky Bones Casino</h1>
                <VStack w="lg" s="1rem" align="center" justify="center">
                    <Spacer />
                    <div className="loginButton">
                        <WalletMultiButton />
                        <button>{!publicKey ? 'Sign In' : (publicKey?.toBase58().slice(0, 4) + "..." + publicKey?.toBase58().slice(publicKey?.toBase58().length - 5, publicKey?.toBase58().length - 1))}</button>
                    </div>
                    {
                        <div className={!publicKey ? 'disabledButtons' : 'enabledButtons'}>
                            <GameCodeModal w="30%" size="lg" />
                            <WaitingButton
                                w="30%"
                                size="lg"
                                onClose={() => { setWaitingToggle(false) }}
                                onTrigger={() => { setWaitingToggle(true) }}
                                queueLength={waiting.length}
                            />
                        </div>
                    }
                </VStack>
            </Flex>
        </div>
    )
}

export default Homepage