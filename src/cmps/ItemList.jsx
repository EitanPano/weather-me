import { ItemPreview } from './ItemPreview';

export function ItemList({items, onRemoveItem}) {
    return (
        <ul>
            {items.map(item => <ItemPreview item={item} onRemoveItem={onRemoveItem} key={item._id}></ItemPreview>)}
        </ul>
    );
}
