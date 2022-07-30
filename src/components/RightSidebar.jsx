import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../apiclient/savePost-api'
import { setSavedBlogs } from '../context/reducers/blogReducer'
import "../styles/rightSidebar.css"
import SaveCard from './SaveCard'
import SearchBar from './SearchBar'

const topics = [
    "All",
    "Self",
    "Technology",
    "Relationship",
    "Sports",
    "Politics",
    "Life style",
    "Fashion",
    "Productivity",
    "Health",
    "Adventure",
    "Programming",
    "Kids",
    "Finance",
    "Education",
    "Gaming",
    "Science"
]

const RightSidebar = () => {
    const blogs = useSelector((state) => state.blogs.savedBlogs)
    const dispatch = useDispatch()
    useEffect(() => {
        getSavedPosts(dispatch, setSavedBlogs).then(() => {
            // console.log(blogs);
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
                    {
                        topics.map((topic, index) =>
                            <Badge rounded="full" py="2" px="5" fontSize="sm" fontWeight="500" key={index} textTransform="capitalize" letterSpacing="wide" mt="2" mr="2" >{topic}</Badge>
                        )
                    }
                </Flex>
            </Box>
            <Box py="8">
                <Text fontSize="lg" fontWeight="600" letterSpacing="wide">Recently Saved</Text>
                {
                    blogs.length > 0 ? (blogs.length >= 3 ? blogs.slice(0, 3).map((blog, index) => (
                        <SaveCard key={index} blog={blog} />
                    )) : blogs.map((blog, index) => (
                        <SaveCard key={index} blog={blog} />
                    ))) : <Text>No blogs saved</Text>
                }
            </Box>
        </div>
    )
}

export default RightSidebar