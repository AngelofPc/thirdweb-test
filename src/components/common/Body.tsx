import { Container, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

// import Navbar from '@/components/common/Navbar';
import Nav from '@/components/navbar/mainNav';

function Body({ children }: { children: ReactNode }) {
  return (
    <Container variant={{ base: 'body-base', md: 'body-md' }}>
      <Nav />
      {/* <Navbar /> */}
      <Box w="full">{children}</Box>
    </Container>
  );
}

export default Body;
