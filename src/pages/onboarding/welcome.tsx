import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';

import bag from '@/assets/svgs/bagMainPage.svg';
import Nav from '@/components/navbar/mainNav';

import Client from './client';
import Freelancer from './freelancer';

const Main = () => {
  const [user, setUser] = useState(['flex', 'none', 'none']);

  const handleFreelancer = () => {
    setUser(['none', 'flex', 'none']);
  };

  const handleClient = () => {
    setUser(['none', 'none', 'flex']);
  };

  const newContainerHeight = 'calc(100vh - 60px)';

  return (
    <Container bg="dark.900" minH="100vh" maxW="100vw" p="0" m="0">
      <Nav />

      <Flex
        align="center"
        justify="center"
        py="50px"
        display={user[0]}
        h={{ base: 'full', xl: newContainerHeight }}
      >
        <VStack align="flex start" spacing="10px">
          <HStack spacing="10px" fontWeight="medium" pb="10px">
            <ArrowBackIcon fontSize="19px" pt="2px" />
            <Text fontSize="15px">Back</Text>
          </HStack>

          <VStack
            bg="grey.400"
            borderRadius="30px"
            p={{ base: '25px', xl: '45px', '2xl': '70px' }}
            spacing="50px"
            color="grey.600"
          >
            <VStack
              spacing="5px"
              w={{ base: '300px', xl: '350px', '2xl': '400px' }}
            >
              <Text
                fontSize={{ base: '18px', '2xl': '26px' }}
                fontWeight="medium"
              >
                Let&apos;s personalize your experience
              </Text>
              <Text
                fontSize={{ base: '13px', '2xl': '16px' }}
                textAlign="center"
                lineHeight="15px"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </VStack>

            <Flex
              align="center"
              direction={{ base: 'column', xl: 'row' }}
              gap="60px"
            >
              <VStack
                bg="grey.500"
                borderRadius="30px"
                borderWidth="2px"
                borderColor="grey.500"
                p={{ base: '20px', '2xl': '30px' }}
                _hover={{ borderColor: 'primary.400', borderWidth: '2px' }}
                onClick={handleFreelancer}
              >
                <Box>
                  <Image src={bag} w={{ base: '100px', '2xl': '150px' }} />
                </Box>

                <VStack w={{ base: '200px', '2xl': '250px' }} spacing="5px">
                  <Text fontWeight="medium">Find jobs as a freelancer</Text>
                  <Text
                    textAlign="center"
                    fontSize={{ base: '12px', '2xl': '13px' }}
                    lineHeight={{ base: '13px', '2xl': '14px' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </Text>
                </VStack>
              </VStack>

              <VStack
                bg="grey.500"
                borderRadius="30px"
                borderWidth="2px"
                borderColor="grey.500"
                p={{ base: '20px', '2xl': '30px' }}
                _hover={{
                  borderColor: 'primary.400',
                  borderWidth: '2px'
                }}
                onClick={handleClient}
              >
                <Box>
                  <Image src={bag} w={{ base: '100px', '2xl': '150px' }} />
                </Box>

                <VStack w={{ base: '200px', '2xl': '250px' }} spacing="5px">
                  <Text fontWeight="medium">I want to hire freelancers</Text>
                  <Text
                    textAlign="center"
                    fontSize={{ base: '12px', '2xl': '13px' }}
                    lineHeight={{ base: '13px', '2xl': '14px' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          </VStack>

          <HStack justify={{ base: 'center', xl: 'flex-end' }} fontSize="14px">
            <Text as="span">
              Having issues?{' '}
              <Text as="span" textDecor="underline" color="primary.400">
                {' '}
                Chat with us
              </Text>
            </Text>
          </HStack>
        </VStack>
      </Flex>

      <Flex
        display={user[1]}
        w="full"
        minH={{ base: 'full', xl: newContainerHeight }}
      >
        <Freelancer />
      </Flex>

      <Flex
        display={user[2]}
        w="full"
        minH={{ base: 'full', xl: newContainerHeight }}
      >
        <Client />
      </Flex>
    </Container>
  );
};

export default Main;
