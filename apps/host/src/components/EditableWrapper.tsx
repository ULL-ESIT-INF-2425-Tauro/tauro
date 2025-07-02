import * as React from 'react';
import type { PageProps } from '@tauro/shared/types';
import { loadRemoteComponent, updateComponent } from '@/api/ComponentFactory';

type EditableWrapperProps = {
  pageData: PageProps;
  isEditMode: boolean;
  children?: React.ReactNode;
};

function EditableWrapper({
  pageData,
  isEditMode,
  children,
}: EditableWrapperProps) {
  const [editedProps, setEditedProps] = React.useState<Record<string, any>>({});
  const [showToolsDialog, setShowToolsDialog] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

  const setEditedProp = (componentId: string, updatedData: any) => {
    setEditedProps((prev) => ({
      ...prev,
      [componentId]: updatedData,
    }));
  };

  const handlePublish = async () => {
    const updatedComponents = pageData.components.map((component) => {
      const componentId = component.id;
      if (editedProps[componentId]) {
        return {
          ...component,
          props: {
            ...component.props,
            ...editedProps[componentId],
          },
        };
      }
      return component;
    });

    console.log('Updated pageData:', {
      ...pageData,
      components: updatedComponents,
    });

    try {
      await Promise.all(
        updatedComponents.map(async (component) => {
          const original = pageData.components.find((c) => c.id === component.id);
          const propsChanged =
            original && JSON.stringify(original.props) !== JSON.stringify(component.props);

          if (propsChanged) {
            const result = await updateComponent(component.id, component.props);
            console.log(`✅ Componente ${component.name} actualizado:`, result);
          }
        }),
      );
      alert('✅ Cambios publicados correctamente');
      setShowToolsDialog(false);
    } catch (err) {
      console.error('❌ Error al publicar:', err);
      alert('❌ Hubo un error al publicar los cambios');
    }
  };

  return (
      <div className="bg-white min-h-screen relative">
        {/* Edit tools */}
        {isEditMode && (
          <>
            {showToolsDialog && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]" />
            )}
            <div
              className="fixed top-4 right-4 z-[100]"
              onMouseEnter={() => setShowToolsDialog(true)}
              onMouseLeave={() => setShowToolsDialog(false)}
            >
              <button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg px-4 py-2 rounded-md transition-colors">
                Tools
              </button>
              {showToolsDialog && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[160px]">
                  <button
                    onClick={handlePublish}
                    className="bg-violet-600 hover:bg-violet-500 text-white px-3 py-2 rounded-md text-sm transition-colors text-left"
                  >
                    Publish
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Blur */}
        {blur && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99]"
            aria-hidden="true"
          />
        )}

        {/* Dynamic render */}
        {pageData.components.map((component) => {
          const Component = loadRemoteComponent(component.name);
          if (!Component) {
            console.warn(`Unknown component: ${component.name}`);
            return null;
          }

          const componentId = component.id;
          const propsWithExtras = {
            ...component.props,
            isEditMode,
            setBlur,
            setEditedProp: (data: any) => setEditedProp(componentId, data),
            componentId
          };

          return <Component key={componentId} {...propsWithExtras} />;
        })}
        {children}
      </div>
  );
}

export default EditableWrapper;
