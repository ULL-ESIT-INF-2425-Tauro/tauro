import dynamic from 'next/dynamic';

import { PageProps } from '@tauro/shared/types';

const componentCache: Record<string, any> = {};

const remoteModules: Record<string, () => Promise<any>> = {
  Header: () => import('remote/Header'),
  HeroSection: () => import('remote/HeroSection'),
  Component1: () => import('remote/Component1'),
};

export function loadRemoteComponent<T = any>(name: string) {
  if (!componentCache[name]) {
    const loader = remoteModules[name];
    if (!loader) throw new Error(`Remote component "${name}" not found`);
    componentCache[name] = dynamic<T>(loader, { ssr: false });
  }
  return componentCache[name];
}
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

export async function updateComponent(componentId: string, props: any) {
  const propsyncGraphApi = process.env.NEXT_PUBLIC_PROPSYNC_GRAPH_API ?? '';
  const response = await fetch(propsyncGraphApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateComponent($id: ID!, $props: JSON!) {
          updateComponent(where: { id: $id }, data: { props: $props }) {
            id
            name
          }
        }
      `,
      variables: {
        id: componentId,
        props,
      },
    }),
  });

  const text = await response.text();
  console.log('Raw response text:', text);

  const json = JSON.parse(text);

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data.updateComponent;
}
