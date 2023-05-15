import {
  HStack,
  VStack,
  Text,
  Flex,
  Box,
  Image,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  AvatarBadge,
  Circle
} from '@chakra-ui/react';

import globeIcon from '@/assets/svgs/globe.svg';
import locationIcon from '@/assets/svgs/location.svg';
import snowIcon from '@/assets/svgs/snow.svg';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import SideNav from '@/components/navbar/sideNav';

const Freelancer = () => {
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
                fontSize={16}
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
              <Text>Tallin, Estonia</Text>
            </HStack>
            <HStack>
              <Image src={globeIcon} w="15px" />
              <Text as="u">www.vineetyadav.com</Text>
            </HStack>
            <VStack align="flex-start" spacing="0px" lineHeight="16px">
              <HStack spacing="5px">
                <Circle size="8px" bg="green" />
                <Text>Accepting new clients</Text>
              </HStack>
              <Text fontSize="12px" color="primary.500">
                Update work availability
              </Text>
            </VStack>
          </HStack>

          <Tabs w="full">
            <TabList>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
              >
                About
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
              >
                Works
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
              >
                Services
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0" w="full">
                Test
              </TabPanel>

              <TabPanel w="full" px="0">
                Test
              </TabPanel>

              <TabPanel w="full" px="0">
                Test
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Body>
  );
};

export default Freelancer;
