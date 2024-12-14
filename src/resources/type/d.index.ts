export interface UserInfo {
  Name: string;
  Email: string;
  WAContact: string;
  ParentsContact: number;
  Address: string;
  City: string;
  Father: string;
  Mother: string;
  EmergencyContact: string;
  LocalName: string;
  LocalContact: number;
  Image: string | null; // Allow null value here
  RollNumber: number;
  Branch: string;
  Year: number;
}
export interface Messperstd {
  id: string
  Year: number
  april: boolean
  august: boolean
  december: boolean
  february: boolean
  january: boolean
  july: boolean
  june: boolean
  march: boolean
  may: boolean
  november: boolean
  october: boolean
  september: boolean
  studentEmail: string
}