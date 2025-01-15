export interface Track {
  id: string;
  title: string;
  audioUrl: string;
  coverImage?: string;
  category: string;
  duration: number;
  artist?: string;
  album?: string;
  releaseDate?: Date;
  characters: string[];
  event?: string;
  tags: string[];
}

export interface PlaylistType {
  id: string;
  name: string;
  userId: string;
  tracks: string[];
  createdAt: Date;
  updatedAt: Date;
} 