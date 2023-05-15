import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react';
import { Field } from 'formik';

function TextInput({
  name,
  placeholder,
  touched,
  icon,
  error
}: {
  name: string;
  placeholder: string;
  icon: string;
  error: string | undefined;
  touched: boolean | undefined;
}) {
  return (
    <Box w="full">
      <InputGroup>
        <Field
          as={Input}
          name={name}
          variant="filled"
          borderRadius="10px"
          placeholder={placeholder}
          _placeholder={{
            fontSize: '14px'
          }}
          w="full"
          size="lg"
          type="text"
          borderWidth={error && touched ? 2 : 0}
          borderColor="primary.400"
        />

        <InputRightElement pt="10px">
          <Image src={icon} w="20px" />
        </InputRightElement>
      </InputGroup>
      {error && touched && (
        <Text alignSelf="flex-start" fontSize={14} color="red.300">
          {placeholder} is required.
        </Text>
      )}
    </Box>
  );
}
export default TextInput;
