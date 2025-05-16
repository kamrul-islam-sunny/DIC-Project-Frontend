import { templateApi } from "@/redux/api/baseApi";

const authApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddAmount: builder.mutation<any, any>({
      query: (amount) => {
        console.log(amount);
        return {
          url: "/amount/create",
          method: "POST",
          body:  {setAmount:amount} ,
        };
      },
    }),
    handleFindAmount: builder.query<any, any>({
      query: () => {
        return {
          url: "/amount/find",
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useHandleAddAmountMutation,useHandleFindAmountQuery } = authApi;
