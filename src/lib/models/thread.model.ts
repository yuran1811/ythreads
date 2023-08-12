import mongoose from 'mongoose';

import { ThreadInfoProps } from '@/shared/types';

const threadSchema = new mongoose.Schema({
  parentId: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
} as Record<keyof ThreadInfoProps, any>);

export const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;
