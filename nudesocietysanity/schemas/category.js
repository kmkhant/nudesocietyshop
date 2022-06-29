export default {
	name: "category",
	title: "Category",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Brand Name",
			type: "string",
		},
		{
			name: "logo",
			title: "Logo",
			type: "image",
			options: {
				hotspot: true,
			},
		},
	],
	preview: {
		select: {
			title: "title",
			media: "logo",
		},
	},
};
