import { useForm } from '../hooks/useForm';

export const ItemFilter = (props) => {
    const [filterBy, handleChange] = useForm(
        {
            term: '',
            minTemp: '',
            maxTemp: '',
            type: ''
        },
        props.onChangeFilter
    );

    const { term, minTemp, maxTemp, type } = filterBy;
    return (
        <form className="item-filter">
            <h2>{JSON.stringify(filterBy)}</h2>
            <ul>
                <li>
                    <label htmlFor="term">Name: </label>
                    <input
                        onChange={handleChange}
                        value={term}
                        name="term"
                        id="term"
                        type="text"
                        placeholder="Search"
                    />
                </li>
                <li>
                    <label htmlFor="minTemp">Temp: </label>
                    <input
                        onChange={handleChange}
                        value={minTemp}
                        name="minTemp"
                        id="minTemp"
                        type="number"
                        min="0"
                        max="1000"
                        placeholder="Min"
                    />
                    <input
                        onChange={handleChange}
                        value={maxTemp}
                        name="maxTemp"
                        id="maxTemp"
                        type="number"
                        min="0"
                        max="1000"
                        placeholder="Max"
                    />
                </li>
                <li>
                    <label htmlFor="type">Type: </label>
                    <select onChange={handleChange} value={type} name="type" id="type">
                        <option disabled value="">Select Type</option>
                        <option value="cloudy">Cloudy</option>
                        <option value="rainy">Rainy</option>
                        <option value="sunny">Sunny</option>
                    </select>
                </li>
            </ul>
        </form>
    );
};
