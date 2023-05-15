import {
  ArrowBackIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  InfoIcon
} from '@chakra-ui/icons';
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
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  // PopoverBody,
  // Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { Web3Button, useUser } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StatusType } from '../contracts/types';
import bag from '@/assets/svgs/bag.svg';
import checkIcon from '@/assets/svgs/check2.svg';
import clockIcon from '@/assets/svgs/clock.svg';
import document from '@/assets/svgs/document.svg';
import MoneyshieldIcon from '@/assets/svgs/moneyshield.svg';
import send from '@/assets/svgs/send.svg';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import StepBox from '@/components/contract/StepBox';
import {
  useGetContractQuery,
  useUpdateContractPaymentStatusMutation
} from '@/redux/api/contracts/contractApi';
import EscrowAbi from '@/utils/EscrowAbi';

const Client = () => {
  const { slug } = useParams();
  const toast = useToast();
  const { user } = useUser();

  const {
    data: contract,
    isFetching,
    refetch
  } = useGetContractQuery(slug as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const [isPaying, setIsPaying] = useState(false);
  const [fee, setFee] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [paidCash, setPaidCash] = useState(0);
  const [releasedCash, setReleasedCash] = useState(0);
  const [pendingCash, setPendingCash] = useState(0);
  const [totalCash, setTotalCash] = useState(0);

  useEffect(() => {
    let f = 0;

    if (contract?.payment.totalFee !== undefined) {
      f = (10 * contract?.payment.totalFee) / 1000;
      f += contract?.payment.totalFee;
    }

    setFee(f);
    let cash = 0;
    let rCash = 0;
    let pCash = 0;
    contract?.payment.history?.forEach(({ status, amount }) => {
      if (status === 'paid') {
        cash += amount;
      }

      if (status === 'released') {
        rCash += amount;
      }

      if (status === 'pending' || status === 'completed') {
        pCash += amount;
      }
    });

    setPaidCash(cash);
    setReleasedCash(rCash);
    setPendingCash(pCash);
    setTotalCash(Number(contract?.totalCost));

    if (
      user?.address === contract?.author.walletAddress &&
      contract?.author.role === 'client'
    ) {
      setIsClient(true);
    }
    if (
      user?.address === contract?.guest.walletAddress &&
      contract?.guest.role === 'client'
    ) {
      setIsClient(true);
    }
  }, [contract, user]);

  const [updatePaymentInfo] = useUpdateContractPaymentStatusMutation();

  return (
    <Body>
      {isFetching ? (
        <Center mt={10}>
          <Spinner />
        </Center>
      ) : (
        <VStack pt="20px" pb="50px" spacing="15px">
          <HStack w="full" spacing="30px">
            <HStack w="20%">
              <ArrowBackIcon w="14px" />
              <Text fontSize="12px">Back to Projects</Text>
            </HStack>

            <HStack w="80%" justify="space-between">
              <Text fontSize="18px" textTransform="uppercase" fontWeight="bold">
                {contract?.title}
              </Text>

              {/* <Box>
                <Popover trigger="click">
                  <PopoverTrigger>
                    <Button
                      rounded={30}
                      px="10px"
                      h="38px"
                      borderColor="white"
                      borderWidth="1px"
                      bg="dark.400"
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
                    bg="dark.400"
                  >
                    <PopoverBody>
                      <VStack alignItems="flex-start">
             

                        <Link _hover={{ color: 'green' }}>Start Dispute</Link>

                        <Link _hover={{ color: 'green' }}>Withdraw</Link>

                        <Link _hover={{ color: 'green' }}>Mark as Draft</Link>

                        <Link _hover={{ color: 'green' }}>Delete</Link>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box> */}
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
                        value={(pendingCash / totalCash) * 100}
                        thickness={4}
                        size="full"
                        trackColor="grey.100"
                      >
                        <CircularProgressLabel fontSize={18}>
                          ${pendingCash}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Text fontSize="11" textTransform="uppercase">
                        Pending
                      </Text>
                    </VStack>

                    <VStack spacing="2px">
                      <CircularProgress
                        color="primary.400"
                        value={(releasedCash / totalCash) * 100}
                        thickness={4}
                        size="full"
                        trackColor="grey.100"
                      >
                        <CircularProgressLabel fontSize={18}>
                          ${releasedCash}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Text fontSize="11" textTransform="uppercase">
                        Released
                      </Text>
                    </VStack>
                  </HStack>
                </BasicCard>
              </VStack>

              {(contract?.status === StatusType.paid ||
                contract?.status === StatusType.released ||
                contract?.status === StatusType.progress) && (
                <VStack align="flex-start" w="full">
                  <Text fontSize="11px" fontWeight="medium" color="primary.100">
                    ESCROW
                  </Text>
                  <BasicCard variant="dark">
                    <Image src={MoneyshieldIcon} display="block" />
                    <Text
                      textTransform="capitalize"
                      fontSize={{ md: 14, base: 16 }}
                      fontWeight="medium"
                      my={2}
                    >
                      Escrow Fully funded
                    </Text>
                    <Text fontSize={{ md: 12, base: 14 }}>
                      This project escrow is fully funded by your client.
                    </Text>
                  </BasicCard>
                </VStack>
              )}

              <VStack align="flex-start" w="full">
                <Text fontSize="12px" fontWeight="medium" color="primary.100">
                  PROJECT OVERVIEW
                </Text>

                <BasicCard variant="dark" w="full">
                  <VStack w="full" align="flex-start" fontSize="14px">
                    <Box>
                      <Text fontWeight="medium" color="primary.100">
                        Project Cost
                      </Text>
                      <Text mt={1} fontSize="13" fontWeight="bold">
                        ${contract ? contract?.payment.totalFee : ''}
                      </Text>
                    </Box>
                    <Box mt={2}>
                      <Text fontWeight="medium" color="primary.100">
                        Paid
                      </Text>
                      <Text mt={1} fontSize="13" fontWeight="bold">
                        ${paidCash} / ${contract?.totalCost}
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
                    status={
                      contract?.status === StatusType.completed ||
                      contract?.status === StatusType.released
                        ? 'active'
                        : 'current'
                    }
                    title="Complete Milestones"
                    description={`Once you're happy with the Work Layers, simply sign it.`}
                  />
                  <StepBox
                    status={
                      contract?.status === StatusType.released
                        ? 'active'
                        : 'inactive'
                    }
                    isLast
                    title="Receive Full Payments"
                    description={`Once you're happy with the contract, simply release payment.`}
                  />
                  {/* <StepBox
                    status="inactive"
                    title="Handover Projects"
                    isLast
                    description={`Once you're happy with the contract, simply sign it.`}
                  /> */}
                </BasicCard>
              </VStack>
            </VStack>

            <Tabs w="80%" defaultIndex={2}>
              <TabList>
                <Tab
                  fontSize="14px"
                  _selected={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                >
                  Project Activities
                </Tab>

                <Tab
                  fontSize="14px"
                  _selected={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                >
                  Scope of work
                </Tab>

                {contract && contract?.payment.type === 'milestone' && (
                  <Tab
                    fontSize="14px"
                    _selected={{
                      color: 'white',
                      borderColor: 'white'
                    }}
                  >
                    Milestones
                  </Tab>
                )}

                <Tab
                  fontSize="14px"
                  _selected={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                >
                  Payments
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel
                  w="full"
                  px="0"
                  pt="40px"
                  display="flex"
                  flexDirection="column"
                  gap="40px"
                >
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

                    <HStack
                      w="full"
                      justify="space-between"
                      align="flex-start"
                      spacing="10px"
                      h="full"
                    >
                      <VStack spacing="0px" h="full">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="primary.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="100px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="40px" w="full">
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
                            <Text color="primary.400" fontSize="12px">
                              Request freelancer to confirm
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

                    <HStack
                      w="full"
                      justify="space-between"
                      spacing="10px"
                      align="flex-start"
                    >
                      <VStack spacing="0px">
                        <Box minH="30px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="100px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="30px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="grey.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box color="grey.100">
                            <Text fontWeight="bold" fontSize="16px">
                              Review completed Milestone 1
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

                            <HStack>
                              <Text color="grey.100" minW="max-content">
                                Client
                              </Text>
                              <Box pt="1px">
                                <Text
                                  px="5px"
                                  borderRadius="15px"
                                  fontSize="9px"
                                  fontWeight="700"
                                  color="#B83D00"
                                  borderWidth="2px"
                                  borderColor="#B83D00"
                                >
                                  YOU
                                </Text>
                              </Box>
                            </HStack>
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
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={bag} w="16px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="25px">
                        <HStack>
                          <Text>Client</Text>
                          <Box pt="1px">
                            <Text
                              px="5px"
                              borderRadius="15px"
                              fontSize="9px"
                              fontWeight="700"
                              color="#B83D00"
                              borderWidth="2px"
                              borderColor="#B83D00"
                            >
                              YOU
                            </Text>
                          </Box>
                          <Text color="grey.100">added payment to</Text>
                          <Text>744nf81j281sxj-wallet837address</Text>
                          <Text color="grey.100">3 days ago</Text>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={send} w="16px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="25px">
                        <HStack>
                          <Text>Proposal was accepted by Client </Text>
                          <Box pt="1px">
                            <Text
                              px="5px"
                              borderRadius="15px"
                              fontSize="9px"
                              fontWeight="700"
                              color="#B83D00"
                              borderWidth="2px"
                              borderColor="#B83D00"
                            >
                              YOU
                            </Text>
                          </Box>
                          <Text color="grey.100">3 days ago</Text>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack
                      w="full"
                      justify="space-between"
                      align="flex-start"
                      spacing="10px"
                    >
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        {/* <Box minH="80px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="20px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="grey.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box color="grey.100">
                            <Text fontWeight="bold" fontSize="16px">
                              Review completed Milestone 1
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

                            <HStack>
                              <Text color="grey.100" minW="max-content">
                                Client
                              </Text>
                              <Box pt="1px">
                                <Text
                                  px="5px"
                                  borderRadius="15px"
                                  fontSize="9px"
                                  fontWeight="700"
                                  color="#B83D00"
                                  borderWidth="2px"
                                  borderColor="#B83D00"
                                >
                                  YOU
                                </Text>
                              </Box>
                            </HStack>
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

                    <HStack
                      w="full"
                      justify="space-between"
                      align="flex-start"
                      spacing="10px"
                      h="full"
                    >
                      <VStack spacing="0px" h="full">
                        <Box minH="40px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="primary.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="100px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="40px" w="full">
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
                            <Text color="primary.400" fontSize="12px">
                              Request freelancer to confirm
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

                    <HStack
                      w="full"
                      justify="space-between"
                      spacing="10px"
                      align="flex-start"
                    >
                      <VStack spacing="0px">
                        <Box minH="30px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        <Box minH="100px" w="1px" bgColor="grey.400" />
                      </VStack>

                      <Box pt="30px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="grey.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box color="grey.100">
                            <Text fontWeight="bold" fontSize="16px">
                              Review completed Milestone 1
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

                            <HStack>
                              <Text color="grey.100" minW="max-content">
                                Client
                              </Text>
                              <Box pt="1px">
                                <Text
                                  px="5px"
                                  borderRadius="15px"
                                  fontSize="9px"
                                  fontWeight="700"
                                  color="#B83D00"
                                  borderWidth="2px"
                                  borderColor="#B83D00"
                                >
                                  YOU
                                </Text>
                              </Box>
                            </HStack>
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
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={bag} w="16px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="25px">
                        <HStack>
                          <Text>Client</Text>
                          <Box pt="1px">
                            <Text
                              px="5px"
                              borderRadius="15px"
                              fontSize="9px"
                              fontWeight="700"
                              color="#B83D00"
                              borderWidth="2px"
                              borderColor="#B83D00"
                            >
                              YOU
                            </Text>
                          </Box>
                          <Text color="grey.100">added payment to</Text>
                          <Text>744nf81j281sxj-wallet837address</Text>
                          <Text color="grey.100">3 days ago</Text>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack w="full" spacing="10px" align="flex-start">
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={send} w="16px" />
                        </Center>
                        {/* <Box minH="40px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="25px">
                        <HStack>
                          <Text>Proposal was accepted by Client </Text>
                          <Box pt="1px">
                            <Text
                              px="5px"
                              borderRadius="15px"
                              fontSize="9px"
                              fontWeight="700"
                              color="#B83D00"
                              borderWidth="2px"
                              borderColor="#B83D00"
                            >
                              YOU
                            </Text>
                          </Box>
                          <Text color="grey.100">3 days ago</Text>
                        </HStack>
                      </Box>
                    </HStack>

                    <HStack
                      w="full"
                      justify="space-between"
                      align="flex-start"
                      spacing="10px"
                    >
                      <VStack spacing="0px">
                        <Box minH="20px" w="1px" bgColor="grey.400" />
                        <Center
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          bg="grey.400"
                        >
                          <Image src={document} w="14px" />
                        </Center>
                        {/* <Box minH="80px" w="1px" bgColor="grey.400" /> */}
                      </VStack>

                      <Box pt="20px" w="full">
                        <HStack
                          justify="space-between"
                          bg="grey.400"
                          w="full"
                          borderRadius="10px"
                          borderLeftWidth="5px"
                          borderColor="grey.400"
                          py={{ base: '10px', '2xl': '30px' }}
                          px="20px"
                          spacing="40px"
                        >
                          <Box color="grey.100">
                            <Text fontWeight="bold" fontSize="16px">
                              Review completed Milestone 1
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

                            <HStack>
                              <Text color="grey.100" minW="max-content">
                                Client
                              </Text>
                              <Box pt="1px">
                                <Text
                                  px="5px"
                                  borderRadius="15px"
                                  fontSize="9px"
                                  fontWeight="700"
                                  color="#B83D00"
                                  borderWidth="2px"
                                  borderColor="#B83D00"
                                >
                                  YOU
                                </Text>
                              </Box>
                            </HStack>
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
                  </VStack>
                </TabPanel>

                <TabPanel px="0" w="full">
                  <BasicCard variant="dark" p={0} pb="10px">
                    <Box
                      bg="#333333"
                      w="full"
                      borderTopRadius="10px"
                      py="10px"
                      px="20px"
                    >
                      <Text>Terms of Work</Text>
                    </Box>

                    <VStack alignItems="flex-start" p={4} w="100%">
                      <Text
                        fontWeight="bold"
                        textAlign="left"
                        color="primary.100"
                      >
                        Scope of Work
                      </Text>
                      {contract?.works &&
                        contract?.works.map((work) => {
                          return (
                            <Box
                              alignItems="flex-start"
                              w="100%"
                              alignSelf="flex-start"
                            >
                              <HStack w="full" spacing="20px">
                                <Box>
                                  <Text fontWeight="bold">{work.heading}</Text>
                                  <Text fontSize="14px">
                                    {
                                      work.content[work.content.length - 1]
                                        .description
                                    }
                                  </Text>
                                </Box>
                              </HStack>
                            </Box>
                          );
                        })}

                      <Box color="primary.100">
                        <Text fontWeight="bold">Intellectual Property</Text>
                        <Text fontSize="14px" color="white">
                          {contract &&
                            contract?.intellectualProperty[
                              contract?.intellectualProperty.length - 1
                            ].text}
                        </Text>
                      </Box>

                      <Box color="primary.100">
                        <Text fontWeight="bold">Confidentiality</Text>
                        <Text fontSize="14px" color="white">
                          {contract &&
                            contract?.confidentiality[
                              contract?.confidentiality.length - 1
                            ].text}
                        </Text>
                      </Box>

                      <Box color="primary.100">
                        <Text fontWeight="bold">Termination</Text>
                        <Text fontSize="14px" color="white">
                          {contract &&
                            contract?.termination[
                              contract?.termination.length - 1
                            ].text}
                        </Text>
                      </Box>

                      <Box color="primary.100">
                        <Text fontWeight="bold">Limitation of liability</Text>
                        <Text fontSize="14px" color="white">
                          {contract &&
                            contract?.liability[contract?.liability.length - 1]
                              .text}
                        </Text>
                      </Box>

                      <Box color="primary.100">
                        <Text fontWeight="bold">Dispute Resolution</Text>
                        <Text fontSize="14px" color="white">
                          {contract &&
                            contract?.dispute[contract?.dispute.length - 1]
                              .text}
                        </Text>
                      </Box>

                      {/* <Tr color="primary.100">
                              <Td>
                                <Box>
                                  <Text fontWeight="bold">
                                    Phase 2: Educational Website
                                  </Text>
                                  <Box>
                                    <Text fontSize="14px">
                                      Release V1 of the new website with better
                                      design; benchmarking Aura and Authena. The
                                      build will be handled using WebFlow to
                                      build an autonomous team in the future who
                                      will handle the website (primarily to
                                      avoid developer intervention). Integration
                                      of Analytics and SEO structure will be
                                      included.
                                    </Text>
                                    <Text fontSize="12px" color="primary.400">
                                      Request for Review
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
                                    Analytics and SEO structure will be
                                    included.
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
                            </Tr> */}
                    </VStack>
                  </BasicCard>
                </TabPanel>

                {contract && contract?.payment.type === 'milestone' && (
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
                                <Th
                                  fontSize="12px"
                                  minW="140px"
                                  textAlign="center"
                                >
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
                              {contract &&
                                contract?.payment?.milestone &&
                                contract?.payment.milestone.map((m) => {
                                  return (
                                    <Tr color="grey.100">
                                      <Td>
                                        <HStack w="full" spacing="20px">
                                          <Box>
                                            <Text fontWeight="bold">
                                              {m.title}
                                            </Text>
                                            <Text fontSize="14px">
                                              {m.description}
                                            </Text>
                                          </Box>
                                        </HStack>
                                      </Td>
                                      <Td>
                                        <Box>
                                          <Text textDecor="line-through">
                                            {new Date(m.dueDate).toDateString()}
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
                                            <Text
                                              fontSize="14px"
                                              color="primary.100"
                                            >
                                              Approved
                                            </Text>
                                            <Image src={checkIcon} w="14px" />
                                          </HStack>
                                        </Button>
                                      </Td>
                                    </Tr>
                                  );
                                })}

                              <Tr color="primary.100">
                                <Td>
                                  <Box>
                                    <Text fontWeight="bold">
                                      Phase 1: Dashboard
                                    </Text>
                                    <Text fontSize="14px">
                                      Redesign for better look and feel as an
                                      improved MVP with utility driven UI and
                                      UX. Design will be based on hypothesis &
                                      highly focussed on refining the existing
                                      designs.
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
                                        Review Now
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
                                        Release V1 of the new website with
                                        better design; benchmarking Aura and
                                        Authena. The build will be handled using
                                        WebFlow to build an autonomous team in
                                        the future who will handle the website
                                        (primarily to avoid developer
                                        intervention). Integration of Analytics
                                        and SEO structure will be included.
                                      </Text>
                                      <Text fontSize="12px" color="primary.400">
                                        Request for Review
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
                                      build will be handled using WebFlow to
                                      build an autonomous team in the future who
                                      will handle the website (primarily to
                                      avoid developer intervention). Integration
                                      of Analytics and SEO structure will be
                                      included.
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
                )}

                <TabPanel px="0px">
                  <HStack
                    w="full"
                    color="primary.100"
                    fontSize="12px"
                    fontWeight="medium"
                    pl="20px"
                    pb="10px"
                  >
                    <Box w="33%">PAYMENT FOR</Box>
                    <Box w="33%">STATUS & DATE</Box>
                    <Box w="34%">PRICE</Box>
                  </HStack>

                  <VStack
                    w="full"
                    borderWidth="1px"
                    borderColor="white"
                    fontSize="14px"
                    spacing="0px"
                  >
                    {contract?.payment.history &&
                      contract.payment.history.length > 0 &&
                      contract.payment.history.map(
                        ({
                          description,
                          status,
                          deployedOn,
                          paidOn,
                          releasedOn,
                          withdrawnOn,
                          completedOn,
                          amount,
                          _id
                        }) => {
                          return (
                            <HStack
                              w="full"
                              borderBottomWidth="1px"
                              borderColor="white"
                            >
                              <HStack
                                w="33%"
                                borderRightWidth="1px"
                                borderColor="white"
                              >
                                <Box py="30px" px="10px">
                                  {description}
                                </Box>
                              </HStack>
                              <HStack
                                w="33%"
                                borderRightWidth="1px"
                                borderColor="white"
                              >
                                <HStack px="10px" py="30px">
                                  <Text>
                                    {new Date(
                                      status === 'unpaid'
                                        ? deployedOn
                                        : status === 'paid'
                                        ? paidOn
                                        : status === 'released'
                                        ? releasedOn
                                        : status === 'completed'
                                        ? completedOn
                                        : withdrawnOn
                                    ).toDateString()}
                                  </Text>
                                  {status === 'paid' ? (
                                    <HStack color="green.400">
                                      <CheckIcon w="12px" />
                                      <Text fontSize="12px">Escrow funded</Text>
                                    </HStack>
                                  ) : status === 'unpaid' ? (
                                    <HStack color="primary.400">
                                      <CloseIcon w="12px" />
                                      <Text fontSize="12px">Not funded</Text>
                                    </HStack>
                                  ) : status === 'completed' ? (
                                    <VStack>
                                      <HStack color="green.400">
                                        <CheckIcon w="12px" />
                                        <Text fontSize="12px">
                                          Task Completed
                                        </Text>
                                      </HStack>
                                      <HStack>
                                        <InfoIcon color="blue.200" w="12px" />
                                        <Text fontSize="12px" color="blue.200">
                                          Awaiting funds release
                                        </Text>
                                      </HStack>
                                    </VStack>
                                  ) : status === 'released' ? (
                                    <HStack color="green.400">
                                      <CheckIcon />
                                      <Text fontSize="12px">
                                        Funds released
                                      </Text>
                                    </HStack>
                                  ) : (
                                    <HStack color="blue.200">
                                      <InfoIcon w="12px" />
                                      <Text fontSize="12px">
                                        Work in Progress
                                      </Text>
                                    </HStack>
                                  )}
                                </HStack>
                              </HStack>
                              <HStack w="34%" justify="space-between">
                                <Box px="10px" py="30px">
                                  ${amount}
                                </Box>
                                <Box px="20px">
                                  {!isClient && status === 'progress' && (
                                    <Button
                                      rounded={30}
                                      h="35px"
                                      isLoading={isPaying}
                                      onClick={async () => {
                                        setIsPaying(true);

                                        updatePaymentInfo({
                                          contractId:
                                            contract.contractId as string,
                                          slug: contract.slug as string,
                                          data: {
                                            paymentStatus: 'completed',
                                            paymentId: _id as string
                                          }
                                        })
                                          .then(() => {
                                            // refetch();
                                            setIsPaying(false);
                                            toast({
                                              title:
                                                'Project completed successfully',
                                              description: 'Work done',
                                              status: 'success',
                                              isClosable: true,
                                              position: 'top'
                                            });
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setIsPaying(false);

                                            toast({
                                              title: 'Error starting project',
                                              description: err.message,
                                              status: 'error',
                                              isClosable: true,
                                              position: 'top'
                                            });
                                          });
                                      }}
                                    >
                                      <Text fontSize="14px" color="primary.100">
                                        Complete project
                                      </Text>
                                    </Button>
                                  )}
                                  {!isClient && status === 'paid' && (
                                    <Button
                                      rounded={30}
                                      h="35px"
                                      isLoading={isPaying}
                                      onClick={async () => {
                                        setIsPaying(true);

                                        updatePaymentInfo({
                                          contractId:
                                            contract.contractId as string,
                                          slug: contract.slug as string,
                                          data: {
                                            paymentStatus: 'progress',
                                            paymentId: _id as string
                                          }
                                        })
                                          .unwrap()
                                          .then(() => {
                                            // refetch();
                                            setIsPaying(false);
                                            toast({
                                              title:
                                                'Project started successfully',
                                              description: 'Work in progress',
                                              status: 'success',
                                              isClosable: true,
                                              position: 'top'
                                            });
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setIsPaying(false);

                                            toast({
                                              title: 'Error starting project',
                                              description: err.message,
                                              status: 'error',
                                              isClosable: true,
                                              position: 'top'
                                            });
                                          });
                                      }}
                                    >
                                      <Text fontSize="14px" color="primary.100">
                                        Start project
                                      </Text>
                                    </Button>
                                  )}

                                  {isClient && status === 'unpaid' && (
                                    <Button
                                      rounded={30}
                                      h="35px"
                                      isLoading={isPaying}
                                    >
                                      <Web3Button
                                        type="button"
                                        contractAbi={EscrowAbi}
                                        className="web3Btn"
                                        contractAddress={
                                          contract?.contractAddress
                                            ? contract?.contractAddress
                                            : ''
                                        }
                                        action={async (smartContract) => {
                                          setIsPaying(true);
                                          console.log(
                                            contract.payment.totalFee,
                                            fee
                                          );

                                          await smartContract
                                            .call(
                                              'payment',
                                              [
                                                ethers.utils.parseEther(
                                                  String(
                                                    contract?.payment.totalFee
                                                  )
                                                )
                                              ],
                                              {
                                                value: ethers.utils.parseEther(
                                                  String(fee)
                                                )
                                              }
                                            )
                                            .then(() => {
                                              // .then((tx) => {

                                              return updatePaymentInfo({
                                                contractId:
                                                  contract.contractId as string,
                                                slug: contract.slug as string,
                                                data: {
                                                  paymentStatus: 'paid',
                                                  paymentId: _id as string
                                                }
                                              })
                                                .unwrap()
                                                .then(() => {
                                                  setIsPaying(false);
                                                  refetch();
                                                  toast({
                                                    title:
                                                      'Escrow funded successfully',
                                                    description:
                                                      'Your payment is secured in escrow',
                                                    status: 'success',
                                                    isClosable: true,
                                                    position: 'top'
                                                  });
                                                });
                                            })
                                            .catch((err) => {
                                              console.log(err);
                                              setIsPaying(false);

                                              toast({
                                                title:
                                                  'Error interacting with contract',
                                                description:
                                                  err.reason || err.message,
                                                status: 'error',
                                                isClosable: true,
                                                position: 'top'
                                              });
                                            });
                                        }}
                                      >
                                        <Text
                                          fontSize="14px"
                                          color="primary.100"
                                        >
                                          Fund Escrow
                                        </Text>
                                      </Web3Button>
                                    </Button>
                                  )}
                                  {isClient && status === 'completed' && (
                                    <Button
                                      rounded={30}
                                      h="35px"
                                      isLoading={isPaying}
                                    >
                                      <Web3Button
                                        type="button"
                                        contractAbi={EscrowAbi}
                                        className="web3Btn"
                                        contractAddress={
                                          contract?.contractAddress
                                            ? contract?.contractAddress
                                            : ''
                                        }
                                        action={async (smartContract) => {
                                          setIsPaying(true);
                                          await smartContract
                                            .call('releasePayment', [
                                              ethers.utils.parseEther(
                                                String(
                                                  contract?.payment.totalFee
                                                )
                                              )
                                            ])
                                            .then(() => {
                                              return updatePaymentInfo({
                                                contractId:
                                                  contract.contractId as string,
                                                slug: contract.slug as string,
                                                data: {
                                                  paymentStatus: 'released',
                                                  paymentId: _id as string
                                                }
                                              })
                                                .then(() => {
                                                  setIsPaying(false);
                                                  toast({
                                                    title:
                                                      'Payment released successfully',
                                                    description: '',
                                                    status: 'success',
                                                    isClosable: true,
                                                    position: 'top'
                                                  });
                                                })
                                                .catch((err) => {
                                                  console.log(err);
                                                  setIsPaying(false);

                                                  toast({
                                                    title:
                                                      'Error interacting with contract',
                                                    description: err.reason,
                                                    status: 'error',
                                                    isClosable: true,
                                                    position: 'top'
                                                  });
                                                });
                                            });
                                        }}
                                        onError={(error) => {
                                          console.log(error);
                                        }}
                                      >
                                        <Text
                                          fontSize="14px"
                                          color="primary.100"
                                        >
                                          Release Payment
                                        </Text>
                                      </Web3Button>
                                    </Button>
                                  )}
                                </Box>
                              </HStack>
                            </HStack>
                          );
                        }
                      )}

                    {/* <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="blue.100">
                            <Image src={pendIcon} w="12px" />
                            <Text fontSize="12px">AWATING CONFIRMATION</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                          $200
                        </Box>

                        <Box px="20px">
                          <Button
                            rounded={30}
                            px="20px"
                            h="35px"
                            borderColor="primary.400"
                            borderWidth="1px"
                            bg="black"
                          >
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px" color="primary.400">
                                Review Now
                              </Text>
                              <Image src={clockIcon} w="16px" />
                            </HStack>
                          </Button>
                        </Box>
                      </HStack>
                    </HStack>

                    <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="blue.100">
                            <Image src={pendIcon} w="12px" />
                            <Text fontSize="12px">AWATING CONFIRMATION</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                          $200
                        </Box>

                        <Box px="20px">
                          <Button
                            rounded={30}
                            px="20px"
                            h="35px"
                            borderColor="primary.400"
                            borderWidth="1px"
                            bg="black"
                          >
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px" color="primary.400">
                                Review Now
                              </Text>
                              <Image src={clockIcon} w="16px" />
                            </HStack>
                          </Button>
                        </Box>
                      </HStack>
                    </HStack>

                    <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="primary.600">
                            <Image src={clockIconTwo} w="12px" />
                            <Text fontSize="12px">Pending</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                          $200
                        </Box>

                        <Box px="20px">
                          <Button
                            rounded={30}
                            px="20px"
                            h="35px"
                            bg="primary.400"
                          >
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px">Pay Now</Text>
                              <ChevronDownIcon w="16px" />
                            </HStack>
                          </Button>
                        </Box>
                      </HStack>
                    </HStack>

                    <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="primary.400">
                            <Image src={checkIcon} w="12px" />
                            <Text fontSize="12px">Paid</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                          $200
                        </Box>

                        <Box px="20px">
                          <Button rounded={30} px="20px" h="35px">
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px" color="primary.100">
                                Approved
                              </Text>
                              <Image src={checkIcon} w="14px" />
                            </HStack>
                          </Button>
                        </Box>
                      </HStack>
                    </HStack>

                    <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="primary.400">
                            <Image src={checkIcon} w="12px" />
                            <Text fontSize="12px">Paid</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                          $200
                        </Box>

                        <Box px="20px">
                          <Button rounded={30} px="20px" h="35px">
                            <HStack w="full" spacing="10px">
                              <Text fontSize="14px" color="primary.100">
                                Approved
                              </Text>
                              <Image src={checkIcon} w="14px" />
                            </HStack>
                          </Button>
                        </Box>
                      </HStack>
                    </HStack> */}

                    {/* <HStack
                      w="full"
                      borderBottomWidth="1px"
                      borderColor="white"
                    >
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <Box py="30px" px="10px">
                          Phase 0: Discovery and Research
                        </Box>
                      </HStack>
                      <HStack
                        w="33%"
                        borderRightWidth="1px"
                        borderColor="white"
                      >
                        <HStack px="10px" py="30px">
                          <Text>05 Apr 2023</Text>
                          <HStack color="primary.400">
                          <Image src={checkIcon} w="12px" />
                          <Text fontSize="12px">Paid</Text>
                        </HStack>
                        </HStack>
                      </HStack>
                      <HStack w="34%" justify="space-between">
                        <Box px="10px" py="30px">
                        $200
                      </Box>

                      <Box px="20px">
                        <Button rounded={30} px="20px" h="35px">
                          <HStack w="full" spacing="10px">
                            <Text fontSize="14px" color="primary.100">
                              Approved
                            </Text>
                            <Image src={checkIcon} w="14px" />
                          </HStack>
                        </Button>
                      </Box>
                      </HStack>
                    </HStack> */}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </HStack>
        </VStack>
      )}
    </Body>
  );
};

export default Client;
