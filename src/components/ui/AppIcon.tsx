'use client';

import React from 'react';
import {
  SparklesIcon as SparklesIconOutline,
  ShieldCheckIcon as ShieldCheckIconOutline,
  EyeIcon as EyeIconOutline,
  HeartIcon as HeartIconOutline,
  CameraIcon as CameraIconOutline,
  ArrowRightIcon as ArrowRightIconOutline,
  PlusIcon as PlusIconOutline,
  CalendarIcon as CalendarIconOutline,
  CheckIcon as CheckIconOutline,
  ArrowUpTrayIcon as ArrowUpTrayIconOutline,
  HomeIcon as HomeIconOutline,
  ArrowLeftIcon as ArrowLeftIconOutline,
  ArrowPathIcon as ArrowPathIconOutline,
  QuestionMarkCircleIcon as QuestionMarkCircleIconOutline,
} from '@heroicons/react/24/outline';

import {
  SparklesIcon as SparklesIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  EyeIcon as EyeIconSolid,
  HeartIcon as HeartIconSolid,
  CameraIcon as CameraIconSolid,
  ArrowRightIcon as ArrowRightIconSolid,
  PlusIcon as PlusIconSolid,
  CalendarIcon as CalendarIconSolid,
  CheckIcon as CheckIconSolid,
  ArrowUpTrayIcon as ArrowUpTrayIconSolid,
  HomeIcon as HomeIconSolid,
  ArrowLeftIcon as ArrowLeftIconSolid,
  ArrowPathIcon as ArrowPathIconSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
} from '@heroicons/react/24/solid';

const outlineIcons = {
  SparklesIcon: SparklesIconOutline,
  ShieldCheckIcon: ShieldCheckIconOutline,
  EyeIcon: EyeIconOutline,
  HeartIcon: HeartIconOutline,
  CameraIcon: CameraIconOutline,
  ArrowRightIcon: ArrowRightIconOutline,
  PlusIcon: PlusIconOutline,
  CalendarIcon: CalendarIconOutline,
  CheckIcon: CheckIconOutline,
  ArrowUpTrayIcon: ArrowUpTrayIconOutline,
  HomeIcon: HomeIconOutline,
  ArrowLeftIcon: ArrowLeftIconOutline,
  ArrowPathIcon: ArrowPathIconOutline,
  QuestionMarkCircleIcon: QuestionMarkCircleIconOutline,
} as const;

const solidIcons = {
  SparklesIcon: SparklesIconSolid,
  ShieldCheckIcon: ShieldCheckIconSolid,
  EyeIcon: EyeIconSolid,
  HeartIcon: HeartIconSolid,
  CameraIcon: CameraIconSolid,
  ArrowRightIcon: ArrowRightIconSolid,
  PlusIcon: PlusIconSolid,
  CalendarIcon: CalendarIconSolid,
  CheckIcon: CheckIconSolid,
  ArrowUpTrayIcon: ArrowUpTrayIconSolid,
  HomeIcon: HomeIconSolid,
  ArrowLeftIcon: ArrowLeftIconSolid,
  ArrowPathIcon: ArrowPathIconSolid,
  QuestionMarkCircleIcon: QuestionMarkCircleIconSolid,
} as const;

type IconVariant = 'outline' | 'solid';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  variant?: IconVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Icon({
  name,
  variant = 'outline',
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  const iconSet = variant === 'solid' ? solidIcons : outlineIcons;
  const IconComponent = iconSet[name as keyof typeof iconSet] as React.ComponentType<{
    width?: number | string;
    height?: number | string;
    className?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
  }>;

  if (!IconComponent) {
    return (
      <QuestionMarkCircleIconOutline
        width={size}
        height={size}
        className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;
