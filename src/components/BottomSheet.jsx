// components/BottomSheet.jsx
import React, { useRef, useEffect } from 'react';
import Handle from './Handle';

export default function BottomSheet({ position, setPosition }) {
  const sheetRef = useRef(null);
  const dragStart = useRef(null);

  const positions = {
    closed: 'translate-y-full',
    half: 'translate-y-1/2',
    open: 'translate-y-0'
  };

  useEffect(() => {
    const sheet = sheetRef.current;
    if (sheet) {
      sheet.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      if (position === 'closed') sheet.style.transform = 'translateY(100%)';
      else if (position === 'half') sheet.style.transform = 'translateY(50%)';
      else if (position === 'open') sheet.style.transform = 'translateY(0%)';
    }
  }, [position]);

  const handleDragStart = (e) => {
    dragStart.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleDragMove = (e) => {
    if (!dragStart.current) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - dragStart.current;

    const sheet = sheetRef.current;
    if (sheet) {
      sheet.style.transition = 'none';
      const newTranslate = Math.min(Math.max(deltaY, -window.innerHeight * 0.5), window.innerHeight * 0.5);
      sheet.style.transform = `translateY(${newTranslate + getTranslateFromPosition()}px)`;
    }
  };

  const handleDragEnd = (e) => {
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const delta = endY - dragStart.current;

    if (delta > 100) setPosition('closed');
    else if (delta > 30) setPosition('half');
    else setPosition('open');

    dragStart.current = null;
  };

  const getTranslateFromPosition = () => {
    if (position === 'closed') return window.innerHeight;
    if (position === 'half') return window.innerHeight / 2;
    return 0;
  };

  return (
    <div
      ref={sheetRef}
      className="fixed left-0 right-0 bottom-0 h-[80vh] bg-white rounded-t-2xl shadow-lg"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <Handle />
      <div className="p-4 overflow-auto h-full">
        <h2 className="text-lg font-semibold mb-2">Bottom Sheet Content</h2>
        <p className="text-gray-700">
          This is a sample bottom sheet. You can drag it or use the buttons above to change positions.
        </p>
      </div>
    </div>
  );
}
