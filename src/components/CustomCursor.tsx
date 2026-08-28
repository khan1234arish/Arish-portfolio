'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-interactive');

      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Outer follow ring */}
      <div
        className="fixed -left-4 -top-4 rounded-full border transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          marginLeft: isHovered ? '-8px' : '2px',
          marginTop: isHovered ? '-8px' : '2px',
          borderColor: isHovered ? 'rgba(229, 9, 20, 0.7)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isHovered ? 'rgba(229, 9, 20, 0.08)' : 'transparent',
        }}
      />
      {/* Inner dot */}
      <div
        className="fixed -left-1 -top-1 h-2 w-2 rounded-full bg-crimson-500 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x + 12}px, ${position.y + 12}px, 0) scale(${isHovered ? 0.7 : 1})`,
        }}
      />
    </div>
  );
}
