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
        <button className="icon-button" onClick={onToggleLibrary} aria-label="Toggle library">
          {isLibraryOpen ? "Close" : "Library"}
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
