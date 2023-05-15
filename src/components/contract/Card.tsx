import {
  AddIcon,
  InfoOutlineIcon,
  MinusIcon,
  ArrowUpIcon
} from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
  Textarea,
  Divider
} from '@chakra-ui/react';
import type { Change } from 'diff';
import { diffWordsWithSpace } from 'diff';
import type { FormikErrors, FormikTouched } from 'formik';
import { Field } from 'formik';

import type { Terms } from '@/pages/contracts/types';

import TERMS_DATA from './termsContent';

const Card = ({
  setFieldValue,
  values,
  isEditable,
  position,
  name,
  block,
  error,
  isTouched
}: {
  values?: Terms[];
  isEditable: boolean;
  position?: number;
  block?: Terms;
  error?: FormikErrors<Terms>;
  isTouched?: FormikTouched<Terms>;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  name: keyof typeof TERMS_DATA;
}) => {
  // const [isMediumScreen] = useMediaQuery('(min-width: 480px)');

  // @ts-ignore
  let diff: Change[] = [];
  if (values && values.length > 1) {
    diff = diffWordsWithSpace(
      values[values.length - 2]?.text,
      values[values.length - 1].text
    );
  }

  return (
    <AccordionItem
      w="full"
      borderRadius="20px"
      px={{ md: '40px', base: 4 }}
      pb={{ md: '40px', base: 6 }}
      pt={{ md: '30px', base: 4 }}
      bg="white"
      color="black"
      mb="24px"
      borderColor="primary.400"
      borderWidth={isTouched?.text && error ? 2 : 0}
    >
      {({ isExpanded }) => (
        <Box w="full">
          <VStack align="flex-start" spacing="10px" w="full">
            <AccordionButton _hover={{ bg: 'none' }} w="full" p={0}>
              <VStack spacing="10px" w="full">
                <HStack
                  fontSize="20px"
                  fontWeight="bold"
                  justify="space-between"
                  w="full"
                  pr="5px"
                >
                  <HStack>
                    {!isEditable && <Text>{position}.</Text>}
                    <Text>{TERMS_DATA[name].title}</Text>
                  </HStack>

                  <Box display={{ base: 'initial', md: 'none' }}>
                    {isExpanded ? (
                      <MinusIcon fontSize="20px" />
                    ) : (
                      <AddIcon fontSize="20px" />
                    )}
                  </Box>
                </HStack>

                <HStack
                  w="full"
                  spacing="35px"
                  justify="space-between"
                  align="flex-start"
                  display={{ base: 'none', md: 'flex' }}
                >
                  <HStack lineHeight="20px" spacing="15px">
                    {isEditable && (
                      <Box>
                        <InfoOutlineIcon />
                      </Box>
                    )}

                    <Text textAlign="start" fontSize="14px">
                      {TERMS_DATA[name].heading}
                    </Text>
                  </HStack>

                  {isEditable ? (
                    <Box>
                      {isExpanded ? (
                        <Box
                          border="1px"
                          borderColor="black"
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                          p="auto"
                        >
                          <MinusIcon fontSize="12px" />
                        </Box>
                      ) : (
                        <Box
                          border="1px"
                          borderColor="black"
                          w="30px"
                          h="30px"
                          borderRadius="50%"
                        >
                          <AddIcon fontSize="12px" />
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <HStack spacing="5px" minW="max-content">
                      <Text
                        fontSize="11px"
                        fontWeight="medium"
                        color="grey.100"
                      >
                        LEARN MORE
                      </Text>
                      <ArrowUpIcon
                        color="grey.100"
                        fontSize="16px"
                        transform="rotate(45deg)"
                      />
                    </HStack>
                  )}
                </HStack>
              </VStack>
            </AccordionButton>

            {!isExpanded && values ? (
              <Text
                w="full"
                borderTopWidth="1px"
                borderColor="#D6D6D6"
                fontSize={{ md: '14px', base: 12 }}
                pt="15px"
              >
                {values[values.length - 1].text}
              </Text>
            ) : !isExpanded && block && block.text !== '' ? (
              <Text
                w="full"
                borderTopWidth="1px"
                borderColor="#D6D6D6"
                fontSize={{ md: '14px', base: 12 }}
                pt="15px"
              >
                {block.text}
              </Text>
            ) : (
              ''
            )}
          </VStack>

          <AccordionPanel px="0" pb="0" pt="15px">
            <VStack w="full" align="flex-start" spacing="20px">
              <HStack
                lineHeight="20px"
                spacing="15px"
                align="flex-start"
                display={{ base: 'flex', md: 'none' }}
                w="full"
              >
                {isEditable && (
                  <Box pt="10px">
                    <InfoOutlineIcon fontSize="20px" />
                  </Box>
                )}

                <Text textAlign="start" fontSize="14px">
                  {TERMS_DATA[name].heading}
                </Text>
              </HStack>

              {isEditable ? (
                <Field
                  as={Textarea}
                  id={`${name}.text`}
                  name={`${name}.text`}
                  type="text"
                  variant="filled"
                  fontSize="16px"
                  borderColor="#D6D6D6"
                  borderWidth="1px"
                  color="black"
                  borderRadius="16px"
                  h={{ base: '400px', xl: '160px' }}
                  p="20px"
                  focusBorderColor="black"
                  onChange={(e: { target: { value: string } }) => {
                    setFieldValue(`${name}.text`, e.target.value);
                  }}
                />
              ) : (
                <>
                  <Divider w="full" h={0.11} bg="grey.200" />
                  <VStack pt={3} mb={3}>
                    <Text
                      w="full"
                      fontWeight="bold"
                      fontSize={12}
                      textTransform="uppercase"
                    >
                      Current Version{' '}
                      <Text color="grey.200" casing="uppercase" as="span">
                        (
                        {values &&
                          new Date(
                            values[values.length - 1]?.lastUpdatedOn as string
                          ).toDateString()}
                        )
                      </Text>
                    </Text>
                    <Text w="full" fontSize={{ md: 16, base: 12 }}>
                      {values && values[values.length - 1].text}
                    </Text>
                  </VStack>
                  {values && values.length > 1 && (
                    <VStack>
                      <Text
                        w="full"
                        fontWeight="bold"
                        fontSize={12}
                        textTransform="uppercase"
                      >
                        Draft {values.length - 1}{' '}
                        <Text color="grey.200" casing="uppercase" as="span">
                          (
                          {values &&
                            new Date(
                              values[values.length - 1].lastUpdatedOn as string
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
                            {values && values[values.length - 1].text}
                          </Text>
                        )}
                      </Text>
                    </VStack>
                  )}
                </>
              )}
            </VStack>
          </AccordionPanel>
          {error && isTouched ? (
            <Box color="primary.400" mt={2}>
              {error.text}
            </Box>
          ) : null}
        </Box>
      )}
    </AccordionItem>
  );
};

export default Card;
