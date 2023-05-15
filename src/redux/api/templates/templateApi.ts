import { ITemplate } from '@/utils/types';
import { axiosBaseQuery } from '@/redux/hooks';
import BASE_URL from '@/utils/url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REHYDRATE } from 'redux-persist';

export const templatesApi = createApi({
  reducerPath: 'templatesApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}/template`
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Templates'],
  endpoints(build) {
    return {
      createTemplate: build.mutation<ITemplate, Partial<ITemplate>>({
        query: (template) => ({
          url: `/`,
          method: 'post',
          data: template
        }),
        invalidatesTags: (result, error, { templateId }) => [
          { type: 'Templates', templateId }
        ]
      }),
      getAllTemplates: build.query<ITemplate[], void>({
        query: () => ({ url: '/', method: 'get' })
      }),
      getTemplate: build.query<ITemplate, string>({
        query: (slug) => ({ url: `/slug/${slug}`, method: 'get' })
      }),
      updateTemplate: build.mutation<
        ITemplate,
        { templateId: string; data: Partial<ITemplate> }
      >({
        query: ({ templateId, data }) => ({
          url: `/${templateId}`,
          method: 'patch',
          data
        })
      })
    };
  }
  // endpoints: (builder) => ({
  //   // ? Query: Get All Products
  //   getProducts: builder.query<IProduct[], void>({
  //     query() {
  //       return 'products';
  //     },
  //     providesTags: (result) =>
  //       result
  //         ? [
  //             ...result.map(({ id }) => ({
  //               type: 'Products' as const,
  //               id,
  //             })),
  //             { type: 'Products', id: 'LIST' },
  //           ]
  //         : [{ type: 'Products', id: 'LIST' }],
  //     // ? Transform the result to prevent nested data
  //     transformResponse: (response: { data: { products: IProduct[] } }) =>
  //       response.data.products,
  //   }),
  //   // ? Query: Get a single product
  //   getProduct: builder.query<IProduct, string>({
  //     query(id) {
  //       return `products/${id}`;
  //     },
  //     transformResponse: (
  //       response: { data: { product: IProduct } },
  //       args,
  //       meta
  //     ) => response.data.product,
  //     providesTags: (result, error, id) => [{ type: 'Products', id }],
  //   }),
  //   // ? Mutation: Create a product
  //   createProduct: builder.mutation<IProduct, FormData>({
  //     query(data) {
  //       return {
  //         url: 'products',
  //         method: 'POST',
  //         credentials: 'include',
  //         body: data,
  //       };
  //     },
  //     invalidatesTags: [{ type: 'Products', id: 'LIST' }],
  //     transformResponse: (response: { data: { product: IProduct } }) =>
  //       response.data.product,
  //   }),
  //   // ? Mutation: Update Product
  //   updateProduct: builder.mutation<
  //     IProduct,
  //     { id: string; formData: FormData }
  //   >({
  //     query({ id, formData }) {
  //       return {
  //         url: `products/${id}`,
  //         method: 'PATCH',
  //         credentials: 'include',
  //         body: formData,
  //       };
  //     },
  //     invalidatesTags: (result, error, { id }) =>
  //       result
  //         ? [
  //             { type: 'Products', id },
  //             { type: 'Products', id: 'LIST' },
  //           ]
  //         : [{ type: 'Products', id: 'LIST' }],
  //     transformResponse: (response: { data: { product: IProduct } }) =>
  //       response.data.product,
  //   }),
  //   // ? Mutation: Delete product
  //   deleteProduct: builder.mutation<null, string>({
  //     query(id) {
  //       return {
  //         url: `products/${id}`,
  //         method: 'DELETE',
  //         credentials: 'include',
  //       };
  //     },
  //     invalidatesTags: [{ type: 'Products', id: 'LIST' }],
  //   }),
  // }),
});

export const {
  // useUpdateProductMutation,
  // useDeleteProductMutation,
  useCreateTemplateMutation,
  useGetAllTemplatesQuery,
  useGetTemplateQuery,
  useUpdateTemplateMutation
  // useGetProductQuery,
  // usePrefetch,
} = templatesApi;
