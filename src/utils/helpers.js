export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  export function formatDate(date) {
    return new Date(date).toLocaleString();
  }
  
  export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  export function markdownToHtml(text) {
    // LaTeX 수식을 임시로 치환
    let temp = text.replace(/\$\$(.*?)\$\$/g, (_, p1) => `<latex-block>${p1}</latex-block>`);
    temp = temp.replace(/\$(.*?)\$/g, (_, p1) => `<latex-inline>${p1}</latex-inline>`);
  
    // 마크다운 변환
    temp = temp
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/\n/g, '<br>');
  
    // LaTeX 수식을 원래대로 복구
    temp = temp.replace(/<latex-block>(.*?)<\/latex-block>/g, '$$$$1$$');
    temp = temp.replace(/<latex-inline>(.*?)<\/latex-inline>/g, '$$$1$');
  
    return temp;
  }