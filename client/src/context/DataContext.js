import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [fetchError, setFetchError] = useState(null);

	function getStyles(name, user, theme, users) {
		return {
			fontWeight:
				users.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	return (
		<DataContext.Provider value={{
			fetchError, setFetchError, getStyles
		}}>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext;