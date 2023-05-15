import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';

import EyeIcon from '@/assets/svgs/eyeicon.svg';
import MailIcon from '@/assets/svgs/mailicon.svg';
import MailOrangeIcon from '@/assets/svgs/mailorange.svg';
import SignupIcon1 from '@/assets/svgs/signupicon1.svg';
import SignupIcon2 from '@/assets/svgs/signupicon2.svg';
import SignupIcon3 from '@/assets/svgs/signupicon3.svg';
import WelcomePic from '@/assets/svgs/welcomepic.svg';

const Freelancer = () => {
  const greyColor = 'grey.400';
  const primaryColor = 'primary.400';

  const [progressBar, setProgressBar] = useState([
    greyColor,
    'one',
    'Sign up as a freelancer',
    'flex',
    'none',
    greyColor,
    'none'
  ]);

  const handleProgressBar = () => {
    setProgressBar([
      'white',
      'two',
      'Setup your layers account',
      'none',
      'flex',
      'grey.400',
      'none'
    ]);
  };

  const newContainerWidth = 'calc(85vw / 3)';

  const handleSecondProgressBar = () => {
    setProgressBar([
      'white',
      'Three',
      'Verify your account',
      'none',
      'none',
      'white',
      'flex'
    ]);
  };
  return (
    <Flex direction={{ base: 'column', xl: 'row' }} align="center" w="full">
      <VStack
        w={{ base: 'full', xl: '40%' }}
        h="full"
        align="flex-start"
        // spacing="60px"
        px={{ base: '20px', xl: 'initial' }}
        py={{ base: '30px', '2xl': '80px' }}
        justify="space-between"
        bg={{
          base: 'dark.400',
          xl: 'linear-gradient(270deg, #020202 -3.75%, rgba(2, 2, 2, 0) 71.62%)'
        }}
      >
        <Box pl="40px" display={{ base: 'none', xl: 'initial' }}>
          <Text
            fontWeight="500"
            w={{ base: '320px', '2xl': '430px' }}
            fontSize={{ base: 'initial', '2xl': '22px' }}
          >
            TRUSTED BY WORLD LEADING BLOCKCHAIN FREELANCERS AND CLIENTS
          </Text>
        </Box>

        <Box
          display={{ base: 'none', xl: 'initial' }}
          w="full"
          h="50%"
          bgImg={WelcomePic}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPos="center"
        >
          <Box
            w="full"
            h="full"
            bgGradient="linear-gradient(270deg, #020202 -3.75%, rgba(2, 2, 2, 0) 71.62%)"
          />
        </Box>

        <VStack w="full" align="flex-start" pl={{ xl: '40px' }}>
          <VStack align="flex-start" spacing="3px">
            <HStack>
              <Box
                minW={{ base: newContainerWidth, xl: '90px' }}
                h="4px"
                bg=" white"
              />
              <Box
                minW={{ base: newContainerWidth, xl: '90px' }}
                h="4px"
                bg={progressBar[0]}
              />
              <Box
                minW={{ base: newContainerWidth, xl: '90px' }}
                h="4px"
                bg={progressBar[5]}
              />
            </HStack>

            <Text
              textTransform="uppercase"
              color="grey.100"
              fontWeight="500"
              fontSize="12px"
            >
              step {progressBar[1]}
            </Text>
          </VStack>

          <VStack
            align="flex-start"
            spacing="3px"
            color="grey.600"
            w={{ base: 'full', xl: '400px' }}
          >
            <Text
              fontWeight="500"
              fontSize={{ base: 'initial', '2xl': '22px' }}
            >
              {progressBar[2]}
            </Text>
            <Text fontSize={{ base: '13px', '2xl': '14px' }} lineHeight="16px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut
            </Text>
          </VStack>
        </VStack>
      </VStack>

      <Flex
        w={{ base: 'full', xl: '60%' }}
        align="flex-start"
        justify="center"
        gap="30px"
        direction="column"
        pl={{ xl: '90px' }}
        px={{ base: '20px', xl: '90px' }}
        display={progressBar[3]}
      >
        <VStack
          align="flex-start"
          spacing="5px"
          w={{ base: 'full', xl: '500px' }}
        >
          <Text color="grey.600" fontSize={{ base: '14px', '2xl': '16px' }}>
            Welcome to Layers
          </Text>
          <HStack w="full" fontSize={{ base: 'initial', '2xl': '18px' }}>
            <Text as="span">
              Hello
              {'  '}
              <Input
                variant="flushed"
                placeholder="Add your full name here"
                _placeholder={{
                  color: 'grey.300',
                  fontSize: '14px',
                  textAlign: 'center'
                }}
                focusBorderColor="primary.400"
                borderColor="primary.400"
                h="25px"
                w="200px"
                type="text"
                textAlign="center"
              />
              <Text as="span"> , What are you interested in?</Text>
            </Text>
          </HStack>
        </VStack>

        <SimpleGrid
          columns={{ base: 2, xl: 3 }}
          spacing="20px"
          w={{ base: 'full', xl: '500px', '2xl': '700px' }}
          fontSize="14px"
          fontWeight="medium"
        >
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon1} w="30px" />
            <Text>Design</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon2} w="30px" />
            <Text>Web3</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon3} w="30px" />
            <Text>Engineering</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon1} w="30px" />
            <Text>Design</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon2} w="30px" />
            <Text>Web3</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon3} w="30px" />
            <Text>Engineering</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon1} w="30px" />
            <Text>Design</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon2} w="30px" />
            <Text>Web3</Text>
          </VStack>
          <VStack
            _hover={{ borderColor: primaryColor, borderWidth: '1px' }}
            bg={greyColor}
            borderRadius="5px"
            borderColor={greyColor}
            borderWidth="1px"
            p="10px"
            align="flex-start"
            justify="space-between"
          >
            <Image src={SignupIcon3} w="30px" />
            <Text>Engineering</Text>
          </VStack>
        </SimpleGrid>

        <HStack
          w={{ base: 'full', xl: '500px', '2xl': '700px' }}
          justify={{ base: 'center', xl: 'flex-end' }}
          pb={{ base: '50px', xl: 'initial' }}
        >
          <Button
            rounded={30}
            px="15px"
            w={{ base: 'full', xl: 'initial' }}
            h="45px"
            bg="primary.400"
            onClick={handleProgressBar}
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
      </Flex>

      <Flex
        w={{ base: 'full', xl: '60%' }}
        align="flex-start"
        justify="center"
        gap="20px"
        direction="column"
        pl={{ xl: '90px' }}
        px={{ base: '20px', xl: '90px' }}
        display={progressBar[4]}
      >
        <VStack
          align="flex-start"
          spacing="20px"
          w={{ base: 'full', xl: '500px', '2xl': '700px' }}
        >
          <Text color="grey.600" fontSize={{ base: '14px', '2xl': '16px' }}>
            Set up your Layers Account
          </Text>
          <VStack w="full" spacing="20px">
            <InputGroup>
              <Input
                variant="filled"
                borderRadius="10px"
                placeholder="Add email address"
                _placeholder={{
                  fontSize: '14px'
                }}
                w="full"
                size="lg"
                type="email"
              />

              <InputRightElement pt="10px">
                <Image src={MailIcon} w="20px" />
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <Input
                variant="filled"
                borderRadius="10px"
                placeholder="Create password"
                _placeholder={{
                  fontSize: '14px'
                }}
                w="full"
                size="lg"
                type="password"
              />
              <InputRightElement pt="10px">
                <Image src={EyeIcon} w="20px" />
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <Input
                variant="filled"
                borderRadius="10px"
                placeholder="Confirm your password"
                _placeholder={{
                  fontSize: '14px'
                }}
                w="full"
                size="lg"
                type="password"
              />

              <InputRightElement pt="10px">
                <Image src={EyeIcon} w="20px" />
              </InputRightElement>
            </InputGroup>
          </VStack>
        </VStack>

        <HStack
          w={{ base: 'full', xl: '500px', '2xl': '700px' }}
          pb={{ base: '50px', xl: 'initial' }}
          justify="flex-end"
        >
          <Button
            rounded={30}
            px="15px"
            w={{ base: 'full', xl: 'initial' }}
            h="45px"
            bg="primary.400"
            onClick={handleSecondProgressBar}
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
      </Flex>

      <Flex
        w={{ base: 'full', xl: '60%' }}
        align="flex-start"
        justify="center"
        gap="20px"
        direction="column"
        pl={{ xl: '90px' }}
        px={{ base: '20px', xl: '90px' }}
        display={progressBar[6]}
        pb={{ base: '50px', xl: 'initial' }}
      >
        <Image src={MailOrangeIcon} />
        <Text color="grey.600" fontSize={{ base: '14px', '2xl': '16px' }}>
          Verify your email address
        </Text>

        <VStack
          align="flex-start"
          spacing="5px"
          color="grey.600"
          w={{ base: 'full', xl: '400px' }}
        >
          <Text
            fontWeight="500"
            w="270px"
            lineHeight="19px"
            fontSize={{ base: '17px', '2xl': '19px' }}
          >
            Click the link in your email to verify your email address
          </Text>

          <Text
            fontSize="13px"
            lineHeight="16px"
            w={{ base: 'full', xl: '400px' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </Text>
        </VStack>

        <Text color="primary.400" fontSize="14px">
          Resend email
        </Text>
      </Flex>
    </Flex>
  );
};

export default Freelancer;
