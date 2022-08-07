import "./SearchUs.css"


const SearchUs =() => {
    return(
        <div className="search-filter">
            <label>
                State
            </label>
            <select placeholder="State">
                <option>
                    Holi
                </option>
                <option>
                    jojo
                </option>
            </select>
        </div>
    )
}

export default SearchUs