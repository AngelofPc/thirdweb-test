import { createStandaloneToast } from '@chakra-ui/react';
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

import { contractApi } from './api/contracts/contractApi';
import { templatesApi } from './api/templates/templateApi';
import { userApi } from './api/users/userApi';
import authReducer from './slices/userSlice';

const { toast } = createStandaloneToast();

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorType = action.payload.data;

    if (Array.isArray(errorType)) {
      console.log(action.payload.data);
      action.payload.data.forEach((value: { message: string }) => {
        toast({
          title: 'An error occurred.',
          description: value.message,
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      });
    } else {
      toast({
        title: 'An error occurred.',
        description: action.payload.data.message,
        status: 'error',
        duration: 4000,
        position: 'top-right',
        isClosable: true
      });
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(action);
    }

    if (
      action.payload.data?.error?.statusCode === 401 &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.warn(
        'We got a rejected action! damn',
        typeof action.payload.data.error.statusCode
      );
      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 5000);
      // return redirect('/template/new');
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [templatesApi.reducerPath]: templatesApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      templatesApi.middleware,
      contractApi.middleware,
      userApi.middleware,
      rtkQueryErrorLogger
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
