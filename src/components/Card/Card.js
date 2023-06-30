import { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import coverImageSrc from '../../images/cardCover.png';
import { animated } from 'react-spring';
import Glow from '../Glow/Glow';


function Card({ id, contentImageSrc, isOpen, onCardClick, matched }) {
  const [isFlipped, setIsFlipped] = useState(isOpen);

  useEffect(() => {
    setIsFlipped(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    if (!isFlipped) {
      onCardClick(id);
    }
  };

  return (
    <Flipper flipKey={isFlipped}>
      <Box
        sx={{
          width: 100,
          height: 150,
          position: 'relative',
          cursor: 'pointer',
          borderRadius: 2,
          boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
        }}
        onClick={handleClick}
      >
        <Flipped flipId="card">
          {(flipped) =>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              {matched && <Glow />}
              <CardMedia
                component="img"
                alt="Cover"
                image={isFlipped ? contentImageSrc : coverImageSrc}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  transform: `rotateY(${flipped ? 180 : 0}deg)`,
                  transition: 'transform 0.8s, box-shadow 1s',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </Box>
          }
        </Flipped>
      </Box>
    </Flipper>
  );
}

export default Card;
