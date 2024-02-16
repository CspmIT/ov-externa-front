import React, { useState, useEffect } from 'react';
import IconRenderer from '../IconRenderer';

const Table = ({ columns, rows, showCheckboxes }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

  useEffect(() => {
    const allRowsIds = Object.entries(rows).flatMap(([accountNumber, accountInfo]) => (
      accountInfo.list.map((_, listIndex) => `${accountNumber}_${listIndex}`)
    ));
    const allRowsSelected = allRowsIds.every(rowId => selectedRows.includes(rowId));
    setIsHeaderCheckboxChecked(allRowsSelected);
  }, [selectedRows, rows]);

  const handleCheckboxChange = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsHeaderCheckboxChecked(isChecked);

    if (isChecked) {
      const allRowsIds = Object.entries(rows).flatMap(([accountNumber, accountInfo]) => (
        accountInfo.list.map((_, listIndex) => `${accountNumber}_${listIndex}`)
      ));
      setSelectedRows(allRowsIds);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <table className="w-full shadowCards text-gray-500 dark:text-gray-400 rounded-xl bg-zinc-200 dark:bg-zinc-900">
      <thead className='fondoPrincipal text-zinc-700 '>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border p-3">{column}</th>
          ))}
          {showCheckboxes && (
            <th className="border p-3">
              <input 
                type="checkbox"
                checked={isHeaderCheckboxChecked}
                onChange={handleHeaderCheckboxChange} 
              />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(rows).length === 0 ? (
          <tr className='border border-gray-300 dark:border-gray-600'>
            <td colSpan={columns.length} className="p-2 text-center">
              No hay datos disponibles
            </td>
          </tr>
        ) : (
          Object.entries(rows).map(([accountNumber, accountInfo], rowIndex) => (
            <React.Fragment key={accountNumber}>
              <tr className='border border-gray-300 dark:border-gray-600'>
                <td colSpan={columns.length} className="p-1 text-center">
                  Cuenta N°: {accountNumber} ({accountInfo.data.phoneNumber ? `Tel: ${accountInfo.data.phoneNumber}` : `Dirección: ${accountInfo.data.address}`})
                </td>
              </tr>
              {accountInfo.list.map((list, listIndex) => {
                const rowId = `${accountNumber}_${listIndex}`;
                return (
                  <tr key={rowId} className='p-2'>
                    {Object.entries(list).filter(([key]) => key !== 'id').map(([key, value], index) => (
                      <td key={index} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 p-3">
                        {key === 'url' ? (
                          <div className='w-full text-center'>
                            <button onClick={() => window.open(value, '_blank')} className="bg-blue-400 p-2 rounded text-white">
                              <IconRenderer iconName={'FaFileAlt'} />
                            </button>
                          </div>
                        ) : key === 'status' ? (
                          <div className='w-full flex justify-center'>
                            {(() => {
                              let color;
                              switch (value) {
                                case 0:
                                  color = 'text-red-500';
                                  break;
                                case 1:
                                  color = 'text-yellow-500';
                                  break;
                                default:
                                  color = 'text-gray-500';
                                  break;
                              }
                              return (
                                <IconRenderer iconName={'FaCircle'} color={color} />
                              );
                            })()}
                          </div>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                    {showCheckboxes && (
                      <td className="border text-center border-gray-300 bg-white dark:border-gray-600 dark:bg-zinc-800 p-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowId)}
                          onChange={() => handleCheckboxChange(rowId)}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
