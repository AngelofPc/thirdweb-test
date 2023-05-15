// import Navbar from '@/components/common/Navbar';
// import { gradients } from '@/theme/theme';
// import { ArrowForwardIcon } from '@chakra-ui/icons';
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Flex,
//   Heading,
//   HStack,
//   Progress,
//   Stack,
//   Text,
//   VStack,
//   Icon,
//   Center,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Image,
//   Textarea,
//   Spinner,
//   Input,
//   useColorModeValue
//   // Toast,
// } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import StatusPill from '../../components/common/StatusPill';
// import StepBox from '../../components/common/StepBox';
// import { Status } from '../../utils/types';
// import PlusIcon from '@/assets/svgs/plus.svg';
// import { useGetTemplateQuery } from '@/redux/api/templates/templateApi';
// import { useCreateContractMutation } from '@/redux/api/contracts/contractApi';
// import { useParams } from 'react-router-dom';
// import { diffWordsWithSpace } from 'diff';
// import { Formik, Form, FieldArray, Field } from 'formik';
// import { object, array, number, string } from 'yup';
// import PaymentTypes from '@/components/PaymentTypes';
// import arrow from '@/assets/svgs/date-drop.svg';
// import { BlockList } from 'net';

// import { useToast } from '@chakra-ui/react';
// import Contract from './contract';
// import { IRoleType } from './types';
// import { useAddress } from '@thirdweb-dev/react';

// function Template() {
//   const { slug } = useParams();
//   const {
//     data: template,
//     isFetching,
//     isLoading
//   } = useGetTemplateQuery(slug as string);

//   const [createContract, { isLoading: isUpdating, isSuccess, isError, error }] =
//     useCreateContractMutation();
//   const toast = useToast();

//   const docStatusObj = {
//     drafting: 'in drafts',
//     viewed: 'viewing',
//     'in review': 'reviewing',
//     approved: 'approved',
//     signed: 'signed'
//   };

//   const [docStatus, setDocStatus] = useState(docStatusObj.drafting);

//   const templateSchema = object().shape({
//     title: string(),
//     category: string(),
//     blocks: array().of(
//       object().shape({
//         heading: string(),
//         description: string(),
//         content: array().of(
//           object().shape({
//             text: string()
//             // _id: string(),
//           })
//         ),
//         payment: object().shape({
//           type: string(),
//           description: string(),
//           cost: number()
//         })
//       })
//     ),
//     duration: object().shape({
//       startDate: string()
//     })
//   });
//   const address = useAddress();

//   const headingColor = useColorModeValue('white', 'black');
//   const textColor = useColorModeValue('white', 'grey.100');

//   useEffect(() => {
//     if (isSuccess) {
//       toast({
//         title: 'Contract Created Successfully',
//         description: 'Contract As Been Created and Sent for Reviewing',
//         status: 'success',
//         isClosable: true,
//         position: 'top'
//       });
//     }
//     if (isError) {
//       console.log(error);

//       toast({
//         title: 'An error occurred',
//         // @ts-ignore
//         // description: error!,
//         status: 'error',
//         isClosable: true,
//         position: 'top'
//       });
//     }
//   }, [isSuccess, isError]);

//   const [blockFocus, setBlockFocus] = useState(0);

//   const InitialValues = {
//     title: '',
//     category: '',
//     payment: [
//       {
//         cost: 0,
//         description: '',
//         hours: 0,
//         rate: 0,
//         dueDate: new Date(),
//         endDate: new Date(),
//         startDate: new Date()
//       }
//     ],
//     totalCost: 0,
//     duration: {
//       startDate: new Date(),
//       endDate: new Date()
//     },
//     guest: {
//       walletAddress: '',
//       role: IRoleType.worker
//     },
//     walletAddress: address,
//     blocks: template?.blocks
//   };

//   return (
//     <>
//       <Container maxW="100vw" bg="dark.400" minH={'100vh'}>
//         <Navbar />

//         <Contract
//           initialValues={InitialValues}
//           isEditable
//           currentUser="author"
//           formAction={'create'}
//           // isSuccess={isSuccess}
//           // isError={isError}
//           // error={error}
//         />
//       </Container>
//     </>
//   );
// }

// export default Template;

export {};
