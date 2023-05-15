import { ArrowUpIcon, ArrowBackIcon } from '@chakra-ui/icons';
import {
  Accordion,
  Button,
  Box,
  Flex,
  HStack,
  Text,
  // useToast,
  VStack
} from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';
import { Form, Formik } from 'formik';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { object, array, string } from 'yup';

import type { IInitialValues } from '../contracts/types';
import BasicCard from '@/components/cards/BasicCard';
import Body from '@/components/common/Body';
import Card from '@/components/contract/Card';
import Category from '@/components/contract/Category';
import StepBox from '@/components/contract/StepBox';
// import { useCreateContractMutation } from '@/redux/api/contracts/contractApi';
// import { addMonths, addWeeks } from '@/utils/functions';

function Create() {
  const address = useAddress();

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

  const contractSchema = object().shape({
    category: array().required('Please choose at least one category'),

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
    })
  });

  // const [
  //   createContract,
  //   { isLoading: isCreating, isSuccess: isCreateSuccess }
  // ] = useCreateContractMutation();
  // const navigate = useNavigate();
  // const toast = useToast();

  // useEffect(() => {
  //   if (isCreateSuccess) {
  //     navigate('/my-contracts');
  //     toast({
  //       title: 'Contract Created Successfully',
  //       description: 'Contract has Been Created and Sent for Review',
  //       status: 'success',
  //       isClosable: true,
  //       position: 'top'
  //     });
  //   }
  // }, [isCreateSuccess, navigate, toast]);

  // const deletedScopes: string[] = [];

  return (
    <Body>
      <Box pb="50px" w="full">
        <Formik
          // validate={(values: FormikValues) => {
          //   console.log(values);
          //   const errors: FormikErrors<FormikValues> = {};
          //   if (values.category.length < 1) {
          //     console.log('omom');

          //     errors.category = 'Please select at least one category';
          //   }

          //   return errors;
          // }}
          initialValues={InitialValues}
          validationSchema={contractSchema}
          onSubmit={(values) => {
            //   const editedValues = JSON.parse(JSON.stringify(values));
            //   if (values.payment.type === 'weekly') {
            //     editedValues.payment.endDate = addWeeks(
            //       values.payment.startDate as Date,
            //       Number(values.payment.weeks)
            //     );
            //   }
            //   if (values.payment.type === 'monthly') {
            //     editedValues.payment.endDate = addMonths(
            //       values.payment.startDate as Date,
            //       Number(values.payment.months)
            //     );
            //   }
            //   if (values.payment.type !== 'milestone') {
            //     editedValues.payment.milestone = [];
            //   }
            // editedValues.payment.totalFee = Number(values.payment.totalFee);
            // Create Contract on Submit with Redux functions
            // createContract(editedValues).unwrap();
            console.log(values);
          }}
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
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
                  pb="25px"
                  w="full"
                  // justify="space-between"
                  gap={{ base: '10px', xl: '15px' }}
                >
                  <HStack w={{ base: 'full', xl: '20%' }} spacing="2px">
                    <ArrowBackIcon fontSize="15px" />
                    <Text fontSize="14px">Back to Contract Templates</Text>
                  </HStack>

                  <Flex
                    align={{ base: 'flex-start', xl: 'center' }}
                    gap={{ base: '20px', xl: 'initial' }}
                    direction={{ base: 'column', xl: 'row' }}
                    w={{ base: 'full', xl: '80%' }}
                    justify="space-between"
                  >
                    <Text fontWeight="bold" fontSize="20px">
                      Edit your template as you want
                    </Text>

                    <Button
                      bg="primary.400"
                      type="submit"
                      rounded={30}
                      px="15px"
                      h="45px"
                      w={{ base: 'full', xl: 'initial' }}
                    >
                      <HStack w="full" justify="center" spacing="5px">
                        <Text>Create Template</Text>
                      </HStack>
                    </Button>
                  </Flex>
                </Flex>

                <Flex
                  w="full"
                  gap="15px"
                  direction={{ base: 'column', md: 'row' }}
                >
                  <VStack
                    align="flex-start"
                    spacing="10px"
                    display={{ base: 'none', md: 'block' }}
                    h="full"
                    w="20%"
                  >
                    <Text
                      fontSize="12px"
                      fontWeight="medium"
                      color="primary.100"
                      display={{ base: 'none', md: 'block' }}
                    >
                      YOUR PROJECT CHECKLIST
                    </Text>
                    <BasicCard variant="dark" h="full" w="full" py="30px">
                      <StepBox
                        status={
                          touched.intellectualProperty &&
                          values.intellectualProperty.text !== ''
                            ? 'active'
                            : values.intellectualProperty.text !== ''
                            ? 'current'
                            : 'inactive'
                        }
                        isFirst
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
                  </VStack>

                  <Box w={{ md: '80%', base: 'full' }}>
                    <Accordion allowToggle m="0px">
                      <Category
                        setFieldTouched={setFieldTouched}
                        error={errors.category}
                        isTouched={touched.category}
                        values={values.category}
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
                    px="17px"
                    h="50px"
                  >
                    <HStack w="full" justify="center" spacing="5px">
                      <Text color="gray">Send For Review</Text>
                      <ArrowUpIcon
                        color="gray"
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

export default Create;
