import { animated, useSpring } from 'react-spring';

function Glow() {
  const props = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      while (1) {
        await next({ opacity: 1 });
        await next({ opacity: 0 });
      }
    },
  });

  return (
    <animated.div
      style={{
        ...props,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,223,0,1) 0%, rgba(255,223,0,0) 70%)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5
      }}
    />
  );
}

export default Glow;
