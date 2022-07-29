import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../apiclient/postapi'
import { setSavedBlogs } from '../context/reducers/blogReducer'
import "../styles/rightSidebar.css"
import SaveCard from './SaveCard'
import SearchBar from './SearchBar'

const RightSidebar = () => {
    const blogs = useSelector((state) => state.blogs.savedBlogs)
    const dispatch = useDispatch()
    useEffect(() => {
        getSavedPosts(dispatch, setSavedBlogs).then(() => {
            console.log(blogs);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className='rightSidebar'>
            <SearchBar />
            <Box py="8">
                <Text fontSize="lg" fontWeight="600" letterSpacing="wide">Recommended topics</Text>
                <Flex wrap="wrap">
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >All</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Self</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Technology</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Relationship</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Sports</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Politics</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Life style</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Fashion</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Productivity</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Health</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Adventure</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Programming</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Kids</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Finance</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Education</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Gaming</Badge>
                    <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >Science</Badge>
                </Flex>
            </Box>
            <Box py="8">
                <Text fontSize="lg" fontWeight="600" letterSpacing="wide">Recently Saved</Text>
                {
                    blogs.length > 0 ? blogs.map((blog, index) => (
                        <SaveCard key={index} blog={blog} />
                    )) : <Text>No blogs saved</Text>
                }
            </Box>
        </div>
    )
}

export default RightSidebar