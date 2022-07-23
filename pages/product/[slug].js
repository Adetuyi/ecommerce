import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { routes } from '../../utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { StoreContext } from '../../utils/contexts/Store';
import { actions } from '../../utils/actions/Store';

const ProductPage = () => {
	const { state, dispatch } = useContext(StoreContext);

	const { query } = useRouter();
	const { slug } = query;
	const product = data.products.find((x) => x.slug === slug);
	if (!product) {
		return <div>Product Not Found</div>;
	}

	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find((x) => x.slug == product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		if (product.countInStock < quantity) {
			alert('Sorry, product is out of stock');
			return;
		}

		dispatch({ type: actions.ADD_CART, payload: { ...product, quantity } });
	};

	return (
		<Layout title={product.name}>
			<div className="py-2">
				<Link href={routes.home}>Back to homepage</Link>
			</div>

			<div className="grid md:grid-cols-4 md:gap-4">
				<div className="md:col-span-2">
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout="responsive"
						className="rounded shadow"
					/>
				</div>
				<div>
					<ul>
						<li className="text-lg text-">
							<h1>{product.name}</h1>
						</li>
						<li>Category: {product.category}</li>
						<li>Brand: {product.brand}</li>
						<li>
							{product.rating} of {product.numReviews} reviews
						</li>
						<li>Description: {product.description}</li>
					</ul>
				</div>
				<div>
					<div className="card p-5">
						<div className="mb-2 flex justify-between">
							<div>Price</div>
							<div>${product.price}</div>
						</div>
						<div className="mb-2 flex justify-between">
							<div>Status</div>
							<div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
						</div>
						<button className="primary-button w-full" onClick={addToCartHandler}>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ProductPage;
