import { Link } from "react-router-dom";

const CatalogItem = ({ excursion }) => {

    return (
        <div className="added-excursions" key={excursion._id}>
            <Link to={`/catalog/${excursion._id}`} className="added-toys-in-market">
                <img src={excursion.image} className="picture-added-excursions" alt="image" />
                <div className="excursion-details">
                    <h3>{excursion.title}</h3>
                    <span>Price: ${excursion.price}</span>
                    <br />
                    <span>{excursion.duration}</span>
                </div>
            </Link>
        </div>
    )
}

export default CatalogItem;