import { AddIcon, InfoOutlineIcon, MinusIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

const AccordionCard = ({
  title,
  description,
  children,
  showElementIfClosed,
  position,
  error,
  borderWidth
}: {
  borderWidth?: number;
  error?: string | null;
  description: string;
  title: string;
  children: ReactNode;
  position?: number;
  showElementIfClosed: ReactNode;
}) => {
  return (
    <AccordionItem
      borderWidth={borderWidth ?? 0}
      borderColor={borderWidth ? 'primary.400' : 'transparent'}
      w="full"
      borderRadius="20px"
      px={{ md: '40px', base: 4 }}
      pb={{ md: '40px', base: 6 }}
      pt={{ md: '30px', base: 4 }}
      bg="white"
      color="black"
      mb="24px"
    >
      {({ isExpanded }) => (
        <>
          <VStack align="flex-start" spacing="20px" w="full">
            <VStack w="full" spacing="10px">
              <AccordionButton _hover={{ bg: 'none' }} p={0}>
                <VStack spacing="10px" w="full">
                  <HStack
                    fontSize="20px"
                    fontWeight="bold"
                    justify="space-between"
                    w="full"
                    pr="5px"
                  >
                    <HStack>
                      {position && <Text>{position}.</Text>}
                      <Text>{title}</Text>
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
                    justify="space-between"
                    pb="0px"
                    display={{ base: 'none', md: 'flex' }}
                  >
                    <HStack lineHeight="20px" spacing="20px">
                      {!position && <InfoOutlineIcon />}

                      <Text textAlign="start" fontSize="14px">
                        {description}
                      </Text>
                    </HStack>

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
                  </HStack>
                </VStack>
              </AccordionButton>
            </VStack>
            {!isExpanded && showElementIfClosed}
          </VStack>

          <AccordionPanel p={0}>
            <VStack w="full" spacing="0px" pt="10px" align="flex-start">
              <HStack
                lineHeight="20px"
                spacing="20px"
                display={{ base: 'flex', md: 'none' }}
                w="full"
              >
                {!position && <InfoOutlineIcon />}

                <Text textAlign="start" fontSize="14px">
                  {description}
                </Text>
              </HStack>

              {children}
            </VStack>
          </AccordionPanel>
          {!isExpanded && error ? (
            <Text color="primary.400" mt={2}>
              {error}
            </Text>
          ) : null}
        </>
      )}
    </AccordionItem>
  );
};

export default AccordionCard;
