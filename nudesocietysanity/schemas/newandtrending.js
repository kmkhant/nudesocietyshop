export default {
	name: "newandtrending",
	title: "New Arrival and Trending",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "products",
			title: "Products",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "products" }],
				},
			],
		},
	],
};
