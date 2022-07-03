import Image from "next/image";
import { FC } from "react";

type ReviewProps = {
	image: string;
	name: string;
	address: string;
	description: string;
};

const ReviewCard: FC<ReviewProps> = ({
	image,
	name,
	address,
	description,
}) => {
	return (
		<div className="bg-green-200 w-full rounded-lg p-5 mb-10">
			<div className="flex">
				<Image
					src={image}
					alt={`nudesociety-${name}`}
					height={40}
					width={40}
					layout="fixed"
					className="rounded-full"
				/>
				<div className="ml-4">
					<p className="font-russo text-xl">{name}</p>
					<p className="italic text-md text-gray-700">
						{address}
					</p>
				</div>
			</div>
			<p className="mt-4">{description}</p>
		</div>
	);
};

export default ReviewCard;
