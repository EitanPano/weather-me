import { ItemPreview } from './ItemPreview';

export function ItemList({ items, byKeys = true}) {
    
    const listByKeys = (list) => {
        return (
            <ul>
                {list.map((item) => (
                    <ItemPreview item={item} key={item._id}></ItemPreview>
                    ))}
            </ul>
        );
    };
    
    const listByIdxs = (list) => {
        return (
            <ul>
                {list.map((item, idx) => (
                    <ItemPreview item={item} key={idx}></ItemPreview>
                    ))}
            </ul>
        );
    };
    
    if (!items) return null;
    return byKeys ? listByKeys(items) : listByIdxs(items)
}
