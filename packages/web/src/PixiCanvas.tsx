import React, { useEffect, useState } from 'react';
import { Application, Sprite } from 'pixi.js';

const PixiCanvas: React.FC = () => {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('pixi-canvas') as HTMLCanvasElement;
    const application = new Application({
      view: canvas,
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    setApp(application);
    // simple token sprite
    const token = Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');
    token.interactive = true;
    token.buttonMode = true;
    token.x = 400;
    token.y = 300;
    token.anchor.set(0.5);
    token.on('pointerdown', () => console.log('Token down'));
    application.stage.addChild(token);
    return () => {
      application.destroy(true, { children: true });
    };
  }, []);

  return <canvas id="pixi-canvas" />;
};

export default PixiCanvas;
