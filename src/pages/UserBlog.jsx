import React, { Fragment, useEffect, useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { Box, Container, Divider, Spinner, Text, Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyBlogs } from '../context/reducers/blogReducer'
import { getMyPosts } from '../apiclient/postapi'
import BlogCard from '../components/BlogCard'
import ProfileCard from '../components/ProfileCard'

const UserBlog = () => {
    const blogs = useSelector((state) => state.blogs.myBlogs)
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // console.log(blogs)
        if (blogs.length === 0)
            getMyPosts(dispatch, setMyBlogs).then(() => {
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
                userId: localStorage.userId,
                name: localStorage.name
            }
            setUser(usertemp)
        } else {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className='userblog feed'>
            <Sidebar user={user} />
            <Container className='feed__container'>
                <ProfileCard user={user} />
                <Divider mt="3" />
                <Box mt="8">
                    {
                        !!loading ? <Spinner size='xl' /> : (blogs.length > 0 ? blogs.map((blog, index) => (
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

export default UserBlog