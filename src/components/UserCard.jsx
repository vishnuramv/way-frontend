import React from 'react'
import { Avatar, Badge, Box, Text, Flex, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const UserCard = ({ user, topic, createdDate }) => {
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
                {/* <Button variant="solid">Follow</Button> */}
            </Flex>
        </div>
    )
}

export default UserCard