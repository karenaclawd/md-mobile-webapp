import React from "react";

type HeaderProps = {
  activeTitle: string | null;
  isLibraryOpen: boolean;
  isFocusMode: boolean;
  onToggleLibrary: () => void;
  onToggleFocus: () => void;
  onImportClick: () => void;
};

export default function Header({
  activeTitle,
  isLibraryOpen,
  isFocusMode,
  onToggleLibrary,
  onToggleFocus,
  onImportClick
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className={`icon-button menu-toggle${isLibraryOpen ? " is-open" : ""}`}
          onClick={onToggleLibrary}
          aria-label={isLibraryOpen ? "Close library" : "Open library"}
          aria-pressed={isLibraryOpen}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {isLibraryOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <div className="header-title">
          <span className="eyebrow">Markdown Reader</span>
          <h1>{activeTitle ?? "No document selected"}</h1>
        </div>
      </div>
      <div className="header-actions">
        <button className="ghost-button" onClick={onToggleFocus}>
          {isFocusMode ? "Exit Focus" : "Focus"}
        </button>
        <button className="primary-button" onClick={onImportClick}>
          Import
        </button>
      </div>
    </header>
  );
}
