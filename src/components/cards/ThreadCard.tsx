import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import DeleteThread from '../forms/DeleteThread';

import { cn } from '@/lib/utils';
import { converObjectIdToString, formatDateString } from '@/utils';

export interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
    bio: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: ThreadCardProps) {
  return (
    <article className={cn('flex w-full flex-col rounded-xl', isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7')}>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                sizes='100%'
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={cn('mt-5 flex flex-col gap-3', isComment && 'mb-10')}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='reply'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='repost'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='share'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={converObjectIdToString(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={cn(index !== 0 && '-ml-5', 'rounded-full object-cover')}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className='mt-5 flex items-center'>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className='flex items-center text-subtle-medium text-gray-1'>
                <span>{formatDateString(createdAt)}</span>
                <span>{community ? ` - from ${community.name} community` : ''}</span>
              </div>
            </HoverCardTrigger>

            <HoverCardContent className='w-max'>
              <div className='flex justify-between space-x-4'>
                <Avatar>
                  <AvatarImage src={community.image} />
                  <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className='space-y-1'>
                  <h4 className='text-sm font-semibold'>@{community.name}</h4>
                  <p className='text-sm'>{community.bio}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
