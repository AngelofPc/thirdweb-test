import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon
} from '@chakra-ui/icons';
import {
  HStack,
  Text,
  VStack,
  Input,
  Box,
  Divider,
  Stack
} from '@chakra-ui/react';
import type { Change } from 'diff';
import { diffWordsWithSpace } from 'diff';
import type { FormikErrors, FormikTouched } from 'formik';
import { Field, FieldArray } from 'formik';
import { useState } from 'react';

import type { IWorks } from '../../pages/contracts/types';
import AccordionCard from '../cards/AccordionCard';

const Scope = ({
  works,
  deletedScopes,
  setFieldValue,
  isEditable,
  position,
  error,
  isTouched
}: {
  deletedScopes: string[];
  works?: IWorks[];
  error: FormikErrors<IWorks>[];
  isTouched: FormikTouched<IWorks>[];
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  isEditable: boolean;
  position?: number;
}) => {
  const [more, setMore] = useState(['initial', 'none']);

  return (
    <AccordionCard
      borderWidth={error !== undefined && isTouched !== undefined ? 2 : 0}
      title="Scope of Work"
      position={position}
      description="Here's what you need to deliver"
      error={
        isTouched && error !== undefined && error?.length >= 1
          ? error[error.length - 1]?.heading !== undefined
            ? error[error.length - 1].heading
            : 'Scope of work is required'
          : null
      }
      showElementIfClosed={
        <Box w="full">
          {works && works.length > 0 && works[0].content[0].description && (
            <>
              <VStack align="flex-start" w="full" display={more[0]}>
                <VStack
                  borderTopWidth="1px"
                  borderColor="#D6D6D6"
                  fontSize={{ md: '14px', base: 12 }}
                  py="10px"
                  align="flex-start"
                >
                  <Text fontWeight="bold">{works[0].heading}</Text>
                  <Text>
                    {works[0].content[works[0].content.length - 1].description}
                  </Text>
                </VStack>
                {works.length > 1 && (
                  <VStack
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
                )}
              </VStack>

              {works.length > 2 && (
                <Box
                  onClick={() => setMore(['none', 'initial'])}
                  display={more[0]}
                >
                  <ChevronDownIcon />
                </Box>
              )}

              {works.length > 2 && (
                <VStack align="flex-start" w="full" display={more[1]}>
                  {works.length > 0 &&
                    works.map((unit: IWorks) => {
                      return (
                        <VStack
                          key={unit.heading}
                          w="full"
                          borderTopWidth="1px"
                          borderColor="#D6D6D6"
                          fontSize={{ md: '14px', base: 12 }}
                          py="10px"
                          align="flex-start"
                        >
                          <Text fontWeight="bold">{unit.heading}</Text>
                          <Text>
                            {unit.content[unit.content.length - 1].description}
                          </Text>
                        </VStack>
                      );
                    })}
                </VStack>
              )}

              {works.length > 2 && (
                <Box
                  onClick={() => setMore(['initial', 'none'])}
                  display={more[1]}
                >
                  <ChevronUpIcon />
                </Box>
              )}
            </>
          )}
        </Box>
      }
    >
      {isEditable ? (
        <FieldArray name="works">
          {({ remove, push }) => (
            <VStack w="full" fontSize="14px" spacing="10px" pt="20px">
              {works &&
                works?.length > 0 &&
                works.map((work, index: number) => {
                  return (
                    // eslint-disable-next-line
                    <Box key={index} w="full">
                      <VStack
                        align="flex-start"
                        w="full"
                        borderWidth="1px"
                        borderRadius="10px"
                        borderColor="black"
                        p="20px"
                        spacing="0px"
                      >
                        <HStack w="full" justify="space-between">
                          <Field
                            isReadOnly={!isEditable}
                            as={Input}
                            id={`works.${index}.heading`}
                            name={`works.${index}.heading`}
                            type="text"
                            variant="unstyled"
                            _placeholder={{
                              color: 'black',
                              fontWeight: 'medium'
                            }}
                            placeholder="Add Work Heading here"
                            color="black"
                            fontWeight="bold"
                            fontSize="14px"
                            onChange={(e: { target: { value: string } }) => {
                              setFieldValue(
                                `works.${index}.heading`,
                                e.target.value
                              );
                            }}
                          />

                          {isEditable && (
                            <MinusIcon
                              fontSize="12px"
                              onClick={() => {
                                // eslint-disable-next-line
                                deletedScopes.push(work._id as string);
                                // setFieldValue('deletedScopes', del.toString());
                                remove(index);
                              }}
                            />
                          )}
                        </HStack>

                        <Field
                          isReadOnly={!isEditable}
                          as={Input}
                          id={`works.${index}.content.${
                            work.content.length - 1
                          }.description`}
                          name={`works.${index}.content.${
                            work.content.length - 1
                          }.description`}
                          type="text"
                          variant="unstyled"
                          _placeholder={{
                            color: 'grey.200'
                          }}
                          placeholder="Add Work details here"
                          color="black"
                          fontSize="14px"
                          onChange={(e: { target: { value: string } }) => {
                            setFieldValue(
                              `works.${index}.content.${
                                work.content.length - 1
                              }.description`,
                              e.target.value
                            );
                          }}
                        />
                      </VStack>

                      <Stack my={0} w="100%" align="flex-start">
                        {error &&
                        isTouched !== undefined &&
                        isTouched[index]?.heading ? (
                          <Text color="primary.400" mt={0}>
                            {error && error[index]?.heading}
                          </Text>
                        ) : null}

                        {error &&
                        isTouched !== undefined &&
                        isTouched[index]?.content !== undefined ? (
                          <Text color="primary.400" mt={0}>
                            {error &&
                              error[index] !== undefined &&
                              error[index].content !== undefined &&
                              // @ts-ignore
                              error[index]?.content[0]?.description}
                          </Text>
                        ) : null}
                      </Stack>
                    </Box>
                  );
                })}

              {isEditable && (
                <HStack
                  w="full"
                  borderWidth="1px"
                  borderRadius="10px"
                  borderColor="#D6D6D6"
                  justify="space-between"
                  p="15px"
                  onClick={() =>
                    push({
                      heading: '',
                      content: [{ description: '' }]
                    })
                  }
                  _hover={{ cursor: 'pointer' }}
                >
                  <Text fontWeight="700">Add Another Scope of Work</Text>
                  <AddIcon fontSize="14px" />
                </HStack>
              )}
            </VStack>
          )}
        </FieldArray>
      ) : (
        <Box w="full">
          {works?.map((work) => {
            let diff: Change[] = [];
            if (works && works.length > 1 && work.content.length > 1) {
              const newDes = work.content[work.content.length - 1].description;
              const oldDes = work.content[work.content.length - 2].description;
              diff = diffWordsWithSpace(oldDes, newDes);
            }

            return (
              <>
                <Divider w="full" h={0.11} mt={2} bg="grey.200" />
                <VStack pt={3} mb={3}>
                  <VStack align="flex-start" w="full">
                    <Text
                      w="full"
                      fontSize={{ md: 16, base: 12 }}
                      fontWeight="bold"
                    >
                      {work.heading}
                    </Text>
                    <Text
                      w="full"
                      fontWeight="bold"
                      fontSize={12}
                      textTransform="uppercase"
                    >
                      Current Version{' '}
                      <Text color="grey.200" casing="uppercase" as="span">
                        (
                        {works &&
                          work.content.length > 0 &&
                          new Date(
                            work.content[work.content.length - 1]
                              .lastUpdatedOn as Date
                          ).toDateString()}
                        )
                      </Text>
                    </Text>
                    <Text w="full" fontSize={{ md: 16, base: 12 }}>
                      {works &&
                        work.content[work.content.length - 1].description}
                    </Text>
                  </VStack>
                </VStack>
                {works && work.content.length >= 2 && (
                  <VStack>
                    <Text
                      w="full"
                      fontWeight="bold"
                      fontSize={12}
                      textTransform="uppercase"
                    >
                      Draft {works.length - 1}{' '}
                      <Text color="grey.200" casing="uppercase" as="span">
                        (
                        {works &&
                          work.content.length >= 2 &&
                          new Date(
                            work.content[work.content.length - 2]
                              .lastUpdatedOn as Date
                          ).toDateString()}
                        )
                      </Text>
                    </Text>
                    <Text w="full" __css={{ wordSpacing: 123 }}>
                      {diff?.length > 1 ? (
                        diff?.map((part) => {
                          return (
                            <Text
                              mx={part.added || part.removed ? 0.5 : 0}
                              as="span"
                              textDecoration={
                                part.removed ? 'line-through' : ''
                              }
                              /* eslint no-nested-ternary: "off" */
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
                          {works &&
                            work.content[work.content.length - 1]?.description}
                        </Text>
                      )}
                    </Text>
                  </VStack>
                )}
              </>
            );
          })}
        </Box>
      )}
    </AccordionCard>
  );
};

export default Scope;
