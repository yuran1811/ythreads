import mongoose from 'mongoose';

export interface UserProps {
  id: string;
  profileImageUrl?: string;
  imageUrl: string;
  username: string;
  firstName?: string;
  lastName?: string;
  passwordEnabled?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface UserInfoProps {
  id: string;
  name: string;
  username: string;
  bio?: string;
  image?: string;
  onboarded: boolean;
  threads?: mongoose.Schema.Types.ObjectId[];
  communities?: mongoose.Schema.Types.ObjectId[];
}
