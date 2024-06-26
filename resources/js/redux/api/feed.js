import {createApi} from '@reduxjs/toolkit/query/react'



export const axiosBaseQuery =
    (
        {baseUrl} = {baseUrl: ''}
    ) =>
        async ({url, method, data, params}) => {
            try {
                const result = await axios({url: baseUrl + url, method, data, params})
                return {data: result.data}
            } catch (axiosError) {
                let err = axiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }


export const feedApi = createApi({
    reducerPath: 'feedApi',
    baseQuery: axiosBaseQuery({baseUrl: `/api/feeds`}),
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: (page) => ({url: '?page=' + page}),
        }),
    }),
})

export const {useGetFeedQuery} = feedApi
