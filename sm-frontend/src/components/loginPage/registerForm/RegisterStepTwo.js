import { FormControl, Button, FormLabel, FormHelperText, Input, Flex } from "@chakra-ui/react";
import './registerFormStyle.css';

export default function RegisterStepTwo(props) {

  return (
    <Flex flexDir="column" justifyContent="space-around" alignItems="center" w="45vw" h="inherit" >
        <FormControl ml="20vw">
          <FormLabel fontSize="2xl">Name:</FormLabel>
          <Input placeholder="John" type="text" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888" 
          onChange={e => props.setName(e.target.value)}/>
          {props.errorMsg.name && <FormHelperText className="errorMessage">{props.errorMsg.name}</FormHelperText>}
        </FormControl>

        <FormControl ml="20vw">
        <FormLabel fontSize="2xl">User tag:</FormLabel>
          <Input placeholder="john21" type="text" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888" 
          onChange={e => props.setTag(e.target.value)}/>
          {props.errorMsg.tag && <FormHelperText className="errorMessage">{props.errorMsg.tag}</FormHelperText>} 
        </FormControl>

        <FormControl ml="20vw">
        <FormLabel fontSize="2xl">Password:</FormLabel>
          <Input placeholder="Pass123" type="password" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888"
          onChange={e => props.setPass(e.target.value)}/>
          {props.errorMsg.pass && <FormHelperText className="errorMessage">{props.errorMsg.pass}</FormHelperText>}
        </FormControl>

        <Flex w="30vw" flexDir="row" alignItems="center" justifyContent="space-evenly">
          <Button size="lg" w="10vw" colorScheme="red" onClick={props.returnOnClick}>Back</Button>
          <Button size="lg" w="10vw" bg="#333" color='white' _hover={{ bg: "#555"}} onClick={props.submitOnClick}>Register</Button>
        </Flex>

        
    </Flex>
  );
}
