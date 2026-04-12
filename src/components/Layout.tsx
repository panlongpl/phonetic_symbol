import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Languages, Mic, BarChart3, Volume2, Menu, X } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

const NAV_ITEMS: { to: string; label: string; icon: ReactNode }[] = [
  { to: '/', label: '首页', icon: <BarChart3 size={20} /> },
  { to: '/phonetics', label: '音标学习', icon: <Languages size={20} /> },
  { to: '/rules', label: '拼读规则', icon: <BookOpen size={20} /> },
  { to: '/practice', label: '互动练习', icon: <Mic size={20} /> },
  { to: '/compare', label: '发音对比', icon: <Volume2 size={20} /> },
];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    overflow: 'hidden',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 240,
    background: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 50,
    transition: 'transform 0.3s ease',
  },
  sidebarHidden: {
    transform: 'translateX(-100%)',
  },
  sidebarVisible: {
    transform: 'translateX(0)',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 40,
  },
  header: {
    padding: '24px 20px 16px',
    borderBottom: '1px solid #334155',
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: '#6366f1',
    letterSpacing: '0.02em',
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  linkBase: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    color: '#94a3b8',
    transition: 'background 0.2s, color 0.2s',
  },
  linkActive: {
    background: '#6366f1',
    color: '#ffffff',
  },
  main: {
    flex: 1,
    marginLeft: 240,
    height: '100vh',
    paddingTop: 32,
    paddingRight: 32,
    paddingBottom: 48,
    paddingLeft: 32,
    overflowY: 'auto' as const,
  },
  mobileHeader: {
    display: 'none',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    background: '#1e293b',
    zIndex: 30,
    alignItems: 'center',
    padding: '0 16px',
    borderBottom: '1px solid #334155',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    color: '#e2e8f0',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileTitle: {
    margin: 0,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 700,
    color: '#6366f1',
  },
};

const MOBILE_BREAKPOINT = 768;

function useMediaQuery(maxWidth: number): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false,
  );

  useState(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  });

  return matches;
}

export default function Layout() {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarStyle: CSSProperties = {
    ...styles.sidebar,
    ...(isMobile
      ? sidebarOpen
        ? styles.sidebarVisible
        : styles.sidebarHidden
      : styles.sidebarVisible),
  };

  const mainStyle: CSSProperties = {
    ...styles.main,
    ...(isMobile ? { marginLeft: 0, paddingTop: 72 } : {}),
  };

  const mobileHeaderStyle: CSSProperties = {
    ...styles.mobileHeader,
    ...(isMobile ? { display: 'flex' } : {}),
  };

  return (
    <div style={styles.wrapper}>
      {isMobile && sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <div style={mobileHeaderStyle}>
        <button
          style={styles.hamburger}
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 style={styles.mobileTitle}>IPA 音标学习系统</h1>
      </div>

      <aside style={sidebarStyle}>
        <div style={styles.header}>
          <h1 style={styles.title}>IPA 音标学习系统</h1>
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => isMobile && setSidebarOpen(false)}
              style={({ isActive }) => ({
                ...styles.linkBase,
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}
