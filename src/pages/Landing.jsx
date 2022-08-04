import { Container, Divider, Spinner, Text } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import BlogCard from '../components/BlogCard'
import '../styles/landing.css';
import { useSelector, useDispatch } from 'react-redux'
import { setBlogFeed } from '../context/reducers/blogReducer';
// import axios from 'axios';
import { getPosts } from '../apiclient/postapi';

const Landing = () => {
    const blogs = useSelector((state) => state.blogs.blogFeed)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getPosts(dispatch, setBlogFeed).then(() => {
            // console.log(blogs);
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
        });
    }, [])

    // console.log(blogs)
    return (
        <div className='landing'>
            <Banner />
            <Container className='landing__feed'>
                <Text fontSize="3xl" fontWeight="bold">Recent articles</Text>
                {
                    !!isLoading ? <Spinner size='xl' /> : (blogs.length > 0 ? blogs.map((blog, index) => (
                        <Fragment key={index}>
                            <BlogCard blog={blog} />
                            <Divider />
                        </Fragment>
                    )) : <Text fontSize="3xl" fontWeight="bold">No articles yet...</Text>)
                }
            </Container>
        </div>
    )
}

export default Landing