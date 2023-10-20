import { COLORS } from '../theme';

export const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const getRemainingTicketsText = (availableTickets) => {
  if (isNaN(availableTickets)) {
    return availableTickets;
  }

  switch (true) {
    case +availableTickets === 0: {
      return <span style={{ color: COLORS.soldOut }}>Sold Out</span>;
    }
    case availableTickets < 5: {
      return <span style={{ color: COLORS.fewRemaining }}>Last Few Remaining</span>;
    }
    default: {
      return <span style={{ color: COLORS.available }}>Available</span>;
    }
  }
};
