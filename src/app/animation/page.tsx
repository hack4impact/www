"use client"

import { useEffect, useState } from 'react';

const LogoASCIIAnimation = () => {
  // State for animation frames
  const [frame, setFrame] = useState(0);
  // Store animation dimensions for consistency
  const gridWidth = 9; // Number of cells horizontally
  const gridHeight = 5; // Number of cells vertically
  const cellSize = 180; // Size of each cell in pixels
  const cellMargin = 1; // Margin between cells in pixels

  // Calculate container dimensions based on grid size and cell dimensions
  const containerWidth = (cellSize + (cellMargin * 2)) * gridWidth;
  const containerHeight = (cellSize + (cellMargin * 2)) * gridHeight;

  // IMPORTANT: When implementing this code, replace this URL with the path to your checkered logo image
  const logoImage = "~/Downloads/Union.png"; // This is just a placeholder - in your implementation, use your actual image path

  // ASCII art frames for a simple wave animation
  // Each value represents a "density" between 0-5
  // 0 = empty space, 5 = fully dense
  const frames = [
    [
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
    ],
    [
      [0, 0, 0, 1, 2, 1, 0, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
      [0, 1, 2, 3, 4, 3, 2, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0, 0],
      [0, 0, 1, 2, 3, 2, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  ];

  // Animation loop
  useEffect(() => {
    const timer = setTimeout(() => {
      setFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, 150); // Animation speed in milliseconds

    return () => clearTimeout(timer);
  }, [frame, frames.length]);

  // Function to render a logo cell based on density value
  const renderLogoCell = (density: any) => {
    // Use consistent cell size
    const cellSize = 16;

    // Only opacity changes based on density level (0-5)
    const opacity = density === 0 ? 0 : Math.max(0.2, density * 0.2); // Scale 0.2 to 1.0

    return (
      <div
        className="inline-block"
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          opacity: opacity,
          margin: '1px',
          backgroundImage: `url(${logoImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    );
  };

  // Render the current frame
  const currentFrameData = frames[frame];

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">Logo ASCII Animation</h2>
      <p className="mb-4">Animation using your checkered logo pattern</p>

      <div className="border border-gray-700 p-4 bg-black inline-block" style={{
        width: `${containerWidth + 32}px`,
        height: `${containerHeight + 32}px`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          {currentFrameData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((density, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  {renderLogoCell(density)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-400">Frame: {frame + 1} of {frames.length}</p>
      </div>
    </div>
  );
};

export default LogoASCIIAnimation;
