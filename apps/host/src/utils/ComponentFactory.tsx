import dynamic from 'next/dynamic';

import { PageProps } from '@tauro/shared/types';

export const componentLoader = {
  Component1: dynamic(() => import('remote/Component1'), { ssr: true }),
} as const;

export async function fetchPage(page: string): Promise<PageProps> {
  const response = await fetch('http://localhost:3002/api/graphql', {
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
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.data || !result.data.page) {
    throw new Error('Respuesta inesperada del servidor');
  }

  console.log(result.data.page);

  return result.data.page;
}
