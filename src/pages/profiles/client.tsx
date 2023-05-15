import { ArrowUpIcon } from '@chakra-ui/icons';
import {
  HStack,
  VStack,
  Text,
  Flex,
  Box,
  Image,
  Center,
  Avatar,
  AvatarBadge,
  Wrap,
  WrapItem
} from '@chakra-ui/react';

import globeIcon from '@/assets/svgs/globe.svg';
import lineIcon from '@/assets/svgs/line.svg';
import locationIcon from '@/assets/svgs/location.svg';
import snowIcon from '@/assets/svgs/snow.svg';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import SideNav from '@/components/navbar/sideNav';

const Client = () => {
  return (
    <Body>
      <Flex
        w="full"
        pb="50px"
        pt="20px"
        align="flex-start"
        gap={{ base: '0px', xl: '25px' }}
      >
        <VStack
          w={{ base: '0%', xl: '20%' }}
          align="flex-start"
          pt="10px"
          spacing="30px"
          fontSize="15px"
          display={{ base: 'none', xl: 'initial' }}
        >
          <SideNav />

          <Box w="95%">
            <BasicCard variant="dark" py="30px">
              <Image src={snowIcon} />
              <Text
                textTransform="capitalize"
                fontWeight="medium"
                my={2}
                color="primary.100"
              >
                Layers Tip
              </Text>
              <Text fontSize={14}>
                Review the contract carefully to ensure it meets your needs,
                make changes directly in the fields on the right, and send it
                for review with just a few clicks. By following these pro tips,
                you can quickly approve contracts and ensure that all necessary
                changes have been made.
              </Text>
            </BasicCard>
          </Box>
        </VStack>

        <VStack w="80%" pt="80px" spacing="50px">
          <HStack
            pl="50px"
            w="full"
            spacing={{ base: '30px', '2xl': '60px' }}
            bg="grey.400"
            borderRadius="10px"
            h="140px"
            fontSize="14px"
          >
            <Box pt="40px">
              <Avatar size="2xl">
                <AvatarBadge
                  // borderColor="papayawhip"
                  borderWidth="5px"
                  bg="tomato"
                  boxSize="40px"
                />
              </Avatar>
            </Box>

            <Text fontSize="32px" fontWeight="bold">
              Vineet Yadav
            </Text>

            <HStack>
              <Image src={locationIcon} w="15px" />
              <Text>Fairfax, US</Text>
            </HStack>
            <HStack>
              <Image src={globeIcon} w="15px" />
              <Text as="u">www.vineetyadav.com</Text>
            </HStack>
            <VStack align="flex-start" spacing="0px" lineHeight="16px">
              <Text fontSize="12px" color="grey.600">
                Completed Jobs
              </Text>
              <Text>202</Text>
            </VStack>
            <VStack align="flex-start" spacing="0px" lineHeight="16px">
              <Text fontSize="12px" color="grey.600">
                Hired Talent
              </Text>
              <Text>202</Text>
            </VStack>
          </HStack>

          <Flex gap="30px" w="full" align="flex-start" alignItems="stretch">
            <VStack spacing="5px" w="full" align="flex-start">
              <Text
                fontSize="12px"
                fontWeight="bold"
                color="grey.300"
                textTransform="uppercase"
              >
                About Vinnet
              </Text>

              <VStack
                align="flex-start"
                justify="space-between"
                w="full"
                h="full"
                pt="30px"
                pl="30px"
                borderRadius="15px"
                bg="grey.400"
              >
                <Box pr="30px">
                  <Text
                    fontWeight="bold"
                    textTransform="capitalize"
                    color="primary.100"
                  >
                    Web3 talent manager
                  </Text>
                  <Text fontSize="14px">
                    Lörem ipsum posedut togände euroläväskap: därför att vid.
                    Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat
                    jag espegt. Supralärade duska. Prese äsade bess susk. Tresm
                    duguvis, deck antiv autogt. Lörem ipsum posedut togände
                    euroläväskap: därför att vid. Teratos fjärrnyckel fastän
                    nonade. Plasotödat nin men dudat jag espegt. Supralärade
                    duska. Prese äsade bess susk. Tresm duguvis, deck antiv
                    autogt.
                  </Text>
                </Box>

                <HStack justify="flex-end" w="full" pr="8px" pb="8px">
                  <Center borderRadius="50%" bg="primary.400" w="30px" h="30px">
                    <Image src={lineIcon} w="16px" />
                  </Center>
                </HStack>
              </VStack>
            </VStack>

            <VStack spacing="5px" w="full" align="flex-start">
              <Text fontSize="12px" fontWeight="bold" color="grey.300">
                SKILLS HIRED
              </Text>

              <VStack
                align="flex-start"
                justify="space-between"
                w="full"
                h="full"
                pt="30px"
                pl="30px"
                borderRadius="15px"
                bg="grey.400"
              >
                <Wrap spacingX="15px" spacingY="10px" pr="50px" fontSize="14px">
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="10px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Frontend</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="10px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>UI/UX</Text>
                    </Center>
                  </WrapItem>
                  <WrapItem>
                    <Center
                      py="5px"
                      px="10px"
                      borderRadius="10px"
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
                      borderRadius="10px"
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
                      borderRadius="10px"
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
                      borderRadius="10px"
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
                      borderRadius="10px"
                      border="1px"
                      borderColor="white"
                    >
                      <Text>Motion Graphics</Text>
                    </Center>
                  </WrapItem>
                </Wrap>

                <HStack justify="flex-end" w="full" pr="8px" pb="8px">
                  <Center borderRadius="50%" bg="primary.400" w="30px" h="30px">
                    <Image src={lineIcon} w="16px" />
                  </Center>
                </HStack>
              </VStack>
            </VStack>
          </Flex>

          <VStack
            align="flex-start"
            borderRadius="15px"
            bg="grey.400"
            p="30px"
            w="full"
            spacing="30px"
          >
            <Text fontWeight="bold" color="primary.100">
              Open Jobs
            </Text>

            <Flex className="overflow" overflowY="hidden" w="full">
              <HStack spacing="30px">
                <Box
                  borderRadius="10px"
                  bg="grey.300"
                  w="300px"
                  fontSize="14px"
                >
                  <Box bg="black" h="140px" borderTopRadius="10px" />
                  <VStack p="15px" align="flex-start" spacing="10px">
                    <Text fontWeight="bold" textTransform="uppercase">
                      Neue World - UI/UX
                    </Text>
                    <Text>
                      Lörem ipsum posedut togände euroläväskap: därför att vid.
                      Teratos fjärrnyckel fastän nonade. Plasotödat nin men
                      dudat jag espegt.
                    </Text>
                    <HStack spacing="2px" pb="10px">
                      <ArrowUpIcon fontSize="22px" transform="rotate(45deg)" />
                      <Text as="u">View Job</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  borderRadius="10px"
                  bg="grey.300"
                  w="300px"
                  fontSize="14px"
                >
                  <Box bg="black" h="140px" borderTopRadius="10px" />
                  <VStack p="15px" align="flex-start" spacing="10px">
                    <Text fontWeight="bold" textTransform="uppercase">
                      Neue World - UI/UX
                    </Text>
                    <Text>
                      Lörem ipsum posedut togände euroläväskap: därför att vid.
                      Teratos fjärrnyckel fastän nonade. Plasotödat nin men
                      dudat jag espegt.
                    </Text>
                    <HStack spacing="2px" pb="10px">
                      <ArrowUpIcon fontSize="22px" transform="rotate(45deg)" />
                      <Text as="u">View Job</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  borderRadius="10px"
                  bg="grey.300"
                  w="300px"
                  fontSize="14px"
                >
                  <Box bg="black" h="140px" borderTopRadius="10px" />
                  <VStack p="15px" align="flex-start" spacing="10px">
                    <Text fontWeight="bold" textTransform="uppercase">
                      Neue World - UI/UX
                    </Text>
                    <Text>
                      Lörem ipsum posedut togände euroläväskap: därför att vid.
                      Teratos fjärrnyckel fastän nonade. Plasotödat nin men
                      dudat jag espegt.
                    </Text>
                    <HStack spacing="2px" pb="10px">
                      <ArrowUpIcon fontSize="22px" transform="rotate(45deg)" />
                      <Text as="u">View Job</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  borderRadius="10px"
                  bg="grey.300"
                  w="300px"
                  fontSize="14px"
                >
                  <Box bg="black" h="140px" borderTopRadius="10px" />
                  <VStack p="15px" align="flex-start" spacing="10px">
                    <Text fontWeight="bold" textTransform="uppercase">
                      Neue World - UI/UX
                    </Text>
                    <Text>
                      Lörem ipsum posedut togände euroläväskap: därför att vid.
                      Teratos fjärrnyckel fastän nonade. Plasotödat nin men
                      dudat jag espegt.
                    </Text>
                    <HStack spacing="2px" pb="10px">
                      <ArrowUpIcon fontSize="22px" transform="rotate(45deg)" />
                      <Text as="u">View Job</Text>
                    </HStack>
                  </VStack>
                </Box>
              </HStack>
            </Flex>
          </VStack>
        </VStack>
      </Flex>
    </Body>
  );
};

export default Client;
