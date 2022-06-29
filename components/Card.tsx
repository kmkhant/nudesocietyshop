import Image from "next/image";
import { FC } from "react";
import { convertPrice } from "../utils/convertPrice";

type CardProps = {
	name: string;
	image: string;
	price: number;
	slug: string;
};

const Card: FC<CardProps> = ({
	name,
	image,
	price,
	slug,
}) => {
	return (
		<a href={`/products/${slug}`}>
			<div className="group cursor-pointer">
				<div className="relative w-64 h-64 rounded-md transition duration-300 ease-in-out overflow-hidden">
					<div className="relative flex justify-center w-full h-full">
						<Image src={image} alt={name} layout="fill" />
					</div>
				</div>
				<h3 className="font-russo text-center text-xl mt-3 group-hover:text-mainColor transition duration-300 ease-in-out">
					{name}
				</h3>
				<p className="text-center text-xl font-russo group-hover:text-mainColor transition-colors duration-300 ease-in-out">
					{convertPrice(price)} &nbsp; MMK
				</p>
			</div>
		</a>
	);
};

export default Card;
