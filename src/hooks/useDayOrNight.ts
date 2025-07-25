import { useMemo } from 'react';

export function useDayOrNight(
  timestamp: number,
): 'morn' | 'day' | 'eve' | 'night' | null {
  return useMemo(() => {
    if (!timestamp) return null;

    const date = new Date(timestamp);
    const hours = date.getUTCHours();

    // if (hours >= 6 && hours < 12) return 'morn';
    // if (hours >= 12 && hours < 18) return 'day';
    // if (hours >= 18 && hours <= 23) return 'eve';
    // if (hours >= 0 && hours < 6) return 'night';

    // return 'day';

    return hours >= 6 && hours < 18 ? 'day' : 'night';
  }, [timestamp]);
}
