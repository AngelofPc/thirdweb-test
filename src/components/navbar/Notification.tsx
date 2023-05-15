import { BellIcon } from '@chakra-ui/icons';
import {
  Box,
  Text,
  Button,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack
} from '@chakra-ui/react';
import React, { useRef } from 'react';

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        as="a"
        fontSize="sm"
        fontWeight={400}
        variant="link"
        href="#"
      >
        <Icon color="#D6D6D6" w={5} h={5} as={BellIcon} />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg="dark.400">
          <DrawerCloseButton mt="10px" w="30px" border="0px" bg="none" />
          <DrawerHeader fontSize="normal" fontWeight="normal">
            Notifications
          </DrawerHeader>

          <DrawerBody>
            <VStack w="full" align="flex-start">
              <Box color="grey.300" pt="25px">
                <Text fontSize="12px" fontWeight="medium">
                  LATEST
                </Text>
              </Box>
              <VStack
                w="full"
                borderBottomWidth="1px"
                color="grey.600"
                pt="12px"
                align="flex-start"
                spacing="0px"
              >
                <Text fontSize="15px" fontWeight="medium">
                  Client payment received successfully
                </Text>
                <Text fontSize="13px">NEUE world X Stitchain - UI / UX</Text>
                <Box color="grey.300" py="8px">
                  <Text fontSize="12px">2 months ago</Text>
                </Box>
              </VStack>

              <VStack
                w="full"
                borderBottomWidth="1px"
                color="grey.600"
                pt="12px"
                align="flex-start"
                spacing="0px"
              >
                <Text fontSize="15px" fontWeight="medium">
                  Client payment received successfully
                </Text>
                <Text fontSize="13px">NEUE world X Stitchain - UI / UX</Text>
                <Box color="grey.300" py="8px">
                  <Text fontSize="12px">2 months ago</Text>
                </Box>
              </VStack>

              <Box color="grey.300" pt="25px">
                <Text fontSize="12px" fontWeight="medium">
                  EARLIER
                </Text>
              </Box>

              <VStack
                w="full"
                borderBottomWidth="1px"
                color="grey.600"
                pt="12px"
                align="flex-start"
                spacing="0px"
              >
                <Text fontSize="15px" fontWeight="medium">
                  Client payment received successfully
                </Text>
                <Text fontSize="13px">NEUE world X Stitchain - UI / UX</Text>
                <Box color="grey.300" py="8px">
                  <Text fontSize="12px">2 months ago</Text>
                </Box>
              </VStack>

              <VStack
                w="full"
                borderBottomWidth="1px"
                color="grey.600"
                pt="12px"
                align="flex-start"
                spacing="0px"
              >
                <Text fontSize="15px" fontWeight="medium">
                  Client payment received successfully
                </Text>
                <Text fontSize="13px">NEUE world X Stitchain - UI / UX</Text>
                <Box color="grey.300" py="8px">
                  <Text fontSize="12px">2 months ago</Text>
                </Box>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notification;
