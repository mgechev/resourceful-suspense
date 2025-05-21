import React, { useState } from 'react';
import './ExpandableContainer.css';

interface ExpandableContainerProps {
  activateAt?: number | null; // px breakpoint
  header: React.ReactNode;
  children: React.ReactNode;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> = ({ activateAt = null, header, children }) => {
  const [expanded, setExpanded] = useState(false);
  const activeClass = activateAt ? `active-at-${activateAt}` : 'active';

  return (
    <div className={`expandable-wrapper${expanded ? ' expanded' : ''} ${activeClass}`}>
      <button title="Expand/collapse container" onClick={() => setExpanded(e => !e)} className="expand-btn">
        <div>{header}</div>
        <span className={`chevron${expanded ? ' rotated' : ''}`}>▶</span>
      </button>
      <div className="expandable-content">{children}</div>
    </div>
  );
};

export default ExpandableContainer; 