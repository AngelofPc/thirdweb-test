import { Center, Text } from '@chakra-ui/react';
import React from 'react';

const StatusPill = ({
  status,
  active
}: {
  status: string;
  active: boolean;
}) => {
  return (
    <Center
      borderWidth="1px"
      rounded={20}
      py="5px"
      minW="max-content"
      px="15px"
      borderColor="grey.200"
      bgColor={active ? '#222222' : 'initial'}
      opacity={active ? 1 : 0.6}
    >
      <Text fontSize="13px" color={active ? 'primary.100' : 'grey.100'}>
        {status}
      </Text>
    </Center>
  );
};

export default StatusPill;
