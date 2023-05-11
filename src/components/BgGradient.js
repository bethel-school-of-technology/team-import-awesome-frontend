import MeshGradient from 'mesh-gradient.js';
import React, { useEffect } from 'react';

const COLORS =   ["#d8f3dc",
"#95d5b2",
"#52b788",
"#2d6a4f",
]

function BgGradient({position, gradientId}) {
// create instance of Gradient Class
  const gradient = new MeshGradient({
    width: 600,
    height: 50,
  });
  const canvasId = "my-canvas" + gradientId;
  useEffect(() => {
    gradient.initGradient("#" + canvasId, COLORS);
    if (gradient.changePosition !== undefined) {
      gradient.changePosition(position);
    }
    if (gradient.setCanvasSize !== undefined) {
      gradient.setCanvasSize(600, 50);
    }
    gradient.reGenerateCanvas();
  }, [position])

  return (
  <canvas id={canvasId} width="800" height="600" className='completeBg'/>
  );
}

export default BgGradient;

// https://github.com/anup-a/mesh-gradient.js