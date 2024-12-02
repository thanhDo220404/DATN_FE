// pages/api/voucher/[id].js
"use client";
import { updateVoucher, deleteVoucher } from '@/mongo/voucherController';

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    return updateVoucher(req, res);
  } else if (req.method === 'DELETE') {
    return deleteVoucher(req, res);
  } else {
    res.status(400).json({ success: false });
  }
}