// VoucherManagement.jsx

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VoucherManagement.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    expiryDate: '',
    minOrderValue: 0,
    maxDiscountAmount: 0,
  });
  const [editVoucher, setEditVoucher] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/voucher`);
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setError("Không thể tải danh sách voucher.");
    }
  };

  const addVoucher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/voucher`, newVoucher);
      setVouchers([...vouchers, response.data]);
      setNewVoucher({
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        expiryDate: '',
        minOrderValue: 0,
        maxDiscountAmount: 0,
      });
      setError('');
      alert("Thêm voucher thành công!");
      // Close modal
      const modal = document.getElementById("addVoucherModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Error adding voucher:", error);
      setError("Có lỗi xảy ra khi thêm voucher.");
    }
  };

  const deleteVoucher = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) return;
    try {
      await axios.delete(`${apiUrl}/voucher/${id}`);
      setVouchers(vouchers.filter(voucher => voucher._id !== id));
      alert("Xóa voucher thành công!");
    } catch (error) {
      console.error("Error deleting voucher:", error);
      setError("Có lỗi xảy ra khi xóa voucher.");
    }
  };

  const openEditModal = (voucher) => {
    // Loại bỏ usageLimit nếu tồn tại
    const { usageLimit, ...voucherData } = voucher;
    setEditVoucher(voucherData);
    const modal = new bootstrap.Modal(document.getElementById("editVoucherModal"));
    modal.show();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVoucher({ ...editVoucher, [name]: value });
  };

  const updateVoucher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/voucher/${editVoucher._id}`, editVoucher);
      setVouchers(vouchers.map(v => v._id === editVoucher._id ? response.data : v));
      setEditVoucher(null);
      setError('');
      alert("Cập nhật voucher thành công!");
      // Close modal
      const modal = document.getElementById("editVoucherModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Error updating voucher:", error);
      setError("Có lỗi xảy ra khi cập nhật voucher.");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản Lý Voucher</h1>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <i className="fas fa-table me-1"></i>
          Danh Sách Voucher
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addVoucherModal">
            Thêm Voucher
          </button>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Mã Voucher</th>
                <th>Loại Giảm Giá</th>
                <th>Giá Trị</th>
                <th>Giá Trị Đơn Hàng Tối Thiểu</th>
                <th>Giảm Giá Tối Đa</th>
                <th>Hạn Sử Dụng</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map(voucher => (
                <tr key={voucher._id}>
                  <td>{voucher.code}</td>
                  <td>{voucher.discountType === 'percentage' ? 'Phần Trăm' : 'Cố Định'}</td>
                  <td>
                    {voucher.discountType === 'percentage' 
                      ? `${voucher.discountValue}%` 
                      : `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.discountValue)}`}
                  </td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.minOrderValue)}
                  </td>
                  <td>
                    {voucher.maxDiscountAmount
                      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.maxDiscountAmount)
                      : 'Không giới hạn'}
                  </td>
                  <td>{new Date(voucher.expiryDate).toLocaleDateString()}</td>
                  <td>{voucher.isActive ? 'Hoạt Động' : 'Không Hoạt Động'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(voucher)}>Chỉnh Sửa</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteVoucher(voucher._id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thêm Voucher Modal */}
      <div className="modal fade" id="addVoucherModal" tabIndex="-1" aria-labelledby="addVoucherModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={addVoucher}>
            <div className="modal-header">
              <h5 className="modal-title" id="addVoucherModalLabel">Thêm Voucher Mới</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="voucherCode" className="form-label">Mã Voucher</label>
                <input
                  type="text"
                  className="form-control"
                  id="voucherCode"
                  name="code"
                  value={newVoucher.code}
                  onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
                  placeholder="Nhập mã voucher"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discountType" className="form-label">Loại Giảm Giá</label>
                <select
                  className="form-select"
                  id="discountType"
                  name="discountType"
                  value={newVoucher.discountType}
                  onChange={(e) => setNewVoucher({ ...newVoucher, discountType: e.target.value })}
                  required
                >
                  <option value="percentage">Giảm giá theo %</option>
                  <option value="fixed">Giảm giá cố định</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="discountValue" className="form-label">Giá Trị Giảm Giá</label>
                <input
                  type="number"
                  className="form-control"
                  id="discountValue"
                  name="discountValue"
                  value={newVoucher.discountValue}
                  onChange={(e) => setNewVoucher({ ...newVoucher, discountValue: e.target.value })}
                  placeholder="Nhập giá trị giảm giá"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="minOrderValue" className="form-label">Giá Trị Đơn Hàng Tối Thiểu</label>
                <input
                  type="number"
                  className="form-control"
                  id="minOrderValue"
                  name="minOrderValue"
                  value={newVoucher.minOrderValue}
                  onChange={(e) => setNewVoucher({ ...newVoucher, minOrderValue: e.target.value })}
                  placeholder="Nhập giá trị đơn hàng tối thiểu"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maxDiscountAmount" className="form-label">Giảm Giá Tối Đa</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxDiscountAmount"
                  name="maxDiscountAmount"
                  value={newVoucher.maxDiscountAmount}
                  onChange={(e) => setNewVoucher({ ...newVoucher, maxDiscountAmount: e.target.value })}
                  placeholder="Nhập số tiền giảm giá tối đa"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">Hạn Sử Dụng</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  value={newVoucher.expiryDate}
                  onChange={(e) => setNewVoucher({ ...newVoucher, expiryDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="submit" className="btn btn-primary">Thêm Voucher</button>
            </div>
          </form>
        </div>
      </div>

      {/* Chỉnh Sửa Voucher Modal */}
      <div className="modal fade" id="editVoucherModal" tabIndex="-1" aria-labelledby="editVoucherModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          {editVoucher && (
            <form className="modal-content" onSubmit={updateVoucher}>
              <div className="modal-header">
                <h5 className="modal-title" id="editVoucherModalLabel">Chỉnh Sửa Voucher</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="editVoucherCode" className="form-label">Mã Voucher</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editVoucherCode"
                    name="code"
                    value={editVoucher.code}
                    onChange={handleEditChange}
                    placeholder="Nhập mã voucher"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDiscountType" className="form-label">Loại Giảm Giá</label>
                  <select
                    className="form-select"
                    id="editDiscountType"
                    name="discountType"
                    value={editVoucher.discountType}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="percentage">Giảm giá theo %</option>
                    <option value="fixed">Giảm giá cố định</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="editDiscountValue" className="form-label">Giá Trị Giảm Giá</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editDiscountValue"
                    name="discountValue"
                    value={editVoucher.discountValue}
                    onChange={handleEditChange}
                    placeholder="Nhập giá trị giảm giá"
                    min="0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editMinOrderValue" className="form-label">Giá Trị Đơn Hàng Tối Thiểu</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editMinOrderValue"
                    name="minOrderValue"
                    value={editVoucher.minOrderValue}
                    onChange={handleEditChange}
                    placeholder="Nhập giá trị đơn hàng tối thiểu"
                    min="0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editMaxDiscountAmount" className="form-label">Giảm Giá Tối Đa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editMaxDiscountAmount"
                    name="maxDiscountAmount"
                    value={editVoucher.maxDiscountAmount || 0}
                    onChange={handleEditChange}
                    placeholder="Nhập số tiền giảm giá tối đa"
                    min="0"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editExpiryDate" className="form-label">Hạn Sử Dụng</label>
                  <input
                    type="date"
                    className="form-control"
                    id="editExpiryDate"
                    name="expiryDate"
                    value={editVoucher.expiryDate.substring(0, 10)}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editIsActive" className="form-label">Trạng Thái</label>
                  <select
                    className="form-select"
                    id="editIsActive"
                    name="isActive"
                    value={editVoucher.isActive}
                    onChange={(e) => setEditVoucher({ ...editVoucher, isActive: e.target.value === 'true' })}
                    required
                  >
                    <option value="true">Hoạt Động</option>
                    <option value="false">Không Hoạt Động</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="submit" className="btn btn-primary">Cập Nhật Voucher</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherManagement;