import type { Category } from '@tauro/shared/types';

import React from 'react';

import { EditableCategoryCard } from '../../../editable/EditableCategoryCard';

type CategoriesGridProps = {
  categories: Category[];
  className?: string;
  handleUpdate: (categories: Partial<CategoriesProp>) => void;
};

type CategoriesProp = {
  categories: Category[];
  className?: string;
};

export function CategoryGrid({ categories, handleUpdate, className = '' }: CategoriesGridProps) {
  const handleCategoryUpdate = (index: number, updated: Partial<Category>) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = { ...updatedCategories[index], ...updated };
    handleUpdate({ categories: updatedCategories });
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 px-12 flex justify-center items-center ${className}`}
    >
      {categories.map((category, index) => (
        <EditableCategoryCard
          key={index}
          value={{
            name: category.name,
            href: category.href ?? '#',
            icon: category.icon,
            color: category.color,
          }}
          onSave={({ name, href }) => handleCategoryUpdate(index, { name, href })}
        />
      ))}
    </div>
  );
}
