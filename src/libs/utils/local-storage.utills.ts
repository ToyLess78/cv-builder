// eslint-disable-next-line
export const saveToLocalStorage = (key: string, data: any) => {
	try {
		const serializedData = JSON.stringify(data);
		localStorage.setItem(key, serializedData);
	} catch (error) {
		console.error("Error saving to localStorage:", error);
	}
};

export const loadFromLocalStorage = (key: string) => {
	try {
		const serializedData = localStorage.getItem(key);
		if (serializedData === null) {
			return undefined;
		}
		return JSON.parse(serializedData);
	} catch (error) {
		console.error("Error loading from localStorage:", error);
		return undefined;
	}
};

export const clearLocalStorage = () => {
	try {
		localStorage.clear();
	} catch (error) {
		console.error("Error clearing localStorage:", error);
	}
};

export const removeFromLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing data from localStorage:", error);
	}
};
