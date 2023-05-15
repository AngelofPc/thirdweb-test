import { Text, VStack, HStack, Center, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <VStack
      w="full"
      align="flex-start"
      spacing="5px"
      fontSize="15px"
      display={{ base: 'none', xl: 'initial' }}
      color="grey.300"
    >
      <Box color="primary.400">
        <Link to="/">
          <Text
            fontWeight="medium"
            _hover={{ color: 'primary.400', transition: '0.2s ease-in-out' }}
          >
            My Contracts
          </Text>
        </Link>
      </Box>

      <HStack align="flex-end">
        <Text fontWeight="medium">Discover</Text>
        <Center opacity="0.6" bgColor="grey.300" rounded={6} px="5px" h="18px">
          <Text fontSize="10px" color="white">
            Coming Soon
          </Text>
        </Center>
      </HStack>

      <Box color="primary.400" opacity="0.6">
        <Link to="/templates">
          <Text
            fontWeight="medium"
            _hover={{
              color: 'primary.400',
              transition: '0.2s ease-in-out'
            }}
          >
            Explore Templates
          </Text>
        </Link>
      </Box>

      <HStack align="flex-end">
        <Text fontWeight="medium">Messages</Text>
        <Center opacity="0.6" bgColor="grey.300" rounded={6} px="5px" h="18px">
          <Text fontSize="10px" color="white">
            Coming Soon
          </Text>
        </Center>
      </HStack>

      <HStack align="flex-end">
        <Text fontWeight="medium">Invoices</Text>
        <Center opacity="0.6" bgColor="grey.300" rounded={6} px="5px" h="18px">
          <Text fontSize="10px" color="white">
            Coming Soon
          </Text>
        </Center>
      </HStack>

      <Text fontWeight="medium" opacity="0.6">
        Settings
      </Text>
    </VStack>
  );
};

export default SideNav;
