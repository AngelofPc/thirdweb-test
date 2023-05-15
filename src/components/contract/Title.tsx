import { Box, Input, Text } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

const Title = ({
  isEditable,
  isTouched,
  error
}: {
  isEditable: boolean;
  isTouched?: boolean;
  error?: string;
}) => {
  return (
    <Box
      w="full"
      borderRadius="20px"
      // px={{ base: '15px', xl: '40px' }}
      p={{ base: '15px', xl: '40px' }}
      bg="white"
      color="black"
      mb="24px"
      borderWidth={isTouched && error ? 2 : 0}
      borderColor="primary.400"
    >
      <Field
        onKeyDown={(e: { key: string; preventDefault: () => void }) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        isReadOnly={!isEditable}
        as={Input}
        id="title"
        name="title"
        variant="filled"
        type="text"
        borderColor="#D6D6D6"
        borderWidth="1px"
        color="black"
        borderRadius="11px"
        h="60px"
        p="15px"
        focusBorderColor="dark.400"
        fontWeight="bold"
        fontSize="24px"
        placeholder="Title of Contract"
        _placeholder={{ color: 'grey' }}
      />
      {error && isTouched ? (
        <Text color="primary.400" mt={2}>
          {error}
        </Text>
      ) : null}
    </Box>
  );
};

export default Title;
