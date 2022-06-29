import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import sanityClient, {
	SanityDocumentStub,
} from "sanity-algolia/node_modules/@sanity/client";
import { urlFor } from "../../sanity/sanity";
import indexer from "sanity-algolia";

const algolia = algoliasearch(
	process.env.ALGOLIA_APPLICATION_ID ?? "",
	process.env.ALGOLIA_ADMIN_API_KEY ?? ""
);

const sanity = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.SANITY_API_TOKEN_READONLY,
	apiVersion: "2022-03-25",
	useCdn: false,
});

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sanityAngolia = indexer(
		{
			products: {
				index: algolia.initIndex("dev_nudesociety"),
			},
		},
		(document: SanityDocumentStub) => {
			switch (document._type) {
				case "products":
					return {
						title: document.title,
						slug: document.slug.current,
						price: document.price,
						image: urlFor(document.mainImage).url(),
					};
				default:
					throw new Error(
						`Unknown type: ${document._type}`
					);
			}
		}
	);

	return sanityAngolia
		.webhookSync(sanity, req.body)
		.then(() => res.status(200).send("ok"));
}
