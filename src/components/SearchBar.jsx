import { Text } from '@chakra-ui/react'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import "../styles/searchBar.css";
const SearchBar = () => {
    return (
        <div className='searchbar'>
            <Text fontSize="xl" color="blackAlpha.900">
                <IoSearchOutline />
            </Text>
            <input type="text" placeholder='Search' />
        </div>
    )
}

export default SearchBar