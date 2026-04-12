import { useState, useEffect } from 'react'
import { VOWELS, CONSONANTS, getAllPhonetics } from '../data/phonetics'
import type { PhoneticSymbol } from '../data/phonetics'
import { speakPhonetic, preloadVoices } from '../utils/speech'

const ALL = getAllPhonetics()

const VOWEL_COLOR = '#6366f1'
const CONSONANT_COLOR = '#22d3ee'

const HEIGHT_LABELS = ['close', 'close-mid', 'open-mid', 'open', 'diphthong'] as const
const BACKNESS_LABELS = ['palatal', 'velar'] as const

const PLACE_LABELS = [
  'bilabial',
  'labiodental',
  'dental',
  'alveolar',
  'postalveolar',
  'palatal',
  'velar',
  'glottal',
] as const

const MANNER_LABELS = [
  'plosive',
  'fricative',
  'affricate',
  'nasal',
  'lateral',
  'approximant',
] as const

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '2rem',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#f8fafc',
    margin: '0 0 2rem 0',
  },
  panelsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  panel: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
  },
  panelLabel: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
  select: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '0.5rem',
    border: '1px solid #475569',
    background: '#334155',
    color: '#e2e8f0',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
  },
  symbolLarge: {
    fontSize: '4rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    margin: '0.5rem 0',
  },
  nameText: {
    textAlign: 'center' as const,
    fontSize: '0.95rem',
    color: '#94a3b8',
  },
  comparisonCard: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#f8fafc',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    padding: '0.6rem 0.75rem',
    textAlign: 'left' as const,
    borderBottom: '1px solid #334155',
    color: '#6366f1',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  td: {
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid #1e293b',
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },
  svgContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap' as const,
  },
  svgPanel: {
    textAlign: 'center' as const,
  },
  audioRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  audioBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  toggleRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  toggleBtn: {
    padding: '0.5rem 1.25rem',
    borderRadius: '0.5rem',
    border: '1px solid #475569',
    background: '#334155',
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  toggleBtnActive: {
    background: '#6366f1',
    color: '#fff',
    border: '1px solid #6366f1',
  },
  exampleItem: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.4rem',
    fontSize: '0.9rem',
  },
  exampleWord: {
    fontWeight: 600,
    color: '#f8fafc',
    minWidth: '5rem',
  },
  exampleIpa: {
    color: '#6366f1',
    minWidth: '6rem',
  },
  exampleTranslation: {
    color: '#94a3b8',
  },
  diffBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.6rem',
    borderRadius: '0.375rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    marginRight: '0.5rem',
    marginBottom: '0.4rem',
  },
  chartCard: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    overflowX: 'auto' as const,
  },
  chartTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    minWidth: '700px',
  },
  chartTh: {
    padding: '0.5rem',
    textAlign: 'center' as const,
    borderBottom: '2px solid #334155',
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'capitalize' as const,
  },
  chartTd: {
    padding: '0.4rem',
    textAlign: 'center' as const,
    borderBottom: '1px solid #1e293b',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  chartRowHeader: {
    padding: '0.5rem',
    textAlign: 'left' as const,
    borderBottom: '1px solid #1e293b',
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'capitalize' as const,
  },
}

function PhoneticSelect({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (symbol: string) => void
  label: string
}) {
  return (
    <div>
      <div style={styles.panelLabel}>{label}</div>
      <select style={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">选择音标...</option>
        <optgroup label="元音 Vowels">
          {VOWELS.map((p) => (
            <option key={p.symbol} value={p.symbol}>
              /{p.symbol}/ - {p.nameZh}
            </option>
          ))}
        </optgroup>
        <optgroup label="辅音 Consonants">
          {CONSONANTS.map((p) => (
            <option key={p.symbol} value={p.symbol}>
              /{p.symbol}/ - {p.nameZh}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  )
}

function MouthShapeSvg({ phonetic, color }: { phonetic: PhoneticSymbol; color: string }) {
  const paths = phonetic.mouthShape.split('→').map((s) => s.trim())
  return (
    <div style={styles.svgPanel}>
      <svg width="80" height="50" viewBox="0 0 70 50">
        <ellipse cx="35" cy="25" rx="30" ry="20" fill="none" stroke="#475569" strokeWidth="1" />
        {paths.map((p, i) => {
          const cleaned = p.replace(/\s*\(.*\)\s*$/, '')
          return <path key={i} d={cleaned} fill={color} opacity={0.4 + i * 0.3} />
        })}
      </svg>
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
        /{phonetic.symbol}/
      </div>
    </div>
  )
}

function getDifferences(a: PhoneticSymbol, b: PhoneticSymbol): string[] {
  const diffs: string[] = []
  if (a.type !== b.type) diffs.push(`类型: ${a.type === 'vowel' ? '元音' : '辅音'} vs ${b.type === 'vowel' ? '元音' : '辅音'}`)
  if (a.voicing !== b.voicing) diffs.push(`浊化: ${a.voicing} vs ${b.voicing}`)
  if (a.place !== b.place) diffs.push(`部位: ${a.place} vs ${b.place}`)
  if (a.manner !== b.manner) diffs.push(`方式: ${a.manner} vs ${b.manner}`)
  if (a.subType !== b.subType) diffs.push(`子类: ${a.subType} vs ${b.subType}`)
  return diffs
}

function playPhonetic(symbol: string) {
  speakPhonetic(symbol)
}

function ComparisonView({
  left,
  right,
}: {
  left: PhoneticSymbol
  right: PhoneticSymbol
}) {
  const leftColor = left.type === 'vowel' ? VOWEL_COLOR : CONSONANT_COLOR
  const rightColor = right.type === 'vowel' ? VOWEL_COLOR : CONSONANT_COLOR
  const diffs = getDifferences(left, right)

  return (
    <>
      <div style={styles.comparisonCard}>
        <div style={styles.sectionTitle}>发音部位对比</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>特征</th>
              <th style={styles.th}>/{left.symbol}/</th>
              <th style={styles.th}>/{right.symbol}/</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...styles.td, color: '#6366f1' }}>唇形</td>
              <td style={styles.td}>{left.articulationDesc.lips}</td>
              <td style={styles.td}>{right.articulationDesc.lips}</td>
            </tr>
            <tr>
              <td style={{ ...styles.td, color: '#6366f1' }}>舌位</td>
              <td style={styles.td}>{left.articulationDesc.tongue}</td>
              <td style={styles.td}>{right.articulationDesc.tongue}</td>
            </tr>
            <tr>
              <td style={{ ...styles.td, color: '#6366f1' }}>气流</td>
              <td style={styles.td}>{left.articulationDesc.airflow}</td>
              <td style={styles.td}>{right.articulationDesc.airflow}</td>
            </tr>
            <tr>
              <td style={{ ...styles.td, color: '#6366f1' }}>下颌</td>
              <td style={styles.td}>{left.articulationDesc.jaw}</td>
              <td style={styles.td}>{right.articulationDesc.jaw}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.comparisonCard}>
        <div style={styles.sectionTitle}>口型对比</div>
        <div style={styles.svgContainer}>
          <MouthShapeSvg phonetic={left} color={leftColor} />
          <MouthShapeSvg phonetic={right} color={rightColor} />
        </div>
      </div>

      <div style={styles.comparisonCard}>
        <div style={styles.sectionTitle}>发音</div>
        <div style={styles.audioRow}>
          <button
            style={{ ...styles.audioBtn, background: leftColor, color: '#fff' }}
            onClick={() => playPhonetic(left.symbol)}
          >
            ▶ /{left.symbol}/
          </button>
          <button
            style={{ ...styles.audioBtn, background: rightColor, color: '#fff' }}
            onClick={() => playPhonetic(right.symbol)}
          >
            ▶ /{right.symbol}/
          </button>
        </div>
      </div>

      <div style={styles.comparisonCard}>
        <div style={styles.sectionTitle}>例词对比</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: leftColor }}>
              /{left.symbol}/
            </div>
            {left.examples.map((ex) => (
              <div key={ex.word} style={styles.exampleItem}>
                <span style={styles.exampleWord}>{ex.word}</span>
                <span style={styles.exampleIpa}>{ex.ipa}</span>
                <span style={styles.exampleTranslation}>{ex.translation}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: rightColor }}>
              /{right.symbol}/
            </div>
            {right.examples.map((ex) => (
              <div key={ex.word} style={styles.exampleItem}>
                <span style={styles.exampleWord}>{ex.word}</span>
                <span style={styles.exampleIpa}>{ex.ipa}</span>
                <span style={styles.exampleTranslation}>{ex.translation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {diffs.length > 0 && (
        <div style={styles.comparisonCard}>
          <div style={styles.sectionTitle}>关键差异</div>
          <div>
            {diffs.map((d) => (
              <span
                key={d}
                style={{
                  ...styles.diffBadge,
                  background: 'rgba(99,102,241,0.15)',
                  color: '#a5b4fc',
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function VowelChart({
  onSelect,
}: {
  onSelect: (symbol: string) => void
}) {
  return (
    <div style={styles.chartCard}>
      <div style={styles.sectionTitle}>元音表 (按舌位高度/前后)</div>
      <table style={styles.chartTable}>
        <thead>
          <tr>
            <th style={styles.chartTh}>高度 \ 前后</th>
            {BACKNESS_LABELS.map((b) => (
              <th key={b} style={styles.chartTh}>
                {b}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HEIGHT_LABELS.map((h) => (
            <tr key={h}>
              <td style={styles.chartRowHeader}>{h}</td>
              {BACKNESS_LABELS.map((b) => {
                const matches = VOWELS.filter((v) => v.manner === h && v.place === b)
                return (
                  <td key={b} style={styles.chartTd}>
                    {matches.map((m) => (
                      <span
                        key={m.symbol}
                        style={{
                          color: VOWEL_COLOR,
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontWeight: 600,
                        }}
                        onClick={() => onSelect(m.symbol)}
                      >
                        {m.symbol}
                      </span>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ConsonantChart({
  onSelect,
}: {
  onSelect: (symbol: string) => void
}) {
  return (
    <div style={styles.chartCard}>
      <div style={styles.sectionTitle}>辅音表 (按发音部位/方式)</div>
      <table style={styles.chartTable}>
        <thead>
          <tr>
            <th style={styles.chartTh}>方式 \ 部位</th>
            {PLACE_LABELS.map((p) => (
              <th key={p} style={styles.chartTh}>
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MANNER_LABELS.map((m) => (
            <tr key={m}>
              <td style={styles.chartRowHeader}>{m}</td>
              {PLACE_LABELS.map((p) => {
                const matches = CONSONANTS.filter((c) => c.manner === m && c.place === p)
                return (
                  <td key={p} style={styles.chartTd}>
                    {matches.map((c) => (
                      <span
                        key={c.symbol}
                        style={{
                          color: c.voicing === 'voiced' ? '#22d3ee' : '#94a3b8',
                          cursor: 'pointer',
                          marginRight: '0.3rem',
                          fontWeight: 600,
                        }}
                        onClick={() => onSelect(c.symbol)}
                      >
                        {c.symbol}
                      </span>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Compare() {
  const [leftSymbol, setLeftSymbol] = useState('')
  const [rightSymbol, setRightSymbol] = useState('')

  useEffect(() => {
    preloadVoices()
  }, [])

  const left = ALL.find((p) => p.symbol === leftSymbol) ?? null
  const right = ALL.find((p) => p.symbol === rightSymbol) ?? null

  const handleChartSelect = (symbol: string) => {
    if (!leftSymbol) {
      setLeftSymbol(symbol)
    } else if (!rightSymbol) {
      setRightSymbol(symbol)
    } else {
      setLeftSymbol(symbol)
      setRightSymbol('')
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>音标对比</h1>

      <div style={styles.panelsRow}>
        <div style={styles.panel}>
          <PhoneticSelect value={leftSymbol} onChange={setLeftSymbol} label="音标 A" />
          {left && (
            <>
              <div
                style={{
                  ...styles.symbolLarge,
                  color: left.type === 'vowel' ? VOWEL_COLOR : CONSONANT_COLOR,
                }}
              >
                /{left.symbol}/
              </div>
              <div style={styles.nameText}>{left.nameZh}</div>
            </>
          )}
        </div>
        <div style={styles.panel}>
          <PhoneticSelect value={rightSymbol} onChange={setRightSymbol} label="音标 B" />
          {right && (
            <>
              <div
                style={{
                  ...styles.symbolLarge,
                  color: right.type === 'vowel' ? VOWEL_COLOR : CONSONANT_COLOR,
                }}
              >
                /{right.symbol}/
              </div>
              <div style={styles.nameText}>{right.nameZh}</div>
            </>
          )}
        </div>
      </div>

      {left && right && <ComparisonView left={left} right={right} />}

      <VowelChart onSelect={handleChartSelect} />
      <ConsonantChart onSelect={handleChartSelect} />
    </div>
  )
}
