import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect } from 'react';

import ConnectWallet from '../ConnectWallet';
import Notification from '../navbar/Notification';
import LayersLogo from '@/assets/svgs/mainLogo.svg';
import { AuthInterceptor } from '@/utils/AuthInterceptor';

// import { useAccount, useDisconnect } from 'wagmi';
// import { ConnectKitButton } from 'connectkit';

interface NavItem {
  label: string;
  // subLabel?: string;
  // children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Templates',
    href: '/'
    // children: [
    // {
    //   label: 'Explore Design Work',
    //   subLabel: 'Trending Design to inspire you',
    //   href: '#',
    // },
    // {
    //   label: 'New & Noteworthy',
    //   subLabel: 'Up-and-coming Designers',
    //   href: '#',
    // },
    // ],
  },
  // {
  //   label: 'New Template',
  //   href: '/template/new'
  // },
  {
    label: 'My Contracts',
    href: '/my-contracts'
  },
  {
    label: 'New Contract',
    href: '/contract/new'
    // children: [
    //   {
    //     label: 'Job Board',
    //     subLabel: 'Find your dream design job',
    //     href: '#',
    //   },
    //   {
    //     label: 'Freelance Projects',
    //     subLabel: 'An exclusive list for contract work',
    //     href: '#',
    //   },
    // ],
  },
  {
    label: 'Users',
    href: '#'
  }
];

const DesktopSubNav = ({ label, href }: NavItem) => {
  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          {/* <Text fontSize="sm">{subLabel}</Text> */}
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

interface DesktopNavType {
  label: string;
  children?: Array<NavItem>;
  href?: string;
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.200', 'gray.200');
  const linkHoverColor = useColorModeValue('primary.400', 'primary.400');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map(({ children, href, label }: DesktopNavType) => (
        <Box key={label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                opacity={0.4}
                _active={{
                  opacity: 1
                }}
                _hover={{
                  opacity: 1,
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: linkHoverColor
                }}
              >
                {label}
              </Link>
            </PopoverTrigger>

            {children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

interface MobileNavType {
  label: string;
  children?: Array<NavItem>;
  href?: string;
}

const MobileNavItem = ({ label, children, href }: MobileNavType) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href || '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="10px"
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  // const { isOpen } = useDisclosure();
  // const btnRef = useRef(null);

  // const { disconnect } = useDisconnect();
  // const { address, isConnected } = useAccount();
  const address = useAddress();

  // console.log(address);

  useEffect(() => {
    AuthInterceptor();
  }, [address]);

  return (
    <Box bg="dark.400">
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        borderBottom={0.1}
        color={useColorModeValue('grey.200', 'grey.200')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 2, md: 10 }}
        borderStyle="solid"
        borderColor="white"
        align="center"
      >
        <Flex
          // flex={{ base: 1, md: 'auto' }}
          // ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex flex={{ base: 1 }} p={{ base: 0 }}>
          <Image src={LayersLogo} alt="logo" />

          <Flex
            w="full"
            display={{ base: 'none', md: 'flex' }}
            ml={10}
            justify="center"
            alignItems="center"
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          w="fit-content"
          direction="row"
          spacing={{ base: 3, lg: 6 }}
        >
          <Notification />
          <ConnectWallet />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
