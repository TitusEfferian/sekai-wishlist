interface SongInterface {
    id: string;
    creator: string;
    title: string;
    thumbnail: string;
    likes: number;
    blurData: string;
    isReleased: boolean;
}

export type { SongInterface };