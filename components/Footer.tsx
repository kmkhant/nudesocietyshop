import { useRouter } from "next/router";
import type { FC } from "react";
import { SocialIcon } from "react-social-icons";
import { useStateContext } from "../context/StateContext";

const Footer: FC = () => {
	const { showFilters } = useStateContext();
	const router = useRouter();

	return (
		<div
			className={`px-20 lg:px-40 ${
				router.pathname === "/shop" && showFilters
					? "ml-40"
					: "ml-4"
			} sm:ml-64 transition-all duration-300 ease-in-out`}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<div className="flex flex-col">
					<p className="font-russo text-xl">Address</p>
					<p>78st 32stx31st,</p>
					<p>Chanmyatharsi Township</p>
					<p>Mandalay, Myanmar</p>
				</div>
				<div className="flex flex-col">
					<p className="font-russo text-xl">Phone Number</p>
					<p>8(800) 995-421-33</p>
				</div>
				<div className="flex flex-col">
					<p className="font-russo text-xl">Phone Number</p>
					<p>8(800) 995-421-33</p>
				</div>
				<div className="flex flex-col">
					<p className="font-russo text-xl">Find us on</p>
					<div className="flex space-x-4">
						<SocialIcon
							url="https://instagram.com/jaketrent"
							bgColor="#00FF01"
							style={{ width: "32px", height: "32px" }}
						/>
						<SocialIcon
							url="https://facebook.com/nudesociety"
							bgColor="#00FF01"
							style={{ width: "32px", height: "32px" }}
						/>
					</div>
				</div>
			</div>
			<p className="text-center my-5 text-grayColor">
				&copy; Nudesociety 2022
			</p>
		</div>
	);
};

export default Footer;
