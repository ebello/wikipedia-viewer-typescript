/// <reference types="react-scripts" />
/// <reference types="theme-ui" />

// declare module 'theme-ui';
// declare module '@theme-ui/components';
declare module 'match-sorter' {
  // eslint-disable-next-line import/prefer-default-export
  export function matchSorter(items: string[], value: string): string[];
}
declare module 'use-throttle' {
  // eslint-disable-next-line import/prefer-default-export
  export function useThrottle(value: string, limit: number): string;
}
