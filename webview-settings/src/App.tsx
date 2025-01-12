import React, { useEffect, useState } from 'react'
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Button
} from '@chakra-ui/react'
import { useVSCode } from '@sprint-app/shared/react/hooks/vscode-hooks'

const App: React.FC = () => {
  const vscode = useVSCode()
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    // VS Code message listener
    const messageHandler = (event: MessageEvent) => {
      if (event.data.command === 'incomingMessage') {
        setMessage(event.data.text)
      }
    }

    window.addEventListener('message', messageHandler)

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [])

  const sendMessage = () => {
    const messageToSend = `Sprint AI Settings Update at ${new Date().toLocaleTimeString()}`
    vscode.postMessage({ 
      command: 'settingsUpdate', 
      text: messageToSend 
    })
    setMessage(messageToSend)
  }

  return (
    <Box 
      p={6} 
      maxWidth="600px" 
      margin="auto"
      backgroundColor="gray.50"
    >
      <VStack paddingX={6} align="stretch">
        <Heading 
          as="h1" 
          size="xl" 
          textAlign="center" 
          color="blue.600"
        >
          Sprint AI Settings
        </Heading>

        <Text 
          fontSize="md" 
          textAlign="center" 
          color="gray.600"
        >
          Configure your Sprint AI extension settings
        </Text>

        <Button 
          colorScheme="blue" 
          onClick={sendMessage}
        >
          Send Settings Update to VS Code
        </Button>

        {message && (
          <Box 
            p={4} 
            bg="white" 
            borderRadius="md" 
            boxShadow="md"
          >
            <Text fontWeight="bold">Last Message:</Text>
            <Text>{message}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default App
