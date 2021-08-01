interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface IPost extends Timestamps {
  id: number;
}
