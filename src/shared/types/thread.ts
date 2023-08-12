import mongoose from 'mongoose';

export interface ThreadInfoProps {
  parentId: string | null;
  author: mongoose.Schema.Types.ObjectId;
  text: string;
  community?: mongoose.Schema.Types.ObjectId;
  children?: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface ThreadProps {
  parentId: string | null;
  author: {
    name: string;
    image: string;
    id: string;
  };
  text: string;
  community?: {
    id: string;
    name: string;
    image: string;
  };
  children?: {
    author: {
      image: string;
    };
  };
  createdAt: Date;
}
