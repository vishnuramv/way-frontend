import { Avatar, Badge, Box, Text } from '@chakra-ui/react'
import React from 'react'

const SaveCard = ({ blog }) => {
    return (
        <Box className="saveCard">
            <Text fontSize="md"><Avatar name='vishnu' src={blog?.user?.dpUrl} size="xs" />&nbsp;&nbsp; {blog?.user?.username}</Text>
            <Text fontSize="md" pt="1" fontWeight="800" className='blogCard__heading'>{blog?.title}</Text>
            <div className='blogCard__footer saveCard__footer'>
                <div className='blogCard__footerRight'>
                    <Text fontSize="md">{new Date(blog?.createdAt).toDateString()}</Text>
                    <Badge rounded="full" px="2">{blog?.topic}</Badge>
                </div>
            </div>
        </Box>
    )
}

export default SaveCard