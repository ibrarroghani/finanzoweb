export type MessageType = 'text' | 'image' | 'file';
export type SenderType = 'client' | 'broker';
export type SenderImageType = 'source' | 'uri';
export type StatusType = 'sending' | 'unread' | 'read' | 'edited' | 'deleted';

export interface Sender {
  id: number;
  name: string;
  email: string;
  slug: string;
  details: Details;
}

export interface File {
  id: number;
  original_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  slug: string;
  created_at: Date;
}

export interface Details {
  id: number;
  address: string;
  profile_picture_url: string;
  phone_number: string;
}

export interface IMessage {
  id: number;
  thread_id: number;
  sender_id: number;
  message: string;
  seen_at: Date | null;
  created_at: Date;
  sender: Sender;
  file: File | null;
  comment: string | null;
}

export interface SeenData {
  messageIds: number[];
  seenBy: {
    id: string;
    name: string;
  };
}
