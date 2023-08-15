export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) return 'No Threads';

  const threadCount = count.toString().padStart(2, '0');
  const threadWord = count === 1 ? 'Thread' : 'Threads';
  return `${threadCount} ${threadWord}`;
}
