import { Container, Flex, Heading, IconButton, ListItem, UnorderedList } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

export default function EditBookmark(props) {

    return(
        <Container pos="absolute" alignItems="center" justifyContent="center" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container mb="20vh" minW="40vw" maxW="40vw" h="28vh" bg="#dfe1e2" borderRadius="10px" p="1%">
                <IconButton size="sm" icon={<CloseIcon />} onClick={props.editBookmarksOnClick} colorScheme="red"/>
                <Flex flexDir="column" justifyContent="center" textAlign="center">
                    <Heading fontSize="2xl">Manage your bookmarks</Heading>
                    <UnorderedList>
                        {props.bookmarks.map(e => (
                            <ListItem key={e.bookmark_id}>{e.bm_name}</ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
            </Container>
        </Container>
    );
}