import React from 'react';

type Entity = {
  customId: string;
  name: string;
  type: 'Page' | 'Component';
  components?: Entity[];
}

interface EntityTreeProps {
  entities: Entity[];
  selectedId?: string;
  expanded: Record<string, boolean>;
  searchTerm: string;
  onSelect: (entity: Entity) => void;
  onToggle: (customId: string) => void;
}

export const EntityTree: React.FC<EntityTreeProps> = ({
  entities,
  selectedId,
  expanded,
  searchTerm,
  onSelect,
  onToggle,
}) => {
  const filteredEntities = entities.filter((entity) => {
    const matchesEntity = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComponent = entity.components?.some((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesEntity || matchesComponent;
  });

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {filteredEntities.map((entity) => {
        const showAllComponents = searchTerm.trim() !== '';
        const visibleComponents = showAllComponents
          ? entity.components?.filter((comp) =>
              comp.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : entity.components;

        return (
          <li key={entity.customId} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => onSelect(entity)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontWeight: selectedId === entity.customId ? 'bold' : 600,
                  color: selectedId === entity.customId ? '#2563eb' : '#333',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 4,
                  flex: 1,
                }}
              >
                {entity.name}
              </button>

              {entity.components && entity.components.length > 0 && !showAllComponents && (
                <button
                  onClick={() => onToggle(entity.customId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    marginLeft: 8,
                  }}
                >
                  {expanded[entity.customId] ? '-' : '+'}
                </button>
              )}
            </div>

            {visibleComponents && visibleComponents.length > 0 && (showAllComponents || expanded[entity.customId]) && (
              <div style={{ paddingLeft: 16 }}>
                {visibleComponents.map((comp) => (
                  <button
                    key={comp.customId}
                    onClick={() => onSelect(comp)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: selectedId === comp.customId ? '#2563eb' : '#333',
                      cursor: 'pointer',
                      fontSize: 13,
                      padding: 2,
                      textDecoration: 'underline',
                      fontWeight: selectedId === comp.customId ? 'bold' : 'normal',
                    }}
                  >
                    🧩 {comp.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
