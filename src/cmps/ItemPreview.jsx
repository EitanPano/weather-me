import { useNavigate } from 'react-router-dom';

export function ItemPreview({ item, onRemoveItem }) {
    const navigate = useNavigate();

    const onDetails = (itemId) => navigate(`/item/details/${itemId}`);
    const onEdit = (itemId) => navigate(`/item/edit/${itemId}`);

    return (
        <li onClick={() => onDetails(item._id)}>
            <img src="" alt="" />
            <div>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Type: {item.type}</p>
            </div>
            <div className="actions" onClick={(ev) => ev.stopPropagation()}>
                <button onClick={() => onEdit(item._id)}>Edit</button>
                <button onClick={() => onRemoveItem(item._id)}>❌</button>
            </div>
        </li>
    );
}
