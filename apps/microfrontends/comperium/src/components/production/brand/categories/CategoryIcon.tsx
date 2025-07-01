import type { Category } from '@tauro/shared/types';

type CategoryIconProps = {
  category: Category;
};

export function CategoryIcon({ category }: CategoryIconProps) {
  return (
    <div className="bg-white rounded-full p-6 mb-4">
      {typeof category.icon === 'string' ? (
        <img
          src={category.icon || '/placeholder.svg'}
          className="object-contain rounded-full"
          alt={`${category.name} icon`}
          style={{ backgroundColor: category.color }}
        />
      ) : (
        category.icon
      )}
    </div>
  );
}
