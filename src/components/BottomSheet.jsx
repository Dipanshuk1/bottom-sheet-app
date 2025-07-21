import React, { useRef, useEffect, useState } from "react";
import "./BottomSheet.css";

const snapPoints = {
  CLOSED: 0.1,     
  HALF: 0.5,       
  FULL: 0.9     
};

export default function BottomSheet() {
  const sheetRef = useRef(null);
  const [position, setPosition] = useState(snapPoints.CLOSED); 

  const [dragging, setDragging] = useState(false);
  const startYRef = useRef(0);
  const startPositionRef = useRef(position);

  const getTranslateY = () => {
    const vh = window.innerHeight;
    return vh * (1 - position);
  };

  const snapTo = (target) => {
    let current = position;
    let velocity = 0;
    const stiffness = 0.2;
    const damping = 0.7;

    const animate = () => {
      const force = (target - current) * stiffness;
      velocity = (velocity + force) * damping;
      current += velocity;

      if (Math.abs(target - current) < 0.001 && Math.abs(velocity) < 0.001) {
        setPosition(target);
        return;
      }

      setPosition(current);
      requestAnimationFrame(animate);
    };

    animate();
  };

  const handleTouchStart = (e) => {
    setDragging(true);
    startYRef.current = e.touches[0].clientY;
    startPositionRef.current = position;
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const deltaY = e.touches[0].clientY - startYRef.current;
    const vh = window.innerHeight;
    const deltaPercent = deltaY / vh;
    let newPosition = startPositionRef.current - deltaPercent;

    newPosition = Math.max(0.1, Math.min(0.9, newPosition));
    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    setDragging(false);
    const closest = [snapPoints.CLOSED, snapPoints.HALF, snapPoints.FULL]
      .reduce((prev, curr) => Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev);
    snapTo(closest);
  };

  return (
    <>
      <div
        ref={sheetRef}
        className="bottom-sheet"
        style={{ transform: `translateY(${getTranslateY()}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="handle-bar"></div>
        <div className="sheet-content">
          <h2>Bottom Sheet</h2>
          <p>This is a custom bottom sheet component with drag and snap.</p>
          <div className="controls">
            <button onClick={() => snapTo(snapPoints.CLOSED)}>Close</button>
            <button onClick={() => snapTo(snapPoints.HALF)}>Half</button>
            <button onClick={() => snapTo(snapPoints.FULL)}>Open</button>
          </div>
        </div>
      </div>
    </>
  );
}
