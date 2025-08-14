import React from 'react';
import {
  FileText,
  Calendar,
  DollarSign,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const BillTable = ({
  sortedBills,
  sortConfig,
  handleSort,
  updateBill,
  deleteBill,
  getTotalAmount,
  isSelectableMode,
  selectableOptions,
}) => {
  return (
    <div className="table-section">
      <div className="table-card">
        <div className="card-header">
          <FileText size={20} />
          <h3>Bill Management</h3>
          <div className="table-stats">
            <span className="stat-item">
              {sortedBills.length} bills • Total: ₹{getTotalAmount()}
            </span>
          </div>
        </div>

        <div className="table-container">
          <table className="bills-table">
            <thead>
              <tr>
                <th>
                  <span className="th-content">#</span>
                </th>
                <th>
                  <span className="th-content">
                    <FileText size={16} /> Bill Title
                  </span>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => handleSort("date")}
                  >
                    <span className="th-content">
                      <Calendar size={16} /> Date
                      {sortConfig.field === "date" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} className="sort-icon" />
                        ) : (
                          <ArrowDown size={14} className="sort-icon" />
                        )
                      ) : (
                        <ArrowUpDown size={14} className="sort-icon" />
                      )}
                    </span>
                  </button>
                </th>
                <th>
                  <button
                    className="sort-header-btn"
                    onClick={() => handleSort("amount")}
                  >
                    <span className="th-content">
                      <DollarSign size={16} /> Amount (₹)
                      {sortConfig.field === "amount" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} className="sort-icon" />
                        ) : (
                          <ArrowDown size={14} className="sort-icon" />
                        )
                      ) : (
                        <ArrowUpDown size={14} className="sort-icon" />
                      )}
                    </span>
                  </button>
                </th>
                <th>
                  <span className="th-content">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBills.map((bill, index) => (
                <tr key={bill.id} className="bill-row">
                  <td>
                    <span className="row-number">{index + 1}</span>
                  </td>
                  <td>
                    <div className="input-wrapper">
                      {isSelectableMode ? (
                        <select
                          value={bill.title}
                          onChange={(e) =>
                            updateBill(bill.id, "title", e.target.value)
                          }
                          className="bill-select"
                        >
                          {selectableOptions.map((option) => (
                            <option
                              key={option.label}
                              value={option.label}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <textarea
                          value={bill.title}
                          onChange={(e) =>
                            updateBill(bill.id, "title", e.target.value)
                          }
                          placeholder="Enter bill title..."
                          rows={1}
                          style={{
                            resize: 'none',
                            overflow: 'hidden',
                            minHeight: '38px',
                            lineHeight: '1.4'
                          }}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                          ref={(textarea) => {
                            if (textarea) {
                              // Auto-resize on mount/update
                              setTimeout(() => {
                                textarea.style.height = 'auto';
                                textarea.style.height = textarea.scrollHeight + 'px';
                              }, 0);
                            }
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="input-wrapper">
                      <input
                        type="date"
                        value={bill.date}
                        onChange={(e) =>
                          updateBill(bill.id, "date", e.target.value)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="input-wrapper amount-input">
                      <span className="input-icon">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={bill.amount === 0 ? "" : bill.amount}
                        onChange={(e) =>
                          updateBill(bill.id, "amount", e.target.value)
                        }
                        placeholder="0.00"
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteBill(bill.id)}
                      className="btn btn-danger btn-sm"
                      title="Delete bill"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan="3">
                  <div className="total-label">
                    <strong>Total Amount</strong>
                  </div>
                </td>
                <td>
                  <div className="total-amount">
                    <span>₹</span>
                    <strong>{getTotalAmount()}</strong>
                  </div>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillTable;