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
import InfiniteScroll from "react-infinite-scroller";

interface ShopPageProps {
	productDataItems: ProductDataItems;
}

const Shop: NextPage<ShopPageProps> = ({
	productDataItems,
}) => {
	const { selectedBrand, showFilters, setShowFilters } =
		useStateContext();
	const [loading, setLoading] = useState(true);
	// const [
	// 	selectedProductDataItems,
	// 	setSelectedProductDataItems,
	// ] = useState(productDataItems);
	const pageFetchCount = 4;

	const [endIndex, setEndIndex] = useState(
		productDataItems.length
	);
	const [pageIndex, setPageIndex] =
		useState(pageFetchCount);
	const [endPageIndex, setEndPageIndex] = useState(
		pageFetchCount * 2
	);

	const [infiniteDataItems, setInfiniteDataItems] =
		useState<ProductDataItems>([]);
	// Mobile View Filters On/Off

	useEffect(() => {
		setInfiniteDataItems([]);
	}, []);

	useEffect(() => {
		if (window.innerWidth < 400) {
			setShowFilters(true);
		}
	}, []);

	useEffect(() => {
		// Initial Loads during selectedBrand changes
		if (selectedBrand !== "All") {
			setLoading(true);

			const params = { brand: selectedBrand };
			const countQuery = `count(*[_type == "products" && brand->.title == $brand ])`;

			cdnClient
				.fetch(countQuery, params)
				.then((result) => setEndIndex(result))
				.catch((err) => console.log(err));

			const query = `*[_type == "products" && brand->.title == $brand ] [0...${pageFetchCount}]`;

			cdnClient
				.fetch(query, params)
				.then((result) => {
					// setSelectedProductDataItems(result);
					setInfiniteDataItems(result);
					setLoading(false);
				})
				.catch((e) => console.log(e));
		}
		if (selectedBrand === "All") {
			setLoading(true);
			const countQuery = `count(*[ _type == "products" ])`;

			cdnClient
				.fetch(countQuery)
				.then((result) => setEndIndex(result))
				.catch((err) => console.log(err));

			const query = `*[ _type == "products" ] [0...${pageFetchCount}]`;

			cdnClient
				.fetch(query)
				.then((result) => {
					// setSelectedProductDataItems(result);
					setInfiniteDataItems(result);
					setLoading(false);
				})
				.catch((e) => console.log(e));
		}

		// Reset Iterating Values
		setPageIndex(pageFetchCount);
		setEndPageIndex(pageFetchCount * 2);
		setInfiniteDataItems([]);
	}, [selectedBrand]);

	const loadMoreProducts = async () => {
		// console.log("load called");

		if (selectedBrand !== "All") {
			const query = `*[_type == "products" && brand->.title == "${selectedBrand}" ] [${pageIndex}...${endPageIndex}]`;

			// console.log(query);

			// fetch from initIndex to Page
			// console.log(`current: ${selectedProductDataItems}`);
			cdnClient
				.fetch(query)
				.then((result: ProductDataItems) => {
					setInfiniteDataItems((prev) => {
						// console.log(`${pageIndex} ... ${endPageIndex}`); // console.log(...result);
						return [...prev, ...result];
					});
					setPageIndex((prev) => prev + pageFetchCount);
					setEndPageIndex((prev) => prev + pageFetchCount);
				})
				.catch((err) => console.log(err));
		} else {
			const query = `*[_type == "products"] [${pageIndex}...${endPageIndex}]`;

			// console.log(query);

			// fetch from initIndex to Page
			// console.log(`current: ${selectedProductDataItems}`);
			cdnClient
				.fetch(query)
				.then((result: ProductDataItems) => {
					setInfiniteDataItems((prev) => {
						return [...prev, ...result];
					});
					setPageIndex((prev) => prev + pageFetchCount);
					setEndPageIndex((prev) => prev + pageFetchCount);
				})
				.catch((err) => console.log(err));
		}

		/*
		 */
		setPageIndex((prev) => prev + pageFetchCount);
		setEndPageIndex((prev) => prev + pageFetchCount);
		// console.log(infiniteDataItems);
		// console.log(
		// 	`pageIndex: ${pageIndex}, endPage: ${endPageIndex}`
		// );
	};

	return (
		<div className="shop-container mb-32 pt-32">
			<div className="flex items-center space-x-2 fixed">
				<ArrowNarrowLeftIcon className="h-5 w-5 text-mainColor" />
				<Link href="/">HOME</Link>
			</div>
			<div
				className="fixed mt-5 flex items-center space-x-4 bg-white cursor-pointer"
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
			<div
				className={`flex mt-12 sm:mt-0 
				${showFilters ? "justify-between" : "justify-center"}`}
			>
				{showFilters && <FiltersMenu w={200} h={300} />}
				{showFilters && <FiltersMenu w={180} h={300} />}

				{infiniteDataItems && (
					<InfiniteScroll
						data-testid="products-infinite-scroll"
						pageStart={0}
						loadMore={loadMoreProducts}
						hasMore={pageIndex < endIndex}
						loader={
							<SpinnerDiamond
								size={50}
								thickness={100}
								speed={100}
								color="rgba(0, 255, 3, 1)"
								secondaryColor="rgba(0, 0, 0, 0.44)"
								key={0}
							/>
						}
					>
						<div
							className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${
								showFilters ? "ml-[240px]" : "ml-0 mt-10"
							} content-center grow gap-5 transition-all duration-300 ease-in-out`}
						>
							{!loading && infiniteDataItems.length < 1 && (
								<p>&#8203;</p>
							)}
							{!loading && infiniteDataItems.length < 1 && (
								<p>No Data for {selectedBrand} </p>
							)}
							{infiniteDataItems.map((productData) => (
								<ArrivalCard
									key={productData._id}
									image={urlFor(
										productData.mainImage
									).url()}
									name={productData.title}
									price={productData.price}
									gender="Men"
									new={true}
									slug={productData.slug.current}
								/>
							))}
						</div>
						{loading && <p>&#8203;</p>}
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
};

export default Shop;

export const getStaticProps: GetStaticProps = async () => {
	const query = `*[_type == "products" && brand->.title == "All"] [0...5]`;
	const productDataItems: ProductDataItems =
		await client.fetch(query);

	return {
		props: {
			productDataItems,
		},
	};
};
