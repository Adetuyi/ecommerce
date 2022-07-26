import React from 'react';
import Layout from '../components/Layout';
import { routes } from '../utils/routes';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const LoginScreen = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<Layout title="Login">
			<form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
				<h1 className="mb-4 text-xl">Login</h1>
				<div className="mb-4">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="w-full"
						id="email"
						autoFocus
						{...register('email', {
							required: 'Please enter email',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter valid email',
							},
						})}
					/>
					{errors.email && <div className="text-red-500">{errors.email.message}</div>}
				</div>
				<div className="mb-4">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="w-full"
						id="password"
						{...register('password', {
							required: 'Please enter password',
							minLength: { value: 6, message: 'Password should be at least 6 characters' },
						})}
					/>
					{errors.password && <div className="text-red-500">{errors.password.message}</div>}
				</div>
				<div className="mb-4">
					<button className="primary-button">Login</button>
				</div>
				<div className="mb-4">
					Don&apos;t have an account? <Link href={routes.register}>Register</Link>
				</div>
			</form>
		</Layout>
	);
};

export default LoginScreen;
