import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { useMagic } from '@thirdweb-dev/react/evm/connectors/magic';
import { useState } from 'react';

function EmailLoginModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const bg = useColorModeValue('light.500', 'dark.500');
  const textColor = useColorModeValue('black', 'white');

  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const connectWithMagic = useMagic();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader color={textColor}>Email Connect</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            bg="white"
            textColor="grey.100"
            _placeholder={{ color: ' grey.100' }}
            rounded={20}
            placeholder="Enter Email Address"
            onChange={(e) => {
              setShowEmailError(false);
              setEmail(e.target.value);
            }}
          />
          {showEmailError && (
            <Text textAlign="center" mt={2} color="red.300">
              Yo! Your email address is required!
            </Text>
          )}
          <Button
            variant="primary"
            w="100%"
            my={6}
            rounded={20}
            py={6}
            onClick={() => {
              if (!email) {
                return setShowEmailError(true);
              }
              connectWithMagic({ email, apiKey: 'pk_live_8C4442FA1CF3E6A8' });
              return setShowEmailError(false);
            }}
          >
            Sign In
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EmailLoginModal;
