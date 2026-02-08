import React, { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import LibraryPanel from "./components/LibraryPanel";
import MarkdownViewer from "./components/MarkdownViewer";
import EmptyState from "./components/EmptyState";
import { sampleDocs } from "./data/sampleDocs";
import { MarkdownDoc } from "./types";

const toId = () => crypto.randomUUID();

export default function App() {
  const [docs, setDocs] = useState<MarkdownDoc[]>(sampleDocs);
  const [selectedId, setSelectedId] = useState<string | null>(sampleDocs[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredDocs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return docs;
    }
    return docs.filter((doc) => doc.title.toLowerCase().includes(term));
  }, [docs, query]);

  const activeDoc = docs.find((doc) => doc.id === selectedId) ?? null;

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const buildDocFromFile = async (file: File): Promise<MarkdownDoc | null> => {
    if (!file.name.toLowerCase().endsWith(".md")) {
      return null;
    }
    const content = await file.text();
    const title = file.name.replace(/\.md$/i, "");
    return {
      id: toId(),
      title: title || "Untitled",
      content,
      source: "upload",
      updatedAt: new Date().toISOString()
    };
  };

  const addDocs = (newDocs: MarkdownDoc[]) => {
    if (newDocs.length === 0) {
      return;
    }
    setDocs((prev) => [...newDocs, ...prev]);
    setSelectedId(newDocs[0].id);
    setIsLibraryOpen(false);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    const files = Array.from(fileList);
    const docsFromFiles = await Promise.all(files.map(buildDocFromFile));
    const validDocs = docsFromFiles.filter((doc): doc is MarkdownDoc => Boolean(doc));
    addDocs(validDocs);
  };

  const handleRemove = (id: string) => {
    setDocs((prev) => {
      const remaining = prev.filter((doc) => doc.id !== id);
      if (selectedId === id) {
        setSelectedId(remaining[0]?.id ?? null);
      }
      return remaining;
    });
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFiles(event.dataTransfer.files);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (event) => {
    if ((event.target as HTMLElement).closest(".app-shell")) {
      return;
    }
    setIsDragging(false);
  };

  return (
    <div
      className={`app-shell ${isFocusMode ? "focus" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Header
        activeTitle={activeDoc?.title ?? null}
        isLibraryOpen={isLibraryOpen}
        isFocusMode={isFocusMode}
        onToggleLibrary={() => setIsLibraryOpen((prev) => !prev)}
        onToggleFocus={() => setIsFocusMode((prev) => !prev)}
        onImportClick={handleImportClick}
      />

      <main className="app-main">
        <LibraryPanel
          docs={filteredDocs}
          selectedId={selectedId}
          query={query}
          isOpen={isLibraryOpen}
          onQueryChange={setQuery}
          onSelect={(id) => {
            setSelectedId(id);
            setIsLibraryOpen(false);
          }}
          onRemove={handleRemove}
          onImportClick={handleImportClick}
        />

        <section className="content-panel">
          {activeDoc ? (
            <MarkdownViewer content={activeDoc.content} />
          ) : (
            <EmptyState onImportClick={handleImportClick} />
          )}
        </section>
      </main>

      {isDragging ? (
        <div className="drop-overlay">
          <div className="drop-card">
            <p className="eyebrow">Drop file to import</p>
            <h2>Release to load your markdown.</h2>
          </div>
        </div>
      ) : null}

      <input
        ref={fileInputRef}
        className="sr-only"
        type="file"
        accept=".md"
        multiple
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
