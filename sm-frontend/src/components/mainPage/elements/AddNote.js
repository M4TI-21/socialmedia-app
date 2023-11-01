import { Heading, Text, Container, Box, Flex, Button, IconButton } from "@chakra-ui/react"
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons"

export default function AddNote(props) {
    return(
        <Container pos="absolute" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container className="addNoteOptions" pos="absolute" minW="70%" maxW="70%" minH="80%" maxH="80%"
                bg="#dfe1e2" mt="10vh" borderRadius="50px" p="1%">
                <Heading size="2xl" textAlign="center">Choose style:</Heading>
                <Flex className="notesList" mt="3%" justifyContent="space-evenly" flexDirection="row" flexWrap="wrap">

                    <Box className="noteType type1" maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Classic note</Heading>
                        <Text fontSize="xl" mr="3vw">What can we say? Just type some text, maybe attach some media or files? Feel free, you decide!</Text>
                        <Button size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>
                    
                    <Box className="noteType type2"  maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black"borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">To-do list</Heading>
                        <Text fontSize="xl" mr="3vw">Organize your tasks using this to-do list note. Add tasks, check them done and stay aware!</Text>
                        <Button size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>

                    <Box className="noteType type3"maxW="30vw" minW="30vw"  minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Online note</Heading>
                        <Text fontSize="xl" mr="3vw">Do you have a team project and need a place to write down brainstorm's ideas? You've came to the right place!</Text>
                        <Button size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>

                    <Box className="noteType type4" maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Another option</Heading>
                        <Text fontSize="xl" mr="3vw">Work in progress... Stay tuned!</Text>
                        <Button size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%" isDisabled>Use</Button>
                    </Box>
                </Flex>
                <IconButton size="sm" icon={<CloseIcon />} onClick={props.addNoteActiveOnClick} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
            </Container>
        </Container>
    );
}