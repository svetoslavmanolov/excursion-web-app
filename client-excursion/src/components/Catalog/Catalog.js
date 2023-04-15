import { useContext, useEffect, useState } from "react";
import './Catalog.css';

import { ExcursionContext } from "../../contexts/ExcursionContext";
import CatalogItem from '../Catalog/CatalogItem/CatalogItem';
import * as excursionService from '../../services/excursionService';

const Catalog = () => {

    // const { excursions } = useContext(ExcursionContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        excursionService.getAll()
            .then(excursions => {
                setData(excursions);
            });
    }, [data]);


    return (
        <section id="viewCatalog" className="background-img">
            <div className="added-toys">
                {data.length > 0
                    ? data.map(x => <CatalogItem key={x._id} excursion={x} />)
                    : <div className="guest">Loading...</div>
                }
                {data.length < 0 &&
                    <div className="guest">There are no excursions found...</div>
                }
            </div>
        </section >

    )
}

export default Catalog;

