import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [selectedBrand, setSelectedBrand] =
		useState("Adidas");

	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<Context.Provider
			value={{
				selectedBrand,
				setSelectedBrand,
				panelOpen,
				setPanelOpen,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
