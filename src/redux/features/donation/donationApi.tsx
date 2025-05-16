import { templateApi } from "@/redux/api/baseApi";

const authApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddDonation: builder.mutation<any, any>({
      query: (payload) => {
        console.log(payload);
        return {
          url: "/donation/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleFindDonation: builder.query<any, any>({
      query: () => {
        return {
          url: "/donation/find",
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useHandleAddDonationMutation,useHandleFindDonationQuery } = authApi;
