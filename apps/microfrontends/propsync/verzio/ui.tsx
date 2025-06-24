import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { SearchInput } from './components/SearchInput';
import { EntityTree } from './components/EntityTree';
import JsonEditor from './components/JsonEditor';
import VersionHistory from './components/VersionHistory';
import styles from './styles/editorStyles';
import type { Entity, PackageFile, VersionEntry, VersionHistoryItem } from './types';
import SaveButton from './components/SaveButton';

const VerzioApp: React.FC = () => {
  const [pages, setPages] = useState<Entity[]>([]);
  const [selected, setSelected] = useState<Entity | null>(null);
  const [history, setHistory] = useState<VersionHistoryItem[]>([]);
  const [propsJson, setPropsJson] = useState<string>('');
  const [expandedPages, setExpandedPages] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [importFile, setImportFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'inspector' | 'builder'>('inspector');
  const [previewMode, setPreviewMode] = useState<'json' | 'visual'>('json');


  useEffect(() => {
    axios.get('/api/entities')
      .then(res => setPages(res.data.pages))
      .catch(err => console.error('Error loading entities:', err));
  }, []);

  useEffect(() => {
    if (selected?.props) {
      setPropsJson(JSON.stringify(selected.props, null, 2));
    } else {
      setPropsJson('');
    }
  }, [selected]);

  const isValidJson = useCallback((input: string) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }, []);

  const fetchHistory = useCallback(async (entity: Entity) => {
    try {
      const res = await axios.get('/api/version/history', {
        params: { name: entity.name, type: entity.type },
      });
      setHistory(res.data.versions);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  }, []);

  const handleSelect = useCallback((entity: Entity) => {
    setSelected(entity);
    fetchHistory(entity);
  }, [fetchHistory]);

  const handleUpdateProps = async () => {
    if (!selected || !isValidJson(propsJson)) return;
    try {
      const parsed = JSON.parse(propsJson);
      await axios.post('/api/component/update', { customId: selected.customId, props: parsed });
      alert('Props updated');
      setPropsJson(JSON.stringify(parsed, null, 2));
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleSaveVersion = async () => {
    if (!selected) return;
    const comment = prompt('Comment for version:') || undefined;
    try {
      const data = selected.type === 'Component' && isValidJson(propsJson)
        ? { ...selected, props: JSON.parse(propsJson) }
        : selected;
      await axios.post('/api/version/save', { type: selected.type, name: selected.name, data, comment });
      fetchHistory(selected);
    } catch (err) {
      console.error('Error saving version:', err);
    }
  };

  const handleRestore = async (versionId: string) => {
    try {
      const res = await axios.get('/api/version/restore', { params: { versionId } });
      const restored = res.data.data;

      setPages(prevPages =>
        prevPages.map(p =>
          p.customId === restored.customId ? restored : p
        )
      );

      setSelected(restored);
      if (restored.type === 'Component') {
        setPropsJson(JSON.stringify(restored.props, null, 2));
      }

      fetchHistory(restored);
    } catch (err) {
      console.error('Restore error:', err);
    }
  };


  const handleDelete = async (versionId: string) => {
    try {
      await axios.delete('/api/version/delete', { params: { versionId } });
      if (selected) fetchHistory(selected);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const togglePage = useCallback((customId: string) => {
    setExpandedPages(prev => ({ ...prev, [customId]: !prev[customId] }));
  }, []);

  const toggleSelection = (customId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(customId)) next.delete(customId);
      else next.add(customId);
      return next;
    });
  };

  const handleExport = async () => {
    const selectedPackage = pages
      .filter(p => selectedIds.has(p.customId) || (p.components || []).some(c => selectedIds.has(`${p.customId}::${c.customId}`)))
      .map(p => {
        const selectedComponents = (p.components || []).filter(c => selectedIds.has(`${p.customId}::${c.customId}`));
        const pageCopy = { ...p };

        if (selectedComponents.length > 0) {
          pageCopy.components = selectedComponents;
        } else {
          delete pageCopy.components;
        }

        return pageCopy;
      });

    const entries: VersionEntry[] = selectedPackage.map((entity) => ({
      type: entity.type,
      name: entity.name,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      data: entity,
    }));

    const packageFile: PackageFile = {
      exportedAt: new Date().toISOString(),
      entries,
    };

    const blob = new Blob([JSON.stringify(packageFile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verzio.pkg.json';
    a.click();
  };

  const handleImport = async () => {
    if (!importFile) return;

    try {
      const text = await importFile.text();
      const parsed = JSON.parse(text);

      if (!parsed.entries || !Array.isArray(parsed.entries)) {
        alert('❌ Invalid package format: "entries" must be an array');
        return;
      }

      const response = await axios.post('/api/package/import', {
        entries: parsed.entries,
      });

      alert('✅ Import successful');

      // Refresh pages
      const res = await axios.get('/api/entities');
      setPages(res.data.pages);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err);
        alert(`❌ Import failed: ${err.response?.data?.error || err.message}`);
      } else if (err instanceof Error) {
        console.error('Generic error:', err);
        alert(`❌ Import failed: ${err.message}`);
      } else {
        console.error('Unknown error:', err);
        alert('❌ Import failed: Unknown error');
      }
    }

  };

  return (
    <PageContainer header="Verzio">
      {/* Top tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f9fafb',
        padding: '4px 12px',
        gap: 8,
        marginTop: 16
      }}>
        <div
          onClick={() => setActiveTab('inspector')}
          style={{
            padding: '8px 16px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            backgroundColor: activeTab === 'inspector' ? 'white' : '#e5e7eb',
            border: activeTab === 'inspector' ? '1px solid #ccc' : '1px solid transparent',
            borderBottom: activeTab === 'inspector' ? 'none' : '1px solid #ccc',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          🕵️ Inspector
        </div>
        <div
          onClick={() => setActiveTab('builder')}
          style={{
            padding: '8px 16px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            backgroundColor: activeTab === 'builder' ? 'white' : '#e5e7eb',
            border: activeTab === 'builder' ? '1px solid #ccc' : '1px solid transparent',
            borderBottom: activeTab === 'builder' ? 'none' : '1px solid #ccc',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          📦 Package Builder
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        ...styles.container,
        height: '90%',
        overflow: 'hidden',
      }}>
        {activeTab === 'inspector' && (
          <>
            <div style={{ ...styles.sidebar, height: '100%', overflowY: 'auto' }}>
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
              <EntityTree
                entities={[...pages].sort((a, b) => a.name.localeCompare(b.name))}
                selectedId={selected?.customId}
                expanded={expandedPages}
                searchTerm={searchTerm}
                onSelect={handleSelect}
                onToggle={togglePage}
              />
            </div>

            <div style={{ ...styles.inspector, height: '100%', overflowY: 'auto' }}>
              {selected ? (
                <>
                  <div style={styles.headerRow}>
                    <div>
                      <h2 style={styles.entityTitle}>{selected.name}</h2>
                      <p>{selected.type}</p>
                    </div>
                    <button onClick={handleSaveVersion} style={styles.saveVersionButton}>💾 Save</button>
                  </div>
                  {selected.type === 'Component' ? (
                    <JsonEditor
                      value={propsJson.replace(/"customId":/g, '"id":')}
                      onChange={(val) => setPropsJson(val.replace(/"id":/g, '"customId":'))}
                      onSave={handleUpdateProps}
                      isValid={isValidJson(propsJson)}
                    />
                  ) : (
                    <>
                      <pre style={styles.readonlyJson}>
                        {JSON.stringify(
                          {
                            id: selected.customId,
                            name: selected.name,
                            type: selected.type,
                            ...(selected.components && {
                              components: selected.components.map((c) => ({
                                id: c.customId,
                                name: c.name,
                                type: c.type,
                                props: c.props,
                              })),
                            }),
                          },
                          null,
                          2
                        )}
                      </pre>

                      <SaveButton onSave={async () => {
                        try {
                          await axios.post('/api/page/update', {
                            customId: selected.customId,
                            data: selected,
                          });
                          alert('✅ Page updated');
                        } catch (err) {
                          console.error('Page update error:', err);
                          alert('❌ Failed to update page');
                        }
                      }} />
                    </>
                  )}
                </>
              ) : (
                <p style={{ fontStyle: 'italic' }}>Select a page or component</p>
              )}
            </div>

            <div style={{ ...styles.historyPanel, height: '100%', overflowY: 'auto' }}>
              <VersionHistory history={history} onRestore={handleRestore} onDelete={handleDelete} />
            </div>
          </>
        )}

        {activeTab === 'builder' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 24, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <h3 style={{ marginBottom: 12 }}>📄 Select Pages & Components</h3>
                <div style={{
                  maxHeight: 400,
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 12,
                  background: '#f9fafb'
                }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[...pages]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(page => (
                        <li key={page.customId} style={{ marginBottom: 12 }}>
                          {/* Pages */}
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(page.customId)}
                              onChange={() => toggleSelection(page.customId)}
                            />
                            <span><strong>{page.name}</strong><em style={{ color: '#6b7280' }}>({page.type})</em></span>
                          </label>

                          {/* Components */}
                          {page.components && page.components.length > 0 && (
                            <ul style={{ listStyle: 'none', paddingLeft: 24, marginTop: 4 }}>
                              {page.components.map(comp => {
                                const compositeId = `${page.customId}::${comp.customId}`;
                                return (
                                  <li key={compositeId}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <input
                                        type="checkbox"
                                        checked={selectedIds.has(compositeId)}
                                        onChange={() => toggleSelection(compositeId)}
                                      />
                                      <span>{comp.name}</span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Preview Mode */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3>🔍 Package Preview</h3>
                  <button
                    onClick={() => setPreviewMode(prev => prev === 'json' ? 'visual' : 'json')}
                    style={{
                      backgroundColor: '#e5e7eb',
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      padding: '4px 10px',
                      cursor: 'pointer',
                      fontSize: 13
                    }}
                  >
                    {previewMode === 'json' ? 'Visual' : 'JSON'}
                  </button>
                </div>

                <div style={{
                  height: 400,
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: '#fefefe',
                  fontSize: 13
                }}>
                  {previewMode === 'json' ? (
                    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(
                        pages
                          .filter(p =>
                            selectedIds.has(p.customId) ||
                            (p.components || []).some(c => selectedIds.has(`${p.customId}::${c.customId}`))
                          )
                          .map(p => {
                            const selectedComponents = (p.components || []).filter(c =>
                              selectedIds.has(`${p.customId}::${c.customId}`)
                            ).map(c => ({
                              id: c.customId,
                              name: c.name,
                              type: c.type,
                              props: c.props,
                            }));

                            return {
                              id: p.customId,
                              name: p.name,
                              type: p.type,
                              components: selectedComponents.length > 0 ? selectedComponents : undefined,
                            };
                          }),
                        null,
                        2
                      )}
                    </pre>
                  ) : (
                    <div>
                      {pages
                        .filter(p =>
                          selectedIds.has(p.customId) ||
                          (p.components || []).some(c => selectedIds.has(`${p.customId}::${c.customId}`))
                        )
                        .map(p => (
                          <div key={p.customId} style={{ marginBottom: 12 }}>
                            <strong>{p.name}</strong> <em style={{ color: '#888' }}>({p.type})</em>
                            {(p.components || []).some(c => selectedIds.has(`${p.customId}::${c.customId}`)) && (
                              <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                                {p.components
                                  ?.filter(c => selectedIds.has(`${p.customId}::${c.customId}`))
                                  .map(c => (
                                    <li key={`${p.customId}::${c.customId}`}>{c.name}</li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Import/Export */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 32,
              flexWrap: 'wrap',
              gap: 16,
            }}>
              <button
                onClick={handleExport}
                disabled={selectedIds.size === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: selectedIds.size === 0 ? '#e5e7eb' : '#2563eb',
                  color: selectedIds.size === 0 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: selectedIds.size === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease-in-out',
                  boxShadow: selectedIds.size === 0 ? 'none' : '0 1px 4px rgba(0,0,0,0.1)'
                }}
              >
                📦 Export Package
              </button>

              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                border: '2px dashed #cbd5e1',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                color: '#374151',
                transition: 'background-color 0.2s ease-in-out'
              }}>
                ⬆️ Select Package
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  style={{ display: 'none' }}
                />
              </label>

              <button
                onClick={handleImport}
                disabled={!importFile}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  backgroundColor: importFile ? '#059669' : '#e5e7eb',
                  color: importFile ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: importFile ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease-in-out',
                  boxShadow: importFile ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                ✅ Import Package
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );

};

export default VerzioApp;
