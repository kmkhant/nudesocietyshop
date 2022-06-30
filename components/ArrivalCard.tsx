import Image from "next/image";
import { FC, MouseEventHandler } from "react";
import Link from "next/link";
import { convertPrice } from "../utils/convertPrice";
import { useStateContext } from "../context/StateContext";
import React from "react";

type ArrivalCardProps = {
	image: string;
	name: string;
	price: number;
	gender?: string;
	slug: string;
	new?: boolean;
};
const ArrivalCard: FC<ArrivalCardProps> = ({
	image,
	name,
	price,
	gender,
	slug,
	new: boolean,
}) => {
	const { panelOpen, setPanelOpen } = useStateContext();

	const handleClick = (
		event: React.MouseEvent<HTMLAnchorElement>
	) => {
		if (panelOpen) {
			setPanelOpen(false);
		}
	};

	return (
		<Link href={`/products/${slug}`}>
			<a onClick={handleClick}>
				<div className="flex justify-center group cursor-pointer mb-10 py-5">
					<div className="relative w-40 h-52 sm:w-48 lg:w-64 lg:h-64  rounded-md transition duration-300 ease-in-out">
						<Image
							src={image}
							alt="yzy 700 mnvn"
							width={1000}
							height={1000}
						/>
						<p className="font-russo text-xl text-center group-hover:text-mainColor transition-colors duration-300 ease-in-out">
							{name}
						</p>
						<p className="font-russo text-lg text-center group-hover:text-mainColor transition-colors duration-300 ease-in-out">
							{convertPrice(price)}
							MMK
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ArrivalCard;
