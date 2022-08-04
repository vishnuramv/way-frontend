import { Avatar, Badge, Box, Flex, IconButton, Image, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import "../styles/blogCard.css";
import blogImg from "../assets/img/bannerimg1.jpg"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5'

const BlogCard = ({ blog }) => {
    const user = useSelector((state) => state.user)
    const [blogData, setBlogData] = useState(false)
    useEffect(() => {
        let temp = { ...blog }
        temp.content = blog?.content.replace(/<[^>]+>/g, '').replace(/(^[ \t]*\n)/gm, "").split(/\r?\n/).join(" ");
        setBlogData(temp)
    }, [])

    return (
        <Box className='blogCard'>
            <Box className={`blogCard__left ${!blogData?.primaryImgUrl && "blogCard__noImg"}`}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center">
                        <Avatar name={blogData?.user?.name} src={blogData?.user?.dpUrl} size="xs" />
                        <Text fontSize="md"> &nbsp;&nbsp; {blogData?.user?.username}</Text>
                    </Flex>
                    {
                        user?.id === blogData?.user?.id && (
                            <Text color="blackAlpha.900">
                                <IoEllipsisVertical />
                            </Text>
                        )
                    }
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