import React from 'react';
import { Container, Typography, Box, AppBar, Button, ThemeProvider, createTheme, Clock } from '@mui/material';
import { styled } from '@mui/system';
import GameBoard from '../GameBoard/GameBoard';
import { arrayOf8Cards, arrayOf12Cards } from '../../utils/constants';
import Timer from '../Timer/Timer';
import Logo from '../Logo';


const theme = createTheme({
  palette: {
    primary: {
      main: '#305A4A',
    },
    secondary: {
      main: '#CFB53B',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      color: '#305A4A', // Здесь вы можете установить цвет для всех заголовков h1
    },
  },
});

function App() {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const [isGameRunning, setIsGameRunning] = React.useState(false);
  const [hasFirstClickOccurred, setHasFirstClickOccurred] = React.useState(false);
  const [timerValue, setTimerValue] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  const [cards, setCards] = React.useState(arrayOf12Cards);
  const [shouldReset, setShouldReset] = React.useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsGameFinished(false);
    setIsGameRunning(true);
    setCards(prevCards => [...prevCards].sort(() => Math.random() - 0.5));
  };

  const handleGameFinish = () => {
    setIsGameFinished(true);
    setIsGameRunning(false);
    setFinalTime(timerValue);
  };

  const handleTimerReset = () => {
    setShouldReset(prev => !prev);
    setTimerValue(0);
    setIsGameRunning(false);
  };

  const handleGameRestart = () => {
    setShouldReset(prev => !prev);
    setTimerValue(0);
    setHasFirstClickOccurred(false);
    setIsGameRunning(false);
    setIsGameStarted(false);
    setCards(prevCards => [...prevCards].sort(() => Math.random() - 0.5));
  };


  const handleTimerStop = (value) => {
    setTimerValue(value);
    setIsGameRunning(false);
  };

  const handleFirstClick = () => {
    if (!hasFirstClickOccurred) {
      setHasFirstClickOccurred(true);
      Promise.resolve().then(handleGameStart);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <Typography variant="h1">Memo</Typography>
        </Box>
        {!isGameStarted && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" size="large" onClick={handleGameStart}>
              Начать игру
            </Button>
          </Box>
        )}
        {isGameStarted && !isGameFinished && (
          <>
            <Box display="flex" justifyContent="center" gap="30px" mt={2} marginBottom="20px">
              <Timer
                isRunning={isGameRunning}
                onTimeUpdate={setTimerValue}
                shouldReset={shouldReset}
              />
              <Button variant="contained" size="small" onClick={handleGameRestart}>
                Выйти
              </Button>
            </Box>
            <GameBoard
              cards={cards}
              onGameFinish={handleGameFinish}
              onFirstClick={handleFirstClick}
              shouldReset={shouldReset}
            />
          </>
        )}
        {isGameFinished && (
          <div>
            <p>Игра завершена. Твой результат: {finalTime} секунд</p>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="medium"
                onClick={handleGameRestart}
              >
                Играть снова
              </Button>
            </Box>
          </div>
        )}
      </Container>
    </ThemeProvider>

  );
}

export default App;
