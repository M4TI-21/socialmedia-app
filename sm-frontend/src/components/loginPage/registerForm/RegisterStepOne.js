import { FormControl, Button, FormLabel, FormHelperText, Input, Flex, Box } from "@chakra-ui/react";
import './registerFormStyle.css';

export default function RegisterStepOne(props) {

  return (
      <Flex flexDir="column" justifyContent="space-around" alignItems="center" w="45vw" h="inherit" mt="5">
          <FormControl ml="20vw">
            <FormLabel fontSize="2xl">Email:</FormLabel>
            <Input placeholder="example@mail.com" type="text" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888"
            onChange={e => props.setEmail(e.target.value)}/>
            {props.errorMsg.email && <FormHelperText  color="red" fontSize="md">{props.errorMsg.email}</FormHelperText>}
          </FormControl>

          <FormControl ml="20vw">
            <FormLabel fontSize="2xl">Date of birth:</FormLabel>
            <Input type="date" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888"
            onChange={e => props.setDob(e.target.value)}/>
            {props.errorMsg.dob && <FormHelperText  color="red" fontSize="md">{props.errorMsg.dob}</FormHelperText>}
          </FormControl>
          
          <Button size="lg" w="10vw" colorScheme="blue" onClick={props.continueOnClick} alignItems="center">Continue</Button>
      </Flex>
  );
}