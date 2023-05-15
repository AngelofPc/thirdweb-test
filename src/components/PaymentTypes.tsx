// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
// import {
//   Box,
//   GridItem,
//   HStack,
//   Input,
//   SimpleGrid,
//   Text,
//   VStack,
//   Button,
//   useColorModeValue,
//   Image
// } from '@chakra-ui/react';
// import PlusIcon from '@/assets/svgs/plus.svg';
// import { FieldArray, Field } from 'formik';
// import { useEffect, useRef, useState } from 'react';

// import { IDuration, IPayment } from '@/pages/contracts/types';

// const PaymentTypes = ({
//   payment,
//   duration,
//   values,
//   setFieldValue,
//   isEditable
// }: {
//   setFieldValue: any;
//   values: any;
//   isEditable: boolean;
//   payment: IPayment[];
//   duration: IDuration | undefined;
// }) => {
//   const [paymentType, setPaymentType] = useState<string>('Fixed');
//   const [color, setColor] = useState<string>('grey');

//   const headingColor = useColorModeValue('white', 'black');

//   // const dateRef0 = useRef<any>('dateRef0');
//   // const dateRef2 = useRef<any>('dateRef2');
//   // const dateRef3 = useRef<any>('dateRef3');

//   // const handleFocus = () => {
//   //   dateRef0.current.showPicker();
//   //   setColor('black');
//   // };

//   const [total, setTotal] = useState(0);
//   const [dueDate, setDueDate] = useState(new Date(payment[0].dueDate));
//   const [theDate, setTheDate] = useState(new Date());

//   useEffect(() => {
//     let t = 0;

//     payment.map((payment) => {
//       t = payment.cost + t;
//     });

//     setTotal(t);
//   }, [payment]);

//   values.totalCost = total;

//   const nthNumber = (number: any) => {
//     return number > 0
//       ? ['th', 'st', 'nd', 'rd'][
//           (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
//         ]
//       : '';
//   };

//   return (
//     <Box>
//       <FieldArray name="payment">
//         {({ insert, remove, push }) => (
//           <div>
//             <VStack w="full" mt="64px" spacing="64px" mb="20px">
//               <VStack
//                 w="full"
//                 align="flex-start"
//                 border="1px"
//                 h="full"
//                 borderColor="#D6D6D6"
//                 borderRadius="8px"
//                 spacing="0"
//               >
//                 <HStack
//                   py="13px"
//                   w="full"
//                   px="17px"
//                   borderBottom="1px"
//                   borderColor="#D6D6D6"
//                 >
//                   <Text fontSize="17px" color="grey" fontFamily="power">
//                     Payment
//                   </Text>
//                 </HStack>

//                 <HStack
//                   py="9px"
//                   w="full"
//                   justify="space-between"
//                   px="17px"
//                   borderBottom="1px"
//                   borderColor="#D6D6D6"
//                   fontFamily="power"
//                   fontSize="17px"
//                 >
//                   <HStack spacing={20}>
//                     <Text
//                       fontSize="17px"
//                       color={headingColor}
//                       fontFamily="power"
//                     >
//                       {paymentType}
//                     </Text>

//                     {paymentType == 'Milestones' && (
//                       <Image
//                         src={PlusIcon}
//                         w={3}
//                         onClick={() =>
//                           push({
//                             description: '',
//                             hours: '',
//                             rate: '',
//                             dueDate: '',
//                             cost: ''
//                           })
//                         }
//                       />
//                     )}
//                   </HStack>

//                   <VStack spacing="0">
//                     <ChevronUpIcon
//                       color="#004F4D"
//                       fontSize="18px"
//                       onClick={() => setPaymentType('Fixed')}
//                       cursor="pointer"
//                     />

//                     <ChevronDownIcon
//                       color="#004F4D"
//                       fontSize="18px"
//                       onClick={() => setPaymentType('Milestones')}
//                       cursor="pointer"
//                     />
//                   </VStack>
//                 </HStack>
//                 <SimpleGrid
//                   columns={{ base: 5, lg: 6 }}
//                   w="full"
//                   fontSize="14px"
//                   color="grey"
//                   fontFamily="body"
//                   borderBottom="1px"
//                   borderColor="#D6D6D6"
//                 >
//                   <GridItem w="full" colSpan={{ base: 1, lg: 2 }}>
//                     <Box py="8px" pl="15px" fontSize="15px">
//                       Terms
//                     </Box>
//                   </GridItem>

//                   <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                     <Box
//                       pl="15px"
//                       py="8px"
//                       borderLeft="1px"
//                       borderColor="#D6D6D6"
//                       fontSize="15px"
//                       h="full"
//                     >
//                       Hours
//                     </Box>
//                   </GridItem>

//                   <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                     <Box
//                       pl="15px"
//                       py="8px"
//                       borderLeft="1px"
//                       borderColor="#D6D6D6"
//                       fontSize="15px"
//                     >
//                       Rate/Hour
//                     </Box>
//                   </GridItem>

//                   <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                     <Box
//                       pl="15px"
//                       py="8px"
//                       borderLeft="1px"
//                       borderColor="#D6D6D6"
//                       fontSize="15px"
//                     >
//                       Due 0n
//                     </Box>
//                   </GridItem>

//                   <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                     <Box
//                       pl="15px"
//                       py="8px"
//                       borderLeft="1px"
//                       borderColor="#D6D6D6"
//                       fontSize="15px"
//                       h="full"
//                     >
//                       Cost
//                     </Box>
//                   </GridItem>
//                 </SimpleGrid>

//                 {payment.length > 0 &&
//                   payment.map((pay, index) => {
//                     return (
//                       <SimpleGrid
//                         columns={{ base: 5, lg: 6 }}
//                         w="full"
//                         fontSize="14px"
//                         color="grey"
//                         fontFamily="body"
//                         borderBottom="1px"
//                         borderColor="#D6D6D6"
//                       >
//                         <GridItem w="full" colSpan={{ base: 1, lg: 2 }}>
//                           <Box py={{ base: '22px', lg: '18px' }} px="15px">
//                             <Field
//                               // readOnly={!isEditable}
//                               as={Input}
//                               color={headingColor}
//                               id={`payment.${index}.description`}
//                               name={`payment.${index}.description`}
//                               type="text"
//                               fontSize="15px"
//                               _placeholder={{
//                                 color: 'grey'
//                               }}
//                               placeholder="type Item description here"
//                               variant="unstyled"
//                             />
//                           </Box>
//                         </GridItem>

//                         <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                           <Box
//                             py={{ base: '22px', lg: '18px' }}
//                             px="15px"
//                             borderLeft="1px"
//                             borderColor="#D6D6D6"
//                           >
//                             <Field
//                               readOnly={!isEditable}
//                               as={Input}
//                               color={headingColor}
//                               id={`payment.${index}.hours`}
//                               name={`payment.${index}.hours`}
//                               onChange={(e: { target: { value: number } }) => {
//                                 setFieldValue(
//                                   `payment.${index}.hours`,
//                                   Number(e.target.value)
//                                 );
//                                 setFieldValue(
//                                   `payment.${index}.cost`,
//                                   pay.rate * e.target.value
//                                 );
//                               }}
//                               type="number"
//                               fontSize="15px"
//                               _placeholder={{
//                                 color: 'grey'
//                               }}
//                               placeholder="00"
//                               variant="unstyled"
//                             />
//                           </Box>
//                         </GridItem>

//                         <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                           <HStack
//                             px="15px"
//                             py={{ base: '22px', lg: '18px' }}
//                             borderLeft="1px"
//                             borderColor="#D6D6D6"
//                             fontSize="15px"
//                             spacing={1}
//                           >
//                             <Text>$</Text>

//                             <Field
//                               readOnly={!isEditable}
//                               onChange={(e: { target: { value: number } }) => {
//                                 setFieldValue(
//                                   `payment.${index}.rate`,
//                                   Number(e.target.value)
//                                 );
//                                 setFieldValue(
//                                   `payment.${index}.cost`,
//                                   e.target.value * pay.hours
//                                 );
//                               }}
//                               as={Input}
//                               w="full"
//                               color={headingColor}
//                               id={`payment.${index}.rate`}
//                               name={`payment.${index}.rate`}
//                               type="number"
//                               fontSize="15px"
//                               _placeholder={{
//                                 color: 'grey'
//                               }}
//                               placeholder="0 /hr"
//                               variant="unstyled"
//                             />
//                           </HStack>
//                         </GridItem>

//                         <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                           <Box
//                             className="calender"
//                             py="16px"
//                             px={{ base: '0px', lg: '15px' }}
//                             borderLeft="1px"
//                             borderColor="#D6D6D6"
//                             h="full"
//                           >
//                             {isEditable ? (
//                               <>
//                                 <Field
//                                   readOnly={!isEditable}
//                                   as={Input}
//                                   w="full"
//                                   onChange={(e: {
//                                     target: { value: Date };
//                                   }) => {
//                                     setTheDate(new Date(e.target.value));
//                                     setFieldValue(
//                                       `payment.${index}.dueDate`,
//                                       e.target.value
//                                     );
//                                   }}
//                                   color={headingColor}
//                                   id={`payment.${index}.dueDate`}
//                                   name={`payment.${index}.dueDate`}
//                                   type="date"
//                                   variant="unstyled"
//                                   value={theDate.getDate()}
//                                 />

//                                 <Text>
//                                   {theDate.getDate()}
//                                   {nthNumber(theDate.getDate())}{' '}
//                                   {theDate.toLocaleDateString('default', {
//                                     month: 'long'
//                                   })}
//                                   {', '}
//                                   {theDate.getUTCFullYear()}
//                                 </Text>
//                               </>
//                             ) : (
//                               <Text>
//                                 {new Date(payment[index].dueDate).getDate()}
//                                 {nthNumber(
//                                   new Date(payment[index].dueDate).getDate()
//                                 )}{' '}
//                                 {new Date(
//                                   payment[index].dueDate
//                                 ).toLocaleDateString('default', {
//                                   month: 'long'
//                                 })}
//                                 {', '}
//                                 {new Date(
//                                   payment[index].dueDate
//                                 ).getUTCFullYear()}
//                               </Text>
//                             )}
//                           </Box>
//                         </GridItem>

//                         <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                           <HStack
//                             px="15px"
//                             py={{ base: '22px', lg: '18px' }}
//                             borderLeft="1px"
//                             borderColor="#D6D6D6"
//                             fontSize="15px"
//                             spacing={1}
//                           >
//                             <Text>$</Text>
//                             <Field
//                               readOnly
//                               as={Input}
//                               w="full"
//                               color={headingColor}
//                               id={`payment.${index}.cost`}
//                               name={`payment.${index}.cost`}
//                               type="text"
//                               fontSize="15px"
//                               _placeholder={{
//                                 color: 'grey'
//                               }}
//                               placeholder="0"
//                               variant="unstyled"
//                               value={
//                                 Number.isNaN(payment[index].cost)
//                                   ? 0
//                                   : payment[index].cost
//                               }
//                             />
//                           </HStack>
//                         </GridItem>
//                       </SimpleGrid>
//                     );
//                   })}
//                 <SimpleGrid
//                   columns={{ base: 5, lg: 6 }}
//                   h="full"
//                   w="full"
//                   fontSize="14px"
//                   color="grey"
//                   fontFamily="body"
//                 >
//                   <GridItem w="full" colSpan={{ base: 4, lg: 5 }}>
//                     <Box
//                       py={{ base: '22px', lg: '18px' }}
//                       pl="15px"
//                       fontSize="15px"
//                     >
//                       Total
//                     </Box>
//                   </GridItem>

//                   <GridItem w="full" colSpan={{ base: 1, lg: 1 }}>
//                     <HStack
//                       px="15px"
//                       py={{ base: '22px', lg: '18px' }}
//                       borderLeft="1px"
//                       borderColor="#D6D6D6"
//                       fontSize="15px"
//                       spacing={1}
//                       h="full"
//                       w="full"
//                     >
//                       <Text>$</Text>

//                       <Text color="black">
//                         {Number.isNaN(total) ? ' ' : total}
//                       </Text>
//                     </HStack>
//                   </GridItem>
//                 </SimpleGrid>
//               </VStack>
//             </VStack>
//           </div>
//         )}
//       </FieldArray>

//       <VStack
//         w="full"
//         align="flex-start"
//         border="1px"
//         borderColor="#D6D6D6"
//         borderRadius="8px"
//         spacing="0"
//       >
//         <SimpleGrid
//           columns={6}
//           w="full"
//           fontSize="14px"
//           color="grey"
//           fontFamily="body"
//           borderBottom="1px"
//           borderColor="#D6D6D6"
//         >
//           <GridItem colSpan={{ base: 2, lg: 1 }}>
//             <Box py="18px" pl="15px" fontSize="15px">
//               Start Date
//             </Box>
//           </GridItem>

//           <GridItem colSpan={{ base: 4, lg: 5 }}>
//             <HStack
//               w="full"
//               px="15px"
//               color="#004F4D"
//               justify="space-between"
//               py="17px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//               fontFamily="power"
//               className="calender"
//             >
//               {isEditable ? (
//                 <Field
//                   readOnly={!isEditable}
//                   as={Input}
//                   onChange={(e: { target: { value: Date } }) => {
//                     setFieldValue(`duration.startDate`, e.target.value);
//                   }}
//                   w="full"
//                   color={headingColor}
//                   id={`duration.startDate`}
//                   name={`duration.startDate`}
//                   type="date"
//                   variant="unstyled"
//                 />
//               ) : (
//                 <Text>
//                   {new Date(values.duration.startDate).getDate()}
//                   {nthNumber(
//                     new Date(values.duration.startDate).getDate()
//                   )}{' '}
//                   {new Date(values.duration.startDate).toLocaleDateString(
//                     'default',
//                     {
//                       month: 'long'
//                     }
//                   )}
//                   {', '}
//                   {new Date(values.duration.startDate).getUTCFullYear()}
//                 </Text>
//               )}
//             </HStack>
//           </GridItem>
//         </SimpleGrid>

//         <SimpleGrid
//           columns={6}
//           w="full"
//           fontSize="14px"
//           color="grey"
//           fontFamily="body"
//         >
//           <GridItem colSpan={{ base: 2, lg: 1 }}>
//             <Box py="18px" pl="15px" fontSize="15px">
//               End Date
//             </Box>
//           </GridItem>

//           <GridItem colSpan={{ base: 4, lg: 5 }}>
//             <HStack
//               w="full"
//               px="15px"
//               justify="space-between"
//               py="17px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//               fontFamily="power"
//               className="calender"
//             >
//               {isEditable ? (
//                 <Field
//                   readOnly={!isEditable}
//                   as={Input}
//                   onChange={(e: { target: { value: Date } }) => {
//                     setFieldValue(`duration.endDate`, e.target.value);
//                   }}
//                   w="full"
//                   color={headingColor}
//                   id={`duration.endDate`}
//                   name={`duration.endDate`}
//                   type="date"
//                   variant="unstyled"
//                 />
//               ) : (
//                 <Text>
//                   {new Date(values.duration.endDate).getDate()}
//                   {nthNumber(new Date(values.duration.endDate).getDate())}{' '}
//                   {new Date(values.duration.endDate).toLocaleDateString(
//                     'default',
//                     {
//                       month: 'long'
//                     }
//                   )}
//                   {', '}
//                   {new Date(values.duration.endDate).getUTCFullYear()}
//                 </Text>
//               )}
//             </HStack>
//           </GridItem>
//         </SimpleGrid>
//       </VStack>
//     </Box>
//   );
// };

// export default PaymentTypes;

// {
//   /* <VStack
//         w='full'
//         align='flex-start'
//         border='1px'
//         borderColor='#D6D6D6'
//         borderRadius='8px'
//         spacing='0'
//       >
//         <HStack py='13px' w='full' px='17px' borderBottom='1px' borderColor='#D6D6D6'>
//           <Text fontSize='17px' color='grey' fontFamily='power'>
//             Payment
//           </Text>
//         </HStack>

//         <HStack
//           py='9px'
//           w='full'
//           justify='space-between'
//           px='17px'
//           borderBottom='1px'
//           borderColor='#D6D6D6'
//           fontFamily='power'
//           fontSize='17px'
//         >
//           <HStack spacing={20}>
//             <Text fontSize='17px' color={headingColor} fontFamily='power'>
//               {paymentType}
//             </Text>

//             {paymentType == "Milestones" && <Image src={PlusIcon} w={3} />}
//           </HStack>

//           <VStack spacing="0">
//             <ChevronUpIcon
//               color="#004F4D"
//               fontSize="18px"
//               onClick={() => setPaymentType('Fixed')}
//               cursor="pointer"
//             />

//             <ChevronDownIcon
//               color="#004F4D"
//               fontSize="18px"
//               onClick={() => setPaymentType('Milestones')}
//               cursor="pointer"
//             />
//           </VStack>
//         </HStack>

//         <SimpleGrid
//           columns={6}
//           w='full'
//           fontSize='14px'
//           color='grey'
//           fontFamily='body'
//           borderBottom='1px'
//           borderColor='#D6D6D6'
//         >
//           <GridItem colSpan={2}>
//             <Box py="8px" pl="15px" fontSize="15px">
//               Terms
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box
//               pl="15px"
//               py="8px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//             >
//               Hours
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box
//               pl="15px"
//               py="8px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//             >
//               Rate/Hour
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box
//               pl="15px"
//               py="8px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//             >
//               Due 0n
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box
//               pl="15px"
//               py="8px"
//               borderLeft="1px"
//               borderColor="#D6D6D6"
//               fontSize="15px"
//             >
//               Cost
//             </Box>
//           </GridItem>
//         </SimpleGrid>

//         <SimpleGrid
//           columns={6}
//           w='full'
//           fontSize='14px'
//           color='grey'
//           fontFamily='body'
//           borderBottom='1px'
//           borderColor='#D6D6D6'
//         >
//           <GridItem colSpan={2}>
//             <Box py='18px' px='15px'>
//               <Field
//                 as={Input}
//                 color={headingColor}
//                 id='description'
//                 name='description'
//                 type='text'
//                 fontSize='15px'
//                 _placeholder={{
//                   color: "grey",
//                 }}
//                 placeholder='type Item description here'
//                 variant='unstyled'
//               />
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box py='18px' px='15px' borderLeft='1px' borderColor='#D6D6D6'>
//               <Field
//                 as={Input}
//                 color={headingColor}
//                 id='hour'
//                 name='hour'
//                 type='number'
//                 value={hour}
//                 fontSize='15px'
//                 _placeholder={{
//                   color: "grey",
//                 }}
//                 placeholder='00'
//                 variant='unstyled'
//                 onChange={handleHour}
//               />
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <HStack
//               px='15px'
//               py='18px'
//               borderLeft='1px'
//               borderColor='#D6D6D6'
//               fontSize='15px'
//               spacing={1}
//             >
//               <Text>$</Text>

//               <Field
//                 as={Input}
//                 w='full'
//                 color={headingColor}
//                 id='rate'
//                 name='rate'
//                 value={rate}
//                 type='number'
//                 fontSize='15px'
//                 _placeholder={{
//                   color: "grey",
//                 }}
//                 placeholder='0 /hr'
//                 variant='unstyled'
//                 onChange={handleRate}
//               />
//             </HStack>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <Box className='calenderr' py='16px' px='15px' borderLeft='1px' borderColor='#D6D6D6'>
//               <Input
//                 type='date'
//                 variant='unstyled'
//                 ref={dateRef}
//                 onFocus={handleFocus}
//                 color={color}
//               />
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <HStack
//               px='15px'
//               py='18px'
//               borderLeft='1px'
//               borderColor='#D6D6D6'
//               fontSize='15px'
//               spacing={1}
//             >
//               <Text>$</Text>

//               <Text color='black'>{rate && hour ? rate * hour : 0}</Text>
//             </HStack>
//           </GridItem>
//         </SimpleGrid>

//         <SimpleGrid columns={6} w='full' fontSize='14px' color='grey' fontFamily='body'>
//           <GridItem colSpan={5}>
//             <Box py="18px" pl="15px" fontSize="15px">
//               Total
//             </Box>
//           </GridItem>

//           <GridItem colSpan={1}>
//             <HStack
//               px='15px'
//               py='18px'
//               borderLeft='1px'
//               borderColor='#D6D6D6'
//               fontSize='15px'
//               spacing={1}
//             >
//               <Text>$</Text>

//               <Text color='black'>{rate && hour ? rate * hour : 0}</Text>
//             </HStack>
//           </GridItem>
//         </SimpleGrid>
//       </VStack>

//       <VStack
//         w="full"
//         align="flex-start"
//         border="1px"
//         borderColor="#D6D6D6"
//         borderRadius="8px"
//         spacing="0"
//       >
//         <SimpleGrid
//           columns={6}
//           w='full'
//           fontSize='14px'
//           color='grey'
//           fontFamily='body'
//           borderBottom='1px'
//           borderColor='#D6D6D6'
//         >
//           <GridItem colSpan={1}>
//             <Box py="18px" pl="15px" fontSize="15px">
//               Start Date
//             </Box>
//           </GridItem>

//           <GridItem colSpan={5}>
//             <HStack
//               w='full'
//               px='15px'
//               color='#004F4D'
//               justify='space-between'
//               py='17px'
//               borderLeft='1px'
//               borderColor='#D6D6D6'
//               fontSize='15px'
//               fontFamily='power'
//               className='calender'
//             >
//               <Input
//                 type='date'
//                 variant='unstyled'
//                 ref={dateRef2}
//                 onFocus={() => dateRef2.current.showPicker()}
//               />
//             </HStack>
//           </GridItem>
//         </SimpleGrid>

//         <SimpleGrid columns={6} w='full' fontSize='14px' color='grey' fontFamily='body'>
//           <GridItem colSpan={1}>
//             <Box py="18px" pl="15px" fontSize="15px">
//               End Date
//             </Box>
//           </GridItem>

//           <GridItem colSpan={5}>
//             <HStack
//               w='full'
//               px='15px'
//               justify='space-between'
//               py='17px'
//               borderLeft='1px'
//               borderColor='#D6D6D6'
//               fontSize='15px'
//               fontFamily='power'
//               className='calender'
//             >
//               <Input
//                 type='date'
//                 variant='unstyled'
//                 ref={dateRef3}
//                 onFocus={() => dateRef3.current.showPicker()}
//               />
//             </HStack>
//           </GridItem>
//         </SimpleGrid>
//       </VStack> */
// }

export {};
