export type EntryStatus = "entry_pending" | "ack_complete" | "cancelled";

export type Area = {
  id: string;
  name: string;
  mapPath: string;
};

export type EntryRecord = {
  id: string;
  timestamp: string;
  areaId: string;
  areaName: string;
  spotX: number;
  spotY: number;
  mapSnapshotDataUrl: string;
  badge: string;
  workOrder: string;
  status: EntryStatus;
  deviceInfo?: string;
  appVersion?: string;
};