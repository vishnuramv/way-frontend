import { Avatar, Badge, Box, Text, Divider, Flex } from '@chakra-ui/react'
import React from 'react'

const SaveCard = ({ blog }) => {
    return (
        <>
            <Box className="saveCard" py="3">
                <Flex alignItems="center">
                    <Avatar name='vishnu' src={blog?.user?.dpUrl} size="xs" />
                    <Text fontSize="md"> &nbsp;&nbsp; {blog?.user?.username}</Text>
                </Flex>
                <Text fontSize="md" pt="1" fontWeight="800" className='blogCard__heading'>{blog?.title}</Text>
                <div className='blogCard__footer saveCard__footer'>
                    <div className='blogCard__footerRight'>
                        <Text fontSize="md">{new Date(blog?.createdAt).toDateString()}</Text>
                        <Badge rounded="full" px="2">{blog?.topic}</Badge>
                    </div>
                </div>
            </Box>
            <Divider />
        </>
    )
}

export default SaveCard