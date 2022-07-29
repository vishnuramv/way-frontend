import React, { useEffect, useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { Box, Container, Divider, Spinner, Text, Flex } from '@chakra-ui/react'
import UserCard from '../components/UserCard'
import BlogBanner from '../components/BlogBanner'
import DOMPurify from 'dompurify'
import { useLocation } from 'react-router-dom';
import { isBlogLiked, isBlogSaved } from '../apiclient/postapi'

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
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const usertemp = {
            username: localStorage.username,
            email: localStorage.email,
            dpUrl: localStorage.dpUrl,
            userId: localStorage.userId
        }

        setUser(usertemp)
    }, [])
    useEffect(() => {
        setBlogData(location.state)
        // console.log(location.state);
    }, [location.state])
    useEffect(() => {
        if (location.state) {
            const getBlogMeta = async () => {
                isBlogLiked(location.state.postId, location.state.userId).then(() => {
                    console.log(isLiked);
                }).catch(err => {
                    console.log(err);
                })
                isBlogSaved(location.state.postId, location.state.userId).then(() => {
                    console.log(isSaved);
                }).catch(err => {
                    console.log(err);
                })
            }
            getBlogMeta();
        }
    }, [])
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='blog feed'>
            <Sidebar user={user} />
            <Container className='feed__container'>
                <UserCard user={blogData?.user} createdDate={blogData?.createdAt} topic={blogData?.topic} />
                <BlogBanner image={blogData?.primaryImgUrl} title={blogData?.title} />
                <Box mt="10" dangerouslySetInnerHTML={createMarkup(blogData?.content)}></Box>
                <Box>
                    <Flex>
                        <Text>

                            <Text fontSize="2xl" fontWeight="bold">{blogData?.upVotes}</Text>
                        </Text>
                    </Flex>
                </Box>
            </Container>
            <RightSidebar />
        </div>
    )
}

export default Blog