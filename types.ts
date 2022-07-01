export interface TabData {
	_id: string;
	mainImage: {
		_type: string;
		asset: {
			_ref: string;
			_type: string;
		};
	};
	price: number;
	slug: {
		_type: string;
		current: string;
	};
	title: string;
}

export interface TabDataItems extends Array<TabData> {}

export interface HomeProps {
	mainImageData: {
		title: string;
		price: number;
		mainImageUrl: string;
	};
	nikeTabData: TabDataItems;
	yeezyTabData: TabDataItems;
	newBalanceTabData: TabDataItems;
	newArrivalTabData: TabDataItems;
	trendingTabData: TabDataItems;
}

export interface ProductData {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
	availableSizes: Array<string>;
	brand: {
		title: string;
	};
	categoryName: string;
	colors: Array<string>;
	description: string;
	featuredImages: Array<Object>;
	mainImage: {
		_type: string;
		_asset: Object;
	};
	price: number;
	productCode: string;
	slug: {
		_type: string;
		current: string;
	};
	title: string;
}

export interface ProductDataItems
	extends Array<ProductData> {}
