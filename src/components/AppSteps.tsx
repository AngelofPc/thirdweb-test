import { ArrowForwardIcon, ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Text, Icon } from '@chakra-ui/react';
import React from 'react';

type AppStepsType = {
  status: string;
  id: number | string;
  heading: string;
  description: string;
};

function AppSteps({ steps }: { steps: AppStepsType[] }) {
  return (
    <Box>
      {steps.map(({ status, id, heading, description }) => {
        return (
          <Box
            key={id}
            my={2}
            // px={10}
            className="step"
            display="flex"
            flexDirection={'row'}
            justifyContent="flex-start"
            bg="cream"
            minH={'3.5em'}
            position={'relative'}
            __css={{
              '&:last-child .circle:after': {
                display: 'none'
              },
              '& + &': {
                mt: '0.5em'
              },
              '& > div:first-child': {
                position: 'static',
                h: 0
              },
              '& > div:not(first-child)': {
                pr: '0.5em'
              }
            }}
          >
            <Box>
              <Box
                className="circle"
                my={2}
                position="relative"
                zIndex={1121}
                bg={status !== 'completed' ? 'dark.400' : 'primary.400'}
                borderColor={status === 'empty' ? 'grey.100' : 'primary.400'}
                borderWidth={3}
                borderRadius={'100%'}
                w={'2.5em'}
                h={'2.5em'}
                _after={{
                  content: '"  "',
                  position: 'absolute',
                  display: 'block',
                  top: '2px',
                  right: '50%',
                  left: '50%',
                  bottom: 1,
                  //   bottom: '1px',
                  height: 'full',
                  width: '1px',
                  transform: 'scale(1, 2)',
                  transformOrigin: '50% -100%',
                  //   bg: 'green'
                  bg: 'grey.500',
                  zIndex: -10
                }}
                alignItems="center"
                // mx={'auto'}
                display="flex"
                justifyContent={'center'}
                // p={2}
              >
                {status == 'empty' ? (
                  <Box
                    w={'1.2em'}
                    h="1.2em"
                    borderWidth={2}
                    borderColor="grey.100"
                    rounded={100}
                  />
                ) : (
                  <Icon
                    color={status === 'completed' ? 'white' : 'primary.400'}
                    boxSize={status === 'completed' ? 5 : 6}
                    as={status === 'completed' ? CheckIcon : ArrowForwardIcon}
                  />
                )}
              </Box>
              {/* <Box
                className="line"
                zIndex={1}
                top={status !== 'empty' ? 23 : 0}
                left={'50%'}
                height={status !== 'empty' ? '100%' : '100%'}
                position="absolute"
                borderLeftWidth={'2px'}
                borderLeftColor={'grey.300'}
              /> */}
            </Box>
            <Box ml={2} display="inline-block">
              <Text fontSize={16} color='primary.100'>{heading}</Text>
              <Text fontSize={12} color='primary.100'>{description}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default AppSteps;
