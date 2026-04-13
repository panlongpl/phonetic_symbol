const audioCache = new Map<string, HTMLAudioElement>();
let currentAudio: HTMLAudioElement | null = null;

export function stopAllAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  audioCache.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  currentAudio = null;
}

const PHONETIC_AUDIO_MAP: Record<string, string> = {
  "iː": "/phonetics/1.mp3",
  "ɪ": "/phonetics/2.mp3",
  "e": "/phonetics/3.mp3",
  "æ": "/phonetics/4.mp3",
  "ɜː": "/phonetics/5.mp3",
  "ə": "/phonetics/6.mp3",
  "ʌ": "/phonetics/7.mp3",
  "ɑː": "/phonetics/8.mp3",
  "ɔː": "/phonetics/9.mp3",
  "ɒ": "/phonetics/10.mp3",
  "uː": "/phonetics/11.mp3",
  "ʊ": "/phonetics/12.mp3",
  "eɪ": "/phonetics/13.mp3",
  "aɪ": "/phonetics/14.mp3",
  "ɔɪ": "/phonetics/15.mp3",
  "aʊ": "/phonetics/16.mp3",
  "əʊ": "/phonetics/17.mp3",
  "oʊ": "/phonetics/17.mp3",
  "ɪə": "/phonetics/18.mp3",
  "eə": "/phonetics/19.mp3",
  "ʊə": "/phonetics/20.mp3",
  "p": "/phonetics/21.mp3",
  "b": "/phonetics/22.mp3",
  "t": "/phonetics/23.mp3",
  "d": "/phonetics/24.mp3",
  "k": "/phonetics/25.mp3",
  "ɡ": "/phonetics/26.mp3",
  "g": "/phonetics/26.mp3",
  "f": "/phonetics/27.mp3",
  "v": "/phonetics/28.mp3",
  "s": "/phonetics/29.mp3",
  "z": "/phonetics/30.mp3",
  "θ": "/phonetics/31.mp3",
  "ð": "/phonetics/32.mp3",
  "ʃ": "/phonetics/33.mp3",
  "ʒ": "/phonetics/34.mp3",
  "h": "/phonetics/35.mp3",
  "r": "/phonetics/36.mp3",
  "ɹ": "/phonetics/36.mp3",
  "tʃ": "/phonetics/37.mp3",
  "dʒ": "/phonetics/38.mp3",
  "ts": "/phonetics/39.mp3",
  "dz": "/phonetics/40.mp3",
  "tr": "/phonetics/41.mp3",
  "dr": "/phonetics/42.mp3",
  "m": "/phonetics/43.mp3",
  "n": "/phonetics/44.mp3",
  "ŋ": "/phonetics/45.mp3",
  "l": "/phonetics/46.mp3",
  "j": "/phonetics/47.mp3",
  "w": "/phonetics/48.mp3",
};

function playUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    let audio = audioCache.get(url);
    if (!audio) {
      audio = new Audio(url);
      audioCache.set(url, audio);
    }
    currentAudio = audio;
    audio.currentTime = 0;

    const onEnded = () => {
      audio!.removeEventListener('ended', onEnded);
      if (currentAudio === audio) {
        currentAudio = null;
      }
      resolve();
    };

    audio.addEventListener('ended', onEnded);
    audio.play().catch(() => {
      audio!.removeEventListener('ended', onEnded);
      if (currentAudio === audio) {
        currentAudio = null;
      }
      resolve();
    });
  });
}

export function speakPhonetic(symbol: string): Promise<void> {
  const url = PHONETIC_AUDIO_MAP[symbol];
  if (url) {
    return playUrl(url);
  }
  return Promise.resolve();
}

export function speakText(text: string): void {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.7;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === "en-US" && v.name.includes("Samantha")) ||
              voices.find(v => v.lang === "en-US") ||
              voices.find(v => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;

  speechSynthesis.speak(utterance);
}

export function preloadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      resolve(speechSynthesis.getVoices());
    };
  });
}
