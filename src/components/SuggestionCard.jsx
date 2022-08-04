import { Box, Flex, Text, Tooltip, useToast } from '@chakra-ui/react'
import { IoMdCopy } from 'react-icons/io'
import React from 'react'
import "../styles/suggestionCard.css"
const SuggestionCard = ({ text, close }) => {
    const toast = useToast()
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        toast({
            title: 'Suggestion copied to clipboard successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        close();
    }
    return (
        <Box className="suggestion">
            <Text>{text.slice(0, text.lastIndexOf('.'))}</Text>
            <Box className='suggestion__footer'>
                <Tooltip label='Copy Suggestion' hasArrow placement='auto'>
                    <Text className='suggestion__text' fontSize="xl" color="blackAlpha.900" >
                        <IoMdCopy onClick={handleCopy} />
                    </Text>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default SuggestionCard