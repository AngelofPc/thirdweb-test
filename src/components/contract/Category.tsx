import { CloseIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  VStack,
  HStack,
  Input,
  InputRightElement,
  Center,
  Text,
  Stack
} from '@chakra-ui/react';
import { FieldArray } from 'formik';
import { useState } from 'react';

import CategoryPill from './CategoryPill';

function Category({
  values,
  error,
  isTouched,
  setFieldTouched
}: {
  values: string[];
  isTouched?: boolean;
  error?: string | string[];

  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}) {
  const [showMaxError, setShowMaxError] = useState(false);

  const [categories, setCategories] = useState([
    'Design',
    'Frontend',
    'Crypto',
    'Mobile',
    'Marketing',
    'Finance',
    'Research',
    'Literature'
  ]);

  return (
    <VStack
      w="full"
      spacing="20px"
      bg="white"
      borderRadius="20px"
      px={{ md: '40px', base: 4 }}
      pb={{ md: '40px', base: 6 }}
      pt={{ md: '30px', base: 4 }}
      color="black"
      mb="24px"
      borderColor="primary.400"
      borderWidth={isTouched && error ? 2 : 0}
    >
      <Stack direction={{ base: 'column', md: 'row' }} w="full">
        {/* <HStack
          borderRadius="20px"
          borderWidth={1}
          borderColor="#D6D6D6"
          w="full"
          p={2}
        >
          {values.map((value) => {
            return (
              <Button borderRadius="20px" border="1px solid green">
                {value}
              </Button>
            );
          })}
        </HStack> */}

        {/* <InputGroup>
          <Field
            display={showSearch ? 'inline-block' : 'none'}
            as={Input}
            id="test"
            name="test"
            variant="filled"
            type="text"
            borderColor="#D6D6D6"
            borderWidth="1px"
            color="black"
            borderRadius="11px"
            h="50px"
            p="15px"
            onKeyDown={(e: { key: string; preventDefault: () => any }) => {
              e.key === 'Enter' && e.preventDefault();
            }}
            focusBorderColor="dark.400"
            _placeholder={{
              color: 'black',
              fontWeight: 'medium',
              opacity: '0.5'
            }}
            placeholder="Select Contract Category"
            fontWeight="bold"
            fontSize="14px"
          />

          <InputRightElement
            pr="20px"
            onClick={() => setShowSearch(true)}
            children={
              <Box pt="10px">
                <Center
                  borderRadius="50%"
                  border="1px"
                  color="black"
                  w="30px"
                  h="30px"
                >
                  <Search2Icon fontSize="14px" />
                </Center>
              </Box>
            }
          />
        </InputGroup> */}
      </Stack>
      <Text textAlign="left" color="gray.700" w="100%">
        Add a space to add a new category, then click on it to Select
      </Text>
      <HStack w="full" overflowY="hidden" className="overflow">
        <VStack>
          <HStack spacing="20px">
            <VStack>
              <InputGroup w="max-content">
                <Input
                  onKeyDown={(e) => {
                    const text = (e.target as HTMLInputElement).value;
                    if (
                      e.key === 'Enter' &&
                      text !== '' &&
                      !categories.includes(text)
                    ) {
                      e.preventDefault();
                      setCategories((c) => [text, ...c]);
                      // @ts-ignore
                      e.target.value = '';
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  _placeholder={{
                    fontSize: 14,
                    color: 'primary.400'
                  }}
                  name="custom"
                  placeholder="Add New Category"
                  rounded={15}
                  borderStyle="dashed"
                  borderWidth="1px"
                  borderColor="primary.400"
                />
                <InputRightElement>
                  <Center
                    border="2px"
                    p="2px"
                    rounded="3px"
                    color="primary.400"
                  >
                    <CloseIcon fontSize="10px" />
                  </Center>
                </InputRightElement>
              </InputGroup>
            </VStack>
            <FieldArray name="category">
              {({ remove, push }) => (
                <>
                  {/* <CategoryPill text="Add New Category" isNew /> */}
                  {categories.map((category) => {
                    return (
                      <CategoryPill
                        isAdded={values.includes(category)}
                        key={category}
                        onClick={() => {
                          setFieldTouched('category', true);
                          if (values.includes(category)) {
                            remove(values.indexOf(category));
                          } else if (values.length < 3) {
                            push(category);
                          } else {
                            setShowMaxError(true);
                            setTimeout(() => {
                              setShowMaxError(false);
                            }, 5000);
                          }
                          // values.push(category);
                        }}
                        text={category}
                      />
                    );
                  })}
                </>
              )}
            </FieldArray>
          </HStack>
          {showMaxError ? (
            <Text color="primary.400" mt={2} textAlign="left" w="100%">
              You can only add three categories
            </Text>
          ) : null}
          {/* <HStack spacing="20px">
            <CategoryPill text="Add New Category" isNew />
            {['Design', 'Frontend', 'Crypto'].map((category) => {
              return (
                <CategoryPill
                  key={category}
                  onClick={() => {
                    values.push(category);
                  }}
                  text={category}
                />
              );
            })}
          </HStack> */}
        </VStack>
      </HStack>
      {error && isTouched ? (
        <Text color="primary.400" mt={2} w="100%">
          {error}
        </Text>
      ) : null}
    </VStack>
  );
}

export default Category;
