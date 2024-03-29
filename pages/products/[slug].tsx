import {
	NextPage,
	GetStaticPaths,
	GetStaticProps,
} from "next";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import { ArrivalCard } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { client, urlFor } from "../../sanity/sanity";
import { ProductDataItems, ProductData } from "../../types";
import { convertPrice } from "../../utils/convertPrice";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

type ProductPageProps = {
	productData: ProductData;
	similarProductData: ProductDataItems;
};

const Product: NextPage<ProductPageProps> = ({
	productData,
	similarProductData,
}) => {
	const mainUrl = urlFor(productData.mainImage).url();
	const [mainImageUrl, setMainImageUrl] = useState(mainUrl);
	var holdingMainImage = false;

	useEffect(() => {
		setMainImageUrl(mainUrl);
	}, [mainUrl]);

	const handleMouseEnter = (url: string) => {
		if (!holdingMainImage) {
			holdingMainImage = true;
			setMainImageUrl(url);
		}
	};

	const handleMouseLeave = () => {
		holdingMainImage = false;
		setMainImageUrl(mainUrl);
	};

	return (
		<div className="pt-32 px-20">
			<NextSeo
				title={`${productData.title} - NUDE Society`}
				description={`${productData.description} - Nude Society`}
				canonical={`${
					process.env.NODE_ENV === "development"
						? "https://nudesocietyshop.vercel.app/"
						: "https://nudesociety.shop"
				}`}
				openGraph={{
					url: `${
						process.env.NODE_ENV === "development"
							? "https://nudesocietyshop.vercel.app/"
							: "https://nudesociety.shop"
					}`,
					title: `${productData.title} - NUDE Society`,
					description: `${productData.productCode}`,
					images: [
						{
							url: "https://nudesocietyshop.vercel.app/logo.png",
							height: 100,
							width: 100,
						},
					],
					site_name: "NUDE Society",
					type: "website",
				}}
				additionalMetaTags={[
					{
						name: "keywords",
						content: "NUDE Society, nudesociety mandalay",
					},
				]}
			/>
			<div className="flex space-x-2 items-center">
				<ArrowNarrowLeftIcon className="h-5 w-5 text-mainColor" />
				<Link href="/">Home</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 mt-5 mb-5">
				<div className="col-span-2 mx-3 md:mx-16">
					<div className="cursor-pointer flex justify-center">
						<Image
							src={mainImageUrl}
							width={500}
							height={500}
							objectFit="contain"
							alt="product name"
						/>
					</div>
					<div className="grid grid-cols-3 gap-2 mt-3">
						{productData.featuredImages.map((image, i) => (
							<div className="cursor-pointer" key={i}>
								<Image
									src={urlFor(image).url()}
									width={300}
									height={300}
									objectFit="contain"
									alt="product photo"
									onMouseEnter={() =>
										handleMouseEnter(urlFor(image).url())
									}
									onMouseLeave={() => handleMouseLeave()}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="mt-5 md:mt-0">
					<h1 className="text-xl font-medium">
						{productData.title}
					</h1>
					<h3 className="text-md">
						{productData.categoryName}
					</h3>
					<p className="text-md">
						{convertPrice(productData.price)} MMK
					</p>
					<p className="text-md mt-5">Available Sizes</p>
					<div className="grid grid-cols-4 gap-2 mt-2">
						{productData.availableSizes.map((size, i) => (
							<div
								key={i}
								className="border-gray-300 border-2 px-2 rounded-sm"
							>
								{size}
							</div>
						))}
					</div>
					<p className="text-md mt-2">
						{productData.description}
					</p>
					<ul className="list-disc px-5 mt-2">
						<li>Color : {productData.colors[0]}</li>
						<li>Style: {productData.productCode}</li>
					</ul>
					<p className="text-xl font-medium mt-5">
						Waiting and Delivery
					</p>
					<ul className="list-disc px-5 mt-2">
						<li>Waiting-Time: 3-4 Weeks</li>
						<li>Delivery: 0-3 Business Days</li>
					</ul>
					<div className="flex justify-center mt-5">
						<a
							href="https://www.facebook.com/NUDE-society-102294842099819/"
							target="_blank"
							rel="noreferrer"
						>
							<button className="py-2 px-8 border-2 border-black text-black font-russo transition-colors hover:bg-mainColor hover:border-mainColor duration-300">
								BUY NOW
							</button>
						</a>
					</div>
				</div>
			</div>
			<p className="text-xl font-medium">
				You may also like
			</p>
			<div className="mb-10">
				<Swiper
					spaceBetween={30}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					breakpoints={{
						800: {
							slidesPerView: 4,
						},

						640: {
							slidesPerView: 2,
						},
						0: {
							slidesPerView: 1,
						},
					}}
					className="mySwiper mt-5"
				>
					{similarProductData.map((product) => (
						<SwiperSlide key={product._id}>
							<ArrivalCard
								image={urlFor(product.mainImage).url()}
								name={product.title}
								price={product.price}
								gender="Men"
								new={true}
								slug={product.slug.current}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
	const products: ProductDataItems = await client.fetch(
		`*[_type == "products"]`
	);
	const paths = products.map((product) => ({
		params: { slug: product.slug.current },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
	params,
}) => {
	const slug = params?.slug;

	// fetch product by slug
	const query = `*[_type == "products" && slug.current == $slug ] {
		...,
		"brand": brand-> {
			title
		}
	}`;
	const slugParam = { slug: slug };
	const res = await client.fetch(query, slugParam);
	const productData: ProductData = res[0];

	// fetch similary products
	const brand = productData.brand.title;
	const brandParam = { brand: brand };
	const similarBrandquery = `*[_type == "products" && brand->.title == $brand ] [0...8]`;
	var similarProductData: ProductDataItems =
		await client.fetch(similarBrandquery, brandParam);

	const checkSlug = (product: ProductData) => {
		return (
			product.slug.current !== productData.slug.current
		);
	};

	similarProductData = similarProductData.filter(checkSlug);

	return {
		props: {
			productData,
			similarProductData,
		},
	};
};
