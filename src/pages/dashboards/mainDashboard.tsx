import {
  VStack,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Flex,
  Box,
  Image,
  Center,
  Spinner,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useUser } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react';

import truncateAddress from '../../utils/truncateAddress';
import type { IContract } from '../contracts/types';
import snowIcon from '@/assets/svgs/snow.svg';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import DashboardCard from '@/components/common/DashboardCard';
import SideNav from '@/components/navbar/sideNav';
import { useGetAllContractsByAddressQuery } from '@/redux/api/contracts/contractApi';

const Main = () => {
  const [skip, setSkip] = useState(true);
  const { isLoggedIn, user } = useUser();

  const address = user?.address as string;

  const { data: contracts, isLoading: loadingData } =
    useGetAllContractsByAddressQuery({ address, status: 'all' }, { skip });

  const { data: underReviewContracts } = useGetAllContractsByAddressQuery(
    { address, status: 'under-review' },
    { skip }
  );

  const { data: signDeployContracts } = useGetAllContractsByAddressQuery(
    { address, status: 'awaiting-sign-deploy' },
    { skip }
  );
  const { data: deployedContracts } = useGetAllContractsByAddressQuery(
    { address, status: 'deployed' },
    { skip }
  );

  const { data: inProgressContracts } = useGetAllContractsByAddressQuery(
    { address, status: 'progress' },
    { skip }
  );

  useEffect(() => {
    if (isLoggedIn) {
      setSkip(false);
    }
  }, [isLoggedIn]);

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
                fontSize={{ md: 14, base: 16 }}
                fontWeight="medium"
                my={2}
              >
                Layers Tip
              </Text>
              <Text fontSize={{ md: 12, base: 14 }}>
                Review the contract carefully to ensure it meets your needs,
                make changes directly in the fields on the right, and send it
                for review with just a few clicks. By following these pro tips,
                you can quickly approve contracts and ensure that all necessary
                changes have been made.
              </Text>
            </BasicCard>
          </Box>
        </VStack>

        <Tabs w={{ base: '100%', xl: '80%' }}>
          <Box
            w="100%"
            className="overflow"
            overflowY={{ base: 'auto', md: 'initial' }}
          >
            <TabList w={{ base: 'max-content', xl: 'full' }}>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                All
              </Tab>

              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                In Progress
              </Tab>

              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                Awaiting Funding
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                Awaiting Signature/Deployment
              </Tab>
              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                Under Review
              </Tab>

              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                Void
              </Tab>

              <Tab
                fontSize="14px"
                _selected={{
                  color: 'white',
                  borderColor: 'grey.100'
                }}
                minW="max-content"
              >
                Cancelled
              </Tab>
            </TabList>
          </Box>
          {loadingData ? (
            <Center w="full" pb="50px" pt="20px">
              <Spinner />
            </Center>
          ) : (
            <TabPanels w="full">
              <TabPanel px="0" pt="20px">
                <Wrap w="full" spacing="30px">
                  <WrapItem>
                    <DashboardCard contractStatus="isNew" />
                  </WrapItem>

                  {contracts?.map((contract: IContract) => {
                    return (
                      <WrapItem>
                        <DashboardCard
                          key={contract.slug}
                          tag1={contract.category[0] as string}
                          tag2={contract.category[1] as string}
                          contractStatus={contract.status}
                          isAuthor={
                            user?.address === contract.author.walletAddress
                          }
                          author={contract.author}
                          guest={contract.guest}
                          address={truncateAddress(
                            contract.guest.walletAddress
                          )}
                          created={new Date(
                            contract?.createdAt as string
                          ).toDateString()}
                          title={contract.title}
                          slug={contract.slug}
                        />
                      </WrapItem>
                    );
                  })}

                  {/* 

                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="voided"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>

                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="awaiting"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>

                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="voided"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem> */}
                </Wrap>
              </TabPanel>

              <TabPanel px="0" pt="20px">
                <Wrap w="full" spacing="30px">
                  {inProgressContracts?.map((contract: IContract) => {
                    return (
                      <WrapItem>
                        <DashboardCard
                          key={contract.slug}
                          tag1={contract.category[0] as string}
                          tag2={contract.category[1] as string}
                          isAuthor={
                            user?.address === contract.author.walletAddress
                          }
                          author={contract.author}
                          guest={contract.guest}
                          contractStatus={contract.status}
                          address={truncateAddress(
                            contract.guest.walletAddress
                          )}
                          created={new Date(
                            contract?.createdAt as string
                          ).toDateString()}
                          title={contract.title}
                          slug={contract.slug}
                        />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </TabPanel>

              <TabPanel px="0" pt="20px">
                <Wrap spacing="30px" w="full">
                  {deployedContracts?.map((contract: IContract) => {
                    return (
                      <WrapItem>
                        <DashboardCard
                          key={contract.slug}
                          tag1={contract.category[0] as string}
                          tag2={contract.category[1] as string}
                          isAuthor={
                            user?.address === contract.author.walletAddress
                          }
                          author={contract.author}
                          guest={contract.guest}
                          contractStatus={contract.status}
                          address={truncateAddress(
                            contract.guest.walletAddress
                          )}
                          created={new Date(
                            contract?.createdAt as string
                          ).toDateString()}
                          title={contract.title}
                          slug={contract.slug}
                        />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </TabPanel>

              <TabPanel px="0" pt="20px">
                <Wrap spacing="30px" w="full" />
                {signDeployContracts?.map((contract: IContract) => {
                  return (
                    <WrapItem>
                      <DashboardCard
                        key={contract.slug}
                        tag1={contract.category[0] as string}
                        tag2={contract.category[1] as string}
                        isAuthor={
                          user?.address === contract.author.walletAddress
                        }
                        author={contract.author}
                        guest={contract.guest}
                        contractStatus={contract.status}
                        address={truncateAddress(contract.guest.walletAddress)}
                        created={new Date(
                          contract?.createdAt as string
                        ).toDateString()}
                        title={contract.title}
                      />
                    </WrapItem>
                  );
                })}
              </TabPanel>

              <TabPanel px="0" pt="20px" w="full">
                <Wrap w="full" spacing="30px">
                  {underReviewContracts?.map((contract: IContract) => {
                    return (
                      <WrapItem>
                        <DashboardCard
                          key={contract.slug}
                          tag1={contract.category[0] as string}
                          tag2={contract.category[1] as string}
                          contractStatus={contract.status}
                          isAuthor={
                            user?.address === contract.author.walletAddress
                          }
                          author={contract.author}
                          guest={contract.guest}
                          address={truncateAddress(
                            contract.guest.walletAddress
                          )}
                          created={new Date(
                            contract?.createdAt as string
                          ).toDateString()}
                          title={contract.title}
                          slug={contract.slug}
                        />
                      </WrapItem>
                    );
                  })}

                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="awaiting"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>

                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="awaiting"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>
                </Wrap>
              </TabPanel>

              <TabPanel px="0" pt="20px">
                <Wrap spacing="30px" w="full">
                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="voided"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>
                </Wrap>
              </TabPanel>

              <TabPanel px="0" pt="20px">
                <Wrap spacing="30px" w="full">
                  <WrapItem>
                    <DashboardCard
                      tag1="web design"
                      tag2="webflow development"
                      contractStatus="voided"
                      address="Marie Ratke (0x76....87cd)"
                      created="Jan 02 2022"
                      title="NEUE WORLD x Stitchain - UI / UX"
                    />
                  </WrapItem>
                </Wrap>
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Flex>
    </Body>
  );
};

export default Main;
