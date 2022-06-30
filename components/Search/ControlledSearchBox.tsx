import type {
	ChangeEvent,
	FormEvent,
	RefObject,
	ComponentProps,
} from "react";
import { XIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";

export type ControlledSearchBoxProps =
	ComponentProps<"div"> & {
		inputRef: RefObject<HTMLInputElement>;
		isSearchStalled: boolean;
		onChange(event: ChangeEvent): void;
		onReset(event: FormEvent): void;
		onSubmit?(event: FormEvent): void;
		placeholder?: string;
		value: string;
	};

export function ControlledSearchBox({
	inputRef,
	isSearchStalled,
	onChange,
	onReset,
	onSubmit,
	placeholder,
	value,
	...props
}: ControlledSearchBoxProps) {
	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		event.stopPropagation();

		if (onSubmit) {
			onSubmit(event);
		}

		if (inputRef.current) {
			inputRef.current.blur();
		}
	}

	function handleReset(event: FormEvent) {
		event.preventDefault();
		event.stopPropagation();

		onReset(event);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	return (
		<div className="flex items-center" {...props}>
			<form
				action=""
				className=""
				noValidate
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				<div className="flex items-center bg-gray-200 px-3 rounded-full">
					<SearchIcon className="w-5 h-5" />
					<input
						ref={inputRef}
						className="focus:ring-0 border-0 bg-transparent"
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						placeholder={placeholder}
						spellCheck={false}
						maxLength={128}
						type="search"
						value={value}
						onChange={onChange}
					/>
				</div>
			</form>
		</div>
	);
}
