import { useState, useCallback, useRef, useEffect } from 'react'
import { getAllPhonetics } from '../data/phonetics'
import type { PhoneticSymbol } from '../data/phonetics'
import { updatePhoneticRecord } from '../data/progress'
import { speakPhonetic, preloadVoices } from '../utils/speech'

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function pickRandom<T>(arr: T[], count: number, exclude?: T): T[] {
  const filtered = exclude ? arr.filter((item) => item !== exclude) : [...arr]
  return shuffleArray(filtered).slice(0, count)
}

function generateQuestion(allPhonetics: PhoneticSymbol[]) {
  const correct = allPhonetics[Math.floor(Math.random() * allPhonetics.length)]
  const wrongOptions = pickRandom(allPhonetics, 3, correct)
  const options = shuffleArray([correct, ...wrongOptions])
  return { correct, options }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '2rem',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#f8fafc',
    margin: 0,
  },
  scoreBoard: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  scoreBadge: {
    background: '#1e293b',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: 600,
  },
  card: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '1.5rem',
  },
  symbolDisplay: {
    fontSize: '5rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    color: '#6366f1',
    margin: '1rem 0',
  },
  questionText: {
    textAlign: 'center' as const,
    fontSize: '1.15rem',
    color: '#94a3b8',
    marginBottom: '1.5rem',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  optionBtn: {
    background: '#334155',
    border: '2px solid #475569',
    borderRadius: '0.75rem',
    padding: '1rem',
    color: '#e2e8f0',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center' as const,
  },
  optionCorrect: {
    background: 'rgba(34,197,94,0.15)',
    border: '2px solid #22c55e',
    color: '#22c55e',
  },
  optionIncorrect: {
    background: 'rgba(239,68,68,0.15)',
    border: '2px solid #ef4444',
    color: '#ef4444',
  },
  feedbackCard: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderLeft: '4px solid #6366f1',
  },
  feedbackTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#f8fafc',
  },
  feedbackItem: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.4rem',
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },
  feedbackLabel: {
    fontWeight: 600,
    color: '#6366f1',
    minWidth: '3rem',
  },
  btnPrimary: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  btnSecondary: {
    background: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '0.75rem',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap' as const,
  },
  recordingSection: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  recordingTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#f8fafc',
  },
  recordingControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  btnRecord: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnStopRecord: {
    background: '#475569',
    color: '#fff',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  waveformContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '3px',
    height: '40px',
    padding: '0 0.5rem',
  },
  waveformBar: {
    width: '4px',
    background: '#6366f1',
    borderRadius: '2px',
    transition: 'height 0.05s',
  },
  audioPlayer: {
    marginTop: '0.75rem',
  },
  statsCard: {
    background: '#1e293b',
    borderRadius: '1rem',
    padding: '1.5rem',
  },
  statsTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#f8fafc',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  statItem: {
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#6366f1',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginTop: '0.25rem',
  },
}

const ALL_PHONETICS = getAllPhonetics()

export default function Practice() {
  const [question, setQuestion] = useState(() => generateQuestion(ALL_PHONETICS))
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [barHeights, setBarHeights] = useState<number[]>(Array.from({ length: 16 }, () => 4))

  useEffect(() => {
    preloadVoices()
  }, [])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)

  const answered = selected !== null
  const isCorrect = selected === question.correct.symbol

  const handleSelect = useCallback(
    (symbol: string) => {
      if (answered) return
      setSelected(symbol)
      setTotal((prev) => prev + 1)
      const wasCorrect = symbol === question.correct.symbol
      if (wasCorrect) {
        setCorrect((prev) => prev + 1)
        setStreak((prev) => prev + 1)
      } else {
        setStreak(0)
      }
      updatePhoneticRecord(question.correct.symbol, wasCorrect)
    },
    [answered, question.correct.symbol],
  )

  const handleNext = useCallback(() => {
    setQuestion(generateQuestion(ALL_PHONETICS))
    setSelected(null)
  }, [])

  const handleReset = useCallback(() => {
    setQuestion(generateQuestion(ALL_PHONETICS))
    setSelected(null)
    setCorrect(0)
    setTotal(0)
    setStreak(0)
    setAudioUrl(null)
  }, [])

  const updateWaveformRef = useRef<() => void>(() => {})

  useEffect(() => {
    updateWaveformRef.current = () => {
      if (!analyserRef.current) return
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      const step = Math.floor(dataArray.length / 16)
      const heights = Array.from({ length: 16 }, (_, i) => {
        const value = dataArray[i * step]
        return Math.max(4, (value / 255) * 40)
      })
      setBarHeights(heights)
      animFrameRef.current = requestAnimationFrame(updateWaveformRef.current)
    }
  })

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        audioCtx.close()
      }

      recorder.start()
      setIsRecording(true)
      animFrameRef.current = requestAnimationFrame(updateWaveformRef.current)
    } catch {
      /* mic access denied */
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    cancelAnimationFrame(animFrameRef.current)
    setBarHeights(Array.from({ length: 16 }, () => 4))
    setIsRecording(false)
  }, [])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const accuracyRate = total > 0 ? Math.round((correct / total) * 100) : 0

  const getOptionStyle = (symbol: string): React.CSSProperties => {
    if (!answered) return styles.optionBtn
    if (symbol === question.correct.symbol) {
      return { ...styles.optionBtn, ...styles.optionCorrect }
    }
    if (symbol === selected && !isCorrect) {
      return { ...styles.optionBtn, ...styles.optionIncorrect }
    }
    return { ...styles.optionBtn, opacity: 0.5 }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>音标练习</h1>
        <div style={styles.scoreBoard}>
          <span style={{ ...styles.scoreBadge, color: '#22c55e' }}>✓ {correct}</span>
          <span style={{ ...styles.scoreBadge, color: '#94a3b8' }}>/ {total}</span>
          <span style={{ ...styles.scoreBadge, color: '#f59e0b' }}>🔥 {streak}</span>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.symbolDisplay}>{question.correct.symbol}</div>
        <button
          onClick={() => speakPhonetic(question.correct.symbol)}
          style={{
            padding: '6px 18px',
            borderRadius: '8px',
            background: '#6366f1',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          🔊 听发音
        </button>
        <p style={styles.questionText}>这个音标的名称是？</p>
        <div style={styles.optionsGrid}>
          {question.options.map((opt) => (
            <button
              key={opt.symbol}
              style={getOptionStyle(opt.symbol)}
              onClick={() => handleSelect(opt.symbol)}
              disabled={answered}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{opt.nameZh}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{opt.name}</div>
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <div
          style={{
            ...styles.feedbackCard,
            borderLeftColor: isCorrect ? '#22c55e' : '#ef4444',
          }}
        >
          <div
            style={{
              ...styles.feedbackTitle,
              color: isCorrect ? '#22c55e' : '#ef4444',
            }}
          >
            {isCorrect ? '✓ 回答正确！' : `✗ 正确答案是：${question.correct.nameZh}`}
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.feedbackLabel}>唇形</span>
            <span>{question.correct.articulationDesc.lips}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.feedbackLabel}>舌位</span>
            <span>{question.correct.articulationDesc.tongue}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.feedbackLabel}>气流</span>
            <span>{question.correct.articulationDesc.airflow}</span>
          </div>
          <div style={styles.feedbackItem}>
            <span style={styles.feedbackLabel}>下颌</span>
            <span>{question.correct.articulationDesc.jaw}</span>
          </div>
        </div>
      )}

      <div style={styles.recordingSection}>
        <div style={styles.recordingTitle}>发音录制</div>
        <div style={styles.recordingControls}>
          {!isRecording ? (
            <button style={styles.btnRecord} onClick={startRecording}>
              开始录音
            </button>
          ) : (
            <button style={styles.btnStopRecord} onClick={stopRecording}>
              停止录音
            </button>
          )}
          {isRecording && (
            <div style={styles.waveformContainer}>
              {barHeights.map((h, i) => (
                <div key={i} style={{ ...styles.waveformBar, height: `${h}px` }} />
              ))}
            </div>
          )}
        </div>
        {audioUrl && (
          <div style={styles.audioPlayer}>
            <audio controls src={audioUrl} style={{ width: '100%' }} />
          </div>
        )}
      </div>

      <div style={styles.btnRow}>
        <button style={styles.btnPrimary} onClick={handleNext}>
          下一题
        </button>
        <button style={styles.btnSecondary} onClick={handleReset}>
          重新开始
        </button>
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statsTitle}>本次练习统计</div>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{accuracyRate}%</div>
            <div style={styles.statLabel}>正确率</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{total}</div>
            <div style={styles.statLabel}>总题数</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ ...styles.statValue, color: '#f59e0b' }}>{streak}</div>
            <div style={styles.statLabel}>连续正确</div>
          </div>
        </div>
      </div>
    </div>
  )
}
