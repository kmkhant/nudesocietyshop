import type { GetStaticProps, NextPage } from "next";
import {
	ArrowNarrowLeftIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { FiltersMenu, ArrivalCard } from "../components";
import { useStateContext } from "../context/StateContext";
import { ProductData, ProductDataItems } from "../types";
import {
	client,
	cdnClient,
	urlFor,
} from "../sanity/sanity";
import { useEffect, useState } from "react";
import { SpinnerDiamond } from "spinners-react";

interface ShopPageProps {
	productDataItems: ProductDataItems;
}

const Shop: NextPage<ShopPageProps> = ({
	productDataItems,
}) => {
	const { selectedBrand, showFilters, setShowFilters } =
		useStateContext();
	const [loading, setLoading] = useState(true);
	const [
		selectedProductDataItems,
		setSelectedProductDataItems,
	] = useState(productDataItems);

	// Mobile View Filters On/Off

	useEffect(() => {
		if (window.innerWidth < 400) {
			setShowFilters(true);
		}
	}, []);

	useEffect(() => {
		if (selectedBrand !== "All") {
			const params = { brand: selectedBrand };
			const query = `*[_type == "products" && brand->.title == $brand ] [0...20]`;

			setLoading(true);

			cdnClient
				.fetch(query, params)
				.then((result) => {
					setSelectedProductDataItems(result);
					setLoading(false);
				})
				.catch((e) => console.log(e));
		}
		if (selectedBrand === "All") {
			const query = `*[ _type == "products" ] [0...20]`;
			setLoading(true);

			cdnClient
				.fetch(query)
				.then((result) => {
					setSelectedProductDataItems(result);
					setLoading(false);
				})
				.catch((e) => console.log(e));
		}
	}, [selectedBrand]);

	return (
		<div className="shop-container mb-32 pt-32">
			<div className="flex items-center space-x-2 fixed">
				<ArrowNarrowLeftIcon className="h-5 w-5 text-mainColor" />
				<Link href="/">HOME</Link>
			</div>
			<div
				className="fixed mt-5 flex items-center space-x-4 bg-white"
				onClick={() =>
					setShowFilters((prev: boolean) => !prev)
				}
			>
				<p
					className={`font-bold my-3 ${
						selectedBrand === "Anti Social Social Club"
							? "text-md"
							: "text-2xl"
					}`}
				>
					{selectedBrand}{" "}
				</p>
				{showFilters ? (
					<ChevronUpIcon className="w-5 h-5" />
				) : (
					<ChevronDownIcon className="w-5 h-5" />
				)}
			</div>
			<div className="flex justify-between mt-12 sm:mt-0">
				<FiltersMenu w={200} h={300} />
				{showFilters && <FiltersMenu w={180} h={300} />}
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${
						showFilters ? "ml-48" : "ml-4"
					} sm:ml-56 content-center grow gap-5 transition-all duration-300 ease-in-out`}
				>
					{!loading &&
						selectedProductDataItems.length > 0 &&
						selectedProductDataItems.map((productData) => (
							<ArrivalCard
								key={productData._id}
								image={urlFor(productData.mainImage).url()}
								name={productData.title}
								price={productData.price}
								gender="Men"
								new={true}
								slug={productData.slug.current}
							/>
						))}

					{loading && <p>&#8203;</p>}

					{loading && (
						<SpinnerDiamond
							size={50}
							thickness={100}
							speed={100}
							color="rgba(0, 255, 3, 1)"
							secondaryColor="rgba(0, 0, 0, 0.44)"
						/>
					)}

					{!loading && selectedProductDataItems.length < 1 && (
						<div>
							<p>&#8203;</p>
						</div>
					)}

					{!loading &&
						selectedProductDataItems.length < 1 && (
							<p>No Data for {selectedBrand} </p>
						)}
				</div>
			</div>
		</div>
	);
};

export default Shop;

export const getStaticProps: GetStaticProps = async () => {
	const query = `*[_type == "products" && brand->.title == "Nike"] [0...10]`;
	const productDataItems: ProductDataItems =
		await client.fetch(query);

	return {
		props: {
			productDataItems,
		},
	};
};
