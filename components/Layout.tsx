import Head from "next/head";
import React, { FC } from "react";
import { Navbar, Footer, SearchModal } from "./";
import { useStateContext } from "../context/StateContext";
import Modal from "react-modal";
import { NextSeo } from "next-seo";
Modal.setAppElement("#__next");

const Layout: FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { panelOpen } = useStateContext();
	return (
		<div className={`font-sans`}>
			<NextSeo
				title="NUDE Society"
				description="Best Authentic Sneaker Shop in Mandalay"
				canonical="https://nudesocietyshop.vercel.app/"
				openGraph={{
					url: "https://nudesocietyshop.vercel.app",
					title: "NUDE Society",
					description:
						"Best Authenic Sneaker Shop in Mandalay",
					images: [
						{
							url: "https://nudesocietyshop.vercel.app/logo.png",
							height: 100,
							width: 100,
						},
					],
					site_name: "NUDE Society",
					type: "website",
				}}
				additionalMetaTags={[
					{
						name: "keywords",
						content: "NUDE Society, nudesociety mandalay",
					},
				]}
			/>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
			<Modal
				isOpen={panelOpen}
				className="absolute bg-white w-full h-full px-6 md:px-32 z-50"
				closeTimeoutMS={300}
			>
				<SearchModal />
			</Modal>
		</div>
	);
};

export default Layout;
