import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, BookOpen, Mic, Volume2 } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { getProgress, getMasteryStats, getWeakPoints, getStreak } from '../data/progress';
import { getAllPhonetics } from '../data/phonetics';
import { getAllRules } from '../data/rules';
import type { LearningProgress } from '../data/progress';

type DashboardData = {
  totalPhonetics: number;
  totalRules: number;
  mastered: number;
  learning: number;
  streak: number;
  weakCount: number;
  masteryPercent: number;
  progress: LearningProgress;
};

const QUICK_NAV: { to: string; label: string; desc: string; icon: ReactNode; color: string }[] = [
  { to: '/phonetics', label: '音标学习', desc: '学习 IPA 音标发音', icon: <Languages size={24} />, color: '#6366f1' },
  { to: '/rules', label: '拼读规则', desc: '掌握拼读与连读', icon: <BookOpen size={24} />, color: '#8b5cf6' },
  { to: '/practice', label: '互动练习', desc: '在线练习发音', icon: <Mic size={24} />, color: '#ec4899' },
  { to: '/compare', label: '发音对比', desc: '对比不同发音', icon: <Volume2 size={24} />, color: '#14b8a6' },
];

const s: Record<string, CSSProperties> = {
  container: {
    maxWidth: 960,
    margin: '0 auto',
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 8px',
    color: '#f1f5f9',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    margin: '0 0 32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    background: '#1e293b',
    borderRadius: 12,
    padding: '20px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
    margin: 0,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0,
  },
  ringSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    background: '#1e293b',
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    flexWrap: 'wrap' as const,
  },
  ringContainer: {
    position: 'relative' as const,
    width: 140,
    height: 140,
    flexShrink: 0,
  },
  ringLabel: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPercent: {
    fontSize: 28,
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0,
    lineHeight: 1,
  },
  ringCaption: {
    fontSize: 12,
    color: '#94a3b8',
    margin: '4px 0 0',
  },
  ringInfo: {
    flex: 1,
    minWidth: 180,
  },
  ringTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#f1f5f9',
    margin: '0 0 12px',
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 13,
    color: '#94a3b8',
    width: 56,
    flexShrink: 0,
  },
  barTrack: {
    flex: 1,
    height: 8,
    background: '#334155',
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  barCount: {
    fontSize: 13,
    color: '#cbd5e1',
    width: 30,
    textAlign: 'right' as const,
    flexShrink: 0,
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#f1f5f9',
    margin: '0 0 16px',
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
  },
  quickCard: {
    background: '#1e293b',
    borderRadius: 12,
    padding: 20,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #334155',
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#f1f5f9',
    margin: '0 0 4px',
  },
  quickDesc: {
    fontSize: 13,
    color: '#94a3b8',
    margin: 0,
  },
};

function ProgressRing({ percent }: { percent: number }) {
  const r = 58;
  const stroke = 10;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={70} cy={70} r={r} fill="none" stroke="#334155" strokeWidth={stroke} />
      <circle
        cx={70}
        cy={70}
        r={r}
        fill="none"
        stroke="#6366f1"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

function BarFill({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={s.barTrack}>
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 4,
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  );
}

function loadDashboardData(): DashboardData {
  const progress = getProgress();
  const stats = getMasteryStats();
  const weak = getWeakPoints();
  const streak = getStreak();
  const allPhonetics = getAllPhonetics();
  const allRules = getAllRules();

  const totalPhonetics = allPhonetics.length;
  const mastered = stats.mastered;
  const learning = stats.intermediate + stats.beginner;
  const masteryPercent = totalPhonetics > 0 ? Math.round((mastered / totalPhonetics) * 100) : 0;

  return {
    totalPhonetics,
    totalRules: allRules.length,
    mastered,
    learning,
    streak,
    weakCount: weak.length,
    masteryPercent,
    progress,
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data] = useState<DashboardData>(loadDashboardData);

  return (
    <div style={s.container}>
      <h1 style={s.heading}>学习概览</h1>
      <p style={s.subtitle}>跟踪你的 IPA 音标学习进度</p>

      <div style={s.statsGrid}>
        <div style={s.statCard}>
          <p style={s.statLabel}>总音标数</p>
          <p style={s.statValue}>{data.totalPhonetics}</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>已掌握</p>
          <p style={{ ...s.statValue, color: '#6366f1' }}>{data.mastered}</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>学习中</p>
          <p style={{ ...s.statValue, color: '#f59e0b' }}>{data.learning}</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>连续学习天数</p>
          <p style={{ ...s.statValue, color: '#14b8a6' }}>{data.streak}</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>薄弱环节数</p>
          <p style={{ ...s.statValue, color: '#ef4444' }}>{data.weakCount}</p>
        </div>
      </div>

      <div style={s.ringSection}>
        <div style={s.ringContainer}>
          <ProgressRing percent={data.masteryPercent} />
          <div style={s.ringLabel}>
            <p style={s.ringPercent}>{data.masteryPercent}%</p>
            <p style={s.ringCaption}>掌握率</p>
          </div>
        </div>
        <div style={s.ringInfo}>
          <p style={s.ringTitle}>学习进度</p>
          <div style={s.barRow}>
            <span style={s.barLabel}>已掌握</span>
            <BarFill value={data.mastered} max={data.totalPhonetics} color="#6366f1" />
            <span style={s.barCount}>{data.mastered}</span>
          </div>
          <div style={s.barRow}>
            <span style={s.barLabel}>学习中</span>
            <BarFill value={data.learning} max={data.totalPhonetics} color="#f59e0b" />
            <span style={s.barCount}>{data.learning}</span>
          </div>
          <div style={s.barRow}>
            <span style={s.barLabel}>未学习</span>
            <BarFill
              value={data.totalPhonetics - data.mastered - data.learning}
              max={data.totalPhonetics}
              color="#475569"
            />
            <span style={s.barCount}>{data.totalPhonetics - data.mastered - data.learning}</span>
          </div>
        </div>
      </div>

      <p style={s.quickTitle}>快速开始</p>
      <div style={s.quickGrid}>
        {QUICK_NAV.map((item) => (
          <div
            key={item.to}
            style={s.quickCard}
            onClick={() => navigate(item.to)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(item.to)}
          >
            <div style={{ ...s.quickIcon, background: `${item.color}22` }}>
              <span style={{ color: item.color }}>{item.icon}</span>
            </div>
            <p style={s.quickLabel}>{item.label}</p>
            <p style={s.quickDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
