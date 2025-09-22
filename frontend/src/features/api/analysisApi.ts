import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RoadCandidate, AnalysisRequest } from '../../types';

// Define a service using a base URL and expected endpoints
export const analysisApi = createApi({
  reducerPath: 'analysisApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050/api/' }),
  endpoints: (builder) => ({
    runAnalysis: builder.mutation<RoadCandidate[], AnalysisRequest>({
      query: (filters) => ({
        url: 'analysis',
        method: 'POST',
        body: filters,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRunAnalysisMutation } = analysisApi;