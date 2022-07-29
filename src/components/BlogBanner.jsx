import React from 'react'
import { Avatar, Badge, Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';

const BlogBanner = ({ image, title }) => {
    return (
        <Flex className='blogBanner' w="full" h="sm" alignItems="flex-end" justifyContent="center" mt="10" p="5" bgPosition="center" bgImage={`linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ),
    url(${image})`}>
            <Box className='' bgColor="whiteAlpha.800" w="xl" h="fit-content">
                <Text fontSize="3xl" align="center" p="5" fontWeight="bold">{title}</Text>
            </Box>
        </Flex>
    )
}

export default BlogBanner