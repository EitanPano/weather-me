import { lasso } from "./localAsyncStorageService";
import { accuWeatherService } from './accuWeatherService'


const SUGGESTION_KEY = 'suggestions'

const getSuggestionMap = async (searchTerm) => {
    const { term } = searchTerm;
    if (term.length <= 2) return;

    const suggestions = await lasso.query(SUGGESTION_KEY, {});
    const prefixes = Object.keys(suggestions);
    const isPrefixExist = prefixes.some((prefix) => prefix === term);

    if (!prefixes && !prefixes.length || !isPrefixExist) {
        const newSuggestions = await accuWeatherService.getAutoComplete(term);
        lasso.postMany(SUGGESTION_KEY, { [term]: newSuggestions }, {});
        return newSuggestions
    } 

    return suggestions[term];
}

export const suggestionService = {
    getSuggestionMap
}

