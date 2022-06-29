import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import sanityClient, {
	SanityDocumentStub,
} from "sanity-algolia/node_modules/@sanity/client";
import indexer from "sanity-algolia";
import {
	isValidSignature,
	SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";

const algolia = algoliasearch(
	process.env.ALGOLIA_APPLICATION_ID ?? "",
	process.env.ALGOLIA_ADMIN_API_KEY ?? ""
);

const sanity = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.SANITY_API_TOKEN_READONLY,
	apiVersion: "2021-03-25",
	useCdn: false,
});

const secret = process.env.ALGOLIA_ADMIN_API_KEY!;

const readBody = async (readable: string) => {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(
			typeof chunk === "string" ? Buffer.from(chunk) : chunk
		);
	}
	return Buffer.concat(chunks).toString("utf-8");
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.headers["content-type"] !== "application/json") {
		res.status(400);
		res.json({ message: "Bad Request" });
		return;
	}

	const signature =
		req.headers[SIGNATURE_HEADER_NAME] !== undefined
			? req.headers[SIGNATURE_HEADER_NAME][0]
			: "";

	const body = await readBody(req.body);

	if (!isValidSignature(body, signature, secret)) {
		res.status(401).json({
			success: false,
			message: "Invalid Signature",
		});
		return;
	}

	// Configure to match Algolia index name
	const algoliaIndex = algolia.initIndex("dev_nudesociety");

	const sanityAngolia = indexer(
		{
			products: {
				index: algoliaIndex,
				projection: `{
						title,
						price,
						mainImage,
						slug
					}`,
			},
		},
		(document: SanityDocumentStub) => {
			switch (document._type) {
				case "products":
					return Object.assign({}, document);
				default:
					return document;
			}
		}
	);

	return sanityAngolia
		.webhookSync(sanity, req.body)
		.then(() => res.status(200).send("ok"));
}
