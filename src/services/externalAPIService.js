import axios from 'axios';
import { lasso } from './localAsyncStorageService';
import { toFahrenheit } from './utilService';

const ACCUWEATHER_API_KEY = '4h4quqPoRdrXHq8A2OpwasX8J3uDHAAp';

export const accuWeatherAPI = {
    getSuggestions,
    getLocation,
};

const SUGGESTION_KEY = 'suggestions';
const AUTO_COMPLETE_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}`;
const CURRENT_WEATHER_URL = 'http://dataservice.accuweather.com/currentconditions/v1';
const DAILY_FORECAST_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day';

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

async function getLocation(locationId) {
    const currCondition = await _getCurrConditions(locationId);
    const dailyForecast = await _getDailyForecast(locationId);
    return { ...currCondition, ...dailyForecast };
}

async function _getCurrConditions(locationId) {
    const reqUrl = `${CURRENT_WEATHER_URL}/${locationId}?apikey=${ACCUWEATHER_API_KEY}`
    try {
        const response = await axios.get(reqUrl);
        const data = response.data[0];

        const currConditions = {
            _id: locationId,
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
            dailyForcasts: DailyForecasts.reduce((acc, day) => {
                const { Date, Temperature, Day, Night } = day;
                acc.push({
                    date: Date,
                    temperature: {
                        minimum: {
                            celsius: Temperature.Minimum.Value,
                            fahrenheit: toFahrenheit(Temperature.Minimum.Value),
                        },
                        maximum: {
                            celsius: Temperature.Maximum.Value,
                            fahrenheit: toFahrenheit(Temperature.Maximum.Value),
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

const defaultCurrConditions = [
    {
        LocalObservationDateTime: '2022-03-23T11:59:00+02:00',
        EpochTime: 1648029540,
        WeatherText: 'Clouds and sun',
        WeatherIcon: 4,
        HasPrecipitation: false,
        PrecipitationType: null,
        IsDayTime: true,
        Temperature: {
            Metric: {
                Value: 14.2,
                Unit: 'C',
                UnitType: 17,
            },
            Imperial: {
                Value: 58,
                Unit: 'F',
                UnitType: 18,
            },
        },
        MobileLink:
            'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
    },
];


// const defaultDailyForcast = {
//     Headline: {
//         EffectiveDate: '2022-03-23T19:00:00+02:00',
//         EffectiveEpochDate: 1648054800,
//         Severity: 3,
//         Text: 'Expect rainy weather Wednesday evening through Thursday evening',
//         Category: 'rain',
//         EndDate: '2022-03-25T01:00:00+02:00',
//         EndEpochDate: 1648162800,
//         MobileLink:
//             'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us',
//         Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us',
//     },
//     DailyForecasts: [
//         {
//             Date: '2022-03-23T07:00:00+02:00',
//             EpochDate: 1648011600,
//             Temperature: {
//                 Minimum: {
//                     Value: 10.9,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//                 Maximum: {
//                     Value: 14.9,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//             },
//             Day: {
//                 Icon: 14,
//                 IconPhrase: 'Partly sunny w/ showers',
//                 HasPrecipitation: true,
//                 PrecipitationType: 'Rain',
//                 PrecipitationIntensity: 'Moderate',
//             },
//             Night: {
//                 Icon: 18,
//                 IconPhrase: 'Rain',
//                 HasPrecipitation: true,
//                 PrecipitationType: 'Rain',
//                 PrecipitationIntensity: 'Light',
//             },
//             Sources: ['AccuWeather'],
//             MobileLink:
//                 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us',
//             Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us',
//         },
//         {
//             Date: '2022-03-24T07:00:00+02:00',
//             EpochDate: 1648098000,
//             Temperature: {
//                 Minimum: {
//                     Value: 10.5,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//                 Maximum: {
//                     Value: 14,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//             },
//             Day: {
//                 Icon: 18,
//                 IconPhrase: 'Rain',
//                 HasPrecipitation: true,
//                 PrecipitationType: 'Rain',
//                 PrecipitationIntensity: 'Moderate',
//             },
//             Night: {
//                 Icon: 12,
//                 IconPhrase: 'Showers',
//                 HasPrecipitation: true,
//                 PrecipitationType: 'Rain',
//                 PrecipitationIntensity: 'Moderate',
//             },
//             Sources: ['AccuWeather'],
//             MobileLink:
//                 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us',
//             Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us',
//         },
//         {
//             Date: '2022-03-25T07:00:00+02:00',
//             EpochDate: 1648184400,
//             Temperature: {
//                 Minimum: {
//                     Value: 12.4,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//                 Maximum: {
//                     Value: 15.2,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//             },
//             Day: {
//                 Icon: 12,
//                 IconPhrase: 'Showers',
//                 HasPrecipitation: true,
//                 PrecipitationType: 'Rain',
//                 PrecipitationIntensity: 'Light',
//             },
//             Night: {
//                 Icon: 34,
//                 IconPhrase: 'Mostly clear',
//                 HasPrecipitation: false,
//             },
//             Sources: ['AccuWeather'],
//             MobileLink:
//                 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us',
//             Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us',
//         },
//         {
//             Date: '2022-03-26T07:00:00+02:00',
//             EpochDate: 1648270800,
//             Temperature: {
//                 Minimum: {
//                     Value: 10.9,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//                 Maximum: {
//                     Value: 16.2,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//             },
//             Day: {
//                 Icon: 2,
//                 IconPhrase: 'Mostly sunny',
//                 HasPrecipitation: false,
//             },
//             Night: {
//                 Icon: 35,
//                 IconPhrase: 'Partly cloudy',
//                 HasPrecipitation: false,
//             },
//             Sources: ['AccuWeather'],
//             MobileLink:
//                 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us',
//             Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us',
//         },
//         {
//             Date: '2022-03-27T07:00:00+02:00',
//             EpochDate: 1648357200,
//             Temperature: {
//                 Minimum: {
//                     Value: 13.2,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//                 Maximum: {
//                     Value: 17.2,
//                     Unit: 'C',
//                     UnitType: 17,
//                 },
//             },
//             Day: {
//                 Icon: 2,
//                 IconPhrase: 'Mostly sunny',
//                 HasPrecipitation: false,
//             },
//             Night: {
//                 Icon: 33,
//                 IconPhrase: 'Clear',
//                 HasPrecipitation: false,
//             },
//             Sources: ['AccuWeather'],
//             MobileLink:
//                 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us',
//             Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us',
//         },
//     ],
// };
