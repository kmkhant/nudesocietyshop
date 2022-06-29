import { FC } from "react";
import {
	XIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import { useStateContext } from "../context/StateContext";
const SearchModal: FC = () => {
	const { setPanelOpen } = useStateContext();

	const handleOnChange = (e: string) => {
		console.log(e);
	};
	return (
		<div className="mt-28">
			<div className="flex justify-between items-center">
				<p>&#8203;</p>
				<div className="flex items-center bg-gray-200 rounded-full px-3">
					<SearchIcon className="w-5 h-5 bg-gray-200" />
					<input
						type="text"
						placeholder="Search"
						className="focus:ring-0 border-0 bg-transparent"
						onChange={(e) => handleOnChange(e.target.value)}
					/>
				</div>
				<button onClick={() => setPanelOpen(false)}>
					<XIcon className="w-8 h-8" />
				</button>
			</div>
			<div className="mt-5">results</div>
		</div>
	);
};

export default SearchModal;
