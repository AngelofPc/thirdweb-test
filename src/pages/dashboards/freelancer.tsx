import { ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  TabList,
  Tabs,
  Tab,
  VStack,
  TabPanels,
  TabPanel,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center
} from '@chakra-ui/react';

import checkIcon from '@/assets/svgs/check2.svg';
import clockIcon from '@/assets/svgs/clock.svg';
import document from '@/assets/svgs/document.svg';
import MoneyshieldIcon from '@/assets/svgs/moneyshield.svg';
import paint from '@/assets/svgs/paint.svg';
import pen from '@/assets/svgs/pen.svg';
import rocket from '@/assets/svgs/rocket.svg';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import StepBox from '@/components/contract/StepBox';

const Freelancer = () => {
  return (
    <Body>
      <VStack pt="20px" pb="50px" spacing="15px">
        <HStack w="full" spacing="30px">
          <HStack w="20%">
            <ArrowBackIcon w="14px" />
            <Text fontSize="12px">Back to Projects</Text>
          </HStack>

          <HStack w="80%" justify="space-between">
            <Text fontSize="18px" fontWeight="bold">
              NEUE WORLD x Client Name - UI/UX
            </Text>

            <Popover trigger="click">
              <PopoverTrigger>
                <Button
                  rounded={30}
                  px="10px"
                  h="38px"
                  borderColor="white"
                  borderWidth="1px"
                  bg="grey.400"
                >
                  <HStack w="full" spacing="10px">
                    <Text fontSize="14px" fontWeight="normal">
                      Actions
                    </Text>
                    <ChevronDownIcon w="14px" />
                  </HStack>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                w="max-content"
                px="20px"
                py="10px"
                borderRadius="10px"
                bg="grey.400"
              >
                <PopoverBody>
                  <VStack alignItems="flex-start">
                    <Link _hover={{ color: 'green' }}>Download</Link>

                    <Link _hover={{ color: 'green' }}>Create a Copy</Link>

                    <Link _hover={{ color: 'green' }}>Mark as Draft</Link>

                    <Link _hover={{ color: 'green' }}>Delete</Link>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </HStack>

        <HStack w="full" align="flex-start" spacing="30px">
          <VStack w="20%" pt="30px" spacing="20px">
            <VStack align="flex-start" w="full">
              <Text fontSize="12px" fontWeight="medium" color="primary.100">
                STATUS OVERVIEW
              </Text>
              <BasicCard variant="dark">
                <HStack spacing="15px" pb="6px">
                  <VStack spacing="2px">
                    <CircularProgress
                      color="primary.400"
                      value={75}
                      thickness={4}
                      size="full"
                      trackColor="grey.100"
                    >
                      <CircularProgressLabel
                        fontSize={{ base: 18, '2xl': '35' }}
                      >
                        $1.2k
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="11" textTransform="uppercase">
                      Pending
                    </Text>
                  </VStack>

                  <VStack spacing="2px">
                    <CircularProgress
                      color="primary.400"
                      value={25}
                      thickness={4}
                      size="full"
                      trackColor="grey.100"
                    >
                      <CircularProgressLabel
                        fontSize={{ base: 18, '2xl': '35' }}
                      >
                        $600
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="11" textTransform="uppercase">
                      Released
                    </Text>
                  </VStack>
                </HStack>
              </BasicCard>
            </VStack>

            <VStack align="flex-start" w="full">
              <Text fontSize="12px" fontWeight="medium" color="primary.100">
                ESCROW
              </Text>
              <BasicCard variant="dark" w="full">
                <Image src={MoneyshieldIcon} display="block" />
                <Text
                  textTransform="capitalize"
                  fontSize={{ md: 14, base: 16 }}
                  fontWeight="medium"
                  my={2}
                  color="primary.100"
                >
                  Escrow Fully funded
                </Text>
                <Text fontSize="14">
                  This project escrow is fully funded by your client.
                </Text>
              </BasicCard>
            </VStack>

            <VStack align="flex-start" w="full">
              <Text fontSize="12px" fontWeight="medium" color="primary.100">
                PROJECT OVERVIEW
              </Text>

              <BasicCard variant="dark" w="full">
                <VStack w="full" align="flex-start" fontSize="14">
                  <Box>
                    <Text fontWeight="medium" color="primary.100">
                      Project Cost
                    </Text>
                    <Text mt={1} fontSize="13" fontWeight="bold">
                      $400
                    </Text>
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="medium" color="primary.100">
                      Paid
                    </Text>
                    <Text mt={1} fontSize="13" fontWeight="bold">
                      $400 / $1,600
                    </Text>
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="medium" color="primary.100">
                      Timeline
                    </Text>
                    <Text mt={1} fontSize="13" fontWeight="bold">
                      07, March 2023 - 07 April 2023
                    </Text>
                  </Box>
                  <Box mt={2}>
                    <Text fontWeight="medium" color="primary.100">
                      Payment Type
                    </Text>
                    <Text mt={1} fontSize="13" fontWeight="bold">
                      Fiat Fee
                    </Text>
                  </Box>
                </VStack>
              </BasicCard>
            </VStack>

            <VStack align="flex-start" w="full">
              <Text fontSize="12px" fontWeight="medium" color="primary.100">
                YOUR PROJECT CHECKLIST
              </Text>
              <BasicCard variant="dark" w="full">
                <StepBox
                  status="active"
                  isFirst
                  title="Start Work"
                  description="Review the Work Layers carefully to ensure it meets your needs."
                />
                <StepBox
                  status="current"
                  title="Complete Milestones"
                  description={`Once you're happy with the Work Layers, simply sign it.`}
                />
                <StepBox
                  status="inactive"
                  title="Receive Full Payments"
                  description={`Once you're happy with the contract, simply sign it.`}
                />
                <StepBox
                  status="inactive"
                  title="Handover Projects"
                  isLast
                  description={`Once you're happy with the contract, simply sign it.`}
                />
              </BasicCard>
            </VStack>
          </VStack>

          <Tabs w="80%">
            <TabList>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
                // fontWeight="medium"
              >
                Milestones
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
                // fontWeight="medium"
              >
                Timeline
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
                // fontWeight="medium"
              >
                Overview
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'white'
                }}
                // fontWeight="medium"
              >
                Scope
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0" w="full">
                <BasicCard variant="dark" p={0} pb="10px">
                  <Box
                    bg="#333333"
                    w="full"
                    borderTopRadius="10px"
                    py="10px"
                    px="20px"
                  >
                    <Text>Milestones</Text>
                  </Box>

                  <VStack>
                    <TableContainer whiteSpace="normal">
                      <Table variant="unstyled" w="full">
                        <Thead>
                          <Tr color="primary.100">
                            <Th fontSize="12px">Scope of Work</Th>
                            <Th fontSize="12px" minW="140px" textAlign="center">
                              Due Date
                            </Th>
                            <Th fontSize="12px" textAlign="center">
                              Price
                            </Th>
                            <Th fontSize="12px" textAlign="right">
                              Work Status
                            </Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          <Tr color="grey.100">
                            <Td>
                              <HStack w="full" spacing="20px">
                                <Box>
                                  <Text fontWeight="bold">
                                    Phase 0: Discovery and Research
                                  </Text>
                                  <Text fontSize="14px">
                                    Redesign for better look and feel as an
                                    improved MVP with utility driven UI and UX.
                                    Design will be based on hypothesis & highly
                                    focussed on refining the existing designs.
                                  </Text>
                                </Box>
                              </HStack>
                            </Td>
                            <Td>
                              <Box>
                                <Text textDecor="line-through">
                                  05 Mar 2023
                                </Text>
                                <HStack color="primary.400">
                                  <Image src={checkIcon} w="12px" />
                                  <Text fontSize="12px">Paid</Text>
                                </HStack>
                              </Box>
                            </Td>
                            <Td isNumeric>$200</Td>
                            <Td textAlign="right">
                              <Button rounded={30} px="20px" h="35px">
                                <HStack w="full" spacing="10px">
                                  <Text fontSize="14px" color="primary.400">
                                    Approved
                                  </Text>
                                  <Image src={checkIcon} w="14px" />
                                </HStack>
                              </Button>
                            </Td>
                          </Tr>

                          <Tr color="primary.100">
                            <Td>
                              <Box>
                                <Text fontWeight="bold">
                                  Phase 1: Dashboard
                                </Text>
                                <Text fontSize="14px">
                                  Redesign for better look and feel as an
                                  improved MVP with utility driven UI and UX.
                                  Design will be based on hypothesis & highly
                                  focussed on refining the existing designs.
                                </Text>
                              </Box>
                            </Td>
                            <Td>05 Apr 2023</Td>
                            <Td isNumeric>$200</Td>
                            <Td textAlign="right">
                              <Button
                                rounded={30}
                                px="20px"
                                h="35px"
                                borderColor="primary.400"
                                borderWidth="1px"
                                bg="grey.400"
                              >
                                <HStack w="full" spacing="10px">
                                  <Text fontSize="14px" color="primary.400">
                                    In Review
                                  </Text>
                                  <Image src={clockIcon} w="16px" />
                                </HStack>
                              </Button>
                            </Td>
                          </Tr>

                          <Tr color="primary.100">
                            <Td>
                              <Box>
                                <Text fontWeight="bold">
                                  Phase 2: Educational Website
                                </Text>
                                <Box>
                                  <Text fontSize="14px">
                                    Release V1 of the new website with better
                                    design; benchmarking Aura and Authena. The
                                    build will be handled using WebFlow to build
                                    an autonomous team in the future who will
                                    handle the website (primarily to avoid
                                    developer intervention). Integration of
                                    Analytics and SEO structure will be
                                    included.
                                  </Text>
                                  <Text fontSize="12px" color="primary.400">
                                    Send for Review
                                  </Text>
                                </Box>
                              </Box>
                            </Td>
                            <Td>
                              <Box>
                                <Text>05 May 2023</Text>
                                <Text fontSize="12px" color="primary.400">
                                  Change
                                </Text>
                              </Box>
                            </Td>
                            <Td isNumeric>$200</Td>
                            <Td textAlign="right">
                              <Button
                                rounded={30}
                                px="20px"
                                h="35px"
                                bg="primary.400"
                              >
                                <HStack w="full" spacing="10px">
                                  <Text fontSize="14px">WIP</Text>
                                  <ChevronDownIcon w="16px" />
                                </HStack>
                              </Button>
                            </Td>
                          </Tr>

                          <Tr color="primary.100">
                            <Td>
                              <Box>
                                <Text fontWeight="bold">
                                  Phase 3: SEO Updates
                                </Text>
                                <Text fontSize="14px">
                                  Release V1 of the new website with better
                                  design; benchmarking Aura and Authena. The
                                  build will be handled using WebFlow to build
                                  an autonomous team in the future who will
                                  handle the website (primarily to avoid
                                  developer intervention). Integration of
                                  Analytics and SEO structure will be included.
                                </Text>
                              </Box>
                            </Td>
                            <Td>
                              <Box>
                                <Text>21 May 2023</Text>
                                <Text fontSize="12px" color="primary.400">
                                  Change
                                </Text>
                              </Box>
                            </Td>
                            <Td isNumeric>$200</Td>
                            <Td textAlign="right">
                              <Button
                                rounded={30}
                                px="20px"
                                h="35px"
                                bg="grey.600"
                              >
                                <HStack
                                  w="full"
                                  spacing="10px"
                                  color="grey.100"
                                >
                                  <Text fontSize="14px">Backlog</Text>
                                  <ChevronDownIcon w="16px" />
                                </HStack>
                              </Button>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </VStack>
                </BasicCard>
              </TabPanel>

              <TabPanel w="full" px="0">
                <Box
                  bg="grey.400"
                  w="full"
                  borderRadius="10px"
                  py="10px"
                  px="20px"
                  mb="20px"
                >
                  <Text>Timeline</Text>
                </Box>
                <VStack w="full" align="flex-start" spacing="60px">
                  <VStack
                    w="full"
                    align="flex-start"
                    fontSize="14px"
                    spacing="0px"
                  >
                    <Box pl="15px" w="full">
                      <HStack
                        w="full"
                        justify="space-between"
                        borderBottomWidth="1px"
                        borderColor="grey.400"
                        pb="2px"
                      >
                        <Text>Today</Text>
                        <Text>13, Apr. 2023</Text>
                      </HStack>
                    </Box>

                    <HStack w="full" spacing="10px" justify="space-between">
                      <VStack spacing="0px">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="primary.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="80px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="30px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="primary.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box>
                            <Text fontWeight="bold" fontSize="16px">
                              Project Funded
                            </Text>
                            <Text>
                              Lörem ipsum posedut togände euroläväskap: därför
                              att vid. Teratos fjärrnyckel fastän nonade.
                              Plasotödat nin men dudat jag espegt. Supralärade
                              duska. Prese äsade bess susk. Tresm duguvis, deck
                              antiv autogt. Pos presm för doliga.
                            </Text>
                          </Box>

                          <HStack spacing="30px">
                            <Text color="grey.100" minW="max-content">
                              13, Apr. 2023
                            </Text>

                            <Text color="grey.100" minW="max-content">
                              Client
                            </Text>
                          </HStack>

                          <Button
                            rounded={30}
                            px="20px"
                            h="35px"
                            bg="primary.400"
                            minW="max-content"
                          >
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px">WIP</Text>
                              <ChevronDownIcon w="16px" />
                            </HStack>
                          </Button>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={rocket} w="20px" />
                        </Center>
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="40px">
                        <HStack align="flex-end">
                          <Text fontSize="16px">Milestone 1 Started</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          You started Milestones 1 on 31 Mar 2023
                        </Text>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={pen} w="20px" />
                        </Center>
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box>
                        <HStack align="flex-end">
                          <Text fontSize="16px">Proposal Sent</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          Proposal was sent to client on 31 Mar 2023
                        </Text>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={paint} w="20px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box>
                        <HStack align="flex-end">
                          <Text fontSize="16px">Proposal Created</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          Proposal created by you
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>

                  <VStack
                    w="full"
                    align="flex-start"
                    fontSize="14px"
                    spacing="0px"
                  >
                    <Box pl="15px" w="full">
                      <HStack
                        w="full"
                        justify="space-between"
                        borderBottomWidth="1px"
                        borderColor="grey.400"
                        pb="2px"
                      >
                        <Text>Yesterday</Text>
                        <Text>13, Apr. 2023</Text>
                      </HStack>
                    </Box>

                    <HStack w="full" justify="space-between" spacing="10px">
                      <VStack spacing="0px">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="primary.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="80px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="30px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="primary.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box>
                            <Text fontWeight="bold" fontSize="16px">
                              Project Funded
                            </Text>
                            <Text>
                              Lörem ipsum posedut togände euroläväskap: därför
                              att vid. Teratos fjärrnyckel fastän nonade.
                              Plasotödat nin men dudat jag espegt. Supralärade
                              duska. Prese äsade bess susk. Tresm duguvis, deck
                              antiv autogt. Pos presm för doliga.
                            </Text>
                          </Box>

                          <HStack spacing="30px">
                            <Text color="grey.100" minW="max-content">
                              13, Apr. 2023
                            </Text>

                            <Text color="grey.100" minW="max-content">
                              Client
                            </Text>
                          </HStack>

                          <Button
                            rounded={30}
                            px="20px"
                            h="35px"
                            bg="primary.400"
                            minW="max-content"
                          >
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px">WIP</Text>
                              <ChevronDownIcon w="16px" />
                            </HStack>
                          </Button>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={rocket} w="20px" />
                        </Center>
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="40px">
                        <HStack align="flex-end">
                          <Text fontSize="16px">Milestone 1 Started</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          You started Milestones 1 on 31 Mar 2023
                        </Text>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={pen} w="20px" />
                        </Center>
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box>
                        <HStack align="flex-end">
                          <Text fontSize="16px">Proposal Sent</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          Proposal was sent to client on 31 Mar 2023
                        </Text>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px" ml="-5px">
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                        <Center
                          w="40px"
                          h="40px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={paint} w="20px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box>
                        <HStack align="flex-end">
                          <Text fontSize="16px">Proposal Created</Text>
                          <Text fontSize="11px" color="grey.100">
                            Yesterday, 5:27pm
                          </Text>
                        </HStack>
                        <Text fontSize="11px" color="grey.100">
                          Proposal created by you
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </TabPanel>

              <TabPanel>Test</TabPanel>
              <TabPanel>Test</TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </VStack>
    </Body>
  );
};

export default Freelancer;
