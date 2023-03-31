import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from '../config/constants';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => `users/my-info`,
    }),
    getUserTeams: builder.query({
      query: () => `users/teams`,
    }),
    getUserTicketCount: builder.query({
      query: () => `users/tickets/count`,
    }),
    getUserCoupons: builder.query({
      query: () => `users/coupons`,
    }),
    getUserCouponCount: builder.query({
      query: () => `users/coupons/count`,
    }),
    getUserOrders: builder.query({
      query: () => `users/orders`,
    }),
    getUserInvitationCount: builder.query({
      query: () => `users/invitations/count`,
    }),
    getUserReferralId: builder.query({
      query: () => `users/referral-id`,
    }),
    getUserAgreements: builder.query({
      query: () => `users/agreements`,
    }),
    getOrdersPageData: builder.query({
      query: () => `orders/pagedata`,
    }),
    getCouponsPageData: builder.query({
      query: () => `coupons/pagedata`,
    }),
    getTeamMembersCountOneWeek: builder.query({
      query: () => `teams/members/count/one-week`,
    }),
    getTeamMembersCountTotal: builder.query({
      query: () => `teams/members/count/total`,
    }),
    getTeamCount: builder.query({
      query: () => `teams/count`,
    }),
    getUserTeamIdData: builder.query({
      query: () => `users/team-id`,
    }),
    getMatchingStatus: builder.query({
      query: () => `users/matchings/status`,
    }),
  }),
});

export const {
  useGetMyInfoQuery,
  useGetUserTeamsQuery,
  useGetUserTicketCountQuery,
  useGetUserCouponsQuery,
  useGetUserCouponCountQuery,
  useGetUserOrdersQuery,
  useGetUserInvitationCountQuery,
  useGetUserReferralIdQuery,
  useGetUserAgreementsQuery,
  useGetOrdersPageDataQuery,
  useGetCouponsPageDataQuery,
  useGetTeamMembersCountOneWeekQuery,
  useGetTeamMembersCountTotalQuery,
  useGetTeamCountQuery,
  useGetUserTeamIdDataQuery,
  useGetMatchingStatusQuery,
} = backendApi;
