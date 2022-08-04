import React from 'react'
import { Avatar, Badge, Box, Text, Flex, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
const ProfileCard = ({ user }) => {
    return (
        <div>
            <Flex alignItems="center" justifyContent="space-between">
                <Box>
                    <Flex alignItems="center">
                        <Avatar name={user?.name} src={user?.dpUrl} />
                        <Box ml="2">
                            <Text fontSize="2xl" mb="-2" fontWeight="bold">{user?.name}</Text>
                            <Text fontSize="sm">{user?.username}</Text>
                            <Flex alignItems="center">
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                    <Flex alignItems="center">
                        <Text fontSize="sm" fontWeight="bold">Followers: {user?.followers}</Text>
                        <Text fontSize="sm" fontWeight="bold" ml="2">Followings: {user?.followings}</Text>
                    </Flex>
                </Box>
                {/* <Button variant="solid">Follow</Button> */}
            </Flex>
        </div>
    )
}

export default ProfileCard