export default {
	name: "bestselling",
	title: "Best Selling Shoes",
	type: "document",
	fields: [
		{
			name: "brand",
			title: "Brand Name",
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
