import { Box, HStack, Image, Text, Center } from '@chakra-ui/react';
import { useAddress, ConnectWallet as Connect } from '@thirdweb-dev/react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import ConnectWallet from '../ConnectWallet';
import LayersLogo from '@/assets/svgs/mainLogo.svg';
import { AuthInterceptor } from '@/utils/AuthInterceptor';

import MobileNavigation from './mobileNav';
import Notification from './Notification';

const MainNav = () => {
  const address = useAddress();

  useEffect(() => {
    AuthInterceptor();
  }, [address]);

  const location = useLocation();

  return (
    <HStack
      w="full"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="#D6D6D6"
      minH="60px"
      py="10px"
      px={{ base: '20px', xl: '40px' }}
    >
      <Box w="33%">
        <Image src={LayersLogo} />
      </Box>

      {location.pathname.includes('contract') ||
      location.pathname.includes('new') ||
      location.pathname.includes('escrow') ||
      location.pathname.includes('dashboard') ? (
        <HStack
          spacing="60px"
          w="34%"
          justify="center"
          color="grey.200"
          display={{ base: 'none', xl: 'flex' }}
        >
          <Box
            _hover={{
              color: 'primary.400',
              transition: '0.2s ease-in-out'
            }}
            fontSize="15px"
          >
            <Link to="/">
              <Text fontWeight="medium">Layers</Text>
            </Link>
          </Box>

          <Box
            _hover={{
              color: 'primary.400',
              transition: '0.2s ease-in-out'
            }}
          >
            <Link to="/templates">
              <Text fontWeight="medium">Templates</Text>
            </Link>
          </Box>

          <Box>
            <Text fontWeight="medium" fontSize="15px">
              Clients
            </Text>
          </Box>
        </HStack>
      ) : (
        ''
      )}

      {location.pathname.includes('welcome') ? (
        <HStack
          justify="flex-end"
          w={{ base: 'full', xl: '33%' }}
          fontSize="14px"
        >
          <Text as="span">
            Already have an account?{' '}
            <Text as="span" textDecor="underline" color="primary.400">
              {' '}
              Login
            </Text>
          </Text>
        </HStack>
      ) : (
        <HStack spacing="15px" w="33%" justify="flex-end">
          <Center
            w="30px"
            h="30px"
            borderRadius="50%"
            borderWidth="1px"
            borderColor="#D6D6D6"
          >
            <Notification />
          </Center>

          <Center
            display={{ base: 'flex', xl: 'none' }}
            w="30px"
            h="30px"
            borderRadius="50%"
            borderWidth="1px"
            borderColor="#D6D6D6"
          >
            <MobileNavigation />
          </Center>

          {/* <ConnectWallet /> */}
          <Box display={{ base: 'none', xl: 'initial' }} p="0px" h="40px">
            <Connect
              className="customConnectButton"
              theme="dark"
              auth={{
                loginOptional: false
              }}
            />
          </Box>
        </HStack>
      )}
    </HStack>
  );
};

export default MainNav;
