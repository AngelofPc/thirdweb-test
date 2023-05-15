import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Center, HStack, Text } from '@chakra-ui/react';

const CategoryPill = ({
  text,
  isNew,
  onClick,
  isAdded
}: {
  text: string;
  isNew?: boolean;
  isAdded?: boolean;
  onClick?: () => void;
}) => {
  const firstColor = 'primary.400';
  const secondColor = 'white';
  const thirdColor = 'black';
  return (
    <Button
      onClick={onClick}
      rounded="15px"
      px="15px"
      h="40px"
      border="1px"
      bg={isAdded ? 'green.400' : 'transparent'}
      borderColor={isNew ? firstColor : isAdded ? 'green.400' : thirdColor}
      borderStyle={isNew ? 'dashed' : 'solid'}
      _hover={{
        bg: 'green.200',
        borderColor: 'green.200',
        color: 'white'
      }}
    >
      <HStack
        w="full"
        justify="center"
        spacing="10px"
        color={isNew ? firstColor : isAdded ? secondColor : thirdColor}
      >
        <Text fontWeight="normal" fontSize="14px">
          {text}
        </Text>
        <Center
          border="2px"
          p="2px"
          rounded="3px"
          color={isNew ? firstColor : isAdded ? secondColor : 'green'}
        >
          {isAdded ? (
            <MinusIcon fontSize="10px" />
          ) : (
            <AddIcon fontSize="10px" />
          )}
        </Center>
      </HStack>
    </Button>
  );
};

export default CategoryPill;
