import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  VStack,
  Box
} from '@chakra-ui/react';
import type { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect } from 'react';

import AccordionCard from '../cards/AccordionCard';
import type { IPayment } from '@/pages/contracts/types';

import PaymentCard from './PaymentCard';

const Payments = ({
  values,
  selectedType,
  isEditable,
  position,
  isTouched,
  error,
  setFieldValue
}: {
  values: IPayment;
  selectedType: string | undefined;
  isEditable: boolean;
  position?: number;
  isTouched?: FormikTouched<IPayment>;
  error?: FormikErrors<IPayment>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
}) => {
  // TOCO USe callback
  useEffect(() => {
    let cost = 0;
    if (values.type === 'milestone' && setFieldValue) {
      values.milestone?.forEach((value) => {
        cost += value.cost;
      });

      setFieldValue('payment.totalFee', String(cost));
    }
    // return undefined;
    // eslint-disable-next-line
  }, [values.milestone, values.type]);

  return (
    <AccordionCard
      borderWidth={error !== undefined && isTouched !== undefined ? 2 : 0}
      error={isTouched && error ? Object.values(error)[0] : null}
      showElementIfClosed={
        <Box w="full">
          {values.totalFee !== 0 && (
            <>
              <VStack align="flex-start" w="full" display="initial">
                <VStack
                  w="full"
                  borderTopWidth="1px"
                  borderColor="#D6D6D6"
                  fontSize={{ md: '14px', base: 12 }}
                  py="10px"
                  align="flex-start"
                >
                  <Text textTransform="capitalize">
                    Payment Type:{' '}
                    <Text fontWeight="bold" as="span">
                      {values.type}
                    </Text>
                  </Text>
                  {/* {values.upfront && (
                    <Text textTransform="capitalize">
                      Upfront:{' '}
                      <Text fontWeight="bold" as="span">
                        ${values.upfront}
                      </Text>
                    </Text>
                  )} */}
                  <Text textTransform="capitalize">
                    Total Fee:{' '}
                    <Text fontWeight="bold" as="span">
                      ${values.totalFee}
                    </Text>
                  </Text>
                  {values.type !== 'milestone' && (
                    <>
                      {' '}
                      <Text textTransform="capitalize">
                        Start Date:{' '}
                        <Text fontWeight="bold" as="span">
                          {new Date(values.startDate as string).toDateString()}
                        </Text>
                      </Text>
                      <Text textTransform="capitalize">
                        End Date:{' '}
                        <Text fontWeight="bold" as="span">
                          {new Date(values.endDate as string).toDateString()}
                        </Text>
                      </Text>
                    </>
                  )}
                  {/* <Text>
                    {works[0].content[works[0].content.length - 1].description}
                  </Text> */}
                </VStack>
                {/* {works.length > 1 && (
                  <VStack
                    w="full"
                    borderTopWidth="1px"
                    borderColor="#D6D6D6"
                    fontSize={{ md: '14px', base: 12 }}
                    py="10px"
                    align="flex-start"
                  >
                    <Text fontWeight="bold">{works[1].heading}</Text>
                    <Text>
                      {
                        works[1].content[works[1].content.length - 1]
                          .description
                      }
                    </Text>
                  </VStack>
                )} */}
              </VStack>

              {/* {works.length > 2 && (
                <Box
                  onClick={() => setMore(['none', 'initial'])}
                  display={more[0]}
                >
                  <ChevronDownIcon />
                </Box>
              )} */}

              {/* {works.length > 2 && (
                <VStack align="flex-start" w="full" display={more[1]}>
                  {works.length > 0 &&
                    works.map((unit: any, index: number) => {
                      return (
                        <VStack
                          w="full"
                          borderTopWidth="1px"
                          borderColor="#D6D6D6"
                          fontSize={{ md: '14px', base: 12 }}
                          py="10px"
                          align="flex-start"
                        >
                          <Text fontWeight="bold">{unit.heading}</Text>
                          <Text>{unit.description}</Text>
                        </VStack>
                      );
                    })}
                </VStack>
              )} */}
            </>
          )}
        </Box>
      }
      position={position}
      description="How would you like to pay or get paid?"
      title="Payment"
    >
      {isEditable ? (
        <Tabs
          pt="10px"
          w="full"
          onChange={(index) => {
            const PaymentType = 'payment.type';
            switch (index) {
              case 0:
                setFieldValue(PaymentType, 'flat');
                break;
              case 1:
                setFieldValue(PaymentType, 'milestone');
                break;
              case 2:
                setFieldValue(PaymentType, 'monthly');
                break;
              case 3:
                setFieldValue(PaymentType, 'weekly');
                break;

              default:
                break;
            }
          }}
        >
          <TabList borderColor="#D6D6D6">
            <Tab
              _selected={{
                color: 'black',
                borderColor: 'black'
              }}
              fontWeight="medium"
              fontSize="14px"
              pl="0"
              pr={{ base: '15px', xl: '25px' }}
            >
              Flat Fee
            </Tab>
            {/* 
            <Tab
              _selected={{
                color: 'black',
                borderColor: 'black'
              }}
              fontWeight="medium"
              fontSize="14px"
              pl="0"
              pr={{ base: '15px', xl: '25px' }}
              pb="6px"
            >
              Hourly Rate
            </Tab> */}

            <Tab
              _selected={{
                color: 'black',
                borderColor: 'black'
              }}
              fontWeight="medium"
              fontSize="14px"
              pl="0"
              pr={{ base: '15px', xl: '25px' }}
              // pb="6px"
            >
              Milestones
            </Tab>

            <Tab
              _selected={{
                color: 'black',
                borderColor: 'black'
              }}
              fontWeight="medium"
              fontSize="14px"
              pl="0"
              pr={{ base: '15px', xl: '25px' }}
              // pb="6px"
            >
              Monthly
            </Tab>

            <Tab
              _selected={{
                color: 'black',
                borderColor: 'black'
              }}
              fontWeight="medium"
              fontSize="14px"
              pl="0"
              // pr="25px"
              // pb="6px"
            >
              Weekly
            </Tab>
          </TabList>

          <TabPanels w="full">
            <TabPanel
              w="full"
              px="0"
              borderBottomWidth="2px"
              borderColor="#D6D6D6"
              pb="20px"
            >
              <VStack align="flex-start" w="full">
                <Text fontWeight="bold" fontSize="16px">
                  Flat Fee
                </Text>
                <Text lineHeight="18px">
                  Sometimes known as flat-fee, project-based pricing is one of
                  the best ways to price freelance work. You set a specific
                  price for a fixed scope of work, and the client pays you. It
                  &apos;s that simple.
                </Text>

                <PaymentCard
                  payment={values}
                  tabtype="flat"
                  isEditable={isEditable}
                  isTouched={isTouched as FormikTouched<IPayment>}
                  error={error as FormikErrors<IPayment>}
                />
              </VStack>
            </TabPanel>

            {/* Hourly */}
            {/* <TabPanel
              w="full"
              px="0"
              borderBottomWidth="2px"
              borderColor="#D6D6D6"
              pb="20px"
            >
              <VStack align="flex-start" w="full">
                <Text fontWeight="bold" fontSize="16px">
                  Hourly Payments
                </Text>
                <Text lineHeight="18px">
                  An hourly wage is the amount an employee is paid per hour they
                  work. A role that's paid hourly doesn't come with a set or
                  target annual pay. Instead, an employer pays an employee based
                  on how many hours they work each pay period, which might be a
                  week, two weeks, half a month or a month.
                </Text>
                <PaymentCard
                isEditable={isEditable} payment={values} tabtype={'hourly'} />
              </VStack>
            </TabPanel> */}

            <TabPanel w="full" px="0">
              <PaymentCard
                isEditable={isEditable}
                payment={values}
                tabtype="milestone"
                isTouched={isTouched as FormikTouched<IPayment>}
                error={error as FormikErrors<IPayment>}
              />
            </TabPanel>

            <TabPanel
              w="full"
              px="0"
              borderBottomWidth="2px"
              borderColor="#D6D6D6"
              pb="20px"
            >
              <VStack align="flex-start" w="full">
                <Text fontWeight="bold" fontSize="16px">
                  Monthly Recurring
                </Text>
                <Text lineHeight="18px">
                  Set a specific cost, start date and end date for this type of
                  payment.
                </Text>

                <PaymentCard
                  isEditable={isEditable}
                  payment={values}
                  tabtype="monthly"
                  isTouched={isTouched as FormikTouched<IPayment>}
                  error={error as FormikErrors<IPayment>}
                />
              </VStack>
            </TabPanel>

            <TabPanel
              w="full"
              px="0"
              borderBottomWidth="2px"
              borderColor="#D6D6D6"
              pb="20px"
            >
              <VStack align="flex-start" w="full">
                <Text fontWeight="bold" fontSize="16px">
                  Weekly Recurring
                </Text>
                <Text lineHeight="18px">
                  Set a specific cost, start date and end date for this type of
                  payment.
                </Text>

                <PaymentCard
                  isEditable={isEditable}
                  payment={values}
                  tabtype="weekly"
                  isTouched={isTouched as FormikTouched<IPayment>}
                  error={error as FormikErrors<IPayment>}
                />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <VStack
          w="full"
          px="0"
          mt="20px"
          borderBottomWidth="2px"
          borderTopWidth="2px"
          borderColor="#D6D6D6"
          py="15px"
          align="flex-start"
        >
          <Text fontWeight="bold" casing="capitalize" fontSize="16px">
            {selectedType} {selectedType !== 'milestone' && 'fee'}
          </Text>

          <PaymentCard
            isEditable={isEditable}
            payment={values}
            tabtype={values.type === 'milestone' ? 'milestone' : 'flat'}
            isTouched={isTouched as FormikTouched<IPayment>}
            error={error as FormikErrors<IPayment>}
          />
        </VStack>
      )}
    </AccordionCard>
  );
};

export default Payments;
