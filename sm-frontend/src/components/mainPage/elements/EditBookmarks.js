import { Container, Flex, Heading, Button, UnorderedList } from "@chakra-ui/react"
import Bookmark from "./Bookmark";

export default function EditBookmark(props) {

    return(
        <Container pos="absolute" alignItems="center" justifyContent="center" zIndex="100" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container mb="20vh" minW="40vw" maxH="50vh" bg="#dfe1e2" borderRadius="10px" p="1%">
                <Button size="sm" onClick={props.editBookmarksOnClick} colorScheme="red">✖</Button>
                <Flex flexDir="column" justifyContent="center" textAlign="center">
                    <Heading fontSize="2xl">Manage your bookmarks</Heading>
                    <UnorderedList>
                        {props.bookmarks.map(e => (
                            e.bookmark_id !== props.defaultBM &&
                            <Bookmark key={e.bookmark_id} bm_name={e.bm_name} bookmark_id={e.bookmark_id} fetchBookmarks={props.fetchBookmarks} defaultBM={props.defaultBM}/>
                        ))}
                    </UnorderedList>
                </Flex>
            </Container>
        </Container>
    );
}