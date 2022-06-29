import type { GetStaticProps, NextPage } from "next";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FiltersMenu, ArrivalCard } from "../components";
import { useStateContext } from "../context/StateContext";
import { ProductData, ProductDataItems } from "../types";
import { client, urlFor } from "../sanity/sanity";
import { useEffect, useState } from "react";
import { SpinnerDiamond } from "spinners-react";

interface ShopPageProps {
	productDataItems: ProductDataItems;
}

const Shop: NextPage<ShopPageProps> = ({
	productDataItems,
}) => {
	const { selectedBrand } = useStateContext();
	const [loading, setLoading] = useState(true);

	const [
		selectedProductDataItems,
		setSelectedProductDataItems,
	] = useState(productDataItems);

	useEffect(() => {
		const params = { brand: selectedBrand };
		const query = `*[_type == "products" && brand->.title == $brand ] [0...20]`;

		setLoading(true);

		client
			.fetch(query, params)
			.then((result) => {
				setSelectedProductDataItems(result);
				setLoading(false);
			})
			.catch((e) => console.log(e));
	}, [selectedBrand]);

	return (
		<div className="shop-container mb-32 pt-32">
			<div className="flex items-center space-x-2 fixed">
				<ArrowNarrowLeftIcon className="h-5 w-5 text-mainColor" />
				<Link href="/">HOME</Link>
			</div>
			<div className="fixed mt-5 flex flex-col">
				<p
					className={`font-bold my-3 ${
						selectedBrand === "Anti social social club"
							? "text-md"
							: "text-2xl"
					}`}
				>
					{selectedBrand}
				</p>
			</div>
			<div className="flex justify-between mt-12 sm:mt-0">
				<FiltersMenu w={200} h={300} />
				<FiltersMenu w={180} h={300} />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ml-48 sm:ml-56 content-center grow gap-5 ">
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
