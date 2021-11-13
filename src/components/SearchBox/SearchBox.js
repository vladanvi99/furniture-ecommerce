import React, { useState } from 'react';
import './css/searchBox.scss';

const SearchBox = (props) => {
    const [name, setName] = useState('');
    const page = 1;
    const onSearch = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name === '' ? name : name + '/' }page/${page}`);
    }
    return (
        <div>
            <form className="search" onSubmit={onSearch}>
                <div className="row">
                    <input type="text" name="q" id="q" placeholder="Search by Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit" className="primary">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBox;
