import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
	GlowWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { Route } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import Game from './components/Game/Game'
import Verify from './components/auth/Verify'
import './App.css'
import './cards.css'
import './game.css'
import { UserContext } from './utils/UserContext'
import { useState, useEffect, useMemo } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

require('@solana/wallet-adapter-react-ui/styles.css');

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'whiteAlpha.200',
				color: 'white',
				m: 0,
				p: 0,
			},
		},
	},
})

const App = () => {
	const url = process.env.REACT_APP_ENDPOINT
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// Can be set to 'devnet', 'testnet', or 'mainnet-beta'
	const network = WalletAdapterNetwork.Mainnet;

	// You can also provide a custom RPC endpoint
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	// @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
	// Only the wallets you configure here will be compiled into your application, and only the dependencies
	// of wallets that your users connect to will be loaded
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new GlowWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter({ network }),
			new TorusWalletAdapter(),
		],
		[network]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = fetch(`${url}/auth/`, {
					method: 'GET',
					credentials: 'include',
					mode: 'cors',
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.user) setUser(data.user)
					})
				setLoading(false)
			} catch (error) {
				console.error(error)
				setLoading(false)
			}
		}
		if (loading) fetchData()
	}, [])

	if (loading) return <h1>Loading...</h1>

	return (
		<div className='App'>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<UserContext.Provider value={{ user, setUser }}>
							<ChakraProvider>
								<Route path='/' exact component={Homepage} />
								<Route path='/play' exact component={Game} />
								<Route path='/verify' exact component={Verify} />
							</ChakraProvider>
						</UserContext.Provider>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	)
}

export default App
