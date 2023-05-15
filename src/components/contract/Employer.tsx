import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Text,
  VStack,
  Input,
  Center,
  Flex
} from '@chakra-ui/react';
import { useUser } from '@thirdweb-dev/react';
import { isAddress } from 'ethers/lib/utils';
import { Field } from 'formik';
import { useEffect, useState } from 'react';

import AccordionCard from '../cards/AccordionCard';
import type { IAuthor } from '@/pages/contracts/types';
import truncateAddress from '@/utils/truncateAddress';

const Employer = ({
  values,
  setFieldValue,
  isTouched,
  error
}: {
  values: IAuthor;
  // isTouched?: FormikTouched<{ walletAddress: string; role: string }>;
  // error?: FormikErrors<{ walletAddress: string; role: string }>;
  isTouched?: boolean;
  error?: string;
  setFieldValue: (
    field: string,
    value: string | undefined,
    shouldValidate?: boolean
  ) => void;
}) => {
  const [party, setParty] = useState(['Freelancer', 'Employer']);

  const { user } = useUser();

  const changeFreelancer = () => {
    setFieldValue('guest.role', 'worker');
    setParty(['Freelancer', 'Employer']);
  };

  const changeEmployer = () => {
    setFieldValue('guest.role', 'client');
    setParty(['Employer', 'Freelancer']);
  };

  useEffect(() => {
    setFieldValue('walletAddress', user?.address);
    // eslint-disable-next-line
  }, [user?.address]);

  return (
    <AccordionCard
      borderWidth={isTouched && error ? 2 : 0}
      title="Select Employer"
      description="Here you select the employer"
      showElementIfClosed={
        values?.guestAddress !== '' && (
          <Flex
            w="full"
            borderTopWidth="1px"
            borderColor="#D6D6D6"
            fontSize="14px"
            gap={{ base: '15px', xl: '40px' }}
            pt="20px"
            direction={{ base: 'column', xl: 'row' }}
          >
            <Flex
              direction={{ base: 'column', xl: 'row' }}
              gap={{ base: '5px', xl: '10px' }}
            >
              <HStack>
                <Center
                  border="2px"
                  borderColor="#FF5500"
                  w="20px"
                  h="20px"
                  borderRadius="50%"
                >
                  <CheckIcon color="#FF5500" fontSize="12px" />
                </Center>
                <Text
                  display={{ base: 'none', xl: 'initial' }}
                  fontWeight="700"
                >
                  First Party ({party[0]}):
                </Text>
                <Text display={{ xl: 'none' }} fontWeight="700">
                  First Party ({party[0]})
                </Text>
                s
              </HStack>

              <Text>Denis Brown</Text>
            </Flex>

            <Flex
              direction={{ base: 'column', xl: 'row' }}
              gap={{ base: '5px', xl: '10px' }}
            >
              <HStack>
                <Center
                  border="2px"
                  borderColor="#FF5500"
                  w="20px"
                  h="20px"
                  borderRadius="50%"
                >
                  <CheckIcon color="#FF5500" fontSize="12px" />
                </Center>
                <Text
                  display={{ base: 'none', xl: 'initial' }}
                  fontWeight="700"
                >
                  Second Party ({party[1]}):
                </Text>
                <Text display={{ xl: 'none' }} fontWeight="700">
                  Second Party ({party[1]})
                </Text>
              </HStack>

              <Text>Phillip Price</Text>
            </Flex>
          </Flex>
        )
      }
      error={isTouched && error ? error : null}
    >
      <VStack
        w="full"
        align="flex-start"
        border="1px"
        borderColor="#D6D6D6"
        borderRadius="10px"
        spacing="0"
        fontSize="14px"
        display={{ base: 'none', xl: 'initial' }}
      >
        <HStack
          w="full"
          borderBottom="1px"
          borderColor="#D6D6D6"
          pl="10px"
          h="60px"
        >
          <HStack
            w="33%"
            h="full"
            py="15px"
            borderColor="#D6D6D6"
            borderRightWidth="1px"
            spacing="10px"
          >
            <Box fontWeight="700">First Party</Box>
            <Box pt="1px">
              <Text
                px="5px"
                borderRadius="15px"
                fontSize="9px"
                fontWeight="700"
                color="#B83D00"
                borderWidth="2px"
                borderColor="#B83D00"
              >
                YOU
              </Text>
            </Box>
          </HStack>

          <Box w="33%" py="15px" borderColor="#D6D6D6" borderRightWidth="1px">
            <HStack w="full" justify="space-between" pr="5px">
              <Text>{party[0]}</Text>

              <VStack spacing="-2px">
                <ChevronUpIcon
                  color="#004F4D"
                  fontSize="18px"
                  onClick={changeFreelancer}
                  cursor="pointer"
                  p="0"
                  boxSize="4"
                />

                <ChevronDownIcon
                  color="#004F4D"
                  fontSize="18px"
                  onClick={changeEmployer}
                  cursor="pointer"
                  p="0"
                  boxSize="4"
                />
              </VStack>
            </HStack>
          </Box>

          <Box w="34%" py="15px" color="#B83D00" fontWeight="500">
            {truncateAddress(user?.address || '')}
          </Box>
        </HStack>

        <HStack w="full" pl="10px" h="60px">
          <Box
            w="33%"
            py="15px"
            borderColor="#D6D6D6"
            borderRightWidth="1px"
            fontWeight="700"
            h="full"
          >
            Second Party
          </Box>

          <Box
            w="33%"
            h="full"
            py="15px"
            borderColor="#D6D6D6"
            borderRightWidth="1px"
          >
            {party[1]}
          </Box>

          <Box w="34%" py="15px" color="#D6D6D6" pr="10px">
            <Field
              as={Input}
              id="guest.walletAddress"
              name="guest.walletAddress"
              type="text"
              variant="unstyled"
              color="black"
              fontSize="14px"
              placeholder="Enter Wallet Address"
              _placeholder={{ color: 'grey' }}
              validate={(value: string) => {
                let err;
                if (value && !isAddress(value)) {
                  err = `Second party address is not valid`;
                }

                if (value === user?.address) {
                  err = `Employer and freelancer cannot be the same`;
                }
                return err;
              }}
              onChange={(e: { target: { value: string } }) => {
                setFieldValue(`guest.walletAddress`, e.target.value);
              }}
              onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </Box>
        </HStack>
      </VStack>

      {/* mobile view */}
      <Box w="full" pt="20px" display={{ xl: 'none' }}>
        <VStack
          w="full"
          align="flex-start"
          border="1px"
          borderColor="#D6D6D6"
          borderRadius="10px"
          spacing="0px"
          fontSize="14px"
          p={0}
        >
          <HStack w="full" h="50px" borderBottom="1px" borderColor="#D6D6D6">
            <HStack
              w="50%"
              h="full"
              py="20px"
              pl="10px"
              borderColor="#D6D6D6"
              borderRightWidth="1px"
              spacing="10px"
            >
              <Box fontWeight="700">First Party</Box>
              <Box pt="1px">
                <Text
                  px="5px"
                  borderRadius="15px"
                  fontSize="9px"
                  fontWeight="700"
                  color="#B83D00"
                  borderWidth="2px"
                  borderColor="#B83D00"
                >
                  YOU
                </Text>
              </Box>
            </HStack>

            <Box w="50%" py="15px" fontWeight="700" h="full">
              Second Party
            </Box>
          </HStack>

          <HStack w="full" h="50px" borderBottom="1px" borderColor="#D6D6D6">
            <Box
              w="50%"
              pl="10px"
              py="20px"
              borderColor="#D6D6D6"
              borderRightWidth="1px"
            >
              <HStack w="full" justify="space-between" pr="5px">
                <Text>{party[0]}</Text>

                <VStack>
                  <ChevronUpIcon
                    color="#004F4D"
                    fontSize="18px"
                    onClick={changeFreelancer}
                    cursor="pointer"
                    p="0"
                    boxSize="4"
                  />

                  <ChevronDownIcon
                    color="#004F4D"
                    fontSize="18px"
                    onClick={changeEmployer}
                    cursor="pointer"
                    p="0"
                    boxSize="4"
                  />
                </VStack>
              </HStack>
            </Box>

            <Box w="50%" h="full" py="15px">
              {party[1]}
            </Box>
          </HStack>

          <HStack w="full" h="50px">
            <Box
              w="50%"
              h="full"
              borderColor="#D6D6D6"
              borderRightWidth="1px"
              py="20px"
              pl="10px"
              color="#B83D00"
              fontWeight="500"
            >
              {truncateAddress(user?.address || '')}
            </Box>

            <Box w="50%" py="20px" color="#D6D6D6" pr="10px">
              <Field
                as={Input}
                id="guest.walletAddress"
                name="guest.walletAddress"
                type="text"
                variant="unstyled"
                color="black"
                fontSize="14px"
                placeholder="Enter Wallet Address"
                _placeholder={{ color: 'grey' }}
                onChange={(e: { target: { value: string } }) => {
                  setFieldValue(`guest.walletAddress`, e.target.value);
                }}
              />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </AccordionCard>
  );
};

export default Employer;
