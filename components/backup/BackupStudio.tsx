"use client";

import React, { useState, useEffect } from "react";
import { 
  Cloud, Download, RefreshCw, Database, ShieldCheck, 
  UploadCloud, FileJson, Clock, Trash2, CheckCircle2, AlertCircle 
} from "lucide-react";

export const BackupStudio: React.FC = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [note, setNote] = useState("");

  const fetchBackups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/backup");
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });

      if (res.ok) {
        setNote("");
        fetchBackups();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Automated Cloud Backup & Restore</h2>
              <p className="text-xs text-slate-500">1-Click JSON snapshots of products, stock, invoices, and customer ledgers.</p>
            </div>
          </div>

          <button
            onClick={fetchBackups}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh List
          </button>
        </div>

        {/* 1-Click Backup Form */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-xl border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Tenant Isolated Encrypted Backup
            </span>
            <span className="text-xs text-slate-400 font-mono">Format: JSON</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Backup Note (e.g. Daily EOD Backup, Pre-Stock Update)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              onClick={handleCreateBackup}
              disabled={creating}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 shrink-0"
            >
              {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {creating ? "Creating Snapshot..." : "1-Click Cloud Backup"}
            </button>
          </div>
        </div>

        {/* Backup History Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900 border-b pb-2">Cloud Backup Snapshots</h3>

          {backups.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-slate-400 border border-dashed rounded-2xl bg-slate-50 space-y-1">
              <Clock className="w-8 h-8 mx-auto text-slate-300" />
              <p>No cloud backup snapshots created yet.</p>
              <p className="text-[10px] text-slate-400 font-normal">Click "1-Click Cloud Backup" to generate your first complete data snapshot.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {backups.map((b) => (
                <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                      <FileJson className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{b.filename}</h4>
                      <p className="text-[10px] text-slate-500">{b.note} | Size: {(b.sizeInBytes / 1024).toFixed(2)} KB | Date: {new Date(b.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
