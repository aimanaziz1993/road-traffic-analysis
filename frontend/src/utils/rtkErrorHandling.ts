import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

/**
 * Type predicate to narrow an unknown error to a FetchBaseQueryError
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to a SerializedError
 */
export function isSerializedError(
  error: unknown
): error is SerializedError {
  return (
    typeof error === 'object' && error != null && 'message' in error
  );
}

/**
 * A utility function to get a user-friendly error message from a query error.
 */
export function getErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return `Error: ${error.status} - ${errMsg}`;
  } else if (isSerializedError(error)) {
    // you can access all properties of `SerializedError` here
    return error.message ?? 'An unknown error occurred';
  }
  return 'An unknown error occurred';
}