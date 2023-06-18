import React from 'react';
import { Container, Typography, Box, Button, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import GameBoard from '../GameBoard/GameBoard';
import { arrayOf12Cards } from '../../utils/constants';
import Timer from '../Timer/Timer';


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
  const [timerValue, setTimerValue] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  const [cards, setCards] = React.useState(arrayOf12Cards);

  const StartButton = styled(Button)({
    fontSize: '1.1rem',
    padding: '1rem 2rem',
  });

  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsGameFinished(false);
    setIsGameRunning(true);
    setCards(shuffleCards(cards));
  };

  const handleGameRestart = () => {
    setTimerValue(0);
    setCards(shuffleCards(cards));
    handleGameStart();
  };


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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <Typography variant="h1">Memo</Typography>
        </Box>
        {!isGameStarted && (
          <Box display="flex" justifyContent="center" mt={10}>
            <StartButton variant="contained" size="large" onClick={handleGameStart}>
              Начать игру
            </StartButton>
          </Box>
        )}
        {isGameStarted && !isGameFinished && (
          <>
            <Box display="flex" justifyContent="center" gap="30px" mt={2} marginBottom="20px">
              <Timer
                isRunning={isGameRunning}
                onTimeUpdate={setTimerValue}
              />
              <Button variant="contained" size="small" onClick={handleExitGame}>
                Выйти
              </Button>
            </Box>
            <GameBoard
              cards={cards}
              onGameFinish={handleGameFinish}
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
