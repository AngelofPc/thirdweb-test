import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ITemplate } from '../../utils/types';
import Navbar from '@/components/common/Navbar';
import TemplateCard from '@/components/common/TemplateCard';
import { useGetAllTemplatesQuery } from '@/redux/api/templates/templateApi';
import truncateAddress from '@/utils/truncateAddress';

// import StatusPill from '../../components/common/StatusPill';

function ViewAllTemplates() {
  const navigate = useNavigate();

  const { data: templates } = useGetAllTemplatesQuery();
  // const { data: user } = useGetUserQuery();

  // console.log(user);
  console.log('templates');

  useEffect(() => {
    console.log(templates);
  }, [templates]);

  return (
    <Container
      maxW="100vw"
      px={{ base: 5, '2xl': 10 }}
      bg={useColorModeValue('white', 'dark.400')}
      minH="100vh"
      pb="80px"
    >
      <Navbar />

      <Stack spacing={6} mt={10} direction={['column', 'row']} w="full">
        <HStack>
          <Heading>My Templates</Heading>
        </HStack>

        <HStack overflow={{ base: 'scroll', lg: 'initial' }}>
          <HStack ml={{ base: '0', lg: '3' }} spacing={2} w="max-content">
            {/* <StatusPill text="All" active />
            <StatusPill text="Drafts" active />
            <StatusPill text="Viewed" active={false} />
            <StatusPill text="In Review" active={false} />
            <StatusPill text="Approved" active={false} />
            <StatusPill text="Signed" active={false} /> */}
          </HStack>
        </HStack>
      </Stack>

      <Box mt={10}>
        <SimpleGrid minChildWidth="280px" spacing="30px">
          <TemplateCard
            isNewCard
            text="Start from scratch"
            action={() => navigate(`/contract/new`)}
          />
          {templates?.map((template: ITemplate) => {
            return (
              <TemplateCard
                key={template.templateId}
                name={
                  template?.author.walletAddress
                    ? truncateAddress(template?.author.walletAddress)
                    : '-'
                }
                date={new Date(template.createdAt).toDateString()}
                text={template.title}
                action={() => navigate(`/from-template/${template.slug}`)}
                // action={() =>
                //   navigate(
                //     user?.role === 'admin'
                //       ? `/template/${template.slug}`
                //       : `/from-template/${template.slug}`
                //   )
                // }
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export default ViewAllTemplates;
