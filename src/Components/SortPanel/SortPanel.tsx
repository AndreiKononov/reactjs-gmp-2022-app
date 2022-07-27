import React from "react";
import Select from 'react-select';
import { sortSelectStyles } from './sortSelectStyles';
import { SelectValue } from '../../models/SelectValue';
// import './SortPanel.scss';

interface SortPanelProps {
  sortOptions: SelectValue[];
  sortByValue: SelectValue | null;
  handleSelect: (value: SelectValue) => void;
}

const customStyles = sortSelectStyles;

export function SortPanel({ sortOptions, sortByValue, handleSelect }: SortPanelProps) {
  const selectId = 'sort-select';

  return (
    <div className="sort-panel">
      <span className="sort-panel-label">Sort by</span>
      <Select
        value={sortByValue}
        options={sortOptions}
        styles={customStyles}
        onChange={(value) => handleSelect(value as SelectValue)}
        instanceId={selectId}
      />
    </div>
  );
}
