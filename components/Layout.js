import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { routes } from '../utils/routes';
import { StoreContext } from '../utils/contexts/Store';

const Layout = ({ title, children }) => {
	const { state } = useContext(StoreContext);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	return (
		<>
			<Head>
				<title>{title ? title + ' - Amazona' : 'Amazona'}</title>
				<meta name="description" content="Ecommerce website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex min-h-screen flex-col justify-between">
				<header>
					<nav className="flex h-12 px-4 items-center justify-between shadow-md">
						<Link href={routes.home}>
							<a className="text-lg font-bold">amazona</a>
						</Link>
						<div>
							<Link href={routes.cart}>
								<a className="p-2">
									Cart
									{cartItemsCount > 0 ? (
										<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
											{cartItemsCount}
										</span>
									) : null}
								</a>
							</Link>
							<Link href={routes.login}>
								<a className="p-2">Login</a>
							</Link>
						</div>
					</nav>
				</header>

				<main className="container m-auto mt-4 px-4">{children}</main>

				<footer className="flex justify-center items-center h-10 shadow-inner">
					<p>Copyright &copy; 2022 Amazona</p>
				</footer>
			</div>
		</>
	);
};

export default Layout;
