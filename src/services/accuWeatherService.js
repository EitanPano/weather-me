import axios from 'axios';
import { lasso } from './localAsyncStorageService';
import { toFahrenheit } from './utilService';

export const accuWeatherAPI = {
    save,
    getById,
    getSuggestions,
    getLocation,
    getDefaultLocation
};

const ACCUWEATHER_API_KEY = '4h4quqPoRdrXHq8A2OpwasX8J3uDHAAp';

const AUTO_COMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}`;
const CURRENT_WEATHER_URL = 'http://dataservice.accuweather.com/currentconditions/v1';
const DAILY_FORECAST_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day';

const SUGGESTION_KEY = 'suggestions';
const CACHED_LOCATION_KEY = 'cachedLocations'

export async function getById(id) {
    const location = await lasso.get(ACCUWEATHER_API_KEY, id);
    return location ? { ...location } : null;
}

function save(location) {
    return location._id ? _updateLocation(location) : _addLocation(location);
}

async function _addLocation(location) {
    const newLocation = await lasso.post(CACHED_LOCATION_KEY, location);
    return {...newLocation};
}

async function _updateLocation(location) {
    const newLocation = await lasso.put(CACHED_LOCATION_KEY, location);
    return {...newLocation};
}

async function getSuggestions(searchTerm) {
    const { term } = searchTerm;
    if (term.length <= 2) return;

    const suggestions = await lasso.query(SUGGESTION_KEY, {});
    const prefixes = Object.keys(suggestions);

    if (!prefixes || !prefixes.length) return getAutoComplete(term);
    const isPrefixExist = prefixes.some((prefix) => prefix === term);
    if (!isPrefixExist) return getAutoComplete(term);

    return suggestions[term];
}

async function getAutoComplete(term) {
    try {
        const reqUrl = `${AUTO_COMPLETE_URL}&q=${term}`;
        const { data } = await axios.get(reqUrl);
        const newSuggestions = data.reduce((acc, suggestion) => {
            const { Key, LocalizedName, Country, Rank } = suggestion;
            const newSuggestion = {
                _id: Key,
                cityName: LocalizedName,
                countryName: Country.LocalizedName,
                countryID: Country.ID,
                rank: Rank,
            };
            acc.push(newSuggestion);
            return acc;
        }, []);

        await lasso.postMany(SUGGESTION_KEY, { [term]: newSuggestions }, {});
        return newSuggestions;
    } catch (err) {
        console.log('error:', err);
    }
}

async function getLocation(locationEntry) {
    const currCondition = await _getCurrConditions(locationEntry._id);
    const dailyForecast = await _getDailyForecast(locationEntry._id);
    return { ...locationEntry ,...currCondition, ...dailyForecast };
}

async function _getCurrConditions(locationId) {
    const reqUrl = `${CURRENT_WEATHER_URL}/${locationId}?apikey=${ACCUWEATHER_API_KEY}`
    try {
        const response = await axios.get(reqUrl);
        const data = response.data[0];

        const currConditions = {
            localeTime: data.LocalObservationDateTime,
            temperature: {
                celsius: data.Temperature.Metric.Value,
                fahrenheit: data.Temperature.Imperial.Value,
            },
            currentWeatherText: data.WeatherText,
            weatherIcon: data.WeatherIcon,
            isDayTime: data.IsDayTime,
        };
        return currConditions;
    } catch(err) {
        console.log('error: ', err)
    }
}

async function _getDailyForecast(locationId) {
    const reqUrl = `${DAILY_FORECAST_URL}/${locationId}?apikey=${ACCUWEATHER_API_KEY}&metric=true`
    try {
        const { data } = await axios.get(reqUrl)
        const { Headline, DailyForecasts } = data;
        const dailyForecast = {
            forcastText: Headline.Text,
            forecastCategory: Headline.Category,
            dailyForecasts: DailyForecasts.reduce((acc, day) => {
                const { Date, Temperature, Day, Night } = day;
                acc.push({
                    date: Date,
                    temperature: {
                        minimum: {
                            celsius: Math.ceil(+Temperature.Minimum.Value),
                            fahrenheit: Math.ceil(toFahrenheit(Temperature.Minimum.Value)),
                        },
                        maximum: {
                            celsius: Math.ceil(Temperature.Maximum.Value),
                            fahrenheit: Math.ceil(toFahrenheit(Temperature.Maximum.Value)),
                        },
                    },
                    atDay: Day.IconPhrase,
                    atNight: Night.IconPhrase,
                });
                return acc;
            }, []),
        };
        return dailyForecast;
    } catch (err) {
        console.log('error: ', err);
    }
}

function getDefaultLocation() {
    return {
        _id: 215854,
        cityName: 'Tel Aviv',
        countryName: 'Israel',
        countryID: 'IL',
        rank: 31,
    };
};