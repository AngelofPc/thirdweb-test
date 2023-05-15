import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import arrowIcon from '@/assets/svgs/arrow.svg';
import checkIcon from '@/assets/svgs/check.svg';
import circleIcon from '@/assets/svgs/circle.svg';

const StepBox = ({
  status,
  title,
  isFirst,
  isLast,
  description
}: {
  status: string;
  title: string;
  description?: string;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  return (
    <HStack w="full" align="flex-start" spacing="20px">
      <VStack spacing="0px" h="full">
        <Box minH="10px" bgColor={isFirst ? '#222222' : 'gray.600'} w="1px" />
        <VStack
          borderRadius="50%"
          borderWidth="2px"
          borderColor={
            status === 'active' || status === 'current' ? '#FF5500' : 'gray.500'
          }
          h="32px"
          w="32px"
          bgColor={status === 'active' ? '#FF5500' : '#222222'}
          justify="center"
        >
          {status === 'active' && <Image src={checkIcon} w="17px" />}
          {status === 'current' && <Image src={arrowIcon} w="17px" />}
          {status === 'inactive' && <Image src={circleIcon} w="17px" />}
        </VStack>
        <Box
          minH="30px"
          bgColor="gray.600"
          w="1px"
          display={isLast ? 'none' : 'block'}
        />
      </VStack>

      <VStack
        pt="5px"
        spacing="4px"
        align="flex-start"
        color={
          status === 'active' || status === 'current'
            ? 'primary.100'
            : 'grey.100'
        }
      >
        <Text fontSize="14px" fontWeight="medium">
          {title}
        </Text>
        {!description && (
          <Text fontSize="12px" lineHeight="14px">
            Nostrum recusandae et harum nulla eum.
          </Text>
        )}
        <Text fontSize="12px" lineHeight="14px">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

export default StepBox;
