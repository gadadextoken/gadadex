import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', width, height }) => {
  return (
    <div
      style={{ width, height }}
      className={`animate-pulse bg-gada-elevated/70 rounded-md ${className}`}
    />
  );
};
