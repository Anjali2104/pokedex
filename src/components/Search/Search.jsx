import React from 'react'
import './Search.css'
import useDebounce from '../../hooks/useDebounce'
const Search = ({updateSearchTerm}) => {
  const debounceUpdateSearch = useDebounce((e) => updateSearchTerm(e.target.value));
  return (
      <input id='search-pokemon'  
       type='text' 
       placeholder='Which pokemon you are looking for?'
       onChange={debounceUpdateSearch}
       />
    
  )
}

export default Search
