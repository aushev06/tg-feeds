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


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery({baseUrl: `/api/folders`}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({url: ''}),
        }),
    }),
})

export const {useGetCategoriesQuery} = categoryApi
