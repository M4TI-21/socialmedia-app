import "./mainPageStyle.css";
import { Flex, Text} from "@chakra-ui/react";

export default function ProfilePage(props) {

  return (
    <>
    <Flex flexDir="column" w="100vw" minH="80vh">
      <Flex flexDir="column" alignItems="center" right="0" w="20vw" maxH="80vh">
          <Text fontSize="x-large" fontWeight="bold">Here are your favorite notes:</Text>
      </Flex>
    </Flex>
    </>
  );
}