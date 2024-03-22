import { Container, Flex, MenuButton, Menu, Image, Text, IconButton, MenuItem, MenuList, Button, Spacer } from "@chakra-ui/react";
import { BiMenu, BiLogOut, BiSlider, BiIdCard } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../../images/sigmaLogo.png";   

export default function MainNavComp(props) {
    return(
        <Container bg="#dfe1e2" minW="100vw" minH="14vh" maxH="14vh" pos="sticky" flexDir="row" alignContent="flex-start">
            <Flex flexDir="row" w="100%" minH="14vh" maxH="14vh" alignItems="center">

                <Flex onClick={() => props.setActivePage("note")} flexDir="column" alignItems="center" maxW="8vw" maxH="14vh" pt="1vh">
                    <Image alt="logo" src={logo} boxSize='60px'/>
                    <Text fontWeight="700" fontSize="xl">Sigma</Text>
                </Flex>

                <Spacer />
                <Flex flexDir="row" minW="20vw" maxW="100vw" maxH="20vh" mr="1%">
                    {props.activePage === "note" &&
                        <>
                        <Button bg="#333" color='white' _hover={{ bg: "#555"}}  onClick={() => props.setActivePage("todo")} minW="8vw">Check ToDos</Button>
                        </>
                    }
                    {props.activePage === "todo" &&
                        <>
                        <Button bg="#333" color='white' _hover={{ bg: "#555"}}  onClick={() => props.setActivePage("note")} minW="8vw">Return to notes</Button>
                        </>
                    }
                    {props.activePage === "profile" &&
                        <>
                        <Button bg="#333" color='white' _hover={{ bg: "#555"}}  onClick={() => props.setActivePage("note")} minW="8vw">Return to notes</Button>
                        </>
                    }
                    <Spacer />
                    
                    <Button leftIcon={<BiIdCard />} onClick={() => props.setActivePage("profile")} minW="8vw">Profile</Button>
                    <Spacer/>
                    <Menu>
                        <MenuButton as={IconButton} aria-label="options" icon={<BiMenu />} />
                        <MenuList>
                            <MenuItem icon={<BiSlider />}>SETTINGS</MenuItem>
                            <MenuItem icon={<BiLogOut />} as={Link} to="/" onClick={() => props.logOut()}>LOG OUT</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

            </Flex>
        </Container>
    );
}