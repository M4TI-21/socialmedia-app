import { Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";

export default function NoteType1() {
    return(
        <Box className="noteContainer" bg="#dfe1e2" minW="20%" maxW="20%" minH="50%" maxH="50%" pr="1%" pl="1%" borderRadius="50px">
            <Flex className="noteHeader" justifyContent="center" alignItems="center" w="100%" h="20%">
                <Heading size="xl">Title</Heading>
            </Flex>
            <Flex className="noteBody" w="100%" h="60%">
                <Text fontSize="lg">Note content</Text>
            </Flex>
            <Flex className="noteActions" justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md">Edit</Button>
                <Button leftIcon={<BiTrash />} colorScheme="red" size="md">Delete</Button>
            </Flex>
        </Box>
    );
}