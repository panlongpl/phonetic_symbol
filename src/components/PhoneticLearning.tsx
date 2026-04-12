import { useState, useEffect } from 'react';
import type { PhoneticSymbol } from '../data/phonetics';
import {
  VOWELS,
  CONSONANTS,
} from '../data/phonetics';
import { updatePhoneticRecord } from '../data/progress';
import { speakPhonetic, preloadVoices } from '../utils/speech';

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

  useEffect(() => {
    preloadVoices();
  }, []);

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

  const closeDetail = () => {
    setSelectedSymbol(null);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>英语音标表</h2>

      {!selectedSymbol ? (
        <div>
          <div style={sectionTitleStyle}>单元音</div>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor, width: '90px' }}>前元音</td>
                {MONOPHTHONGS_FRONT.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.vowelColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>中元音</td>
                {MONOPHTHONGS_CENTRAL.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.vowelColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>后元音</td>
                {MONOPHTHONGS_BACK.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.vowelColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
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
                {DIPHTHONGS_CLOSING.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.vowelColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.vowelColor }}>集中双元音</td>
                {DIPHTHONGS_CENTRING.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.vowelColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
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
                {PLOSIVES_VOICELESS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {PLOSIVES_VOICED.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }} rowSpan={2}>摩擦音</td>
                <td style={thStyle}>清辅音</td>
                {FRICATIVES_VOICELESS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {FRICATIVES_VOICED.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }} rowSpan={2}>破擦音</td>
                <td style={thStyle}>清辅音</td>
                {AFFRICATES_VOICELESS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={thStyle}>浊辅音</td>
                {AFFRICATES_VOICED.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }}>鼻音</td>
                <td style={thStyle}>浊辅音</td>
                {NASALS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
              </tr>
              <tr>
                <td style={{ ...categoryHeaderStyle, color: colors.consonantColor }}>舌则音</td>
                <td style={thStyle}>浊辅音</td>
                {LATERALS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
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
                {APPROXIMANTS.map(s => (
                  <td key={s} style={tdStyle}>
                    <span
                      style={{ ...phoneticCellStyle, color: colors.consonantColor }}
                      onClick={() => handlePhoneticClick(s)}
                    >
                      {s}
                    </span>
                  </td>
                ))}
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
