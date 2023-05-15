import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Flex,
  Center,
  InputGroup,
  InputRightElement,
  Image,
  HStack,
  Input,
  VStack,
  Text,
  Box,
  Avatar,
  AvatarBadge,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  WrapItem,
  Wrap,
  Link
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';

import globeIcon from '@/assets/svgs/globe.svg';
import locationIcon from '@/assets/svgs/location.svg';
import ProfileIcon from '@/assets/svgs/welcomeprofilepic.svg';
import Body from '@/components/common/Body';

const SignUp = () => {
  const [action, setAction] = useState('flex');

  const [section, setSection] = useState([
    'finish setting up your account',
    '50%',
    'flex',
    'none'
  ]);

  const [address, setAddress] = useState('Add your location');
  const [portfolio, setPortfolio] = useState('Add portfolio link');

  const handleNextSection = () => {
    setSection(['add your skills', '85%', 'none', 'flex']);
  };

  const showActionButton = () => {
    setAction('flex');
  };

  const hideActionButton = () => {
    setAction('none');
  };

  return (
    <Body>
      <Flex
        align="center"
        justify="center"
        h={{ base: 'full', xl: 'calc(100vh - 60px)' }}
        py={{ base: '50px', '2xl': 'initial' }}
      >
        <Flex
          bg="grey.400"
          align="center"
          direction={{ base: 'column', xl: 'row' }}
          borderRadius="30px"
          p={{ base: '25px', xl: '40px', '2xl': '70px' }}
          gap="50px"
          pb={{ base: '60px', '2xl': '90px' }}
        >
          <VStack
            align="flex-start"
            w={{ base: 'full', xl: '300px' }}
            spacing="20px"
          >
            <VStack align="flex-start" spacing="5px" color="grey.600">
              <Text
                fontWeight="500"
                lineHeight={{ base: '19px', '2xl': '24px' }}
                fontSize={{ base: '18px', '2xl': '24px' }}
              >
                Welcome to Layers, Vineet
              </Text>

              <Text fontSize={{ base: '14px', xl: '13px' }} lineHeight="14px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </VStack>

            <VStack align="flex-start" spacing="5px" w="full">
              <Text
                fontSize={{ base: '14px', xl: '13px' }}
                fontWeight="500"
                textTransform="uppercase"
              >
                {section[0]}
              </Text>
              <Box w="full" h="2px" bg="white" borderRadius="10px">
                <Box w={section[1]} h="full" bg="primary.400" />
              </Box>
            </VStack>

            <VStack
              align="flex-start"
              spacing="10px"
              w="full"
              display={section[2]}
            >
              <InputGroup>
                <Input
                  variant="filled"
                  borderRadius="10px"
                  placeholder="Your full name"
                  _placeholder={{
                    fontSize: '14px'
                  }}
                  w="full"
                  size="md"
                  type="text"
                />

                <InputRightElement>
                  <Image src={ProfileIcon} w="15px" />
                </InputRightElement>
              </InputGroup>

              <InputGroup>
                <Input
                  variant="filled"
                  borderRadius="10px"
                  placeholder="Add location"
                  _placeholder={{
                    fontSize: '14px'
                  }}
                  w="full"
                  size="md"
                  type="tel"
                  onChange={(e: { target: { value: string } }) => {
                    setAddress(e.target.value);
                  }}
                />

                <InputRightElement>
                  <Image src={ProfileIcon} w="15px" />
                </InputRightElement>
              </InputGroup>

              <InputGroup>
                <Input
                  variant="filled"
                  borderRadius="10px"
                  placeholder="Add portfolio link"
                  _placeholder={{
                    fontSize: '14px'
                  }}
                  w="full"
                  size="md"
                  type="email"
                  onChange={(e: { target: { value: string } }) => {
                    setPortfolio(e.target.value);
                  }}
                />

                <InputRightElement>
                  <Image src={globeIcon} w="15px" />
                </InputRightElement>
              </InputGroup>

              <HStack w="full" justify={{ base: 'center', xl: 'flex-end' }}>
                <Button
                  rounded={25}
                  px="15px"
                  w={{ base: 'full', xl: 'initial' }}
                  h="40px"
                  bg="primary.400"
                  onClick={handleNextSection}
                >
                  <HStack w="full" justify="center" spacing="5px">
                    <Text fontSize="14px">Confirm</Text>

                    <Center
                      border="2px"
                      borderColor="white"
                      w="16px"
                      h="16px"
                      borderRadius="50%"
                    >
                      <ChevronRightIcon fontSize="12px" />
                    </Center>
                  </HStack>
                </Button>
              </HStack>
            </VStack>

            <VStack
              align="flex-start"
              spacing="10px"
              w="full"
              display={section[3]}
            >
              <InputGroup>
                <Input
                  variant="filled"
                  borderRadius="10px"
                  placeholder="Add location"
                  _placeholder={{
                    fontSize: '14px'
                  }}
                  w="full"
                  size="md"
                  type="tel"
                />

                <InputRightElement>
                  <Popover onOpen={hideActionButton} onClose={showActionButton}>
                    <PopoverTrigger>
                      <ChevronDownIcon w="14px" />
                    </PopoverTrigger>

                    <PopoverContent
                      w="300px"
                      ml="-260px"
                      mt="10px"
                      borderRadius="10px"
                      bg="dark.400"
                    >
                      <PopoverBody>
                        <VStack
                          alignItems="flex-start"
                          overflowX="hidden"
                          className="overflow"
                        >
                          <VStack
                            alignItems="flex-start"
                            fontSize="13px"
                            py="10px"
                            h="150px"
                            w="full"
                          >
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                            <Text
                              borderBottom="1px"
                              borderColor="grey.400"
                              w="full"
                            >
                              Test
                            </Text>
                          </VStack>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </InputRightElement>
              </InputGroup>

              <Link
                as={ReachLink}
                to="/"
                h="40px"
                w="full"
                display="flex"
                justifyContent={{ base: 'center', xl: 'flex-end' }}
              >
                <Button
                  rounded={25}
                  px="15px"
                  h="40px"
                  w={{ base: 'full', xl: 'initial' }}
                  bg="primary.400"
                  display={action}
                >
                  <HStack w="full" justify="center" spacing="5px">
                    <Text fontSize="14px">Confirm</Text>

                    <Center
                      border="2px"
                      borderColor="white"
                      w="16px"
                      h="16px"
                      borderRadius="50%"
                    >
                      <ChevronRightIcon fontSize="12px" />
                    </Center>
                  </HStack>
                </Button>
              </Link>
            </VStack>
          </VStack>

          <VStack
            align="flex-start"
            spacing="15px"
            w={{ base: 'full', xl: 'initial' }}
          >
            <VStack align="flex-start" spacing="-15px">
              <Box pl="30px">
                <Avatar size="xl">
                  <AvatarBadge borderWidth="2px" bg="tomato" boxSize="30px" />
                </Avatar>
              </Box>

              <VStack
                borderRadius="10px"
                borderWidth="1px"
                borderColor="grey.500"
                align="flex-start"
                px="20px"
                pb="20px"
                pt="30px"
                spacing="20px"
                w={{ base: 'full', xl: '350px' }}
              >
                <Text fontWeight="bold" fontSize="18px">
                  Vinnet
                </Text>

                <HStack spacing="20px" w="full">
                  <HStack>
                    <Image
                      src={locationIcon}
                      w={{ base: '12px', xl: '15px' }}
                    />

                    <Text
                      color="grey.300"
                      fontWeight="medium"
                      fontSize={{ base: '11px', xl: '13px' }}
                      w={{ base: '100px', xl: '150px' }}
                    >
                      {address}
                    </Text>
                  </HStack>

                  <HStack>
                    <Image src={globeIcon} w={{ base: '12px', xl: '15px' }} />
                    <Text
                      color="grey.300"
                      fontWeight="medium"
                      fontSize={{ base: '11px', xl: '13px' }}
                      w={{ base: '100px', xl: '150px' }}
                    >
                      {portfolio}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>

            <VStack
              align="flex-start"
              spacing="5px"
              w={{ base: 'full', xl: '350px' }}
              display={section[3]}
            >
              <Text fontSize="11px" fontWeight="700" color="grey.300">
                ADDED SKILLS
              </Text>

              <VStack
                borderRadius="10px"
                borderWidth="1px"
                borderColor="grey.500"
                align="flex-start"
                p="20px"
              >
                <Wrap
                  spacingX="10px"
                  spacingY="10px"
                  pr={{ xl: '50px' }}
                  fontSize="13px"
                >
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="30px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>React.Js</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="30px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Web3</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="30px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Blockchain</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="30px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Visual Design</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="30px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Motion Graphics</Text>
                    </Center>
                  </WrapItem>
                </Wrap>
              </VStack>
            </VStack>
          </VStack>
        </Flex>
      </Flex>
    </Body>
  );
};

export default SignUp;
