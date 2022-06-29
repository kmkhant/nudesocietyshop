import Head from "next/head";
import React, { FC } from "react";
import { Navbar, Footer, SearchModal } from "./";
import { useStateContext } from "../context/StateContext";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Layout: FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { panelOpen, setPanelOpen } = useStateContext();
	return (
		<div className={`font-sans`}>
			<Head>
				<title>NUDE Society</title>
			</Head>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
			<Modal
				isOpen={panelOpen}
				className="absolute bg-white w-full h-full px-32 z-50"
				closeTimeoutMS={300}
			>
				<SearchModal />
			</Modal>
		</div>
	);
};

export default Layout;
