import { Text, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, Input, Box, Spinner } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useState } from 'react'
import { getSuggestions } from '../apiclient/aiapi'
import RTEditor from '../components/RTEditor'
import SuggestionCard from '../components/SuggestionCard'
import WriteSidebar from '../components/WriteSidebar'
import "../styles/write.css"
// import Snake from 'snake-game-react';
import Snake from 'react-simple-snake'


const Write = () => {
  const [convertedContent, setConvertedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestion = async () => {
    setIsLoading(true);
    getSuggestions(setSuggestions, text).then(() => {
      console.log(suggestions)
      setIsLoading(false)
    }).catch(err => console.log(err));
  }
  return (
    <Flex className='write'>
      <WriteSidebar convertedContent={convertedContent} onOpen={onOpen} />
      <RTEditor convertedContent={convertedContent} setConvertedContent={setConvertedContent} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Get suggestion for your blog</DrawerHeader>

          <DrawerBody className='write__drawer'>
            <Flex>
              <Input placeholder='How do you want your blog to start...' variant="flushed" value={text} onChange={(e) => setText(e.target.value)} />
              <Button variant="solid" px="5" rounded="full" type='submit' onClick={getSuggestion}>Go</Button>
            </Flex>
            {
              isLoading ? (
                <Box>
                  <Flex direction="column" justifyContent="center" alignItems="center" height="2xs">
                    <Spinner size='xl' />
                    <Text fontSize="lg" mt="5" align="center">Our AI is writing few suggestions for you, it might take one or two minutes.<br /> While you wait, you can feed my snake eat some apples</Text>
                  </Flex>
                  <Box h="2xs">
                    <Snake percentageWidth={45} />
                  </Box>
                </Box>
              ) : (
                <Box>
                  {
                    suggestions.map((suggestion, index) => (
                      <SuggestionCard text={suggestion.text} key={index} close={onClose} />
                    ))
                  }
                </Box>
              )
            }
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Write