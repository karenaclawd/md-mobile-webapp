import React from "react";
import { MarkdownDoc } from "../types";

type LibraryPanelProps = {
  docs: MarkdownDoc[];
  selectedId: string | null;
  query: string;
  isOpen: boolean;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onImportClick: () => void;
  onRemoveWelcomeData: () => void;
};

export default function LibraryPanel({
  docs,
  selectedId,
  query,
  isOpen,
  onQueryChange,
  onSelect,
  onRemove,
  onImportClick,
  onRemoveWelcomeData
}: LibraryPanelProps) {
  const hasSampleDocs = docs.some((doc) => doc.source === "sample");

  return (
    <aside className={`library-panel ${isOpen ? "is-open" : "is-closed"}`}>
      <div className="library-header">
        <div>
          <h2>Library</h2>
          <p>{docs.length} documents</p>
        </div>
        <div className="library-actions">
          <button className="ghost-button" onClick={onImportClick}>
            Add
          </button>
          {hasSampleDocs && (
            <button className="ghost-button" onClick={onRemoveWelcomeData}>
              Remove Welcome Data
            </button>
          )}
        </div>
      </div>
      <label className="search-input">
        <span className="sr-only">Search documents</span>
        <input
          type="search"
          placeholder="Search titles"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
      <div className="library-list">
        {docs.map((doc) => (
          <button
            key={doc.id}
            className={`library-item ${doc.id === selectedId ? "active" : ""}`}
            onClick={() => onSelect(doc.id)}
          >
            <div>
              <h3>{doc.title}</h3>
              <p>{doc.source === "sample" ? "Sample" : "Uploaded"}</p>
            </div>
            {doc.source === "upload" ? (
              <span
                className="remove"
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(doc.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onRemove(doc.id);
                  }
                }}
              >
                Remove
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="library-footer">
        <p>Drop `.md` files anywhere to add them.</p>
      </div>
    </aside>
  );
}
