import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-03-25",
	useCdn: false,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source) {
	return builder.image(source);
}
