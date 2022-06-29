import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";

const Navbar: FC = () => {
	const router = useRouter();

	const { panelOpen, setPanelOpen } = useStateContext();

	return (
		<>
			<div
				className={`flex items-start justify-between py-6 bg-white fixed w-full z-10 px-20`}
			>
				<Link href="/">
					<a>
						<Image
							src="/logo.png"
							alt="Logo"
							width={50}
							height={50}
							className="cursor-pointer"
						/>
					</a>
				</Link>

				<div className="flex items-center space-x-8">
					{!panelOpen && (
						<Image
							src="/assets/icons/search_24px.svg"
							alt="search-icon"
							width={24}
							height={24}
							className="cursor-pointer"
							onClick={() => setPanelOpen(true)}
						/>
					)}
					<div
						className={`border-b-2 ${
							router.pathname === "/shop"
								? "border-b-mainColor"
								: "border-b-transparent"
						} transition-all duration-300`}
					>
						<Link href="/shop">SHOP</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
