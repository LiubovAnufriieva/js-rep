export const truncate = (text, length) => {
    if (!text) return '';
  
    if (text.length <= length) return text;
  
    return length === 10 ? text.slice(0, length) : text.slice(0, length) + '...';
  };