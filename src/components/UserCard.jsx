import React, { useState } from 'react'
import { Avatar, Badge, Box, Text, Flex, Button, useToast, Tooltip, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Spinner, Spacer } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addFollow, getMyFollow, removeFollow } from '../apiclient/followapi';
import { setFollow } from '../context/reducers/followReducer';
import { getSummary } from '../apiclient/aiapi';
import Snake from 'react-simple-snake';

const UserCard = ({ user, topic, createdDate, content }) => {
    const userLog = useSelector((state) => state.user)
    const follow = useSelector((state) => state.follow)
    const dispatch = useDispatch()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [summarizeText, setSummarizeText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSummarize = async (text) => {
        console.log("tester")
        onOpen()
        setIsLoading(true)
        getSummary(setSummarizeText, text).then(() => {
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(summarizeText)

    const handleFollow = async () => {
        console.log(userLog)
        console.log(user)
        if (follow.followings.find(f => f?.id === user?.id)) {
            console.log("unfollowing")
            removeFollow(user?.id).then(() => {
                console.log("unfollowed")
                getMyFollow(dispatch, setFollow).then(() => {
                    console.log("follow update")
                })
                toast({
                    title: 'Unfollowed successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log("following")
            addFollow(user.id).then(() => {
                console.log("followed")
                getMyFollow(dispatch, setFollow).then(() => {
                    console.log("follow update")
                })
                toast({
                    title: 'Followed successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }
    console.log(summarizeText.slice(0, summarizeText.lastIndexOf('.')))
    return (
        <div>
            <Flex alignItems="center" justifyContent="space-between">
                <Box>
                    <Flex alignItems="center">
                        <Link to="/user">
                            <Avatar name={user?.name} src={user?.dpUrl} />
                        </Link>
                        <Box ml="2">
                            <Link to="/user">
                                <Text fontSize="2xl" mb="-2" fontWeight="bold">{user?.name}</Text>
                            </Link>
                            <Flex alignItems="center">
                                <Text fontSize="sm">{new Date(createdDate).toDateString()}</Text>
                                <Badge rounded="full" px="2" ml="2" py="1">
                                    <Text fontSize="xx-small">{topic}</Text>
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Flex alignItems="center" minWidth='max-content'>
                    <Tooltip hasArrow label="Summarize blog" placement='auto'>
                        <Button onClick={() => summarizeText.length === 0 ? handleSummarize(content) : onOpen()}>Summarize</Button>
                    </Tooltip>
                    <Spacer />
                    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg" isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Summary</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {
                                    isLoading ? (
                                        <Box>
                                            <Flex direction="column" justifyContent="center" alignItems="center" height="36">
                                                <Spinner size='xl' mb="5" />
                                                <Text fontSize="lg" align="center">Our AI is writing few suggestions for you, it might take one or two minutes. While you wait, you can feed my snake eat some apples.</Text>
                                            </Flex>
                                            <Box h="2xs">
                                                <Snake percentageWidth={70} />
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Text>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{summarizeText.slice(0, summarizeText.slice(0, summarizeText.lastIndexOf('.')).lastIndexOf('.'))}.
                                            </Text>
                                        </Box>
                                    )
                                }
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    {userLog?.id !== user?.id && (
                        follow.followings.find(f => f?.id === user?.id) ?
                            <Tooltip label='Unfollow' hasArrow placement='auto'>
                                <Button variant="solid" onClick={handleFollow} ml="3"> Unfollow </Button>
                            </Tooltip> : <Tooltip label='Follow' hasArrow placement='auto'>
                                <Button variant="solid" onClick={handleFollow} ml="3"> Follow </Button>
                            </Tooltip>
                    )}
                </Flex>
            </Flex>
        </div>
    )
}

export default UserCard