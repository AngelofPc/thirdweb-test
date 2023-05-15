import Navbar from '@/components/common/Navbar';
import { gradients } from '@/theme/theme';
import {
  CheckIcon,
  EditIcon,
  LockIcon,
  PlusSquareIcon
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Textarea,
  Spinner,
  Input
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import StatusPill from '../../components/common/StatusPill';
// import StepBox from '../../components/common/StepBox';
import { Status } from '../../utils/types';
import PlusIcon from '@/assets/svgs/plus.svg';
import {
  useCreateTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation
} from '@/redux/api/templates/templateApi';
import { redirect, useParams, useNavigate } from 'react-router-dom';
import { diffWordsWithSpace } from 'diff';
import { Formik, Form, FieldArray, Field } from 'formik';
import { object, array, number, string } from 'yup';

import { useToast } from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';

function Template() {
  const address = useAddress();
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  enum ViewTypes {
    NEW = 'new',
    EDIT = 'edit',
    VIEW = 'view'
  }

  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.NEW);
  const [fetchTemplate, setFetchTemplate] = useState(false);

  useEffect(() => {
    if (slug === 'new') {
      setViewType(ViewTypes.NEW);
    } else {
      setFetchTemplate(true);
      setViewType(ViewTypes.VIEW);
    }
  }, []);

  const {
    data: template,
    isFetching,
    isLoading
  } = useGetTemplateQuery(slug as string, { skip: !fetchTemplate });

  const [
    updateTemplate,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      data: updatedTemplate,
      isError: hasUpdateError,
      error: updateError
    }
  ] = useUpdateTemplateMutation();

  const [
    createTemplate,
    {
      isLoading: isCreating,
      isSuccess: isCreated,
      isError: hasCreateError,
      error: createError
    }
  ] = useCreateTemplateMutation();

  // useEffect(() => {
  //   console.log(template);
  // }, [isCreating, isUpdating, isLoading]);

  useEffect(() => {
    if (isUpdated && template?.slug !== updatedTemplate?.slug) {
      navigate(`/template/${updatedTemplate?.slug}`);
      toast({
        title: 'Template Updated Successfully',
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }
    if (isCreated) {
      navigate('/');
      toast({
        title: 'Template Created Successfully',
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }
  }, [isUpdated, isCreated]);

  const [blockFocus, setBlockFocus] = useState(0);
  const headingColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('white', 'grey.100');

  const templateSchema = object().shape({
    title: string(),
    category: string(),
    blocks: array().of(
      object().shape({
        heading: string(),
        description: string(),
        content: array().of(
          object().shape({
            text: string(),
            _id: string()
          })
        )
      })
    )
  });

  const InitialValues = {
    // title:
    //   viewType === ViewTypes.NEW ? 'Enter Template title' : template?.title,
    title: template?.title,
    category:
      viewType === ViewTypes.NEW ? 'Select Category' : template?.category,
    walletAddress: address,
    blocks:
      viewType === ViewTypes.NEW
        ? [
            {
              heading: 'Scope of work',
              description: 'Define items deliverables',
              content: [{ text: '' }]
            },
            {
              heading: 'Cost',
              description: 'Define cost of work and payment terms',
              content: [{ text: '' }]
            },
            {
              heading: 'Ownership',
              description: 'Define the ownership of final deliverables.',
              content: [{ text: '' }]
            },
            {
              heading: 'Laws',
              description: 'Define disputes, mediation and arbitration',
              content: [{ text: '' }]
            }
          ]
        : template?.blocks
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Container maxW="100vw" bg="dark.400" minH={'100vh'} pb="80px">
          <Navbar />
          <Formik
            initialValues={InitialValues}
            //  validationSchema={SignupSchema}
            onSubmit={(values) => {
              if (viewType === ViewTypes.NEW) {
                values.category = 'design';
                console.log(values);

                createTemplate(values).unwrap();
              } else {
                updateTemplate({
                  templateId: template?.templateId!,
                  data: values
                }).unwrap();
              }
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Stack
                  mt={4}
                  justifyContent="flex-end"
                  direction={['column', 'row']}
                  w="full"
                  // overflow={{ base: 'scroll', lg: 'initial' }}
                >
                  <HStack>
                    {viewType !== ViewTypes.NEW && (
                      <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}
                        opacity={0.5}
                        rounded={100}
                        minH={10}
                        borderWidth={1}
                        borderColor={'grey.100'}
                        onClick={() => {
                          setViewType(
                            viewType === ViewTypes.EDIT
                              ? ViewTypes.VIEW
                              : ViewTypes.EDIT
                          );
                          // setV (!toggleEdit);
                        }}
                      >
                        <Icon
                          as={viewType === ViewTypes.EDIT ? LockIcon : EditIcon}
                        />
                      </Button>
                    )}
                    <Button
                      borderWidth={1}
                      borderColor={'grey.300'}
                      p={4}
                      px={4}
                      opacity={0.5}
                      rounded={20}
                      bg={'grey.100'}
                      type="submit"
                      _hover={{ bg: 'grey.400' }}
                    >
                      <Text noOfLines={1} w={'max-content'}>
                        {viewType === ViewTypes.NEW ? 'Create' : 'Edit'}{' '}
                        Template
                      </Text>
                    </Button>
                  </HStack>
                </Stack>

                <Stack
                  mt={4}
                  w="full"
                  direction={['column', 'row']}
                  spacing={6}
                >
                  <Box
                    bg={'grey.400'}
                    p={6}
                    rounded={10}
                    w={['100%', '25vw']}
                    h={'max-content'}
                  >
                    {values?.blocks && (
                      <Text color={'gradient.primary'}>
                        Step{' '}
                        {
                          values?.blocks.filter(
                            (block) => block.content[0].text !== ''
                          ).length
                        }{' '}
                        of {values?.blocks.length}
                      </Text>
                    )}
                    <Box
                      maxW="100%"
                      overflowX={'hidden'}
                      position={'relative'}
                      rounded={10}
                      my={6}
                    >
                      <Box
                        opacity={0.1}
                        bg="white"
                        h={1}
                        w="100%"
                        overflow={'hidden'}
                        position={'absolute'}
                      />
                      <Box
                        opacity={1}
                        zIndex={111}
                        w="20%"
                        h={1}
                        bgGradient={gradients.primary}
                      />
                    </Box>
                    {/* {values.blocks && (
                      <Box>
                        {values?.blocks.map((block, i) => {
                          return (
                            <StepBox
                              key={i}
                              description={block.description}
                              // description={}
                              title={block.heading}
                              isFirst
                              status={
                                block.content[0].text !== ''
                                  ? Status.filled
                                  : blockFocus === i
                                  ? Status.active
                                  : Status.unfilled
                              }
                            />
                          );
                        })}
                      </Box>
                    )} */}
                  </Box>
                  <Box bg="white" w={['100%', '75vw']} rounded={10} p={6}>
                    <Box
                      bg="dark.400"
                      rounded={20}
                      width="max-content"
                      py={1}
                      px={4}
                      mt={3}
                    >
                      <Text textTransform={'capitalize'}>
                        {values?.category}
                      </Text>
                    </Box>
                    <Box my={4}>
                      {viewType === ViewTypes.VIEW ? (
                        <Heading color="black" fontWeight={400} my={3}>
                          {template?.title}
                        </Heading>
                      ) : (
                        <Field
                          as={Input}
                          color={headingColor}
                          id="title"
                          name="title"
                          type="text"
                          fontSize={26}
                          borderWidth={0}
                          _placeholder={{
                            color: headingColor
                          }}
                          placeholder="Enter Template title"
                        />
                      )}

                      {values?.blocks && (
                        <FieldArray name="blocks">
                          {({ insert, remove, push }) => (
                            <Accordion
                              defaultIndex={[0]}
                              allowMultiple
                              color={'grey.100'}
                            >
                              <>
                                {/* @ts-ignore */}
                                {values?.blocks?.length > 0 &&
                                  values?.blocks?.map(
                                    (
                                      block: {
                                        content: string | any[];
                                        heading: string | any;
                                      },
                                      index: any
                                    ) => {
                                      let diff: any[] = [];
                                      if (block.content.length > 1) {
                                        diff = diffWordsWithSpace(
                                          block.content[
                                            block.content.length - 2
                                          ]?.text,
                                          block.content[
                                            block.content.length - 1
                                          ].text
                                        );
                                      }

                                      return (
                                        <AccordionItem
                                          borderWidth={1}
                                          borderColor="grey.600"
                                          rounded={6}
                                          mt={2}
                                        >
                                          <h2>
                                            <AccordionButton>
                                              <HStack
                                                as="span"
                                                flex="1"
                                                textAlign="left"
                                              >
                                                <HStack>
                                                  <Text
                                                    fontFamily={'power'}
                                                    alignItems="center"
                                                    color={'black'}
                                                  >
                                                    <Image
                                                      src={PlusIcon}
                                                      display="inline"
                                                      w={3}
                                                      // mr={3}
                                                    />
                                                  </Text>

                                                  <Field
                                                    as={Input}
                                                    borderWidth={0}
                                                    onFocus={() =>
                                                      setBlockFocus(index)
                                                    }
                                                    name={`blocks.${index}.heading`}
                                                    value={
                                                      values.blocks &&
                                                      values.blocks[index]
                                                        .heading
                                                    }
                                                    type="text"
                                                  />
                                                </HStack>

                                                <Text> -&nbsp;</Text>
                                                {/* {block.heading} */}
                                                <Field
                                                  onFocus={() =>
                                                    setBlockFocus(index)
                                                  }
                                                  w={['100%', '100%']}
                                                  // w="fit-content"
                                                  as={Input}
                                                  color={textColor}
                                                  type="title"
                                                  borderWidth={0}
                                                  fontSize={14}
                                                  _placeholder={{
                                                    color: textColor
                                                  }}
                                                  name={`blocks.${index}.description`}
                                                  placeholder="Add your own"
                                                />
                                              </HStack>
                                              <AccordionIcon
                                                ml="20px"
                                                display={{
                                                  base: 'none',
                                                  lg: 'initial'
                                                }}
                                              />
                                            </AccordionButton>
                                          </h2>
                                          {values?.blocks && (
                                            <AccordionPanel pb={4}>
                                              {viewType !== ViewTypes.VIEW ? (
                                                <Field
                                                  onFocus={() =>
                                                    setBlockFocus(index)
                                                  }
                                                  as={Input}
                                                  borderWidth={0}
                                                  name={`blocks.${index}.content.${
                                                    values.blocks[index].content
                                                      .length - 1
                                                  }.text`}
                                                  value={
                                                    values.blocks[index]
                                                      .content[
                                                      values.blocks[index]
                                                        .content.length - 1
                                                    ].text
                                                  }
                                                  type="text"
                                                />
                                              ) : diff.length > 0 ? (
                                                diff?.map((part) => {
                                                  return (
                                                    <Text
                                                      as={'span'}
                                                      color={
                                                        part.added
                                                          ? 'green.400'
                                                          : part.removed
                                                          ? 'red.400'
                                                          : 'gray.400'
                                                      }
                                                    >
                                                      {part.value}
                                                    </Text>
                                                  );
                                                })
                                              ) : (
                                                <Text>
                                                  {block.content[0].text}
                                                </Text>
                                              )}
                                            </AccordionPanel>
                                          )}
                                        </AccordionItem>
                                      );
                                    }
                                  )}
                              </>
                            </Accordion>
                          )}
                        </FieldArray>
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Container>
      )}
    </>
  );
}

export default Template;
