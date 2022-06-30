import type { Hit as AlgoliaHit } from "@algolia/client-search";
import type { ComponentProps } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
	useHits,
	UseHitsProps,
} from "react-instantsearch-hooks";

export type HitsProps<THit> = ComponentProps<"div"> &
	UseHitsProps & {
		hitComponent: (props: { hit: THit }) => JSX.Element;
	};

export function Hits<
	THit extends AlgoliaHit<Record<string, unknown>>
>({ hitComponent: Hit, ...props }: HitsProps<THit>) {
	const { hits } = useHits(props);

	return (
		<Scrollbars
			universal={true}
			style={{ width: "100%", height: 600 }}
			autoHide={false}
		>
			<div className="grid grid-cols-1 md:grid-cols-3">
				{hits.map((hit) => (
					<div key={hit.objectID}>
						<Hit hit={hit as unknown as THit} />
					</div>
				))}
			</div>
		</Scrollbars>
	);
}
