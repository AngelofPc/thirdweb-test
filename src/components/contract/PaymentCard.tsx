import { AddIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, Image, Input, VStack } from '@chakra-ui/react';
import type { FormikErrors, FormikTouched } from 'formik';
import { Field, FieldArray } from 'formik';

import calendar2 from '@/assets/svgs/calendar2.svg';
import calendar1 from '@/assets/svgs/calender1.svg';
import fee from '@/assets/svgs/fee.svg';
import maxHours from '@/assets/svgs/maxhours.svg';
import submitHours from '@/assets/svgs/submithours.svg';
import time from '@/assets/svgs/time.svg';
// import upfront from '@/assets/svgs/upfront.svg';
import type { IPayment } from '@/pages/contracts/types';

const PaymentCard = ({
  tabtype,
  payment,
  isEditable,
  isTouched,
  error
}: {
  tabtype: string;
  payment: IPayment;
  isEditable: boolean;
  isTouched: FormikTouched<IPayment>;
  error: FormikErrors<IPayment>;
}) => {
  return (
    <>
      {tabtype === 'flat' && (
        <>
          <HStack spacing="10px" w="full" pt="10px">
            <Image src={fee} w="16px" />
            <Text fontWeight="medium" minW="max-content">
              Total fee:
            </Text>
            <Field
              isDisabled={!isEditable}
              as={Input}
              id="payment.totalFee"
              name="payment.totalFee"
              fontSize="14px"
              type="number"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Enter Amount"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />
          </HStack>
          {/* //TODO:Feature : Upfront */}
          {/* <VStack align="flex-start">
            <HStack spacing="10px" w="full" pt="10px">
              <Image src={upfront} w="16px" />
              <Text fontWeight="medium" minW="max-content" w="140px">
                Upfront Payment:
              </Text>
              <Field
                validate={(value: number) => {
                  let err;
                  const twentyPercentFee = 0.2 * Number(payment.totalFee);
                  const fivePercentFee = 0.05 * Number(payment.totalFee);
                  if (
                    Number(payment.totalFee) > 1 &&
                    value > twentyPercentFee
                  ) {
                    err = 'Upfront cannot be more than 20%';
                    return err;
                  }
                  if (value > 0 && value < fivePercentFee) {
                    err = 'Upfront cannot be less than 5%';
                    return err;
                  }
                  return err;
                }}
                isDisabled={!isEditable}
                as={Input}
                id="payment.upfront"
                name="payment.upfront"
                fontSize="14px"
                type="number"
                fontWeight="medium"
                variant="unstyled"
                placeholder="Enter Amount"
                _placeholder={{ color: 'grey', fontWeight: 'normal' }}
              />
            </HStack>
            {error && isTouched?.upfront ? (
              <Text color="primary.400" mt={2}>
                {error.upfront}
              </Text>
            ) : null}
          </VStack> */}
        </>
      )}

      {tabtype === 'hourly' && (
        <>
          <HStack spacing="10px" w="full" pt="10px">
            <Image src={fee} w="16px" />
            <Text fontWeight="medium" minW="max-content" w="95px">
              Hourly Rate:
            </Text>
            <Field
              isDisabled={!isEditable}
              as={Input}
              id="payment.hourlyRate"
              name="payment.hourlyRate"
              fontSize="14px"
              type="number"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Enter Amount"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />
          </HStack>

          <HStack spacing="10px" w="full" pt="10px">
            <Image src={maxHours} w="16px" />
            <Text fontWeight="medium" minW="max-content" w="85px">
              Max Hours:
            </Text>
            <Field
              isDisabled={!isEditable}
              as={Input}
              id="payment.maxHours"
              name="payment.maxHours"
              fontSize="14px"
              type="number"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Enter Maximum Hours"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />
          </HStack>

          <HStack spacing="10px" w="full" pt="10px">
            <Image src={submitHours} w="16px" />
            <Text fontWeight="medium" minW="max-content" w="110px">
              Submit Hours:
            </Text>
            <Field
              isDisabled={!isEditable}
              as={Input}
              id="payment.submitHours"
              name="payment.submitHours"
              fontSize="14px"
              type="number"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Select Type"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />
          </HStack>
        </>
      )}

      {(tabtype === 'hourly' || tabtype === 'flat') && (
        <>
          <VStack>
            <HStack spacing="10px" w="full" pt="10px" className="calender">
              <Image src={calendar1} w="16px" />
              <Text fontWeight="medium" minW="max-content" w="80px">
                Start Date:
              </Text>
              <Field
                isDisabled={!isEditable}
                as={Input}
                id="payment.startDate"
                name="payment.startDate"
                fontSize="14px"
                type="date"
                fontWeight="medium"
                variant="unstyled"
                placeholder="Select Start Date"
                _placeholder={{ color: 'grey', fontWeight: 'normal' }}
              />
            </HStack>
            {error && isTouched?.startDate ? (
              <Text color="primary.400" mt={2}>
                {error.startDate}
              </Text>
            ) : null}
          </VStack>

          <VStack>
            <HStack spacing="10px" w="full" pt="10px" className="calender">
              <Image src={calendar2} w="16px" />
              <Text fontWeight="medium" minW="max-content" w="70px">
                End Date:
              </Text>
              <Field
                validate={(value: string) => {
                  let err;
                  const startDate = new Date(payment.startDate as string);
                  const endDate = new Date(value);
                  if (startDate > endDate) {
                    err = 'End date cannot be earlier than start date';
                    return err;
                  }

                  return err;
                }}
                isDisabled={!isEditable}
                as={Input}
                id="payment.endDate"
                name="payment.endDate"
                fontSize="14px"
                type="date"
                fontWeight="medium"
                variant="unstyled"
                placeholder="Select End Date"
                _placeholder={{ color: 'grey', fontWeight: 'normal' }}
              />
            </HStack>
            {error && isTouched?.endDate ? (
              <Text color="primary.400" mt={2}>
                {error.endDate}
              </Text>
            ) : null}
          </VStack>
        </>
      )}

      {tabtype === 'milestone' && (
        <FieldArray name="payment.milestone">
          {({ remove, push }) => (
            <VStack w="full" align="flex-start">
              {payment.milestone &&
                payment?.milestone.length > 0 &&
                payment.milestone.map((_, index: number) => {
                  return (
                    <>
                      <Field
                        isDisabled={!isEditable}
                        as={Input}
                        id={`payment.milestone.${index}.title`}
                        name={`payment.milestone.${index}.title`}
                        fontSize="16px"
                        type="text"
                        fontWeight="medium"
                        variant="unstyled"
                        placeholder="Add Milestone Title"
                        _placeholder={{ color: 'grey' }}
                      />
                      <Field
                        isDisabled={!isEditable}
                        as={Input}
                        id={`payment.milestone.${index}.description`}
                        name={`payment.milestone.${index}.description`}
                        fontSize="16px"
                        type="text"
                        fontWeight="normal"
                        variant="unstyled"
                        placeholder="Add Details for this Milestone"
                        _placeholder={{ color: 'grey' }}
                      />
                      <HStack
                        w="full"
                        justify="space-between"
                        pt="20px"
                        borderBottomWidth="2px"
                        borderColor="#D6D6D6"
                        pb="20px"
                      >
                        <HStack
                          spacing={{ base: '5px', xl: '10px' }}
                          w="full"
                          className="calender"
                        >
                          <Image src={fee} w="16px" />

                          <Field
                            isDisabled={!isEditable}
                            as={Input}
                            id={`payment.milestone.${index}.cost`}
                            name={`payment.milestone.${index}.cost`}
                            w={{ base: 'full', xl: '150px' }}
                            // minW="max-content"
                            fontSize="14px"
                            type="number"
                            fontWeight="medium"
                            variant="unstyled"
                            placeholder="Set Price"
                            _placeholder={{
                              color: 'grey',
                              fontWeight: 'normal'
                            }}
                          />

                          <Text
                            color="gray.300"
                            pb="4px"
                            px={{ base: '0px', xl: '20px' }}
                          >
                            |
                          </Text>

                          <Image src={calendar2} w="16px" />

                          <Field
                            isDisabled={!isEditable}
                            as={Input}
                            id={`payment.milestone.${index}.dueDate`}
                            name={`payment.milestone.${index}.dueDate`}
                            w={{ base: 'full', xl: '150px' }}
                            // minW="max-content"
                            fontSize="14px"
                            type="date"
                            fontWeight="medium"
                            variant="unstyled"
                            placeholder="Set Due Date"
                            _placeholder={{
                              color: 'grey',
                              fontWeight: 'normal'
                            }}
                          />
                        </HStack>

                        {isEditable && (
                          <HStack
                            minW="max-content"
                            spacing="0px"
                            onClick={() => {
                              remove(index);
                            }}
                            _hover={{ cursor: 'pointer' }}
                          >
                            <CloseIcon
                              fontSize="12px"
                              color={{ base: 'black', xl: 'gray.500' }}
                            />
                            <Text
                              color="gray.500"
                              px="20px"
                              display={{ base: 'none', xl: 'initial' }}
                            >
                              Delete Milestone
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                      {error && isTouched?.milestone !== undefined ? (
                        // isTouched.milestone[index].dueDate ? (
                        <Text color="primary.400" mt={2}>
                          {error.milestone !== undefined &&
                            error.milestone[index] !== undefined &&
                            // @ts-ignore
                            error.milestone[index].dueDate}
                        </Text>
                      ) : null}
                    </>
                  );
                })}
              {isEditable && (
                <Box w="full" pt="10px" pb="0">
                  <HStack
                    w="full"
                    borderWidth="1px"
                    borderRadius="10px"
                    borderColor="#D6D6D6"
                    justify="space-between"
                    p="15px"
                    onClick={() => {
                      console.log('adsd');

                      push({
                        title: '',
                        description: '',
                        cost: 0,
                        dueDate: new Date()
                      });
                    }}
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Text fontWeight="700">
                      Add{' '}
                      {payment.milestone &&
                        payment?.milestone?.length > 0 &&
                        'Another'}{' '}
                      Milestone
                    </Text>

                    <AddIcon fontSize="14px" />
                  </HStack>
                </Box>
              )}
            </VStack>
          )}
        </FieldArray>
      )}

      {(tabtype === 'weekly' || tabtype === 'monthly') && (
        <>
          <HStack
            spacing={{ base: '5px', xl: '10px' }}
            pt="10px"
            w="full"
            className="calender"
          >
            <Image src={fee} w="16px" />

            <Field
              isDisabled={!isEditable}
              as={Input}
              w={{ base: 'full', xl: '200px' }}
              id={
                tabtype === 'weekly'
                  ? `payment.weeklyCost`
                  : 'payment.monthlyCost'
              }
              name="payment.totalFee"
              fontSize="14px"
              type="number"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Add Cost"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />

            <Text pb="4px" color="gray.300" px={{ base: '0px', xl: '20px' }}>
              |
            </Text>

            <Image src={calendar2} w="16px" />

            <Field
              isDisabled={!isEditable}
              as={Input}
              w={{ base: 'full', xl: '200px' }}
              id="payment.StartDate"
              name="payment.StartDate"
              fontSize="14px"
              type="date"
              fontWeight="medium"
              variant="unstyled"
              placeholder="Start Date"
              _placeholder={{ color: 'grey', fontWeight: 'normal' }}
            />

            <Box pb="4px" px={{ base: '5px', xl: '20px' }}>
              <ArrowForwardIcon fontSize="16px" color="gray.800" />
            </Box>

            <Image src={time} w="16px" />

            {tabtype === 'weekly' && (
              <Field
                isDisabled={!isEditable}
                as={Input}
                id="payment.weeks"
                name="payment.weeks"
                w={{ base: 'full', xl: '200px' }}
                fontSize="14px"
                type="number"
                fontWeight="medium"
                variant="unstyled"
                placeholder="Number of Weeks"
                _placeholder={{ color: 'grey', fontWeight: 'normal' }}
              />
            )}

            {tabtype === 'monthly' && (
              <Field
                isDisabled={!isEditable}
                as={Input}
                id="payment.months"
                w={{ base: 'full', xl: '200px' }}
                name="payment.months"
                fontSize="14px"
                type="number"
                fontWeight="medium"
                variant="unstyled"
                placeholder="Number of Months"
                _placeholder={{ color: 'grey', fontWeight: 'normal' }}
              />
            )}
          </HStack>
          {error && isTouched?.startDate ? (
            <Text color="primary.400" mt={2}>
              {error.startDate}
            </Text>
          ) : null}
        </>
      )}
    </>
  );
};

export default PaymentCard;
