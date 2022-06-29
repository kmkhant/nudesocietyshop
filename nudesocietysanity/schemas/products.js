export default {
	name: "products",
	type: "document",
	title: "Products",
	fields: [
		{
			name: "title",
			type: "string",
			title: "Name",
		},
		{
			name: "categoryName",
			type: "string",
			title: "Category Name",
		},
		{
			name: "price",
			type: "number",
			title: "Price",
		},
		{
			name: "availableSizes",
			type: "array",
			title: "Available Sizes",
			of: [{ type: "string" }],
		},
		{
			name: "mainImage",
			type: "image",
			title: "Main Image",
		},
		{
			name: "description",
			type: "text",
			title: "Description",
		},
		{
			name: "featuredImages",
			type: "array",
			title: "Featured Images",
			of: [{ type: "image" }],
		},
		{
			name: "colors",
			type: "array",
			title: "Colors",
			of: [{ type: "string" }],
		},
		{
			name: "productCode",
			type: "string",
			title: "Product Code",
		},
		{
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "title",
				maxLength: 200,
				slugify: (input) =>
					input
						.toLowerCase()
						.replace(/\s+/g, "-")
						.slice(0, 200),
			},
		},
		{
			name: "brand",
			title: "Brand",
			type: "reference",
			to: { type: "category" },
		},
	],
};
