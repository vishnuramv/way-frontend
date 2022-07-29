import { Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import RTEditor from '../components/RTEditor'
import WriteSidebar from '../components/WriteSidebar'
import "../styles/write.css"
const Write = () => {
  const [convertedContent, setConvertedContent] = useState(null);

  return (
    <Flex className='write'>
      <WriteSidebar convertedContent={convertedContent} />
      <RTEditor convertedContent={convertedContent} setConvertedContent={setConvertedContent} />
    </Flex>
  )
}

export default Write