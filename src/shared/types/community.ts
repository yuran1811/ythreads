import mongoose from 'mongoose';

export interface CommunityInfoProps {
  id: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  createdBy?: mongoose.Schema.Types.ObjectId;
  threads?: mongoose.Schema.Types.ObjectId[];
  members?: mongoose.Schema.Types.ObjectId[];
}
