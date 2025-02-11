type GetCountdownSecondsType = {
  secondsLeft: number;
  setSecondsLeft: (value: number) => void;
};
export const getCountdownSeconds = ({
  secondsLeft,
  setSecondsLeft
}: GetCountdownSecondsType) => {
  let current = secondsLeft;
  if (secondsLeft) {
    const interval = setInterval(() => {
      if (current) {
        current = current - 1;
      } else {
        clearInterval(interval);
        return 0;
      }
      setSecondsLeft(current);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }
};
