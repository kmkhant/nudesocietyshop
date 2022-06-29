import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import CountUp from "react-countup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { faker } from "@faker-js/faker";
import {
	ArrivalCard,
	Card,
	ReviewCard,
} from "../components";
import { NextSeo } from "next-seo";
import { client, urlFor } from "../sanity/sanity";
import Link from "next/link";
import { convertPrice } from "../utils/convertPrice";
// Import Types
import { HomeProps } from "../types";
import { useStateContext } from "../context/StateContext";

const Home: NextPage<HomeProps> = ({
	mainImageData,
	nikeTabData,
	yeezyTabData,
	newBalanceTabData,
}) => {
	const { panelOpen } = useStateContext();
	return (
		<div>
			<NextSeo
				title="NUDE Society"
				description="Best Authenic Sneaker Shop in Mandalay"
				canonical="http://localhost:3000"
				openGraph={{
					url: "https://nudesociety.vercel.app",
					title: "NUDE Society",
					description:
						"Best Authenic Sneaker Shop in Mandalay",
					images: [
						{
							url: "https://nudesociety.vercel.app/logo.png",
						},
					],
					site_name: "NUDE Society",
				}}
				additionalMetaTags={[
					{
						name: "keywords",
						content: "NUDE Society, nudesociety mandalay",
					},
				]}
			/>

			<div className="px-20 grid grid-cols-1 lg:grid-cols-2 lg:px-40 pt-32">
				<div>
					<p className="text-3xl font-russo md:text-7xl">
						Summer <br /> Collections
					</p>
					<p className="text-3xl font-russo text-mainColor">
						2022
					</p>
					<p>
						Find your shoes from our various collections.
						Here shoes are endless and profit is also
						endless
					</p>
					<Link href="/shop">
						<a>
							<button className="font-bold py-1 px-2 bg-mainColor mt-3 rounded-sm transition-colors duration-300 hover:text-mainColor hover:bg-black">
								Shop Now
							</button>
						</a>
					</Link>
				</div>
				<div className="relative w-80 h-80 sm:w-bs sm:h-bs place-self-center mt-4 sm:mt-0">
					<Image
						src={mainImageData.mainImageUrl}
						alt="bestselling photo"
						width={896}
						height={697}
					/>
					<div className="absolute right-5 bottom-2">
						<p className="font-russo text-2xl">
							{mainImageData.title}
						</p>
						<p className="font-russo text-xl">
							{convertPrice(mainImageData.price)}&nbsp; MMK
						</p>
						<div className="flex space-x-4 items-center">
							<div className="flex">
								{[...new Array(5)].map((_, i) => (
									<StarIcon
										key={i}
										className="w-5 h-5 text-red-500"
									/>
								))}
							</div>
							<button className="py-1 px-2 border-2 border-black text-black font-russo transition-colors hover:bg-mainColor hover:border-mainColor duration-300">
								BUY NOW
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row px-20 lg:px-40 sm:justify-between mt-5">
				<div className="flex items-center">
					<p className="absolute text-mainColor font-russo text-2xl">
						<CountUp end={1500} duration={2.75} />+ &nbsp;
					</p>{" "}
					<p className="ml-20">Orders Completed</p>
				</div>
				<div className="flex items-center">
					<p className="absolute text-mainColor font-russo text-2xl">
						<CountUp end={1000} duration={2.75} />+ &nbsp;
					</p>{" "}
					<p className="ml-20">Yearly Customers</p>
				</div>
				<div className="flex items-center">
					<p className="absolute text-mainColor font-russo text-2xl">
						<CountUp end={1000} duration={2.75} />+ &nbsp;
					</p>{" "}
					<p className="ml-20">Happy Customers</p>
				</div>
			</div>
			<div className="mt-8 px-20 lg:px-40">
				<h1 className="font-russo text-3xl md:text-5xl text-center">
					What We{" "}
					<span className="text-mainColor">Offer</span>
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-3 place-items-center">
					<div className="text-center mt-5">
						<h3 className="font-russo text-2xl text-mainColor">
							24/7 Support
						</h3>
						<p className="mt-5">
							Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Praesent quis diam
							consectetur, malesuada orci vitae, consequat
							tortor. Sed sagittis, libero sed consectetur
							auctor, mauris.
						</p>
					</div>
					<div className="text-center mt-5">
						<h3 className="font-russo text-2xl text-mainColor">
							Cash Back
						</h3>
						<p className="mt-5 px-3">
							Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Praesent quis diam
							consectetur, malesuada orci vitae, consequat
							tortor. Sed sagittis, libero sed consectetur
							auctor, mauris.
						</p>
					</div>
					<div className="text-center mt-5">
						<h3 className="font-russo text-2xl text-mainColor">
							Discounts
						</h3>
						<p className="mt-5">
							Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Praesent quis diam
							consectetur, malesuada orci vitae, consequat
							tortor. Sed sagittis, libero sed consectetur
							auctor, mauris.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-8 px-20 lg:px-40">
				<h3 className="font-russo text-3xl md:text-5xl text-center">
					Our Bestselling{" "}
					<span className="text-mainColor">Collecions</span>
				</h3>

				<div className="mt-3">
					<Tabs>
						<TabList>
							<Tab>NIKE</Tab>
							<Tab>YEEZY</Tab>
							<Tab>NewBalance</Tab>
						</TabList>

						<TabPanel>
							<div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-2">
								{nikeTabData.map((sneaker, i) => (
									<Card
										key={i}
										name={sneaker.title}
										price={sneaker.price}
										slug={sneaker.slug.current}
										image={urlFor(sneaker.mainImage).url()}
									/>
								))}
							</div>
						</TabPanel>
						<TabPanel>
							<div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-2">
								{yeezyTabData.map((sneaker, i) => (
									<Card
										key={i}
										name={sneaker.title}
										price={sneaker.price}
										slug={sneaker.slug.current}
										image={urlFor(sneaker.mainImage).url()}
									/>
								))}
							</div>
						</TabPanel>
						<TabPanel>
							<div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-2">
								{newBalanceTabData.map((sneaker, i) => (
									<Card
										key={i}
										name={sneaker.title}
										price={sneaker.price}
										slug={sneaker.slug.current}
										image={urlFor(sneaker.mainImage).url()}
									/>
								))}
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</div>
			<div className="mt-8 px-20 lg:px-40">
				<h3 className="font-russo text-3xl md:text-5xl text-center">
					What Our{" "}
					<span className="text-mainColor">
						Clients Say
					</span>
					<br />
					About Us
				</h3>
				{!panelOpen && (
					<Swiper
						spaceBetween={30}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						breakpoints={{
							800: {
								slidesPerView: 3,
							},
							0: {
								slidesPerView: 1,
							},
						}}
						className="mt-5"
					>
						<SwiperSlide>
							<ReviewCard
								image={faker.image.avatar()}
								name="John Doe"
								address="Mandalay"
								description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
							/>
						</SwiperSlide>
						<SwiperSlide>
							<ReviewCard
								image={faker.image.avatar()}
								name="John Doe"
								address="Mandalay"
								description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
							/>
						</SwiperSlide>
						<SwiperSlide>
							<ReviewCard
								image={faker.image.avatar()}
								name="John Doe"
								address="Mandalay"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
							/>
						</SwiperSlide>
						<SwiperSlide>
							<ReviewCard
								image={faker.image.avatar()}
								name="John Doe"
								address="Mandalay"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
							/>
						</SwiperSlide>
					</Swiper>
				)}
			</div>
			<div className="mt-8 px-20 lg:px-40 mb-10">
				<Tabs>
					<TabList>
						<Tab>New Arrivals</Tab>
						<Tab>What&apos;s trending</Tab>
					</TabList>
					<TabPanel>
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
							className="mt-5"
						>
							<SwiperSlide>
								<ArrivalCard
									image="/assets/img/demo.webp"
									name="YZY 700 MNVN"
									price={249000}
									gender="Men"
									new={true}
									slug="yzy-700"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<ArrivalCard
									image="/assets/img/demo.webp"
									name="YZY 700 MNVN"
									price={249000}
									gender="Men"
									new={true}
									slug="yzy-700"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<ArrivalCard
									image="/assets/img/demo.webp"
									name="YZY 700 MNVN"
									price={249000}
									gender="Men"
									new={true}
									slug="yzy-700"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<ArrivalCard
									image="/assets/img/demo.webp"
									name="YZY 700 MNVN"
									price={249000}
									gender="Men"
									new={true}
									slug="yzy-700"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<ArrivalCard
									image="/assets/img/demo.webp"
									name="YZY 700 MNVN"
									price={249000}
									gender="Men"
									new={true}
									slug="yzy-700"
								/>
							</SwiperSlide>
						</Swiper>
					</TabPanel>
					<TabPanel>
						<p>2</p>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const nikeTabData = await client.fetch(
		`*[_type == "bestselling" && brand == "Nike" ].products[]->{_id, title, mainImage, price, slug}`
	);

	const yeezyTabData = await client.fetch(
		`*[_type == "bestselling" && brand == "Yeezy" ].products[]->{_id, title, mainImage, price, slug}`
	);

	const newBalanceTabData = await client.fetch(
		`*[_type == "bestselling" && brand == "New Balance" ].products[]->{_id, title, mainImage, price, slug}`
	);

	const mainImageQuery = await client.fetch(`
		*[_type == "heroImage"]
	`);

	const mainImageUrl = urlFor(
		mainImageQuery[0].mainImage
	).url();

	const mainImageData = {
		title: mainImageQuery[0].title,
		price: mainImageQuery[0].price,
		mainImageUrl: mainImageUrl,
	};

	return {
		props: {
			mainImageData,
			nikeTabData,
			yeezyTabData,
			newBalanceTabData,
		},
	};
}
