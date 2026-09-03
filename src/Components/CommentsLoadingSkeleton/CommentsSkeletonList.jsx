import React from 'react'
import CommentsLoadingSkeleton from './CommentsLoadingSkeleton'

export default function CommentsSkeletonList({num}) {
  return<>
  {Array.from({ length: num }).map((_, index) => (
        <CommentsLoadingSkeleton key={index} />
      ))}
  </>
}
