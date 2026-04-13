import { useState, useEffect, useRef } from 'react';
import type { PhoneticSymbol } from '../data/phonetics';
import {
  VOWELS,
  CONSONANTS,
} from '../data/phonetics';
import { updatePhoneticRecord } from '../data/progress';
import { speakPhonetic, preloadVoices, stopAllAudio } from '../utils/speech';

let clickTimer: number | null = null;
let clickCount = 0;

const colors = {
  bg: '#0f172a',
  card: '#1e293b',
  primary: '#6366f1',
  accent: '#22d3ee',
  text: '#e2e8f0',
  muted: '#94a3b8',
  vowelColor: '#6366f1',
  consonantColor: '#22d3ee',
};

const MONOPHTHONGS_FRONT = ['iː', 'ɪ', 'e', 'æ'];
const MONOPHTHONGS_CENTRAL = ['ɜː', 'ə', 'ʌ'];
const MONOPHTHONGS_BACK = ['uː', 'ʊ', 'ɔː', 'ɒ', 'ɑː'];
const DIPHTHONGS_CLOSING = ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ'];
const DIPHTHONGS_CENTRING = ['ɪə', 'eə', 'ʊə'];

const PLOSIVES_VOICELESS = ['p', 't', 'k'];
const PLOSIVES_VOICED = ['b', 'd', 'ɡ'];
const FRICATIVES_VOICELESS = ['f', 's', 'θ', 'ʃ', 'h'];
const FRICATIVES_VOICED = ['v', 'z', 'ð', 'ʒ', 'r'];
const AFFRICATES_VOICELESS = ['tʃ', 'ts', 'tr'];
const AFFRICATES_VOICED = ['dʒ', 'dz', 'dr'];
const NASALS = ['m', 'n', 'ŋ'];
const LATERALS = ['l'];
const APPROXIMANTS = ['j', 'w'];

function getPhoneticBySymbol(symbol: string): PhoneticSymbol | undefined {
  return [...VOWELS, ...CONSONANTS].find(p => p.symbol === symbol);
}

export default function PhoneticLearning() {
  const [selectedSymbol, setSelectedSymbol] = useState<PhoneticSymbol | null>(null);
  const [playCount, setPlayCount] = useState(3);
  const [intervalSec, setIntervalSec] = useState(1);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldPauseRef = useRef(false);
  const pausedIndexRef = useRef(0);
  const [currentlyPlayingSymbol, setCurrentlyPlayingSymbol] = useState<string | null>(null);

  useEffect(() => {
    preloadVoices();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const playPhoneticMultiple = async (symbol: string, count: number, interval: number) => {
    setCurrentlyPlayingSymbol(symbol);
    for (let i = 0; i < count; i++) {
      if (shouldPauseRef.current) {
        stopAllAudio();
        break;
      }
      await speakPhonetic(symbol);
      if (shouldPauseRef.current) {
        stopAllAudio();
        break;
      }
      if (i < count - 1) {
        await sleep(interval * 1000);
        if (shouldPauseRef.current) {
          stopAllAudio();
          break;
        }
      }
    }
    setCurrentlyPlayingSymbol(null);
  };

  const getAllPhonetics = () => {
    const all: string[] = [];
    all.push(...MONOPHTHONGS_FRONT, ...MONOPHTHONGS_CENTRAL, ...MONOPHTHONGS_BACK);
    all.push(...DIPHTHONGS_CLOSING, ...DIPHTHONGS_CENTRING);
    all.push(
      ...PLOSIVES_VOICELESS, ...PLOSIVES_VOICED,
      ...FRICATIVES_VOICELESS, ...FRICATIVES_VOICED,
      ...AFFRICATES_VOICELESS, ...AFFRICATES_VOICED,
      ...NASALS, ...LATERALS, ...APPROXIMANTS
    );
    return all;
  };

  const playAllPhonetics = async (startIndex = 0) => {
    if (isPlayingAll) return;
    setIsPlayingAll(true);
    setIsPaused(false);
    shouldPauseRef.current = false;

    const allSymbols = getAllPhonetics();
    for (let i = startIndex; i < allSymbols.length; i++) {
      if (shouldPauseRef.current) {
        pausedIndexRef.current = i;
        stopAllAudio();
        break;
      }
      
      const symbol = allSymbols[i];
      await playPhoneticMultiple(symbol, playCount, intervalSec);
      
      if (shouldPauseRef.current) {
        pausedIndexRef.current = i + 1;
        stopAllAudio();
        break;
      }
      
      if (i < allSymbols.length - 1) {
        await sleep(400);
        if (shouldPauseRef.current) {
          pausedIndexRef.current = i + 1;
          stopAllAudio();
          break;
        }
      }
    }

    if (shouldPauseRef.current) {
      setIsPaused(true);
    } else {
      pausedIndexRef.current = 0;
    }
    setIsPlayingAll(false);
    setCurrentlyPlayingSymbol(null);
    shouldPauseRef.current = false;
  };

  const handlePhoneticClick = (symbol: string) => {
    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        speakPhonetic(symbol);
        clickCount = 0;
      }, 250);
    } else if (clickCount === 2) {
      if (clickTimer) clearTimeout(clickTimer);
      const phonetic = getPhoneticBySymbol(symbol);
      if (phonetic) {
        setSelectedSymbol(phonetic);
        updatePhoneticRecord(symbol, true);
      }
      clickCount = 0;
    }
  };

  const renderPhoneticCell = (s: string, color: string) => {
    const isPlaying = currentlyPlayingSymbol === s;
    return (
      <td key={s} style={tdStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            style={{
              ...phoneticCellStyle,
              color: isPlaying ? '#22c55e' : color,
              fontSize: isPlaying ? '24px' : '18px',
              transform: isPlaying ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
            onClick={() => handlePhoneticClick(s)}
          >
            {s}
          </span>
          <button
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              border: 'none',
              background: '#253349',
              color: colors.primary,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              playPhoneticMultiple(s, 3, 1);
            }}
            title="播放3次"
          >
            ▶
          </button>
        </div>
      </td>
    );
  };

  const containerStyle: React.CSSProperties = {
    background: colors.bg,
    color: colors.text,
    padding: '16px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    height: '100%',
    overflowY: 'auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 700,
    color: '#f8fafc',
    margin: '0 0 12px 0',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '16px',
  };

  const thStyle: React.CSSProperties = {
    background: colors.card,
    padding: '8px 10px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: colors.muted,
    borderBottom: '2px solid #334155',
  };

  const tdStyle: React.CSSProperties = {
    padding: '6px 8px',
    borderBottom: '1px solid #334155',
  };

  const phoneticCellStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '36px',
    borderRadius: '6px',
    background: colors.card,
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s',
    margin: '2px',
  };

  const categoryHeaderStyle: React.CSSProperties = {
    background: '#0f172a',
    padding: '10px 12px',
    fontWeight: 700,
    fontSize: '13px',
    color: colors.primary,
    borderBottom: '2px solid #334155',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: '#f8fafc',
    margin: '12px 0 8px 0',
    paddingLeft: '4px',
  };

  const controlPanelStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '12px',
    background: colors.card,
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '16px',
  };

  const controlLabelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: colors.muted,
    marginRight: '6px',
  };

  const controlInputStyle: React.CSSProperties = {
    width: '60px',
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #334155',
    background: '#0f172a',
    color: colors.text,
    fontSize: '14px',
  };

  const playButtonStyle: React.CSSProperties = {
    padding: '8px 20px',
    borderRadius: '8px',
    background: isPlayingAll ? '#334155' : colors.primary,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: isPlayingAll ? 'not-allowed' : 'pointer',
    border: 'none',
  };

  const closeDetail = () => {
    setSelectedSymbol(null);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>英语音标表</h2>

      {!selectedSymbol ? (
        <div>
          <div style={controlPanelStyle}>
            {isPlayingAll ? (
              <button
                style={{ ...playButtonStyle, background: '#ef4444', cursor: 'pointer' }}
                onClick={() => {
                  shouldPauseRef.current = true;
                  stopAllAudio();
                }}
              >
                ⏸ 暂停
              </button>
            ) : isPaused ? (
              <>
                <button
                  style={{ ...playButtonStyle, background: '#10b981', cursor: 'pointer' }}
                  onClick={() => playAllPhonetics(pausedIndexRef.current)}
                >
                  ▶ 继续播放
                </button>
                <button
                  style={{ ...playButtonStyle, background: colors.primary, cursor: 'pointer' }}
                  onClick={() => {
                    pausedIndexRef.current = 0;
                    setIsPaused(false);
                    playAllPhonetics(0);
                  }}
                >
                  ⏮ 从头播放
                </button>
              </>
            ) : (
              <button
                style={{ ...playButtonStyle, cursor: 'pointer' }}
                onClick={() => playAllPhonetics(0)}
              >
                ▶ 播放全部
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={controlLabelStyle}>每个音标播放</span>
              <input
                type="number"
                min="1"
                max="10"
                value={playCount}
                onChange={(e) => setPlayCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                style={controlInputStyle}
              />
              <span style={controlLabelStyle}>次</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={controlLabelStyle}>间隔</span>
              <input
                type="number"
                min="0.5"
                max="5"
                step="0.5"
                value={intervalSec}
                onChange={(e) => setIntervalSec(Math.max(0.5, Math.min(5, parseFloat(e.target.value) || 1)))}
                style={controlInputStyle}
              />
              <span style={controlLabelStyle}>秒</span>
            </div>
          </div>
          <div style={sectionTitleStyle}>单元音</div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor, width: '90px' }}>前元音</td>
                {MONOPHTHONGS_FRONT.map(s => renderPhoneticCell(s, colors.vowelColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>中元音</td>
                {MONOPHTHONGS_CENTRAL.map(s => renderPhoneticCell(s, colors.vowelColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>后元音</td>
                {MONOPHTHONGS_BACK.map(s => renderPhoneticCell(s, colors.vowelColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>

          <div style={sectionTitleStyle}>双元音</div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor, width: '90px' }}>开合双元音</td>
                {DIPHTHONGS_CLOSING.map(s => renderPhoneticCell(s, colors.vowelColor))}
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>集中双元音</td>
                {DIPHTHONGS_CENTRING.map(s => renderPhoneticCell(s, colors.vowelColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>

          <div style={sectionTitleStyle}>辅音</div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor, width: '90px' }} rowSpan={2}>爆破音</td>
                <td style={thStyle}>清辅音</td>
                {PLOSIVES_VOICELESS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {PLOSIVES_VOICED.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }} rowSpan={2}>摩擦音</td>
                <td style={thStyle}>清辅音</td>
                {FRICATIVES_VOICELESS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {FRICATIVES_VOICED.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }} rowSpan={2}>破擦音</td>
                <td style={thStyle}>清辅音</td>
                {AFFRICATES_VOICELESS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {AFFRICATES_VOICED.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }}>鼻音</td>
                <td style={thStyle}>浊辅音</td>
                {NASALS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }}>舌则音</td>
                <td style={thStyle}>浊辅音</td>
                {LATERALS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }}>半元音</td>
                <td style={thStyle}>浊辅音</td>
                {APPROXIMANTS.map(s => renderPhoneticCell(s, colors.consonantColor))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>

          <div style={{ 
            fontSize: '12px', 
            color: colors.muted, 
            marginTop: '16px', 
            textAlign: 'center' as const,
            padding: '8px',
            background: colors.card,
            borderRadius: '8px',
          }}>
            💡 提示：单击音标听发音，双击查看详情
          </div>
        </div>
      ) : (
        <DetailView phonetic={selectedSymbol} onClose={closeDetail} />
      )}
    </div>
  );
}

function DetailView({ phonetic, onClose }: { phonetic: PhoneticSymbol; onClose: () => void }) {
  const colors = {
    bg: '#0f172a',
    card: '#1e293b',
    primary: '#6366f1',
    accent: '#22d3ee',
    text: '#e2e8f0',
    muted: '#94a3b8',
  };

  const detailContainerStyle: React.CSSProperties = {
    background: colors.card,
    borderRadius: '16px',
    padding: '24px',
    animation: 'fadeIn 0.2s ease-out',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  };

  const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: colors.muted,
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 8px',
    transition: 'color 0.2s',
  };

  const symbolDisplayStyle: React.CSSProperties = {
    fontSize: '64px',
    fontWeight: 800,
    color: phonetic.type === 'vowel' ? colors.primary : colors.accent,
    lineHeight: 1,
    marginBottom: '4px',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '18px',
    color: colors.text,
    fontWeight: 600,
    marginBottom: '4px',
  };

  const nameZhStyle: React.CSSProperties = {
    fontSize: '14px',
    color: colors.muted,
  };

  const badgeStyle = (type: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    background: type === 'vowel' ? `${colors.primary}20` : `${colors.accent}20`,
    color: type === 'vowel' ? colors.primary : colors.accent,
    marginTop: '12px',
  });

  const audioButtonStyle: React.CSSProperties = {
    padding: '10px 24px',
    borderRadius: '10px',
    border: `1px solid ${colors.primary}`,
    background: colors.primary,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: colors.text,
    marginTop: '24px',
    marginBottom: '12px',
  };

  const articulationGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  };

  const articulationItemStyle: React.CSSProperties = {
    background: colors.bg,
    padding: '12px',
    borderRadius: '8px',
  };

  const articulationLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: phonetic.type === 'vowel' ? colors.primary : colors.accent,
    fontWeight: 600,
    marginBottom: '4px',
  };

  const articulationValueStyle: React.CSSProperties = {
    fontSize: '13px',
    color: colors.text,
  };

  const examplesListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const exampleItemStyle: React.CSSProperties = {
    background: colors.bg,
    padding: '12px 14px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const exampleWordStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 600,
    color: colors.text,
  };

  const exampleIpaStyle: React.CSSProperties = {
    fontSize: '13px',
    color: phonetic.type === 'vowel' ? colors.primary : colors.accent,
    fontFamily: '"Fira Code", monospace',
  };

  const exampleTransStyle: React.CSSProperties = {
    fontSize: '12px',
    color: colors.muted,
  };

  const tipsListStyle: React.CSSProperties = {
    paddingLeft: '16px',
    margin: '0',
    color: colors.muted,
    fontSize: '13px',
    lineHeight: '1.8',
  };

  return (
    <div style={detailContainerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={symbolDisplayStyle}>/{phonetic.symbol}/</div>
          <div style={nameStyle}>{phonetic.name}</div>
          <div style={nameZhStyle}>{phonetic.nameZh}</div>
          <div style={badgeStyle(phonetic.type)}>
            {phonetic.type === 'vowel' ? '元音' : '辅音'}
          </div>
        </div>
        <button style={closeBtnStyle} onClick={onClose}>
          ×
        </button>
      </div>

      <div style={sectionTitleStyle}>音频</div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={audioButtonStyle} onClick={() => speakPhonetic(phonetic.symbol)}>
          🔊 播放
        </button>
      </div>

      <div style={sectionTitleStyle}>发音要点</div>
      <div style={articulationGridStyle}>
        <div style={articulationItemStyle}>
          <div style={articulationLabelStyle}>唇形</div>
          <div style={articulationValueStyle}>{phonetic.articulationDesc.lips}</div>
        </div>
        <div style={articulationItemStyle}>
          <div style={articulationLabelStyle}>舌位</div>
          <div style={articulationValueStyle}>{phonetic.articulationDesc.tongue}</div>
        </div>
        <div style={articulationItemStyle}>
          <div style={articulationLabelStyle}>气流</div>
          <div style={articulationValueStyle}>{phonetic.articulationDesc.airflow}</div>
        </div>
        <div style={articulationItemStyle}>
          <div style={articulationLabelStyle}>下颌</div>
          <div style={articulationValueStyle}>{phonetic.articulationDesc.jaw}</div>
        </div>
      </div>

      <div style={sectionTitleStyle}>例词</div>
      <div style={examplesListStyle}>
        {phonetic.examples.map((ex, idx) => (
          <div key={idx} style={exampleItemStyle}>
            <div>
              <div style={exampleWordStyle}>{ex.word}</div>
              <div style={exampleIpaStyle}>{ex.ipa}</div>
              <div style={exampleTransStyle}>{ex.translation}</div>
            </div>
          </div>
        ))}
      </div>

      {phonetic.commonErrors.length > 0 && (
        <>
          <div style={sectionTitleStyle}>常见错误</div>
          <ul style={tipsListStyle}>
            {phonetic.commonErrors.map((err, idx) => (
              <li key={idx}>
                <span style={{ color: '#f87171', fontWeight: 600 }}>{err.error}</span>
                <br />
                <span style={{ color: '#22c55e' }}>✓ {err.correction}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
