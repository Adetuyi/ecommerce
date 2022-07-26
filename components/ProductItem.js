/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { routes } from '../utils/routes';

const ProductItem = ({ product }) => {
	return (
		<div className="card">
			<Link href={`${routes.product}/${product.slug}`}>
				<a>
					<img src={product.image} alt={product.name} className="rounded shadow" />
				</a>
			</Link>

			<div className="flex items-center justify-center flex-col p-5">
				<Link href={`${routes.product}/${product.slug}`}>
					<a>
						<h2 className="text-lg">{product.name}</h2>
					</a>
				</Link>
				<p className="mb-2">{product.brand}</p>
				<p>${product.price}</p>
				<button className="primary-button" type="button">
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
