import axios from 'axios';
import { lasso } from './localAsyncStorageService';
import { toFahrenheit } from './utilService';

export const accuWeatherService = {
    save,
    getById,
    getSuggestions,
    getLocation,
    getDefaultLocation,
};

const ACCUWEATHER_API_KEY = '4h4quqPoRdrXHq8A2OpwasX8J3uDHAAp';

const AUTO_COMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}`;
const CURRENT_WEATHER_URL =
    'http://dataservice.accuweather.com/currentconditions/v1';
const DAILY_FORECAST_URL =
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day';

const SUGGESTION_KEY = 'suggestions';
const CACHED_LOCATION_KEY = 'cachedLocations';

async function getById(id) {
    const location = await lasso.get(CACHED_LOCATION_KEY, id);
    return location ? { ...location } : null;
}

function save(location) {
    return location._id ? _updateLocation(location) : _addLocation(location);
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
    locationEntry._id = '' + locationEntry._id;
    return { ...locationEntry, ...currCondition, ...dailyForecast };
}

async function _getCurrConditions(locationId) {
    const reqUrl = `${CURRENT_WEATHER_URL}/${locationId}?apikey=${ACCUWEATHER_API_KEY}`;
    try {
        const response = await axios.get(reqUrl);
        const data = response.data[0];
        // console.log('A request was made');

        const currConditions = {
            localeTime: data.LocalObservationDateTime,
            temperature: {
                celsius: Math.round(data.Temperature.Metric.Value),
                fahrenheit: Math.round(data.Temperature.Imperial.Value),
            },
            currentWeatherText: data.WeatherText,
            weatherIcon: data.WeatherIcon,
            isDayTime: data.IsDayTime,
        };
        return currConditions;
    } catch (err) {
        console.log('error: ', err);
    }
}

async function _getDailyForecast(locationId) {
    const reqUrl = `${DAILY_FORECAST_URL}/${locationId}?apikey=${ACCUWEATHER_API_KEY}&metric=true`;
    try {
        const { data } = await axios.get(reqUrl);
        // console.log('A request was made');
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
                            celsius: Math.round(+Temperature.Minimum.Value),
                            fahrenheit: Math.round(
                                toFahrenheit(Temperature.Minimum.Value)
                            ),
                        },
                        maximum: {
                            celsius: Math.round(Temperature.Maximum.Value),
                            fahrenheit: Math.round(
                                toFahrenheit(Temperature.Maximum.Value)
                            ),
                        },
                    },
                    atDay: {weatherText: Day.IconPhrase, icon: Day.Icon},
                    atNight: {weatherText: Night.IconPhrase, icon: Night.Icon},
                });
                return acc;
            }, []),
        };
        return dailyForecast;
    } catch (err) {
        console.log('error: ', err);
    }
}

async function _addLocation(location) {
    const newLocation = await lasso.post(CACHED_LOCATION_KEY, location);
    return { ...newLocation };
}

async function _updateLocation(location) {
    const newLocation = await lasso.put(CACHED_LOCATION_KEY, location);
    return { ...newLocation };
}

function getDefaultLocation() {
    return {
        _id: 215854,
        cityName: 'Tel Aviv',
        countryName: 'Israel',
        countryID: 'IL',
        rank: 31,
    };
}

export const weatherIcons = {
    1: 'https://res.cloudinary.com/ep-development/image/upload/v1648141571/WeatherMe/1.png',
    2: 'https://res.cloudinary.com/ep-development/image/upload/v1648141649/WeatherMe/2.png',
    3: 'https://res.cloudinary.com/ep-development/image/upload/v1648141666/WeatherMe/3.png',
    4: 'https://res.cloudinary.com/ep-development/image/upload/v1648141669/WeatherMe/4.png',
    5: 'https://res.cloudinary.com/ep-development/image/upload/v1648141671/WeatherMe/5.png',
    6: 'https://res.cloudinary.com/ep-development/image/upload/v1648141673/WeatherMe/6.png',
    7: 'https://res.cloudinary.com/ep-development/image/upload/v1648141674/WeatherMe/7.png',
    8: 'https://res.cloudinary.com/ep-development/image/upload/v1648141676/WeatherMe/8.png',
    9: 'https://res.cloudinary.com/ep-development/image/upload/v1648141684/WeatherMe/11.png',
    10: 'https://res.cloudinary.com/ep-development/image/upload/v1648141684/WeatherMe/11.png',
    11: 'https://res.cloudinary.com/ep-development/image/upload/v1648141684/WeatherMe/11.png',
    12: 'https://res.cloudinary.com/ep-development/image/upload/v1648141686/WeatherMe/12.png',
    13: 'https://res.cloudinary.com/ep-development/image/upload/v1648141688/WeatherMe/13.png',
    14: 'https://res.cloudinary.com/ep-development/image/upload/v1648141694/WeatherMe/14.png',
    15: 'https://res.cloudinary.com/ep-development/image/upload/v1648141697/WeatherMe/15.png',
    16: 'https://res.cloudinary.com/ep-development/image/upload/v1648141698/WeatherMe/16.png',
    17: 'https://res.cloudinary.com/ep-development/image/upload/v1648141699/WeatherMe/17.png',
    18: 'https://res.cloudinary.com/ep-development/image/upload/v1648141700/WeatherMe/18.png',
    19: 'https://res.cloudinary.com/ep-development/image/upload/v1648141701/WeatherMe/19.png',
    20: 'https://res.cloudinary.com/ep-development/image/upload/v1648141703/WeatherMe/20.png',
    21: 'https://res.cloudinary.com/ep-development/image/upload/v1648141704/WeatherMe/21.png',
    22: 'https://res.cloudinary.com/ep-development/image/upload/v1648141707/WeatherMe/22.png',
    23: 'https://res.cloudinary.com/ep-development/image/upload/v1648141708/WeatherMe/23.png',
    24: 'https://res.cloudinary.com/ep-development/image/upload/v1648141711/WeatherMe/24.png',
    25: 'https://res.cloudinary.com/ep-development/image/upload/v1648141713/WeatherMe/25.png',
    26: 'https://res.cloudinary.com/ep-development/image/upload/v1648141714/WeatherMe/26.png',
    27: 'https://res.cloudinary.com/ep-development/image/upload/v1648141716/WeatherMe/29.png',
    28: 'https://res.cloudinary.com/ep-development/image/upload/v1648141716/WeatherMe/29.png',
    29: 'https://res.cloudinary.com/ep-development/image/upload/v1648141716/WeatherMe/29.png',
    30: 'https://res.cloudinary.com/ep-development/image/upload/v1648141723/WeatherMe/30.png',
    31: 'https://res.cloudinary.com/ep-development/image/upload/v1648141725/WeatherMe/31.png',
    32: 'https://res.cloudinary.com/ep-development/image/upload/v1648141726/WeatherMe/32.png',
    33: 'https://res.cloudinary.com/ep-development/image/upload/v1648141728/WeatherMe/33.png',
    34: 'https://res.cloudinary.com/ep-development/image/upload/v1648141731/WeatherMe/34.png',
    35: 'https://res.cloudinary.com/ep-development/image/upload/v1648141733/WeatherMe/35.png',
    36: 'https://res.cloudinary.com/ep-development/image/upload/v1648141735/WeatherMe/36.png',
    37: 'https://res.cloudinary.com/ep-development/image/upload/v1648141736/WeatherMe/37.png',
    38: 'https://res.cloudinary.com/ep-development/image/upload/v1648141737/WeatherMe/38.png',
    39: 'https://res.cloudinary.com/ep-development/image/upload/v1648141739/WeatherMe/39.png',
    40: 'https://res.cloudinary.com/ep-development/image/upload/v1648141741/WeatherMe/40.png',
    41: 'https://res.cloudinary.com/ep-development/image/upload/v1648141743/WeatherMe/41.png',
    42: 'https://res.cloudinary.com/ep-development/image/upload/v1648141744/WeatherMe/42.png',
    43: 'https://res.cloudinary.com/ep-development/image/upload/v1648141745/WeatherMe/43.png',
    44: 'https://res.cloudinary.com/ep-development/image/upload/v1648141747/WeatherMe/44.png',
};
