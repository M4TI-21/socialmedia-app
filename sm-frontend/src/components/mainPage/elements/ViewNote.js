import { Heading, Container, Flex, Button, IconButton, Textarea, Text } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

export default function ViewNote(props) {

    return(
        <Container pos="absolute" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container pos="absolute" minW="30%" maxW="40%" minH="80%" maxH="80%"
                bg="#dfe1e2" mt="10vh" borderRadius="50px" p="1%">
                <Heading size="2xl" textAlign="center">{props.title}</Heading>
                <Flex mt="3%" justifyContent="space-evenly" alignItems="center" flexDirection="column" flexWrap="wrap">

                    <Flex flexDirection="column" alignItems="center" w="90%" h="10vh">
                        <Textarea onChange={e => setTitle(e.target.value)} resize="none" placeholder="Title your note!" fontSize="2xl" 
                        textAlign="center" maxLength="60" w="inherit" h="inherit"/>

                        {errorMsg.title && <Text color="red">{errorMsg.title}</Text>}
                    </Flex>
                    
                    <Flex flexDirection="column" alignItems="center" w="90%" h="50vh">
                        <Textarea onChange={e => setContent(e.target.value)} resize="none" placeholder="Input your note here." fontSize="xl" 
                        textAlign="start" w="inherit" h="inherit" mt="2%"/>
                        {errorMsg.content && <Text color="red">{errorMsg.content}</Text>}
                    </Flex>

                    <Button onClick={addNoteOnClick} colorScheme="green" w="40%" h="5vh" aria-label="Submit note" mt="3%">Submit</Button>
                </Flex>
                <IconButton size="sm" icon={<CloseIcon />} onClick={props.addNoteActiveOnClick} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
            </Container>
        </Container>
    );
}