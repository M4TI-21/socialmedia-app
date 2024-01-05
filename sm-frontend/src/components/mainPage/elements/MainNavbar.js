import { Container, Flex, MenuButton, Menu, Image, Text, IconButton, MenuItem, MenuList, Button, Spacer, Input } from "@chakra-ui/react";
import { BiMenu, BiLogOut, BiSlider, BiPlusCircle, BiIdCard } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../../images/sigmaLogo.png";   

export default function MainNavComp(props) {
    return(
        <Container bg="#dfe1e2" minW="100vw" minH="14vh" maxH="14vh" pos="sticky" flexDir="row" alignContent="flex-start">
            <Flex flexDir="row" w="100%" minH="14vh" maxH="14vh" alignItems="center">

                <Flex as={Link} to="/main" flexDir="column" alignItems="center" maxW="8vw" maxH="14vh" pt="1vh">
                    <Image alt="logo" src={logo} boxSize='60px'/>
                    <Text fontWeight="700" fontSize="xl">Sigma</Text>
                </Flex>

                
                <Spacer />
                <Flex flexDir="row" alignItems="center" maxW="20vw" minW="18vw" maxH="20vh">
                    <Button size="md" leftIcon={<BiPlusCircle />} colorScheme="green" onClick={props.addNoteActiveOnClick}>ADD NOTE</Button>
                    <Spacer />
                    <Button leftIcon={<BiIdCard />} as={Link} to="/profile">Profile</Button>
                    <Spacer />
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