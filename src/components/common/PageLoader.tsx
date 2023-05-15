import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

function PageLoader() {
  return (
    <Center mt="20%">
      <Spinner />
    </Center>
  );
}

export default PageLoader;
