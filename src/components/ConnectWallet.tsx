import {
  Button,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useDisclosure,
  useClipboard,
  useToast,
  Box
} from '@chakra-ui/react';
import {
  useAddress,
  useDisconnect,
  useLogin,
  useLogout,
  metamaskWallet,
  useUser,
  useBalance,
  useConnect,
  coinbaseWallet,
  walletConnect
} from '@thirdweb-dev/react';

import MetamaskLogo from '@/assets/svgs/metamask-logo.svg';
import WalletConnectLogo from '@/assets/svgs/walletconnect-logo.svg';
import CoinbaseLogo from '@/assets/svgs/coinbase-logo.svg';
import MagicLinkLogo from '@/assets/svgs/magiclink-logo.svg';
import { ChevronDownIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import EmailLoginModal from './modals/EmailLoginModal';
import { useEffect } from 'react';
import truncateAddress from '@/utils/truncateAddress';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';

const ConnectWallet = () => {
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectWithMetamask = metamaskWallet();
  const connectWithCoinbase = coinbaseWallet();
  const connectWithWalletConnect = walletConnect();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { isLoggedIn, user } = useUser();
  const toast = useToast();

  const { data } = useBalance(NATIVE_TOKEN_ADDRESS);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, hasCopied } = useClipboard(user?.address!);

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Wallet Address Copied to clipboard',
        status: 'info',
        isClosable: true,
        position: 'top'
      });
    }
  }, [hasCopied, toast]);

  useEffect(() => {
    if (user?.address) {
      onClose();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box>
      {isLoggedIn ? (
        <Menu>
          <MenuButton
            rounded={10}
            borderWidth={1}
            borderColor="primary.500"
            color="primary.300"
            bg="transparent"
            as={Button}
            _hover={{
              bg: 'primary.200',
              color: 'primary.400'
            }}
            _active={{
              bg: 'primary.200'
            }}
            minW="200px"
            gap={-6}
            display="flex"
            justifyContent={'space-evenly'}
            rightIcon={<ChevronDownIcon />}
            leftIcon={<UnlockIcon />}
          >
            <Text fontSize={12} gap={'inherit'} w="100%" color="inherit">
              {data && Number(data?.displayValue).toFixed(4)}
            </Text>
            <Text gap={'inherit'} fontSize={12} w="100%" color="inherit">
              {isLoggedIn ? truncateAddress(user?.address!) : ''}
            </Text>
          </MenuButton>
          <MenuList
            // p={2}
            bg="white"
          >
            <MenuItem
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
              onClick={() => {
                // @ts-ignore
                onCopy();
              }}
            >
              Copy Address
            </MenuItem>
            <MenuItem
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
              onClick={() => {
                logout();
                disconnect();
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : address ? (
        <Button
          rounded={10}
          bg="primary.400"
          color="white"
          as={Button}
          _hover={{
            bg: 'primary.500'
          }}
          _active={{
            bg: 'primary.500'
          }}
          minW="200px"
          gap={-6}
          justifyContent={'space-evenly'}
          onClick={() => login()}
        >
          <Icon textAlign={'left'} as={LockIcon} />
          <Text gap={'inherit'} w="100%">
            Sign In
          </Text>
        </Button>
      ) : (
        <Menu size={'lg'}>
          <MenuButton
            rounded={10}
            bg="primary.400"
            color="white"
            as={Button}
            _hover={{
              bg: 'primary.500'
            }}
            _active={{
              bg: 'primary.500'
            }}
            minW="200px"
            rightIcon={<ChevronDownIcon />}
          >
            Connect Wallet
          </MenuButton>
          <MenuList
            // p={2}
            bg="white"
            // background={'red.400'}
            // color="whatsapp.100"
          >
            <MenuItem
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
              onClick={() => connect(connectWithMetamask)}
            >
              <Image src={MetamaskLogo} alt="Metamask" pr={2} /> MetaMask
            </MenuItem>
            <MenuItem
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
              onClick={() => connect(connectWithWalletConnect)}
            >
              <Image src={WalletConnectLogo} alt="WalletConnect" pr={2} />{' '}
              WalletConnect
            </MenuItem>
            <MenuItem
              onClick={() => connect(connectWithCoinbase)}
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
            >
              <Image src={CoinbaseLogo} alt="Coinbase" pr={2} /> Coinbase Wallet
            </MenuItem>
            <MenuItem
              onClick={onOpen}
              bg="white"
              _hover={{ bg: 'primary.300', color: 'black' }}
            >
              <Image src={MagicLinkLogo} alt="MagicLink" pr={2} /> Email Sign In
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <EmailLoginModal onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default ConnectWallet;
