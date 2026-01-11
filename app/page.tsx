"use client";

import { useEffect, useState } from "react";

interface Card {
  id: number;
  icon: string;
  matched: boolean;
}

const allIcons = ["💾", "⚙️", "🧠", "🤖", "🚀", "💻", "📡", "🌐", "🔥", "⚡", "🎮", "🖥️", "🛸", "💡", "🌀", "🎯", "⭐", "🔮"];

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  function shuffleCards(level: 'easy' | 'medium' | 'hard'): Card[] {
    const count = level === 'easy' ? 8 : level === 'medium' ? 12 : 18;
    const selected = allIcons.slice(0, count);
    const pairs = selected.flatMap((icon, i) => [
      { id: i * 2, icon, matched: false },
      { id: i * 2 + 1, icon, matched: false }
    ]);
    return pairs.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setCards(shuffleCards(difficulty));
    const saved = localStorage.getItem('babamemory-best');
    if (saved) setBest(parseInt(saved));
  }, []);

  useEffect(() => {
    if (first !== null && second !== null) {
      setDisabled(true);
      if (cards[first].icon === cards[second].icon) {
        setCards(prev => prev.map((c, i) => 
          i === first || i === second ? { ...c, matched: true } : c
        ));
        reset();
      } else {
        setTimeout(reset, 800);
      }
    }
  }, [first, second]);

  useEffect(() => {
    if (cards.length && cards.every(c => c.matched) && moves > 0) {
      if (!best || moves < best) {
        setBest(moves);
        localStorage.setItem('babamemory-best', moves.toString());
      }
    }
  }, [cards, moves]);

  function reset() {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  }

  function handleClick(i: number) {
    if (disabled || cards[i].matched || i === first) return;
    if (first === null) {
      setFirst(i);
    } else {
      setSecond(i);
      setMoves(m => m + 1);
    }
  }

  function restart() {
    setCards(shuffleCards(difficulty));
    setFirst(null);
    setSecond(null);
    setMoves(0);
    setDisabled(false);
  }

  function changeDifficulty(level: 'easy' | 'medium' | 'hard') {
    setDifficulty(level);
    setCards(shuffleCards(level));
    setFirst(null);
    setSecond(null);
    setMoves(0);
    setDisabled(false);
  }

  const gridCols = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 4 : 6;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, rgb(2 6 23), rgb(15 23 42), rgb(30 41 59))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* BACKGROUND GLOW */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.15), transparent 50%), radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.15), transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* TOP LOGO */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '0.3em',
          background: 'linear-gradient(45deg, #38bdf8, #a78bfa, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.6))'
        }}>
          BABAMEMORY
        </h2>
      </div>

      {/* HEADER */}
      <header style={{
        marginBottom: '2rem',
        paddingTop: '4rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          background: 'linear-gradient(to right, rgb(248 250 252), rgb(56 189 248), rgb(167 139 250))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem',
          textShadow: '0 0 40px rgba(56,189,248,0.5)'
        }}>
          Memory Game
        </h1>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          
          {/* DIFFICULTY SELECTOR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.875rem'
          }}>
            <span style={{ color: '#38bdf8', fontWeight: '600' }}>Level:</span>
            <select
              value={difficulty}
              onChange={(e) => changeDifficulty(e.target.value as any)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="easy" style={{ background: '#1e293b' }}>🟢 Easy (4x4)</option>
              <option value="medium" style={{ background: '#1e293b' }}>🟡 Medium (6x4)</option>
              <option value="hard" style={{ background: '#1e293b' }}>🔴 Hard (6x6)</option>
            </select>
          </div>

          {/* STATS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            color: '#cbd5e1'
          }}>
            <span>Moves: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{moves}</strong></span>
            <div style={{ width: '1px', height: '1.25rem', background: 'rgba(100, 116, 139, 0.5)' }} />
            <span>Best: <strong style={{ color: '#a78bfa', fontFamily: 'monospace' }}>{best ?? '--'}</strong></span>
            <button
              onClick={restart}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(45deg, rgba(56,189,248,0.2), rgba(167,139,250,0.2))',
                border: '1px solid rgba(56,189,248,0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#38bdf8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(56,189,248,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(56,189,248,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(56,189,248,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🔄 Restart
            </button>
          </div>
        </div>
      </header>

      {/* CARDS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, minmax(90px, 110px))`,
        gap: '0.75rem',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1
      }}>
        {cards.map((card, i) => {
          const show = card.matched || i === first || i === second;
          return (
            <div
              key={card.id}
              onClick={() => handleClick(i)}
              style={{
                aspectRatio: '1',
                background: show 
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8))' 
                  : 'linear-gradient(135deg, rgba(56,189,248,0.05), rgba(167,139,250,0.05))',
                backdropFilter: 'blur(16px)',
                border: show ? '2px solid rgba(167,139,250,0.6)' : '2px solid rgba(56,189,248,0.3)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: show ? '2.5rem' : '0.65rem',
                color: show ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: card.matched ? 'default' : 'pointer',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: show 
                  ? '0 8px 32px rgba(167,139,250,0.4), inset 0 2px 8px rgba(255,255,255,0.1)' 
                  : '0 4px 16px rgba(56,189,248,0.2)',
                transform: show ? 'scale(1.02)' : 'scale(1)',
                userSelect: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!card.matched) {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.6)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!card.matched) {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {!show && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(56,189,248,0.1), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
              )}
              {show ? card.icon : 'BABA'}
            </div>
          );
        })}
      </div>

      {/* PARTICLES */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ 
          position: 'absolute', top: '20%', right: '20%', width: '8px', height: '8px', 
          background: 'rgba(56,189,248,0.3)', borderRadius: '50%', animation: 'pulse 2s infinite' 
        }} />
        <div style={{ 
          position: 'absolute', bottom: '30%', left: '20%', width: '12px', height: '12px', 
          background: 'rgba(167,139,250,0.3)', borderRadius: '50%', animation: 'bounce 3s infinite' 
        }} />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
