export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  type: 'sent' | 'received';
}
