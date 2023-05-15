import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { REHYDRATE } from 'redux-persist';

import type { IContract, IInitialValues } from '@/pages/contracts/types';
import { axiosBaseQuery } from '@/redux/hooks';
import socket from '@/utils/socket';
import type { ITemplate } from '@/utils/types';
import BASE_URL from '@/utils/url';

enum ContractEvents {
  SignContract = 'sign_contract',
  UpdateTaskInfo = 'update_task_info',
  ReceiveTaskUpdate = 'receive_task_update'
}

export const contractApi = createApi({
  reducerPath: 'contractApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}/contract`
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  tagTypes: ['Contract'],

  endpoints(build) {
    return {
      getAllTemplates: build.query<ITemplate[], void>({
        query: () => ({ url: '/', method: 'get' })
      }),

      getContract: build.query<IContract, string>({
        query: (slug) => ({ url: `/slug/${slug}`, method: 'get' }),
        async onCacheEntryAdded(
          arg,
          { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) {
          socket.connect();
          try {
            await cacheDataLoaded;
            socket.emit('join_room', arg);
            socket.on(ContractEvents.ReceiveTaskUpdate, (message) => {
              if (arg === message.slug) {
                updateCachedData((draft) => {
                  Object.assign(draft, message);
                });
              }
            });
          } catch (error) {
            // do nothing
          }
          await cacheEntryRemoved;
          socket.close();
        },
        providesTags: (result, error, arg) => [{ type: 'Contract', id: arg }]
      }),

      getAllContractsByAddress: build.query<
        IContract[],
        { address: string; status: string; page?: number }
      >({
        query: ({ address, status = 'all', page = 1 }) => ({
          url: `/address/${address}?status=${status}&page=${page}`,
          method: 'get'
        }),
        providesTags: (result) =>
          // is result available?
          result
            ? // successful query
              [
                ...result.map(
                  ({ contractId }) =>
                    ({ type: 'Contract', contractId } as const)
                ),
                { type: 'Contract', id: 'ALL' }
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Contract', id: 'LIST' }` is invalidated
              [{ type: 'Contract', id: 'ALL' }]
      }),

      updateContract: build.mutation<
        IContract,
        { contractId: string; slug: string; data: IContract }
      >({
        query: ({ contractId, data }) => ({
          url: `/${contractId}`,
          method: 'patch',
          data
        }),
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, { slug }) => [
          { type: 'Contract', id: slug }
        ]
      }),

      uploadContract: build.mutation<
        { status: string; data: IContract },
        { contractId: string; slug: string }
      >({
        query: ({ contractId }) => ({
          url: `/upload/${contractId}`,
          method: 'patch'
        }),
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, { slug }) => [
          { type: 'Contract', id: slug }
        ]
      }),

      updateDeployedContract: build.mutation<
        IContract,
        { contractId: string; slug: string; data: { contractAddress: string } }
      >({
        query: ({ contractId, data }) => ({
          url: `/deploy/${contractId}`,
          method: 'patch',
          data
        }),
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, { slug }) => [
          { type: 'Contract', id: slug }
        ]
      }),

      updateContractPaymentStatus: build.mutation<
        IContract,
        {
          contractId: string;
          slug?: string;
          data: { paymentId: string; paymentStatus: string };
        }
      >({
        query: ({ contractId, data }) => ({
          url: `/payment/${contractId}`,
          method: 'patch',
          data
        }),
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Contract', id: arg.slug }];
        }
      }),

      deleteContract: build.mutation<
        IContract,
        {
          contractId?: string;
          slug: string;
        }
      >({
        query: ({ contractId }) => ({
          url: `/${contractId}`,
          method: 'delete'
        }),
        invalidatesTags: (result, error, { slug }) => [
          { type: 'Contract', id: slug }
        ]
      }),

      signContract: build.mutation<
        IContract,
        {
          contractId: string;
          slug: string;
          data: { walletAddress: string; signature: string; timestamp: number };
        }
      >({
        query: ({ contractId, data }) => ({
          url: `/sign/${contractId}`,
          method: 'patch',
          data
        }),

        invalidatesTags: (result, error, { slug }) => [
          { type: 'Contract', id: slug }
        ]
      }),

      createContract: build.mutation<IContract, IInitialValues>({
        query: (data) => ({
          url: `/`,
          method: 'post',
          data
        }),
        invalidatesTags: [{ type: 'Contract', id: 'ALL' }]
      })
    };
  }
});

export const {
  // useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
  useGetAllTemplatesQuery,
  useGetContractQuery,
  useSignContractMutation,
  useUploadContractMutation,
  useUpdateDeployedContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
  useCreateContractMutation,
  useGetAllContractsByAddressQuery,
  useUpdateContractPaymentStatusMutation
  // useGetProductQuery,
  // usePrefetch,
} = contractApi;
