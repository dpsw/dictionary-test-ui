export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // If the date is today, return the time
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // If the date is yesterday, return "Yesterday"
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // If the date is within the last 7 days, return the day of the week
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  if (date > oneWeekAgo) {
    return date.toLocaleDateString([], { weekday: 'long' });
  }
  
  // Otherwise, return the date
  return date.toLocaleDateString([], { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};