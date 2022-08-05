import React from 'react'
import { Avatar, Box, Button, Container, IconButton, Image, Text } from "@chakra-ui/react";
import "../styles/banner.css";

const Banner = () => {
    return (
        <Container maxW="full" className='banner'>
            <Box className='banner__left'>
                <Text fontSize="6xl" mb="-1.5">Made Writing Easier.</Text>
                <Text fontSize="2xl" pb="5">Discover stories, thinking, and expertise <br /> from writers on any topic. </Text>
                <Button variant="solid" rounded="full" bg="black" color="white">Start Reading</Button>
            </Box>
            <Box className='banner__right'>
            </Box>
        </Container>
    )
}

export default Banner