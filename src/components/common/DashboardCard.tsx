// no sonarjs/no-duplicate-string
import { ArrowUpIcon } from '@chakra-ui/icons';
import {
  Text,
  VStack,
  Button,
  Image,
  Center,
  Box,
  HStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import hours from '@/assets/svgs/hoursdark.svg';
import type { IAuthor } from '@/pages/contracts/types';
import { StatusType } from '@/pages/contracts/types';

const DashboardCard = ({
  // status,
  isAuthor,
  address,

  created,
  title,
  tag1,
  tag2,

  guest,
  author,
  contractStatus,
  slug
}: {
  // status?: string;
  isAuthor?: boolean;
  contractStatus?: string;
  address?: string;

  created?: string;
  title?: string;
  tag1?: string;
  tag2?: string;
  author?: IAuthor;
  guest?: IAuthor;
  slug?: string;
}) => {
  const [buttonText, setButtonText] = useState('');
  const [nextPage, setNextPage] = useState<'contract' | 'escrow'>('contract');

  const THEMES = {
    'light-yellow': 'light-yellow',
    blue: 'blue',
    white: 'white',
    'red-gradient': 'red-gradient',
    transparent: 'transparent'
  };

  const [cardTheme, setCardTheme] = useState(THEMES.blue);
  // useEffect(() => {
  //   console.log(contractStatus);

  //   if (
  //     contractStatus === StatusType.created ||
  //     contractStatus === StatusType.received ||
  //     contractStatus === StatusType.edited
  //   ) {
  //     setStatus('under-review');
  //   } else if (contractStatus === StatusType.deployed) {
  //     setStatus('awaiting');
  //   } else if (
  //     contractStatus === StatusType.paid ||
  //     contractStatus === StatusType.progress
  //   ) {
  //     setStatus('inProgress');
  //   }
  //   // else {
  //   //   setStatus(contractStatus);
  //   // }
  // }, [contractStatus]);
  const navigate = useNavigate();

  // TODO: rewrite this, no duplicates
  useEffect(() => {
    // if you're the author
    if (isAuthor) {
      if (contractStatus === StatusType.created) {
        setButtonText('awaiting edit');
      } else if (contractStatus === StatusType.deployed) {
        setCardTheme(THEMES['light-yellow']);
        if (author?.role === 'worker') {
          setButtonText('awaiting funding');
        } else {
          setButtonText('Fund escrow');
        }
        setNextPage('escrow');
      } else if (contractStatus === StatusType.edited) {
        setButtonText('review');
      } else if (contractStatus === StatusType.reviewed) {
        setButtonText('Sign Contract');
      } else if (contractStatus === StatusType.cosigned) {
        setButtonText('Deploy Now');
      } else if (contractStatus === StatusType.progress) {
        setCardTheme(THEMES['red-gradient']);
        setNextPage('escrow');
      } else if (contractStatus === 'isNew') {
        setButtonText('Create Now');
        setCardTheme('transparent');
        setNextPage('contract');
      } else if (
        contractStatus === StatusType.signed &&
        author?.signature !== ''
      ) {
        setButtonText('Awaiting Signature');
      } else {
        setButtonText('open');
      }
    } else if (contractStatus === StatusType.created) {
      setButtonText('edit');
    } else if (contractStatus === StatusType.deployed) {
      if (guest?.role === 'worker') {
        setButtonText('awaiting funding');
      } else {
        setButtonText('fund escrow');
      }
      setNextPage('escrow');
    } else if (contractStatus === StatusType.edited) {
      setButtonText('awaiting review');
    } else if (contractStatus === StatusType.cosigned) {
      setButtonText('awaiting deployment');
    } else if (contractStatus === StatusType.reviewed) {
      setButtonText('Sign Contract');
    } else if (contractStatus === StatusType.progress) {
      setCardTheme(THEMES['red-gradient']);
      setNextPage('escrow');
    } else if (contractStatus === 'isNew') {
      setButtonText('Create Now');
      setNextPage('contract');
      setCardTheme('transparent');
    } else if (contractStatus === StatusType.signed && guest?.signature) {
      setButtonText('Awaiting Signature');
    } else if (
      contractStatus === StatusType.signed &&
      author?.signature !== ''
    ) {
      setButtonText('Sign Contract');
    } else {
      setButtonText('open');
    }
    // eslint-disable-next-line
  }, [isAuthor, contractStatus]);

  return (
    <VStack
      p="20px"
      borderWidth={buttonText === 'Create Now' ? '1px' : ''}
      borderRadius="8px"
      borderStyle="dashed"
      minH="200px"
      maxW={{ base: 'full', xl: 280 }}
      align="flex-start"
      justify="space-between"
      bg={
        cardTheme === THEMES['red-gradient']
          ? 'linear-gradient(89.25deg, #FF5500 -23.75%, #B53305 97.59%)'
          : cardTheme === THEMES['light-yellow']
          ? 'primary.100'
          : cardTheme === 'white'
          ? 'white'
          : cardTheme === 'blue'
          ? 'blue.600'
          : ''
      }
      color={buttonText.includes('awaiting') ? 'dark.400' : 'white'}
      borderColor="primary.500"
    >
      {contractStatus === 'isNew' ? (
        <>
          <Box>
            <Text fontSize="12px">It&apos;s time to make some money</Text>
            <Text fontWeight="medium" fontSize="18px">
              Create a new Contract
            </Text>
          </Box>
          <Text fontSize="12px">
            Creating a contract is easy, make sure to have the wallet address of
            the other party.
          </Text>
        </>
      ) : (
        <VStack align="flex-start" spacing="3px">
          {tag1 && tag2 && (
            <HStack
              color={
                cardTheme === THEMES['red-gradient']
                  ? 'white'
                  : cardTheme !== 'blue'
                  ? 'dark.400'
                  : 'grey.600'
              }
              fontSize="9px"
              fontWeight="medium"
              textTransform="uppercase"
            >
              <Box
                borderWidth="1px"
                borderColor={
                  cardTheme === THEMES['red-gradient']
                    ? 'white'
                    : cardTheme !== 'blue'
                    ? 'dark.400'
                    : 'grey.600'
                }
                rounded={30}
                px="8px"
                py="4px"
              >
                <Text>{tag1} </Text>
              </Box>
              <Box
                borderWidth="1px"
                borderColor={
                  cardTheme === THEMES['red-gradient']
                    ? 'white'
                    : cardTheme !== 'blue'
                    ? 'dark.400'
                    : 'grey.600'
                }
                rounded={30}
                px="8px"
                py="4px"
              >
                <Text>{tag2}</Text>
              </Box>
            </HStack>
          )}
          <VStack
            color={cardTheme === THEMES['light-yellow'] ? 'grey.400' : 'white'}
            align="flex-start"
          >
            <Text fontSize="12px" color="inherit">
              {created}
            </Text>
            <Text fontSize="18px" lineHeight="20px" color="inherit">
              {title}
            </Text>
            <Text fontSize="12px" color="inherit">
              {address}
            </Text>
          </VStack>
        </VStack>
      )}
      <Button
        type="button"
        rounded={30}
        px="17px"
        h="40px"
        borderWidth="1px"
        borderColor={
          cardTheme === THEMES['light-yellow'] ? 'grey.600' : 'white'
        }
        borderStyle={buttonText.includes('awaiting') ? 'dashed' : 'solid'}
        bg={cardTheme === THEMES['red-gradient'] ? 'white' : ''}
        w="full"
        onClick={() =>
          navigate(
            contractStatus === 'isNew'
              ? '/contract/new'
              : `/${nextPage}/${slug}`
          )
        }
      >
        <Center
          w="full"
          color={
            cardTheme === THEMES['red-gradient']
              ? 'primary.500'
              : cardTheme === THEMES['light-yellow']
              ? 'grey.400'
              : ''
          }
        >
          {buttonText.includes('awaiting') && <Image src={hours} w="16px" />}
          <Text fontSize="10px" textTransform="uppercase" px="10px">
            {buttonText}
          </Text>
          {(contractStatus === 'isNew' || !buttonText.includes('awaiting')) && (
            <ArrowUpIcon fontSize="19px" transform="rotate(45deg)" />
          )}
        </Center>
      </Button>
    </VStack>
  );
};

export default DashboardCard;
