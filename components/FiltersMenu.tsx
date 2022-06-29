import { FC, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useStateContext } from "../context/StateContext";
import { Property } from "csstype";

const brands: string[] = [
	"Adidas",
	"Anti Social Social Club",
	"Bape",
	"Converse",
	"Essentials",
	"Jordan",
	"LV",
	"New Balance",
	"Nike",
	"Off White",
	"Reebok",
	"Stussy",
	"Supreme",
	"Vans",
	"Yeezy",
];

interface FilterProps {
	w: Property.Width<number>;
	h: Property.Height<number>;
}

const FiltersMenu: FC<FilterProps> = ({ w, h }) => {
	const { selectedBrand, setSelectedBrand } =
		useStateContext();

	const checkSmall: boolean = w < 200;
	// console.log(`h: ${h} ; ${checkSmall}`);
	return (
		<div
			className={`fixed bg-white h-full ${
				checkSmall
					? "block sm:hidden mt-5"
					: "hidden sm:block mt-16"
			}`}
		>
			<Scrollbars
				style={{ width: w, height: h }}
				universal={true}
			>
				<hr className="mx-2 my-2 mr-4" />
				{brands.map((brand, i) => (
					<div
						key={`${checkSmall}-${i}`}
						className="flex items-center"
					>
						<input
							type="radio"
							checked={selectedBrand === brand}
							id={`brand-radio-button-${i}`}
							value=""
							name={`brand-radio-button-${checkSmall}`}
							className="h-4 w-4 form-radio text-mainColor focus:ring-0 focus:ring-offset-0"
							onChange={(e) => !e.target.value}
							onClick={() => {
								if (brands[i] !== selectedBrand) {
									setSelectedBrand(brand);
								}
							}}
						/>
						<label
							htmlFor={`brand-radio-button-${i}`}
							className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
						>
							{brand}
						</label>
					</div>
				))}
				<hr className="ml-2 my-2 mr-4" />
			</Scrollbars>
		</div>
	);
};

export default FiltersMenu;
