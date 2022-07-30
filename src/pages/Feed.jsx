import { Box, Container, Divider, Spinner, Text } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../apiclient/postapi'
import BlogCard from '../components/BlogCard'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { setBlogFeed } from '../context/reducers/blogReducer'
import "../styles/feed.css"
import { Routes, Route } from "react-router-dom";
import Blog from './Blog'

const Feed = () => {
    const blogs = useSelector((state) => state.blogs.blogFeed)
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const usertemp = {
            username: localStorage.username,
            email: localStorage.email,
            dpUrl: localStorage.dpUrl,
            userId: localStorage.userId
        }

        setUser(usertemp)
    }, [])


    useEffect(() => {
        getPosts(dispatch, setBlogFeed).then(() => {
            // console.log(blogs);
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
        });
    }, [])
    return (
        <div className='feed'>
            <Sidebar user={user} />
            <Container className='feed__container'>
                <Text fontSize="3xl" fontWeight="bold">Recent articles</Text>
                <Divider mt="3" />
                <Box mt="8">
                    {
                        !!isLoading ? <Spinner size='xl' /> : (blogs.length > 0 ? blogs.map((blog, index) => (
                            <Fragment key={index}>
                                <BlogCard blog={blog} />
                                <Divider />
                            </Fragment>
                        )) : <Text fontSize="3xl" fontWeight="bold">No articles yet...</Text>)
                    }

                </Box>
            </Container>
            <RightSidebar />
        </div>
    )
}

export default Feed