export enum IRoleType {
  client = 'client',
  worker = 'worker',
  admin = 'admin'
}

export type IWorkContent = {
  description: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: Date;
};

export type IWorks = {
  _id?: string;
  heading: string;
  content: IWorkContent[];
};

export type IMilestone = {
  dueDate: Date;
  cost: number;
  title: string;
  description: string;
};

export type IHistory = {
  paidOn: Date;
  releasedOn: Date;
  withdrawnOn: Date;
  deployedOn: Date;
  completedOn: Date;
  amount: number;
  description: string;
  status: string;
  _id?: string;
};

export type IPayment = {
  totalFee?: number;
  // hours: number;
  // weeklyHours?: number;
  // monthlyHours?: number;
  weeks?: number;
  months?: number;
  rate?: number;
  upfront?: number;
  type: string | undefined;
  milestone?: IMilestone[];
  endDate?: Date | number | string;
  startDate?: Date | string | number;
  history?: IHistory[];
};

export const StatusType = {
  created: 'created',
  received: 'received',
  edited: 'edited',
  reviewed: 'reviewed',
  signed: 'signed',
  cosigned: 'cosigned',
  dispute: 'dispute',
  deployed: 'deployed',
  paid: 'paid',
  progress: 'progress',
  withdrawn: 'withdrawn',
  released: 'released',
  completed: 'completed',
  void: 'void'
} as const;

export type IContractStatus =
  | 'created'
  | 'received'
  | 'edited'
  | 'reviewed'
  | 'signed'
  | 'cosigned'
  | 'paid'
  | 'progress'
  | 'withdrawn'
  | 'disputed'
  | 'completed'
  | 'released'
  | 'void';

export type IAuthor = {
  walletAddress: `0x${string}` | string;
  guestAddress?: `0x${string}` | string;
  role: IRoleType | undefined | string;
  signature?: string | undefined;
  timestamp?: number | Date;
  signedOn?: Date;
  status?: IContractStatus | undefined;
};

export type IDuration = {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
};

export type ICategory = {
  // category?: string[];
  [key: number]: string;
};

export type IInitialValues = {
  contractId?: string | undefined;
  slug?: string;
  type?: string;
  title: string | undefined;
  // category?: ICategory;
  category: string[];

  works: IWorks[];
  intellectualProperty: Terms;
  confidentiality: Terms;
  termination: Terms;
  liability: Terms;
  dispute: Terms;
  payment: IPayment;

  guest: IAuthor;
  // guest: IAuthor | undefined;
  author?: IAuthor | undefined;
  walletAddress: `0x${string}` | string | undefined;
};

export type Terms = {
  title?: string;
  heading?: string;
  text: string;
  lastUpdatedOn?: Date | string;
  updatedBy?: string;
};

export type Block = {
  // title: string;
  text: string;
  heading: string;
};

export type IContract = {
  contractId?: string;
  intellectualProperty: Terms[];
  confidentiality: Terms[];
  termination: Terms[];
  liability: Terms[];
  dispute: Terms[];
  _id?: string;
  title: string;
  category: ICategory[];
  author: IAuthor;
  guest: IAuthor;
  walletAddress: string;
  works: IWorks[];
  createdAt?: string | Date | number;
  updatedAt?: Date;
  cid?: string;
  slug: string;
  payment: IPayment;
  totalCost: number;
  status: IContractStatus;
  contractAddress: `0x${string}` | string;
  // [key: string]: string;
  // duration: {
  //   startDate: string;
  // };
  duration: IDuration;
};

// export type IViewContractValues = {
//   contractId?: string;
//   _id?: string;
//   title: string;
//   author: IAuthor;
//   guest: IAuthor;
//   walletAddress: string;
//   blocks: IWorks[];
//   createdAt?: string | Date;
//   updatedAt?: Date;
//   slug: string;
//   payment: IPay[];
//   totalCost: number;
//   duration: {
//     startDate: string;
//   };
// };
