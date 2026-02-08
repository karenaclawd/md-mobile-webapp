import React from "react";

type EmptyStateProps = {
  onImportClick: () => void;
};

export default function EmptyState({ onImportClick }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-card">
        <p className="eyebrow">No file loaded</p>
        <h2>Drop a markdown file to start reading.</h2>
        <p>
          This reader works offline and respects GitHub Flavored Markdown. Import a `.md` file or
          explore the built-in samples.
        </p>
        <button className="primary-button" onClick={onImportClick}>
          Import Markdown
        </button>
      </div>
    </div>
  );
}
