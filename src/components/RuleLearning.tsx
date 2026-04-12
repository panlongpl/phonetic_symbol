import { useState, useEffect } from 'react';
import { LINKING_RULES, REDUCTION_RULES, ELISION_RULES, getRulesByCategory } from '../data/rules';
import type { RuleCategory, PronunciationRule } from '../data/rules';
import { updateRuleRecord } from '../data/progress';
import { speakText, preloadVoices } from '../utils/speech';

const CATEGORY_COLORS: Record<RuleCategory, string> = {
  linking: '#22d3ee',
  reduction: '#f59e0b',
  elision: '#ef4444',
};

const TABS: { key: RuleCategory; label: string; rules: PronunciationRule[] }[] = [
  { key: 'linking', label: '连读规则', rules: LINKING_RULES },
  { key: 'reduction', label: '弱读规则', rules: REDUCTION_RULES },
  { key: 'elision', label: '失去爆破', rules: ELISION_RULES },
];

function RuleCard({ rule }: { rule: PronunciationRule }) {
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const accentColor = CATEGORY_COLORS[rule.category];

  const cardStyle: React.CSSProperties = {
    background: '#1e293b',
    borderRadius: 12,
    borderLeft: `4px solid ${accentColor}`,
    padding: '24px 28px',
    marginBottom: 20,
    maxWidth: 720,
    width: '100%',
  };

  const headerStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: '#f1f5f9',
    lineHeight: 1.4,
  };

  const subHeaderStyle: React.CSSProperties = {
    margin: '2px 0 0',
    fontSize: 14,
    fontWeight: 500,
    color: accentColor,
  };

  const descStyle: React.CSSProperties = {
    margin: '12px 0 0',
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 1.6,
  };

  const patternBoxStyle: React.CSSProperties = {
    margin: '14px 0 0',
    background: '#0f172a',
    borderRadius: 8,
    padding: '10px 16px',
    fontFamily: '"Fira Code", "Cascadia Code", "Menlo", monospace',
    fontSize: 14,
    color: accentColor,
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  const toggleBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    marginRight: 12,
    padding: '7px 16px',
    background: 'transparent',
    border: `1px solid ${accentColor}44`,
    borderRadius: 8,
    color: accentColor,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s',
  };

  const sectionWrapStyle = (open: boolean): React.CSSProperties => ({
    overflow: 'hidden',
    maxHeight: open ? 2000 : 0,
    opacity: open ? 1 : 0,
    transition: 'max-height 0.4s ease, opacity 0.3s ease',
    marginTop: open ? 12 : 0,
  });

  const exampleItemStyle: React.CSSProperties = {
    background: '#0f172a',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 10,
  };

  const ipaStyle: React.CSSProperties = {
    fontFamily: '"Fira Code", monospace',
    fontSize: 14,
    color: '#a78bfa',
  };

  const highlightTextParts = (text: string, highlights: { start: number; end: number; type: string }[]) => {
    if (!highlights.length) {
      return <span>{text}</span>;
    }

    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;

    sorted.forEach((hl, i) => {
      if (hl.start > lastIdx) {
        parts.push(<span key={`t-${i}`}>{text.slice(lastIdx, hl.start)}</span>);
      }
      parts.push(
        <span
          key={`h-${i}`}
          style={{
            background: `${accentColor}33`,
            color: accentColor,
            borderRadius: 4,
            padding: '1px 3px',
          }}
        >
          {text.slice(hl.start, hl.end)}
        </span>
      );
      lastIdx = hl.end;
    });

    if (lastIdx < text.length) {
      parts.push(<span key="tail">{text.slice(lastIdx)}</span>);
    }

    return <>{parts}</>;
  };

  const tipsStyle: React.CSSProperties = {
    margin: '16px 0 0',
    paddingLeft: 20,
    listStyle: 'disc',
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 1.8,
  };

  const practiceItemStyle: React.CSSProperties = {
    background: '#0f172a',
    borderRadius: 8,
    padding: '14px 16px',
    marginBottom: 10,
  };

  const practiceLabel: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 4,
  };

  const completeBtnStyle: React.CSSProperties = {
    marginTop: 14,
    padding: '10px 24px',
    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
    border: 'none',
    borderRadius: 8,
    color: '#0f172a',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  };

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>{rule.titleZh}</h3>
      <p style={subHeaderStyle}>{rule.titleEn}</p>
      <p style={descStyle}>{rule.description}</p>
      <div style={patternBoxStyle}>{rule.pattern}</div>

      <div>
        <button
          style={toggleBtnStyle}
          onClick={() => setExamplesOpen((v) => !v)}
        >
          {examplesOpen ? '▾' : '▸'} 示例 ({rule.examples.length})
        </button>
        <button
          style={toggleBtnStyle}
          onClick={() => setPracticeOpen((v) => !v)}
        >
          {practiceOpen ? '▾' : '▸'} 练习
        </button>
      </div>

      <div style={sectionWrapStyle(examplesOpen)}>
        {rule.examples.map((ex, idx) => (
          <div key={idx} style={exampleItemStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <button
                onClick={() => speakText(ex.text)}
                style={{ background: 'none', color: accentColor, cursor: 'pointer', fontSize: 16, padding: 0, lineHeight: 1 }}
              >
                🔊
              </button>
              <span style={{ fontSize: 16, color: '#e2e8f0', fontWeight: 600 }}>
                {highlightTextParts(ex.text, ex.highlights)}
              </span>
            </div>
            <div style={ipaStyle}>{ex.ipa}</div>
          </div>
        ))}
      </div>

      {rule.tips.length > 0 && (
        <ul style={tipsStyle}>
          {rule.tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      )}

      <div style={sectionWrapStyle(practiceOpen)}>
        {rule.practice.map((p, idx) => (
          <div key={idx} style={practiceItemStyle}>
            <div style={practiceLabel}>句子</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <button
                onClick={() => speakText(p.sentence)}
                style={{ background: 'none', color: accentColor, cursor: 'pointer', fontSize: 16, padding: 0, lineHeight: 1 }}
              >
                🔊
              </button>
              <span style={{ fontSize: 16, color: '#e2e8f0', fontWeight: 600 }}>
                {p.sentence}
              </span>
            </div>
            <div style={practiceLabel}>IPA</div>
            <div style={{ ...ipaStyle, marginBottom: 8 }}>{p.ipa}</div>
            <div style={practiceLabel}>规则应用</div>
            <div style={{ fontSize: 14, color: accentColor, lineHeight: 1.5 }}>
              {p.rule_application}
            </div>
          </div>
        ))}
        <button
          style={completeBtnStyle}
          onClick={() => updateRuleRecord(rule.id)}
        >
          完成练习
        </button>
      </div>
    </div>
  );
}

export default function RuleLearning() {
  const [activeTab, setActiveTab] = useState<RuleCategory>('linking');
  const rules = getRulesByCategory(activeTab);

  useEffect(() => {
    preloadVoices();
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#0f172a',
    padding: '40px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 800,
    color: '#f1f5f9',
    margin: '0 0 28px',
    textAlign: 'center',
  };

  const tabBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const tabStyle = (key: RuleCategory): React.CSSProperties => {
    const isActive = activeTab === key;
    const color = CATEGORY_COLORS[key];
    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 22px',
      borderRadius: 10,
      border: isActive ? `2px solid ${color}` : '2px solid transparent',
      background: isActive ? `${color}18` : '#1e293b',
      color: isActive ? color : '#94a3b8',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    };
  };

  const badgeStyle = (key: RuleCategory): React.CSSProperties => {
    const isActive = activeTab === key;
    const color = CATEGORY_COLORS[key];
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 700,
      background: isActive ? color : '#334155',
      color: isActive ? '#0f172a' : '#94a3b8',
      padding: '0 6px',
    };
  };

  const listStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: 720,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>发音规则学习</h1>

      <div style={tabBarStyle}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            style={tabStyle(tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span style={badgeStyle(tab.key)}>{tab.rules.length}</span>
          </button>
        ))}
      </div>

      <div style={listStyle}>
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  );
}
