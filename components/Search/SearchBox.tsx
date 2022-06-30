import {
	useEffect,
	useRef,
	useState,
	ChangeEvent,
	ComponentProps,
} from "react";
import {
	useSearchBox,
	UseSearchBoxProps,
} from "react-instantsearch-hooks";
import { ControlledSearchBox } from "./ControlledSearchBox";

export type SearchBoxProps = ComponentProps<"div"> &
	UseSearchBoxProps;

export function SearchBox(props: SearchBoxProps) {
	const { query, refine, isSearchStalled } =
		useSearchBox(props);
	const [value, setValue] = useState(query);
	const inputRef = useRef<HTMLInputElement>(null);

	function onReset() {
		setValue("");
	}

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.currentTarget.value);
	}

	useEffect(() => {
		if (query !== value) {
			refine(value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, refine]);

	return (
		<ControlledSearchBox
			className={props.className}
			inputRef={inputRef}
			isSearchStalled={isSearchStalled}
			onChange={onChange}
			onReset={onReset}
			placeholder={props.placeholder}
			value={value}
		/>
	);
}
