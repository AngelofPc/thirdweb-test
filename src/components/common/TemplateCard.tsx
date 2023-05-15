import { gradients } from '@/theme/theme';
import { Box, Flex, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

function TemplateCard({
  isNewCard,
  date,
  text,
  name,
  action
}: {
  date?: string;
  text: string;
  heading?: string;
  name?: string;
  isNewCard?: boolean;
  action?: () => void;
}) {
  const boxBgColor = useColorModeValue('white', 'grey.400');
  const subTextColor = useColorModeValue('dark.400', 'grey.100');
  const textColor = useColorModeValue('dark.400', 'white');

  return (
    <Box
      bg={boxBgColor}
      rounded={6}
      bgGradient={isNewCard ? gradients.primary : ''}
      p={3}
      onClick={action}
    >
      <Flex
        alignItems={'flex-start'}
        justifyContent="space-between"
        flexDirection={'column'}
        minH="200px"
      >
        {isNewCard && (
          <Text color={'white'} fontSize={30}>
            +
          </Text>
        )}
        <VStack alignItems={'flex-start'}>
          {!isNewCard && <Text color={subTextColor}>{date}</Text>}
          <Text
            color={textColor}
            w={isNewCard ? '60%' : 'full'}
            fontSize={isNewCard ? 30 : 20}
          >
            {text}
          </Text>
        </VStack>
        {!isNewCard && <Text color={subTextColor}>{name}</Text>}
      </Flex>
    </Box>
  );
}

export default TemplateCard;
