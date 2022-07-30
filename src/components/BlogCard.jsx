import { Avatar, Badge, Box, Flex, IconButton, Image, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import "../styles/blogCard.css";
import blogImg from "../assets/img/bannerimg1.jpg"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const user = useSelector((state) => state.user)
    const [blogData, setBlogData] = useState(false)
    useEffect(() => {
        // console.log(blog)
        let temp = { ...blog }
        temp.content = blog?.content.replace(/<[^>]+>/g, '').replace(/(^[ \t]*\n)/gm, "").split(/\r?\n/).join(" ");
        setBlogData(temp)
    }, [])

    return (
        <Box className='blogCard'>
            <Box className={`blogCard__left ${!blogData?.primaryImgUrl && "blogCard__noImg"}`}>
                <Flex alignItems="center">
                    <Avatar name='vishnu' src={blogData?.user?.dpUrl} size="xs" />
                    <Text fontSize="md"> &nbsp;&nbsp; {blogData?.user?.username}</Text>
                </Flex>
                <Link to={`/blog/${blogData?.postId}`} state={blog} >
                    <Text fontSize="3xl" fontWeight="800" className='blogCard__heading'>{blogData?.title}</Text>
                </Link>
                <Text fontSize="lg" fontWeight="400" color="gray" className='blogCard__content'>{blogData?.content?.length > 250 ? blogData?.content?.slice(0, 205) + "..." : blogData?.content}</Text>
                <div className='blogCard__footer'>
                    <div className='blogCard__footerRight'>
                        <Text fontSize="md">{new Date(blogData?.createdAt).toDateString()}</Text>
                        <Badge rounded="full" px="2">{blogData?.topic}</Badge>
                    </div>
                    {/* <Tooltip label='Save' hasArrow placement='right'>
                        {
                            user.userId && (
                                <IconButton size="xs" variant='unstyled'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </IconButton>
                            )
                        }
                    </Tooltip> */}
                </div>
            </Box>
            {
                blogData?.primaryImgUrl && (
                    <Box className='blogCard__right'>
                        <Image src={blogData?.primaryImgUrl} alt="blog image"></Image>
                    </Box>
                )
            }
        </Box>
    )
}

export default BlogCard