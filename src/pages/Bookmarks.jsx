import React, { Fragment, useEffect, useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { Box, Container, Divider, Spinner, Text, Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../apiclient/savePost-api'
import { setSavedBlogs } from '../context/reducers/blogReducer'
import BlogCard from '../components/BlogCard'


const Bookmarks = () => {
    const blogs = useSelector((state) => state.blogs.savedBlogs)
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [topic, setTopic] = useState('All');


    useEffect(() => {

        // console.log(blogs)
        if (blogs.length === 0)
            getSavedPosts(dispatch, setSavedBlogs).then(() => {
                setLoading(false)
            }).catch(err => {
                console.log(err);
            })
        else
            setLoading(false)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!!token) {
            const usertemp = {
                username: localStorage.username,
                email: localStorage.email,
                dpUrl: localStorage.dpUrl,
                userId: localStorage.userId
            }
            setUser(usertemp)
        } else {
            window.location.href = '/login'
        }
    }, [])

    return (
        <div className='blog feed'>
            <Sidebar user={user} />
            <Container className='feed__container'>
                <Text fontSize="3xl" fontWeight="bold">Saved articles</Text>
                <Divider mt="3" />
                <Box mt="8">
                    {
                        !!loading ? <Spinner size='xl' /> : (blogs.length > 0 ? (
                            topic === 'All' ?
                                blogs.map((blog, index) => (
                                    <Fragment key={index}>
                                        <BlogCard blog={blog} />
                                        <Divider />
                                    </Fragment>
                                )) : (
                                    blogs.find((blog) => blog.topic === topic) ?
                                        blogs.filter(blog => blog.topic === topic).map((blog, index) => (
                                            <Fragment key={index}>
                                                <BlogCard blog={blog} />
                                                <Divider />
                                            </Fragment>
                                        )) : <Text>No blogs found in this topic</Text>
                                )
                        ) : <Text fontSize="3xl" fontWeight="bold">No articles yet...</Text>)
                    }
                </Box>
            </Container>
            <RightSidebar setTopic={setTopic} />
        </div>
    )
}

export default Bookmarks