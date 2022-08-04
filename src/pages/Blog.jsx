import React, { useEffect, useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { Box, Container, Divider, Spinner, Text, Flex, useToast, Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import UserCard from '../components/UserCard'
import BlogBanner from '../components/BlogBanner'
import DOMPurify from 'dompurify'
import { useLocation } from 'react-router-dom';
import { getPost } from '../apiclient/postapi'
import { IoIosHeart, IoIosHeartEmpty, IoMdCopy } from 'react-icons/io'
import { IoBookmark, IoBookmarkOutline, IoShareSocialOutline } from 'react-icons/io5'
import "../styles/blog.css"
import { dislikeBlog, isBlogLiked, likeBlog } from '../apiclient/likesapi'
import { getSavedPosts, isBlogSaved, saveBlog, unsaveBlog } from '../apiclient/savePost-api'
import { setSavedBlogs } from '../context/reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { EmailIcon, EmailShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
// const blogData = {
//     "content": "<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">We know Google’s obsession with creating different frameworks and launching a few programming languages. Dart was one of the programming languages launched by Google which was object-oriented and a web-based programming language.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">Dart programming language didn’t gain a huge response from the developers and hence it never got the position of mainstream programming language. Many programmers prefer C++ and JavaScript over Dart due to their strong background.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">One programming language named GO gained quite impressive among developers and GO. GO or GoLang was statically typed and explicit. It was a general-purpose programming language that was similar to the C programming language.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">Now Google is all set to launch a new programming language called Carbon programming language.</span>&nbsp;</p>\n<p></p>\n<h2 style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: sohne,\"><strong>Carbon Programming Language Launch</strong></span></h2>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">Recently, CPP north event 2022 was held and basically, it is an event where many developers come together to discuss future developments of C++. So, in this event, a Googler named Chandler Carruth</span> <a href=\"https://twitter.com/chandlerc1024/status/1549411352657133568\"><span style=\"color: inherit;background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\"><em><ins>introduced</ins></em></span></a> <span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">developers to a new programming language called Carbon.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">The carbon programming language was announced as an experimental language that could be a successor to the C++ programming language.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">Chandler Carruth who is also the technical lead for Google programming language also told us that they would be starting this experimental work with the C++ community.</span>&nbsp;</p>\n<p></p>\n<h2 style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: sohne,\"><strong>Build up</strong></span></h2>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">This launch was very interesting and the announcement of the Carbon programming language was also done through a comparison of mainstream programming languages with its successors.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">As we know, C++ is a successor of C. TypeScript is a Successor of JavaScript. Swift is a successor of Objective C. Kotlin is a successor of Java. But who is the successor of C++?</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(41,41,41);background-color: rgb(255,255,255);font-size: 20px;font-family: charter, Georgia, Cambria,\">Is it Rust? Yes, we can call Rust pretty much a successor of C++ but it is very hard for users to learn and is in the very early stage of its development.</span> <span style=\"color: currentcolor;background-color: rgb(255,237,203);font-size: 20px;font-family: charter, Georgia, Cambria,\">Hence, it is too early for Rust to be called a successor of C++ and it is pretty difficult for Rust to be a successor for a powerful language like C++.</span>&nbsp;</p>\n",
//     "createdAt": "2022-07-27T20:48:32.694375",
//     "downVotes": 0,
//     "modifiedAt": "2022-07-27T20:48:32.694375",
//     "postId": "75dc1372-fcc2-4bbf-a6d2-c71db26f8a36",
//     "primaryImgUrl": "https://miro.medium.com/max/875/0*Ra3ES8yyVbRZ4joS",
//     "secondaryImgUrl": null,
//     "tertiaryImgUrl": null,
//     "title": "Google’s New Programming Language is Called Carbon",
//     "topic": "Technology",
//     "upVotes": 0,
//     "user": {
//         "dob": "2002-02-19",
//         "dpUrl": "https://avatars.dicebear.com/api/adventurer/vishn.svg",
//         "email": "tester@gmail.com",
//         "followers": 0,
//         "following": 0,
//         "id": "768b7d00-149c-4633-a7de-f118685497d0",
//         "name": "tester",
//         "password": "test12345",
//         "public": false,
//         "username": "tester",
//     }
// }

const Blog = () => {
    const [blogData, setBlogData] = useState(null)
    const dispatch = useDispatch()
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    // const blogs = useSelector((state) => state.blogs.savedBlogs)
    useEffect(() => {
        const usertemp = {
            username: localStorage.username,
            email: localStorage.email,
            dpUrl: localStorage.dpUrl,
            userId: localStorage.userId
        }
        setUser(usertemp)
    }, [])
    console.log(window.location.href);
    const getPostfun = async () => {
        getPost(setBlogData, location.pathname.split("/")[2])
    };

    useEffect(() => {
        getPostfun();
    }, [location.pathname]);

    const getLikeData = async () => {
        isBlogLiked(location.pathname.split("/")[2], setIsLiked).then(() => {
        }).catch(err => {
            console.log(err);
        })
    }

    const getSaveData = async () => {
        isBlogSaved(location.pathname.split("/")[2], setIsSaved).then(() => {
        }).catch(err => {
            console.log(err);
        })
    }

    const getBlogMeta = async () => {
        getLikeData();
        getSaveData();
    };

    useEffect(() => {
        if (location.state) {
            getBlogMeta();
        }
    }, []);

    const handleLike = async () => {
        likeBlog(location.pathname.split("/")[2]).then(() => {
            getLikeData();
            getPostfun();
            toast({
                title: 'Liked blog successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const handleUnlike = async () => {
        dislikeBlog(location.pathname.split("/")[2]).then(() => {
            getLikeData();
            getPostfun();
            toast({
                title: 'Unliked blog successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const handleSave = async () => {
        saveBlog(location.pathname.split("/")[2]).then(() => {
            getSaveData();
            getPostfun();
            toast({
                title: 'Blog saved successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            getSavedPosts(dispatch, setSavedBlogs).then(() => {
                // console.log(blogs);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const handleUnsave = async () => {
        unsaveBlog(location.pathname.split("/")[2]).then(() => {
            getSaveData();
            getPostfun();
            toast({
                title: 'Blog unsaved successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            getSavedPosts(dispatch, setSavedBlogs).then(() => {
                // console.log(blogs);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='blog feed'>
            <Sidebar user={user} />
            <Container className='feed__container blog__Container'>
                <UserCard user={blogData?.user} content={blogData?.content} createdDate={blogData?.createdAt} topic={blogData?.topic} />
                <BlogBanner image={blogData?.primaryImgUrl} title={blogData?.title} />
                <Box mt="10" dangerouslySetInnerHTML={createMarkup(blogData?.content)}></Box>
                <Flex justifyContent="center">
                    <Box className='blog__footer' rounded="full" px="3">
                        <Flex alignItems="center" justifyContent="space-around" w="full">
                            <Flex alignItems="center">
                                {
                                    isLiked?.voted ? <Tooltip label='Unlike' hasArrow placement='auto'>
                                        <Text fontSize="xl" onClick={handleUnlike} cursor="pointer">
                                            <IoIosHeart />
                                        </Text>
                                    </Tooltip>
                                        : <Tooltip label='Like' hasArrow placement='auto'>
                                            <Text fontSize="xl" onClick={handleLike} cursor="pointer">
                                                <IoIosHeartEmpty />
                                            </Text>
                                        </Tooltip>
                                }
                                <Text fontSize="2xl" ml="2" fontWeight="light">{blogData?.upVotes}</Text>
                            </Flex>
                            <div className='blog__divider'></div>
                            <>
                                {
                                    isSaved?.isSaved ? <Tooltip label='Unsave' hasArrow placement='auto'>
                                        <Text fontSize="xl" onClick={handleUnsave} cursor="pointer">
                                            <IoBookmark />
                                        </Text>
                                    </Tooltip> : <Tooltip label='Save' hasArrow placement='auto'>
                                        <Text fontSize="xl" onClick={handleSave} cursor="pointer">
                                            <IoBookmarkOutline />
                                        </Text>
                                    </Tooltip>
                                }
                            </>
                            <div className='blog__divider'></div>
                            <Tooltip label='Share' hasArrow placement='auto'>
                                <Text fontSize="xl" onClick={onOpen} >
                                    <IoShareSocialOutline />
                                </Text>
                            </Tooltip>
                            <Modal isOpen={isOpen} onClose={onClose} size="sm" >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Share this article</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb="8">
                                        <Flex justifyContent="space-around" alignItems="center">
                                            <Tooltip label='Share via Twitter' hasArrow placement='auto'>
                                                <TwitterShareButton url={window.location.href} title={`Hey, check out this awesome blog on ${blogData?.title} \n`} >
                                                    <TwitterIcon size={44} round />
                                                </TwitterShareButton>
                                            </Tooltip>
                                            <Tooltip label='Share via Whatsapp' hasArrow placement='auto'>
                                                <WhatsappShareButton
                                                    url={window.location.href}
                                                    title={`Hey, check out this awesome blog on ${blogData?.title} \n`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <WhatsappIcon size={44} round />
                                                </WhatsappShareButton>
                                            </Tooltip>
                                            <Tooltip label='Share via Email' hasArrow placement='auto'>
                                                <EmailShareButton
                                                    url={window.location.href}
                                                    subject={blogData?.title}
                                                    body={`Hey, check out this awesome blog on ${blogData?.title} \n`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <EmailIcon size={44} round />
                                                </EmailShareButton>
                                            </Tooltip>
                                            <Tooltip label='Copy link' hasArrow placement='auto'>
                                                <Box rounded="full" width="fit-content" onClick={navigator.clipboard.writeText(window.location.href)} p="1" border="2px" borderColor="black">
                                                    <Text fontSize="3xl" cursor="pointer">
                                                        <IoMdCopy />
                                                    </Text>
                                                </Box>
                                            </Tooltip>
                                        </Flex>
                                    </ModalBody>

                                    {/* <ModalFooter>
                                        <Button variant="outline" onClick={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter> */}
                                </ModalContent>
                            </Modal>
                            {/* <ShareBtn
                                url={location.pathname}
                                text={`Hey check out this awesome blog on ${blogData?.title}`}
                                className='ib'
                                displayText='Share'
                            /> */}
                        </Flex>
                    </Box>

                </Flex>
            </Container>
            <RightSidebar />
        </div>
    )
}

export default Blog