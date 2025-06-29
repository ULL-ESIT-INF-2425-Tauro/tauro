import dynamic from 'next/dynamic';

import { PageProps } from '@tauro/shared/types';

export const componentLoader = {
  Component1: dynamic(() => import('remote/Component1'), { ssr: false }),
  Header: dynamic(() => import('remote/Header'), { ssr: false })
} as const;

const propsyncGraphApi = process.env.PROPSYNC_GRAPH_API ?? '';
export async function fetchPage(page: string): Promise<PageProps> {
  const response = await fetch(propsyncGraphApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          query GetPage($name: String!) {
            page(where: { name: $name }) {
              id
              name
              order
              components {
                id
                name
                props
              }
            }
          }
        `,
      variables: { name: page },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error found in request: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.data || !result.data.page) {
    throw new Error('Internal Server Error');
  }

  const pageProps = result.data.page;
  console.log(pageProps);

  const orderedComponents = [...pageProps.components].sort((a, b) => {
    const orderA = pageProps.order?.[a.name] ?? 9999;
    const orderB = pageProps.order?.[b.name] ?? 9999;
    return orderA - orderB;
  });

  
  return {
    ...pageProps,
    components: orderedComponents,
  };
}
