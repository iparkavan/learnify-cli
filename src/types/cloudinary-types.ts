export interface CloudinaryAudioInfo {
  codec: string;
  bit_rate: string;
  frequency: number;
  channels: number;
  channel_layout: string;
}

export interface CloudinaryVideoInfo {
  pix_format: string;
  codec: string;
  level: number;
  profile: string;
  bit_rate: string;
  time_base: string;
}

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;

  width: number;
  height: number;
  format: string;
  resource_type: "video" | "image" | "raw";
  created_at: string;

  tags: string[];
  pages: number;
  bytes: number;
  type: "upload";
  etag: string;
  placeholder: boolean;

  url: string;
  secure_url: string;
  playback_url: string;

  folder: string;
  access_mode: "public" | "authenticated" | "private";

  audio: CloudinaryAudioInfo;
  video: CloudinaryVideoInfo;

  is_audio: boolean;
  frame_rate: number;
  bit_rate: number;
  duration: number;
  rotation: number;

  original_filename: string;
  original_extension: string;
  nb_frames: number;
}
