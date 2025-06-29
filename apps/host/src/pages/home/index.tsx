import * as React from 'react';

import { PageProps } from '@tauro/shared/types';
import { componentLoader, fetchPage } from '@/utils/ComponentFactory';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageName = 'Home';

  const pageData = await fetchPage(pageName);

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageName,
      pageData,
    },
  };
};

export function Index({
  pageName,
  pageData,
}: {
  pageName: string;
  pageData: PageProps;
}) {
  return (
    <div className="bg-white min-h-screen">
      {pageData.components.map((component, index) => {
        const componentName = component.name;
        const ComponentToRender =
          componentLoader[componentName as keyof typeof componentLoader];
        if (!ComponentToRender) {
          console.warn(`No component found for name: ${componentName}`);
          return null;
        }
        return <ComponentToRender key={index} {...component.props} />;
      })}
    </div>
  );
}

export default Index;
