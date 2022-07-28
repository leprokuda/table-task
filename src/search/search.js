import React, {useState} from 'react'
import Search from '../icons/search-loop'

const SearchForm = ({onSearchSend}) => {

  const [searchValue, setSearchValue] = useState('')

  return (  
    <div className="form">
      <input
        value={searchValue}
        onChange={(event) => {setSearchValue(event.target.value)}}
        type="text"
        className="input"
        placeholder="Поиск"
      />
      <button className="button" type="button" onClick={() => onSearchSend(searchValue)}>{<Search/>}</button>
    </div>
  )
}

export default SearchForm