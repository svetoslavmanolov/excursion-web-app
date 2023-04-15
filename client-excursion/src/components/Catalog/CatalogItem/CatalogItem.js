import { Link } from "react-router-dom";
import './CatalogItem.css';

const CatalogItem = ({ excursion }) => {

    return (
        <div className="added-toys" key={excursion._id}>
            <Link to={`/catalog/${excursion._id}`} className="added-toys-in-market">
                <img src={excursion.image} className="picture-added-toys" alt="image"/>
                <h3>{excursion.title}</h3>
                <span>Price: ${excursion.price}</span>
            </Link>
        </div>
    )
}

export default CatalogItem;