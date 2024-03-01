import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  ThemeProvider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { styled, Theme } from "@mui/system";
import GameBoard from "../GameBoard";
import { CardProps } from "../Card";
import { arrayOf12CatCards, arrayOf12DogCards } from "../../utils/constants";
import Timer from "../Timer";
import { theme } from "../../utils/constants";

interface StyledLabelProps {
  theme?: Theme;
  isCat: boolean;
}

const StyledLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isCat',
})<StyledLabelProps>(({ theme, isCat }) => ({
  position: "absolute",
  left: "0px",
  top: "-15px",
  borderBottom: `2px solid ${
    !isCat ? theme.palette.primary.main : theme.palette.secondary.main
  }`,
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  position: "relative",
});

const StartButton = styled(Button)({
  fontSize: "1.1rem",
  padding: "1rem 2rem",
  position: "fixed",
  bottom: "25%",
  left: "50%",
  transform: "translateX(-50%)",
});

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [timerValue, setTimerValue] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>(arrayOf12CatCards);
  const [isCat, setIsCat] = useState<boolean>(true);
  const [shouldResetTimer, setShouldResetTimer] = useState<boolean>(false);

  const shuffleCards = useCallback((cards: typeof arrayOf12CatCards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  }, []);

  const handleTimerReset = useCallback(() => {
    setShouldResetTimer(false);
  }, []);

  const handleGameStart = useCallback(() => {
    setIsGameStarted(true);
    setIsGameFinished(false);
    setIsGameRunning(true);
    setTimerValue(0);
    setCards(shuffleCards(isCat ? arrayOf12CatCards : arrayOf12DogCards));
  }, [isCat, shuffleCards]);

  const handleGameRestart = useCallback(() => {
    handleGameStart();
  }, [handleGameStart]);

  const handleGameFinish = useCallback(() => {
    setIsGameFinished(true);
    setIsGameRunning(false);
    setFinalTime(timerValue);
  }, [timerValue]);

  const handleExitGame = useCallback(() => {
    setTimerValue(0);
    setIsGameRunning(false);
    setIsGameStarted(false);
  }, []);

  const handleSwitchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCat(event.target.checked);
    setShouldResetTimer(true);
  }, []);

  useEffect(() => {
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
          <Box display="flex" justifyContent="center" mt={10}>
            <StartButton
              variant="contained"
              size="large"
              onClick={handleGameStart}
            >
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
                      "&.Mui-checked": {
                        color: isCat
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      },
                      "&.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: isCat
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      },
                      "& .MuiSwitch-thumb": {
                        color: isCat
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main,
                      },
                      "&.MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: isCat
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                        },
                      "&.MuiSwitch-colorSecondary.Mui-checked": {
                        color: isCat
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      },
                    }}
                  />
                }
                label={
                  <StyledLabel
                    isCat={isCat}
                    variant="body1"
                    fontFamily="Inter, Arial, sans-serif"
                  >
                    {isCat ? "Кошарики" : "Пёсики"}
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
            <GameBoard cards={cards} onGameFinish={handleGameFinish} />
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
