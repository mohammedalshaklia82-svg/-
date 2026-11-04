export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  // Clean text from bullets or symbols
  const clean = text
    .replace(/•/g, ', ')
    .replace(/[□\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'en-GB'; // British English for Oxford/Cambridge style
  utterance.rate = 0.9; // Slightly slower for language learners
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
