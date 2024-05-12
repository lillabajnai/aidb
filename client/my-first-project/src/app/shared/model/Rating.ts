export interface Rating {
  _id?: string;
  rating: number;
  comment: string;
  isCritical: boolean;
  userId: string;
  movieId: string;
}
