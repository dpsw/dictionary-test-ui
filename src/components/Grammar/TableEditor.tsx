import React, { useState } from 'react';
import { Plus, Minus, Merge, Split, Highlight, Info, X } from 'lucide-react';

interface TableCell {
  id: string;
  content: string;
  isHighlighted: boolean;
  colSpan: number;
  rowSpan: number;
}

interface TableRow {
  id: string;
  cells: TableCell[];
}

interface TableData {
  headers: string[];
  rows: TableRow[];
  footnotes: string[];
}

interface TableEditorProps {
  data: TableData;
  onChange: (data: TableData) => void;
}

export const TableEditor: React.FC<TableEditorProps> = ({ data, onChange }) => {
  const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; cellIndex: number } | null>(null);

  const updateData = (updates: Partial<TableData>) => {
    onChange({ ...data, ...updates });
  };

  const addColumn = () => {
    if (data.headers.length >= 8) return;
    
    const newHeaders = [...data.headers, `Column ${data.headers.length + 1}`];
    const newRows = data.rows.map(row => ({
      ...row,
      cells: [...row.cells, {
        id: `cell-${Date.now()}-${Math.random()}`,
        content: '',
        isHighlighted: false,
        colSpan: 1,
        rowSpan: 1
      }]
    }));
    
    updateData({ headers: newHeaders, rows: newRows });
  };

  const removeColumn = (index: number) => {
    if (data.headers.length <= 3) return;
    
    const newHeaders = data.headers.filter((_, i) => i !== index);
    const newRows = data.rows.map(row => ({
      ...row,
      cells: row.cells.filter((_, i) => i !== index)
    }));
    
    updateData({ headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const newRow: TableRow = {
      id: `row-${Date.now()}`,
      cells: data.headers.map((_, index) => ({
        id: `cell-${Date.now()}-${index}`,
        content: '',
        isHighlighted: false,
        colSpan: 1,
        rowSpan: 1
      }))
    };
    
    updateData({ rows: [...data.rows, newRow] });
  };

  const removeRow = (index: number) => {
    if (data.rows.length <= 1) return;
    
    const newRows = data.rows.filter((_, i) => i !== index);
    updateData({ rows: newRows });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...data.headers];
    newHeaders[index] = value;
    updateData({ headers: newHeaders });
  };

  const updateCell = (rowIndex: number, cellIndex: number, content: string) => {
    const newRows = [...data.rows];
    newRows[rowIndex].cells[cellIndex].content = content;
    updateData({ rows: newRows });
  };

  const toggleCellHighlight = (rowIndex: number, cellIndex: number) => {
    const newRows = [...data.rows];
    newRows[rowIndex].cells[cellIndex].isHighlighted = !newRows[rowIndex].cells[cellIndex].isHighlighted;
    updateData({ rows: newRows });
  };

  const addFootnote = () => {
    updateData({ footnotes: [...data.footnotes, ''] });
  };

  const updateFootnote = (index: number, value: string) => {
    const newFootnotes = [...data.footnotes];
    newFootnotes[index] = value;
    updateData({ footnotes: newFootnotes });
  };

  const removeFootnote = (index: number) => {
    const newFootnotes = data.footnotes.filter((_, i) => i !== index);
    updateData({ footnotes: newFootnotes });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Table Editor</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={addColumn}
            disabled={data.headers.length >= 8}
            className="btn-secondary text-sm disabled:opacity-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Column
          </button>
          <button
            type="button"
            onClick={addRow}
            className="btn-secondary text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Row
          </button>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {data.headers.map((header, index) => (
                  <th key={index} className="relative group">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder={`Header ${index + 1}`}
                    />
                    {data.headers.length > 3 && (
                      <button
                        type="button"
                        onClick={() => removeColumn(index)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.rows.map((row, rowIndex) => (
                <tr key={row.id} className="group">
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={`relative px-4 py-3 text-sm ${
                        cell.isHighlighted ? 'bg-yellow-50 border-yellow-200' : 'bg-white'
                      } ${
                        selectedCell?.rowIndex === rowIndex && selectedCell?.cellIndex === cellIndex
                          ? 'ring-2 ring-primary-500'
                          : ''
                      }`}
                      onClick={() => setSelectedCell({ rowIndex, cellIndex })}
                    >
                      <textarea
                        value={cell.content}
                        onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                        className="w-full min-h-[2.5rem] resize-none border-none bg-transparent focus:outline-none"
                        placeholder="Enter content..."
                      />
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex space-x-1">
                        <button
                          type="button"
                          onClick={() => toggleCellHighlight(rowIndex, cellIndex)}
                          className={`p-1 rounded ${
                            cell.isHighlighted ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-500'
                          }`}
                          title="Toggle highlight"
                        >
                          <Highlight className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  ))}
                  <td className="px-2 py-3">
                    {data.rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(rowIndex)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footnotes Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">Footnotes</h4>
          <button
            type="button"
            onClick={addFootnote}
            className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Footnote
          </button>
        </div>
        
        {data.footnotes.map((footnote, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="text-sm text-gray-500 mt-2">{index + 1}.</span>
            <input
              type="text"
              value={footnote}
              onChange={(e) => updateFootnote(index, e.target.value)}
              className="form-input flex-1 text-sm"
              placeholder="Enter footnote text..."
            />
            <button
              type="button"
              onClick={() => removeFootnote(index)}
              className="text-gray-400 hover:text-red-500 mt-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};