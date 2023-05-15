import { ArrowUpIcon } from '@chakra-ui/icons';
import {
  Accordion,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';
import type { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, array, number, string, date } from 'yup';

import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import Card from '@/components/contract/Card';
import Category from '@/components/contract/Category';
import Employer from '@/components/contract/Employer';
import Payments from '@/components/contract/Payments';
import Scope from '@/components/contract/Scope';
import StatusPill from '@/components/contract/StatusPill';
import StepBox from '@/components/contract/StepBox';
import Title from '@/components/contract/Title';
import { useCreateContractMutation } from '@/redux/api/contracts/contractApi';
import { addMonths, addWeeks } from '@/utils/functions';

import type { IInitialValues, IPayment, IWorks } from './types';

function Creator() {
  const address = useAddress();

  const statusObj = {
    Drafting: 'Drafting',
    'Sent for Review': 'Sent for Review',
    'Requires Amends': 'Requires Amends',
    Signed: 'Signed',
    Payment: 'Payment'
  };

  const InitialValues: IInitialValues = {
    title: '',
    category: [],
    guest: {
      walletAddress: '',
      role: 'client'
    },
    walletAddress: address,
    works: [
      { heading: '', content: [{ description: '' }] },
      { heading: '', content: [{ description: '' }] }
      // { heading: '', description: '' }
    ],
    payment: {
      type: 'flat',
      totalFee: 0,
      upfront: 0,
      // hourlyRate: 0,
      // maxHours: 0,

      startDate: new Date(),
      endDate: new Date(),
      months: 0,
      weeks: 0,
      milestone: []
      // milestone: [{ cost: 0, title: '', description: '', dueDate: new Date() }]
    },
    intellectualProperty: {
      title: 'Intellectual Property',
      text: '',
      heading: `Lörem ipsum posedut togände euroläväskap: därför att vid. Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat jag espegt. Supralärade duska. Prese äsade bess susk. Tresm duguvis, deck antiv autogt. Pos presm för doliga.`
    },
    confidentiality: {
      title: 'Confidentiality',
      text: '',
      heading:
        'Lörem ipsum posedut togände euroläväskap: därför att vid. Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat jag espegt. Supralärade duska. Prese äsade bess susk. Tresm duguvis, deck antiv autogt. Pos presm för doliga.'
    },
    termination: {
      title: 'Termination',
      text: '',
      heading:
        'Lörem ipsum posedut togände euroläväskap: därför att vid. Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat jag espegt.'
    },
    liability: {
      title: 'Limitation of Liability',
      text: '',
      heading:
        'Lörem ipsum posedut togände euroläväskap: därför att vid. Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat jag espegt. Supralärade duska. Prese äsade bess susk. Tresm duguvis, deck antiv autogt. Pos presm för doliga.'
    },
    dispute: {
      title: 'Dispute Resolution',
      text: '',
      heading:
        'Lörem ipsum posedut togände euroläväskap: därför att vid. Teratos fjärrnyckel fastän nonade. Plasotödat nin men dudat jag espegt.'
    }
  };

  const yesterday = new Date(Date.now() - 86400000);

  const contractSchema = object().shape({
    title: string().required('Enter a title for the Contract'),
    // userTag: object().shape({
    //   userAddress: string(),
    //   guestAddress: string(),
    //   role: string()
    // }),
    guest: object().shape({
      walletAddress: string().required('Enter a wallet address')
    }),
    // { heading: '', content: [{ description: '' }] },
    category: array().required('Please choose at least one category'),
    works: array().of(
      object().shape({
        heading: string().required('Heading is required'),
        content: array().of(
          object().shape({
            description: string().required('Work description is required')
          })
        )
      })
    ),
    intellectualProperty: object().shape({
      text: string().required('Intellectual Property is required')
    }),
    confidentiality: object().shape({
      text: string().required('Confidentiality term is required')
    }),
    termination: object().shape({
      text: string().required('Termination term is required')
    }),
    liability: object().shape({
      text: string().required('Liabilty term is required')
    }),
    dispute: object().shape({
      text: string().required('Dispute term is required')
    }),
    payment: object().shape({
      totalFee: number().required('Total fee is required'),
      upfront: number(),
      hourlyRate: number(),
      maxHours: number(),
      monthlyCost: number(),
      weeklyCost: number(),
      submitHours: number(),
      startDate: date().min(yesterday, 'Start date cannot be in the past'),
      endDate: date().min(yesterday, 'End date cannot be in the past'),
      months: number(),
      weeks: number(),
      milestone: array().of(
        object().shape({
          title: string(),
          description: string(),
          cost: number(),
          dueDate: date().min(yesterday, 'Due date cannot be in the past')
        })
      )
    })
  });

  const [
    createContract,
    { isLoading: isCreating, isSuccess: isCreateSuccess }
  ] = useCreateContractMutation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isCreateSuccess) {
      navigate('/my-contracts');
      toast({
        title: 'Contract Created Successfully',
        description: 'Contract has Been Created and Sent for Review',
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }
  }, [isCreateSuccess, navigate, toast]);

  const deletedScopes: string[] = [];

  return (
    <Body>
      <Box pb="50px" w="full">
        <Formik
          validate={(values: FormikValues) => {
            const errors: FormikErrors<FormikValues> = {};
            if (values.category.length < 1) {
              errors.category = 'Please select at least one category';
            }

            return errors;
          }}
          initialValues={InitialValues}
          validationSchema={contractSchema}
          onSubmit={(values /* action */) => {
            // console.log(values);
            const editedValues = JSON.parse(JSON.stringify(values));
            if (values.payment.type === 'weekly') {
              editedValues.payment.endDate = addWeeks(
                values.payment.startDate as Date,
                Number(values.payment.weeks)
              );
            }

            if (values.payment.type === 'monthly') {
              editedValues.payment.endDate = addMonths(
                values.payment.startDate as Date,
                Number(values.payment.months)
              );
            }

            if (values.payment.type !== 'milestone') {
              editedValues.payment.milestone = [];
            }

            editedValues.payment.totalFee = Number(values.payment.totalFee);
            // Create Contract on Submit with Redux functions
            createContract(editedValues).unwrap();
            // action.resetForm({ values: InitialValues });
          }}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            setFieldTouched,
            isValid
          }) => (
            <Form>
              <VStack align="flex-start" w="full" pt="30px">
                <Text
                  fontSize="14px"
                  fontWeight="medium"
                  color="primary.100"
                  display={{ base: 'initial', md: 'none' }}
                >
                  YOUR PROJECT CHECKLIST
                </Text>

                <Box display={{ md: 'none' }} pb="30px" w="full">
                  <BasicCard variant="dark" h="full" w="full" py="15px">
                    <StepBox
                      status={
                        touched.guest
                          ? 'active'
                          : values.guest.walletAddress !== ''
                          ? 'current'
                          : 'inactive'
                      }
                      isFirst
                      isLast
                      title="Select Employer"
                    />

                    {touched.works && (
                      <StepBox
                        status={
                          touched.works
                            ? 'active'
                            : values.works.length > 0 &&
                              values.works[0].content[0].description !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title="Scope of Work"
                        isFirst
                        isLast
                      />
                    )}
                  </BasicCard>
                </Box>

                <Flex
                  direction={{ base: 'column', xl: 'row' }}
                  mb="25px"
                  w="full"
                  justify="space-between"
                  gap="30px"
                >
                  <Box
                    overflowY={{ base: 'auto', xl: 'initial' }}
                    className="overflow"
                  >
                    <HStack w={{ base: '600px', xl: 'full' }} spacing="0">
                      {Object.entries(statusObj).map(([key]) => {
                        return (
                          <>
                            <StatusPill
                              key={key}
                              status={key}
                              active={key === statusObj.Drafting}
                            />
                            <Divider
                              w="30px"
                              display={key === 'Payment' ? 'none' : 'initial'}
                            />
                          </>
                        );
                      })}
                    </HStack>
                  </Box>

                  <Button
                    type="submit"
                    rounded={30}
                    px="17px"
                    h="50px"
                    isLoading={isCreating}
                    isDisabled={!isValid}
                    variant={isValid ? 'primary' : ''}
                    _disabled={{
                      bg: 'whiteAlpha.200'
                    }}
                  >
                    <HStack w="full" justify="center" spacing="5px">
                      <Text color={isValid ? 'white' : 'gray'}>
                        Send For Review
                      </Text>
                      <ArrowUpIcon
                        color={isValid ? 'white' : 'gray'}
                        fontSize="19px"
                        transform="rotate(45deg)"
                      />
                    </HStack>
                  </Button>
                </Flex>

                <Text
                  fontSize="12px"
                  fontWeight="medium"
                  color="primary.100"
                  display={{ base: 'none', md: 'block' }}
                >
                  YOUR PROJECT CHECKLIST
                </Text>

                <Flex
                  w="full"
                  gap="15px"
                  direction={{ base: 'column', md: 'row' }}
                >
                  <Box display={{ base: 'none', md: 'block' }} h="full" w="20%">
                    <BasicCard variant="dark" h="full" w="full" py="30px">
                      <StepBox
                        status={
                          touched.guest && values.guest.walletAddress !== ''
                            ? 'active'
                            : values.guest.walletAddress !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        isFirst
                        title="Select Employer"
                      />
                      <StepBox
                        status={
                          touched.works && values.works[0].heading !== ''
                            ? 'active'
                            : values.works.length > 0 &&
                              values.works[0].content[0].description !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title="Scope of Work"
                      />
                      <StepBox
                        status={
                          touched.payment?.totalFee &&
                          values.payment.totalFee !== 0
                            ? 'active'
                            : values.payment.totalFee !== 0 ||
                              (values.payment.milestone &&
                                values.payment.milestone.length > 0)
                            ? 'current'
                            : 'inactive'
                        }
                        title="Payment"
                      />
                      <StepBox
                        status={
                          touched.intellectualProperty &&
                          values.intellectualProperty.text !== ''
                            ? 'active'
                            : values.intellectualProperty.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title={values.intellectualProperty.title as string}
                      />
                      <StepBox
                        status={
                          touched.confidentiality &&
                          values.intellectualProperty.text !== ''
                            ? 'active'
                            : values.confidentiality.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title={values.confidentiality.title as string}
                      />
                      <StepBox
                        status={
                          touched.termination &&
                          values.intellectualProperty.text !== ''
                            ? 'active'
                            : values.termination.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title={values.termination.title as string}
                      />
                      <StepBox
                        status={
                          touched.liability && values.liability.text !== ''
                            ? 'active'
                            : values.liability.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        title={values.liability.title as string}
                      />
                      <StepBox
                        status={
                          touched.dispute && values.dispute.text !== ''
                            ? 'active'
                            : values.dispute.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        isLast
                        title={values.dispute.title as string}
                      />
                    </BasicCard>
                  </Box>

                  <Box w={{ md: '80%', base: 'full' }}>
                    <Accordion allowToggle m="0px">
                      <Title
                        isEditable
                        error={errors.title}
                        isTouched={touched.title}
                      />

                      <Category
                        setFieldTouched={setFieldTouched}
                        error={errors.category}
                        isTouched={touched.category}
                        values={values.category}
                      />
                      <Employer
                        error={errors.guest?.walletAddress}
                        isTouched={touched.guest?.walletAddress}
                        values={values.guest}
                        setFieldValue={setFieldValue}
                      />
                      <Scope
                        isTouched={touched.works as FormikTouched<IWorks>[]}
                        error={errors.works as FormikErrors<IWorks>[]}
                        deletedScopes={deletedScopes}
                        isEditable
                        works={values.works}
                        setFieldValue={setFieldValue}
                      />
                      <Payments
                        isTouched={touched.payment as FormikTouched<IPayment>}
                        error={errors.payment as FormikErrors<IPayment>}
                        selectedType="all"
                        isEditable
                        values={values.payment}
                        setFieldValue={setFieldValue}
                      />

                      <Card
                        error={errors.intellectualProperty}
                        isTouched={touched.intellectualProperty}
                        name="intellectualProperty"
                        isEditable
                        setFieldValue={setFieldValue}
                        block={values.intellectualProperty}
                      />
                      <Card
                        error={errors.confidentiality}
                        isTouched={touched.confidentiality}
                        name="confidentiality"
                        isEditable
                        setFieldValue={setFieldValue}
                        block={values.confidentiality}
                      />
                      <Card
                        error={errors.termination}
                        isTouched={touched.termination}
                        isEditable
                        name="termination"
                        setFieldValue={setFieldValue}
                        block={values.termination}
                      />
                      <Card
                        error={errors.liability}
                        isTouched={touched.liability}
                        isEditable
                        name="liability"
                        setFieldValue={setFieldValue}
                        block={values.liability}
                      />
                      <Card
                        error={errors.dispute}
                        isTouched={touched.dispute}
                        name="dispute"
                        isEditable
                        setFieldValue={setFieldValue}
                        block={values.dispute}
                      />
                    </Accordion>
                  </Box>
                </Flex>

                <HStack w="full" justify={{ base: 'center', xl: 'flex-end' }}>
                  <Button
                    type="submit"
                    w={{ base: 'full', xl: 'initial' }}
                    rounded={30}
                    isLoading={isCreating}
                    isDisabled={!isValid}
                    variant={isValid ? 'primary' : ''}
                    _disabled={{
                      bg: 'whiteAlpha.200'
                    }}
                    px="17px"
                    h="50px"
                  >
                    <HStack w="full" justify="center" spacing="5px">
                      <Text color={isValid ? 'white' : 'gray'}>
                        Send For Review
                      </Text>
                      <ArrowUpIcon
                        color={isValid ? 'white' : 'gray'}
                        fontSize="19px"
                        transform="rotate(45deg)"
                      />
                    </HStack>
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Body>
  );
}

export default Creator;
