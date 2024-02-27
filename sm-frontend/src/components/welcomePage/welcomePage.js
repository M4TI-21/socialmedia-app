import React from "react";
import NavbarComp from "../elements/Navbar";
import './welcomePageStyle.css';
import { Link } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react"

export default function WelcomePage() {
  return (
    <Flex flexDir="column" alignItems="center" pb="4">
        <NavbarComp />
        <Flex bg="#EEE" borderRadius="30px" w="80vw" h="70vh" flexDir="row" alignItems="center" p="7vw">
            <Flex h="inherit" w="45vw" textAlign="start" flexDir="column" justifyContent="center">
                <Text fontSize="7xl" fontWeight="bold">Imagination <br /> rules the World.</Text>
                <Text fontSize="3xl" textAlign="center">Napoleon Bonaparte</Text>
            </Flex>
            <Flex className="sloganArea" w="35vw" h="inherit" flexDir="column" alignItems="center" justifyContent="center">
                <Text fontSize="3xl">Be part of something <br /> special today! Register <br /> right now.</Text>
                <Button size="lg" w="10vw" colorScheme="blue" as={Link} to="/register">GET STARTED!</Button>
            </Flex>
        </Flex>
    </Flex>
  );
}
