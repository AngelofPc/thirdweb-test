import type { Key } from 'react';

export enum Status {
  active,
  filled,
  unfilled
}

// export type IContractStatus {
//   'draft'|
//   viewed,
//   'in review',
//   approved,
//   signed,
// }

export type IContractStatus =
  | 'draft'
  | 'viewed'
  | 'in review'
  | 'approved'
  | 'signed';

// export type IContractStatus = typeof docStatusObj;

export type IBlock = {
  description: string;
  heading: string;
  content: {
    text: string;
  }[];
};

export type IPay = {
  description: string;
  hours: number;
  cost: number;
  rate: number;
};

// enum IPaymentype {
//   fixed,
//   milestone,
//   other
// }

export type ITemplate = {
  _id: Key | null | undefined;
  // slug: any;
  slug: string | number;
  createdAt: string | number | Date;
  title: string;
  category: string;
  blocks: IBlock[];
  templateId: string;
  author: IAuthor;
};

export type IAuthor = {
  walletAddress: string;
  role: string;
  status: IContractStatus;
};

export type IContract = {
  contractId?: string;
  _id?: string;
  title: string;
  author: IAuthor;
  guest: IAuthor;
  walletAddress: string;
  blocks: IBlock[];
  createdAt?: string | Date;
  updatedAt?: Date;
  slug: string;
  payment: IPay[];
  totalCost: number;
  duration: {
    startDate: string;
  };
};
// export type ITemplate = {
//   _id: string;
//   title: string;
//   category: string;
//   author: string;
//   blocks: IBlock[];
//   createdAt: Date;
//   updatedAt: Date;
//   slug: string;
//   templateId: string;
//   payment: {
//     type: IPaymentype;
//     description: string;
//     cost: number;
//   };
//   duration: {
//     startDate: string;
//   };

// };
