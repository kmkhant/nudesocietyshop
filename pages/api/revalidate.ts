import type { NextApiRequest, NextApiResponse } from "next";
import {
	isValidSignature,
	SIGNATURE_HEADER_NAME,
} from "@sanity/webhook";

const secret = process.env.ALGOLIA_ADMIN_API_KEY as string;
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.headers["content-type"] !== "application/json") {
		res.status(400);
		res.json({ message: "Bad Request" });
		return;
	}

	const signature = req.headers[
		SIGNATURE_HEADER_NAME
	] as string;

	const body = JSON.stringify(req.body);

	if (!isValidSignature(body, signature, secret)) {
		res.status(401).json({
			success: false,
			message: "Invalid Signature",
		});
		return;
	}

	const slug = req.body.slug.current;

	try {
		await res.unstable_revalidate(`/products/${slug}`);
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).send("Error Validating");
	}
}
