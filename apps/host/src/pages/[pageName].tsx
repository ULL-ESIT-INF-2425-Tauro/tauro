'use client';
import type { GetServerSideProps } from 'next';
import type { PageProps } from '@tauro/shared/types';
import { fetchPage } from '@/api/ComponentFactory';
import EditableWrapper from '@/components/EditableWrapper';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNameParam = context.params?.pageName as string;
  const pageName =
    pageNameParam.charAt(0).toUpperCase() +
    pageNameParam.slice(1).toLowerCase();

  if (!pageName) {
    return {
      notFound: true,
    };
  }

  const isEditMode = context.query.edit === 'true';

  try {
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
        isEditMode,
      },
    };
  } catch (error) {
    console.error(`Error fetching page "${pageName}":`, error);
    return {
      notFound: true,
    };
  }
};

export default function DynamicPage({
  pageName,
  pageData,
  isEditMode,
}: {
  pageName: string;
  pageData: PageProps;
  isEditMode: boolean;
}) {
  return (
    <EditableWrapper
      pageData={pageData}
      isEditMode={isEditMode}
    ></EditableWrapper>
  );
}
