import React from "react";
import { Link, useNavigate } from "@tanstack/react-location";
import { Helmet } from "react-helmet-async";

import Button from "../../components/Button";
import Header from "../../components/Header";
import CartItems from "./CartItems";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Cart = () => {
	const navigate = useNavigate();
	const { items } = useCart();
	const { user } = useAuth();
	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>Cart | Nextshop</title>
			</Helmet>
			<main>
				<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<div className='mt-5 grid grid-cols-1 md:grid-cols-12 md:gap-2'>
						<div className='md:col-span-8 rounded-md dark:bg-gray-800 pt-4 px-4'>
							<h2 className='text-3xl mb-4 font-bold tracking-tight text-gray-900 dark:text-white'>
								Your shopping cart
							</h2>
							<div className=''>
								<CartItems items={items} />
							</div>
						</div>
						<div className='md:col-span-4 rounded-md relative'>
							<div className='border-t md:border-t-0 border-gray-200 dark:border-gray-800 mt-5 md:mt-0 py-6 px-4 sm:px-6 sticky top-[3rem]'>
								<div className='flex justify-between text-base font-medium text-gray-900 dark:text-gray-50'>
									<p>Subtotal</p>
									<p>${items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
								</div>
								<p className='mt-0.5 text-sm text-gray-500 dark:text-gray-400'>
									Shipping and taxes calculated at checkout.
								</p>
								<div className='mt-6'>
									{user ? (
										<Button type='button' disabled={items.length > 0 ? false : true} fullWidth>
											Proceed to checkout
										</Button>
									) : (
										<Button
											className='block w-full p-3 text-md rounded-md font-semibold text-white bg-gray-800 text-center hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
											onClick={() => {
												navigate({
													to: "/login",
													search: { redirect: items.length > 0 ? "/checkout" : window.location.pathname },
												});
											}}
										>
											Sign in before checkout
										</Button>
									)}
								</div>
								<div className='mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400'>
									<p>
										or&nbsp;
										<Link to='/' className='font-medium text-indigo-800 dark:text-indigo-600'>
											Continue Shopping<span aria-hidden='true'> &rarr;</span>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</React.Fragment>
	);
};

export default Cart;
