import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [selectedBrand, setSelectedBrand] = useState("All");

	const [panelOpen, setPanelOpen] = useState(false);
	const [showFilters, setShowFilters] = useState(true);

	return (
		<Context.Provider
			value={{
				selectedBrand,
				setSelectedBrand,
				panelOpen,
				setPanelOpen,
				showFilters,
				setShowFilters,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
