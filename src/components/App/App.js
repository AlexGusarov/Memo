import React from 'react';
import { Container, Typography, Box, Button, ThemeProvider, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import GameBoard from '../GameBoard/GameBoard';
import { arrayOf12CatCards, arrayOf12DogCards } from '../../utils/constants';
import Timer from '../Timer/Timer';
import { theme } from '../../utils/constants';

const StyledLabel = styled(Typography)(({ theme, isCat }) => ({
  position: 'absolute',
  left: '0px',
  top: '-15px',
  borderBottom: `2px solid ${!isCat ? theme.palette.primary.main : theme.palette.secondary.main}`,
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  position: 'relative',

});

function App() {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const [isGameRunning, setIsGameRunning] = React.useState(false);
  const [timerValue, setTimerValue] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  const [cards, setCards] = React.useState(arrayOf12CatCards);
  const [isCat, setIsCat] = React.useState(true);
  const [shouldResetTimer, setShouldResetTimer] = React.useState(false);

  const StartButton = styled(Button)({
    fontSize: '1.1rem',
    padding: '1rem 2rem',
    position: 'fixed',
    bottom: '25%',
    left: '50%',
    transform: 'translateX(-50%)'
  });

  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const handleTimerReset = () => {
    setShouldResetTimer(false);
  };

  const handleGameStart = React.useCallback(() => {
    setIsGameStarted(true);
    setIsGameFinished(false);
    setIsGameRunning(true);
    setTimerValue(0);
    setCards(shuffleCards(isCat ? arrayOf12CatCards : arrayOf12DogCards));
  }, [isCat]);

  const handleGameRestart = React.useCallback(() => {
    handleGameStart();
  }, [handleGameStart]);

  const handleGameFinish = () => {
    setIsGameFinished(true);
    setIsGameRunning(false);
    setFinalTime(timerValue);
  };

  const handleExitGame = () => {
    setTimerValue(0);
    setIsGameRunning(false);
    setIsGameStarted(false);
  };

  const handleSwitchChange = (event) => {
    setIsCat(event.target.checked);
    setShouldResetTimer(true);
  };

  React.useEffect(() => {
    if (isGameStarted) {
      setTimerValue(0);
      handleGameRestart();
    }
  }, [isCat, isGameStarted, handleGameRestart]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <Typography variant="h1">Memo</Typography>
        </Box>
        {!isGameStarted && (
          <Box display="flex" justifyContent="center" mt={10} >
            <StartButton variant="contained" size="large" onClick={handleGameStart}>
              Начать игру
            </StartButton>
          </Box>
        )}
        {isGameStarted && !isGameFinished && (

          <Box sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              gap="30px"
              mt={2}
              marginBottom="20px"
            >
              <StyledFormControlLabel
                control={
                  <Switch
                    checked={isCat}
                    onChange={handleSwitchChange}
                    sx={{
                      '&.Mui-checked': {
                        color: isCat ? theme.palette.primary.main : theme.palette.secondary.main,
                      },
                      '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: isCat ? theme.palette.primary.main : theme.palette.secondary.main,
                      },
                      '& .MuiSwitch-thumb': {
                        color: isCat ? theme.palette.secondary.main : theme.palette.primary.main,
                      },
                      '&.MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: isCat ? theme.palette.primary.main : theme.palette.secondary.main,
                      },
                      '&.MuiSwitch-colorSecondary.Mui-checked': {
                        color: isCat ? theme.palette.primary.main : theme.palette.secondary.main,
                      },
                    }}
                  />
                }
                label={
                  <StyledLabel isCat={isCat} variant="body1" fontFamily="Inter, Arial, sans-serif">
                    {isCat ? 'Кошарики' : 'Пёсики'}
                  </StyledLabel>
                }
              />
              <Timer
                isRunning={isGameRunning}
                onTimeUpdate={setTimerValue}
                shouldReset={shouldResetTimer}
                onReset={handleTimerReset}
              />
              <Button variant="contained" size="small" onClick={handleExitGame}>
                Выйти
              </Button>
            </Box>
            <GameBoard
              cards={cards}
              onGameFinish={handleGameFinish}
            />
          </Box>



        )}
        {isGameFinished && (
          <>
            <Box mt={4} mb={2} display="flex" justifyContent="center">
              <Typography variant="body1" align="center">
                Поздравляю! Твой результат: {finalTime}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="medium"
                onClick={handleGameRestart}
              >
                Играть снова
              </Button>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
