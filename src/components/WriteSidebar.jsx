import React from 'react'
import { Box, Flex, IconButton, Text, Divider, FormControl, FormHelperText, Input, Select, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useState } from 'react';
import { useEffect } from 'react';
import { writePost } from '../apiclient/postapi';

const WriteSidebar = ({ convertedContent }) => {

    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        topic: '',
        primaryImgUrl: ''
    });
    const [response, setResponse] = useState(null);
    const toast = useToast();
    const handleInput = (val, type) => {
        setBlogData({
            ...blogData,
            [type]: val
        });
    };
    useEffect(() => {
        setBlogData({
            ...blogData,
            content: convertedContent
        })
    }, [convertedContent])


    const handleSubmit = (e) => {
        e.preventDefault();
        const func = async () => {
            if (!!blogData.content && !!blogData.title && !!blogData.topic && !!blogData.primaryImgUrl) {
                console.log("submit", blogData)
                await writePost(blogData, setResponse).then(() => {
                    toast({
                        title: 'Post created.',
                        description: "You've have wrote a blog successfully.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    navigate('/')

                }).catch(err => {
                    console.log(err)
                    toast({
                        title: 'Error.',
                        description: err,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                })
            }
            console.log("first")
        }
        func();
    }
    return (
        <Box flex="0.25" py="1.5" px="5">
            <Flex alignItems="center" py="2">
                <IconButton variant="link" onClick={() => navigate(-1)}>
                    <Text fontSize="4xl" color="black" >
                        <IoIosArrowRoundBack />
                    </Text>
                </IconButton>
                <Text fontSize="2xl" fontWeight="700">Write your blog</Text>
            </Flex>
            <Divider />
            <form>
                <Flex direction="column" justifyContent="space-evenly" height="lg">
                    <FormControl>
                        <Input variant="flushed" type='text' placeholder='Title' value={blogData.title} onChange={(event) => handleInput(event.target.value, "title")} required />
                    </FormControl>
                    <FormControl>
                        <Input variant="flushed" type='url' placeholder='Thumbnail' value={blogData.primaryImgUrl} onChange={(event) => handleInput(event.target.value, "primaryImgUrl")} required />
                        <FormHelperText>Paste image url for blog thumbnail.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Select variant='flushed' required placeholder='Topic' value={blogData.topic} onChange={(event) => handleInput(event.target.value, "topic")} isRequired={true}>
                            <option value='All'>All</option>
                            <option value='Self'>Self</option>
                            <option value='Technology'>Technology</option>
                            <option value='Relationship'>Relationship</option>
                            <option value='Sports'>Sports</option>
                            <option value='Politics'>Politics</option>
                            <option value='Life'>Life</option>
                            <option value='Fashion'>Fashion</option>
                            <option value='Productivity'>Productivity</option>
                            <option value='Health'>Health</option>
                            <option value='Adventure'>Adventure</option>
                            <option value='Programming'>Programming</option>
                            <option value='Kids'>Kids</option>
                            <option value='Finance'>Finance</option>
                            <option value='Education'>Education</option>
                            <option value='Gaming'>Gaming</option>
                            <option value='Science'>Science</option>
                        </Select>
                        <FormHelperText>Select the category which your blog belong to.</FormHelperText>
                    </FormControl>
                    <Button variant='outline' type="submit" onClick={handleSubmit} color='black' mt="5">Publish</Button>
                    <Button variant='solid' type="button" colorScheme='blackAlpha' mt="5">Get AI assistance</Button>
                </Flex>
            </form>
        </Box >
    )
}

export default WriteSidebar