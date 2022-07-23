import '../styles/globals.css';
import { StoreProvider } from '../utils/contexts/Store';

function MyApp({ Component, pageProps }) {
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
