import fetchIntercept from 'fetch-intercept';

export const AuthInterceptor = () => {
  fetchIntercept.register({
    request: function (url: any, config: { credentials: string }) {
      // Modify the url or config here
      //   config.headers.name = 'Aravindh';
      if (url.includes('/auth')) {
        config.credentials = 'include';
      }
      return [url, config];
    },

    requestError: function (error: any) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response: any) {
      // Modify the reponse object
      return response;
    },

    responseError: function (error: any) {
      // Handle an fetch error
      return Promise.reject(error);
    }
  });
};
