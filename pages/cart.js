import React, { useContext } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { StoreContext } from '../utils/contexts/Store';
import { routes } from '../utils/routes';
import Image from 'next/image';
import { XIcon } from '@heroicons/react/solid';
import { actions } from '../utils/actions/Store';
import { useRouter } from 'next/router';

const CartScreen = () => {
	const { state, dispatch } = useContext(StoreContext);
	const {
		cart: { cartItems },
	} = state;
	const router = useRouter();

	const removeItemHandler = (item) => {
		dispatch({ type: actions.REMOVE_CART, payload: item });
	};
	return (
		<Layout title="Shopping Cart">
			<h1 className="mb-4 text-xl">Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty. <Link href={routes.home}>Go Shopping</Link>
				</div>
			) : (
				<div className="grid md:grid-cols-4 md:gap-5">
					<div className="overflow-x-auto md:col-span-3">
						<table className="min-w-full">
							<thead className="border-b">
								<tr>
									<th className="px-5 text-left">Item</th>
									<th className="px-5 text-right">Quantity</th>
									<th className="px-5 text-right">Price</th>
									<th className="p-5">Action</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr key={item.slug} className="border-b">
										<td>
											<Link href={`${routes.product}/${item.slug}`}>
												<a className="flex items-center">
													<Image src={item.image} alt={item.name} width={50} height={50} />
													&nbsp;{item.name}
												</a>
											</Link>
										</td>
										<td className="p-5 text-right">{item.quantity}</td>
										<td className="p-5 text-right">${item.price}</td>
										<td className="p-5 text-center">
											<button onClick={() => removeItemHandler(item)}>
												<XIcon className="h-5 w-5"></XIcon>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="card p-5">
						<ul>
							<li>
								<div className="pb-3 text-xl">
									Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
									{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
								</div>
							</li>
							<li>
								<button onClick={() => router.push(routes.shipping)} className="primary-button w-full">
									Check Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default CartScreen;