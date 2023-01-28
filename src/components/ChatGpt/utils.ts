export const HISTORY_KEY = 'history';
const INITIAL_HISTORY: HistoryEntry[] = [];

export const getSavedHistory = () => {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || JSON.stringify(INITIAL_HISTORY));
    } catch (_err) {
        return [];
    }
};