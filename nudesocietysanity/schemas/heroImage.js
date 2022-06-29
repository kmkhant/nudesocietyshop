export default {
	name: "heroImage",
	title: "Hero Image",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Main Image",
			type: "string",
		},
		{
			name: "price",
			title: "Price",
			type: "number",
		},
		{
			name: "mainImage",
			title: "Main Image",
			type: "image",
		},
	],
	preview: {
		select: {
			title: "title",
			media: "logo",
		},
	},
};
