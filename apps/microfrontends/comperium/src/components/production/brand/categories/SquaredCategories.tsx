import { EditContext } from '@tauro/shared/shadcn/*';
import type { Category } from '@tauro/shared/types';

import { useEditableState } from '@/hooks/useEditableState';
import { EditableComponent } from '@/types/types';

import { CategoryGrid } from './CategoryGrid';

type SquaredCategoriesProps = {
  categories: Category[];
  className?: string;
};

export default function SquaredCategories({
  categories,
  isEditMode,
  setEditedProp,
  setBlur,
}: SquaredCategoriesProps & EditableComponent) {
  const { state: squaredCategories, handleUpdate: handlerSquaredCategoriesUpdate } =
    useEditableState<SquaredCategoriesProps>({ categories }, setEditedProp);
  return (
    <EditContext.Provider value={{ isEditMode, setEditedProp, setBlur }}>
      <div className="container mx-auto p-4 mt-[5%]">
        <CategoryGrid
          categories={squaredCategories.categories}
          handleUpdate={handlerSquaredCategoriesUpdate}
        />
      </div>
    </EditContext.Provider>
  );
}
