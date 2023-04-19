import { useEffect, useState } from "react";
import './Catalog.css';

import CatalogItem from '../Catalog/CatalogItem/CatalogItem';
import * as excursionService from '../../services/excursionService';

const Catalog = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        excursionService.getAll()
            .then(excursions => {
                setData(excursions);
            });
    }, []);

    return (
        <section style={{height: "90vh"}}>
            <div className="added-excursions">
                {data.length > 0
                    ? data.map(x => <CatalogItem key={x._id} excursion={x} />)
                    : <div className="loading">Loading...</div>
                }
                {/* {data.length < 0 &&
                    <div className="loading">There are no excursions found...</div>
                } */}
            </div>
        </section >
    )
}

export default Catalog;

