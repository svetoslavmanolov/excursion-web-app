import { useContext, useState } from "react";
import './Search.css';

import { SearchContext } from "../../contexts/SearchContext";
import CatalogItem from "../Catalog/CatalogItem/CatalogItem";

const Search = () => {
    const { filterExcursions, filteredExcursions } = useContext(SearchContext);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        // filterExcursions(e.target.value);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        filterExcursions(search);
        // setSearch('')
    };

    return (
        <section className="search">
            <h1>Search for your excursion</h1>

            <form className="search-form" onSubmit={onSearchSubmit}>
                <input type="text" className="search-title" name="" placeholder="Search for excursion title..." onChange={onSearchChange} value={search} />
                {/* <input type="text" className="search-charity" name="" placeholder="Search Charity..." /> */}
                <button type="submit" className="btn-search">Search</button>
            </form>

            {/* <!--If there are matches after search--> */}
            <div className="search-result">
                <div className="search-list">
                    {filteredExcursions.length > 0
                        ? filteredExcursions.map(x => <CatalogItem key={x._id} excursion={x} />)
                        : <div className="no-match">
                            <p>No such excursion found</p>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Search;
