'use client';

import React, { useState } from 'react';
import { Post } from '../types/Post';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ROUTE_PROFILE } from '@utils/constants/routes';

interface Props {
  post: Post,
  handleTagClick?: (string: string) => void,
  onEdit?: (post: Post) => void,
  onDelete?: (post: Post) => void,
}

const PromptCard: React.FC<Props> = ({
  post,
  handleTagClick,
  onEdit,
  onDelete,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState<string>('');

  const isOwnersProfile = session?.user.id === post?.creator?._id
    && pathName === ROUTE_PROFILE;

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied('');
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Link
            href={
              session?.user.id === post.creator._id
                ? ROUTE_PROFILE
                : `${ROUTE_PROFILE}/${post?.creator?._id}`
            }
            className="min-w-fit"
          >
            <Image
              src={post?.creator?.image}
              alt="user-image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </Link>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>

            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>

      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {`#${post.tag}`}
      </p>

      {isOwnersProfile && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => onEdit?.(post)}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => onDelete?.(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
