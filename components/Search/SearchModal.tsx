import { FC } from "react";
import {
	XIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import { useStateContext } from "../../context/StateContext";
import algoliasearch from "algoliasearch/lite";
import { ArrivalCard } from "..";
import { urlFor } from "../../sanity/sanity";
import { Hit as AlgoliaHit } from "@algolia/client-search";
import {
	DynamicWidgets,
	InstantSearch,
} from "react-instantsearch-hooks";
import { SearchBox } from "./SearchBox";
import { Hits } from "./Hits";

type HitProps = {
	hit: AlgoliaHit<{
		_type: string;
		_rev: string;
		_id: string;
		title: string;
		price: number;
		mainImage: {
			_type: string;
			asset: {
				_ref: string;
				_type: string;
			};
		};
		slug: {
			_type: "string";
			current: "string";
		};
	}>;
};

const Hit = ({ hit }: HitProps) => {
	return (
		<ArrivalCard
			name={hit.title}
			price={hit.price}
			image={urlFor(hit.mainImage).url()}
			slug={hit.slug.current}
		/>
	);
};

const searchClient = algoliasearch(
	"BYD4K1KDPP",
	"4e5024ad94fbd212a87e33850fe83ef4"
);

const SearchModal: FC = () => {
	const { setPanelOpen } = useStateContext();

	return (
		<div className="mt-28">
			<InstantSearch
				searchClient={searchClient}
				indexName="dev_nudesociety"
			>
				<div className="flex justify-between items-center">
					<p>&#8203;</p>

					<SearchBox placeholder="Search Sneakers" />

					<button onClick={() => setPanelOpen(false)}>
						<XIcon className="w-8 h-8" />
					</button>
				</div>
				<div className="mt-5">
					<Hits hitComponent={Hit} />
				</div>
			</InstantSearch>
		</div>
	);
};

export default SearchModal;
