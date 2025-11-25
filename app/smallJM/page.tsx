'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const jmRef = useRef<HTMLImageElement | null>(null);
  const fatBarRef = useRef<HTMLDivElement | null>(null);
  const fatLabelRef = useRef<HTMLSpanElement | null>(null);
  const particleLayerRef = useRef<HTMLDivElement | null>(null);

  const [fatness, setFatness] = useState(100); // 100kg으로 시작

  // 게임 상태 관리: 'idle' | 'running' | 'success' | 'failure'
  const [gameStatus, setGameStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const running = useRef(false);

  /* -----------------------------
      UI 업데이트 함수
  ------------------------------ */
  const updateUI = () => {
    const jm = jmRef.current;
    const fatBar = fatBarRef.current;
    const fatLabel = fatLabelRef.current;

    if (!jm || !fatBar || !fatLabel) return;

    const kg = Math.max(70, Math.min(120, Math.round(fatness)));
    const pct = ((kg - 70) / 50) * 100;
    fatBar.style.width = pct + '%';
    fatLabel.textContent = kg + 'kg';

    const minW = 140;
    const maxW = 340;
    const widthPx = Math.round(minW + (maxW - minW) * (pct / 100));
    jm.style.width = widthPx + 'px';

    jm.classList.remove('jm-slim', 'jm-fat');
    if (kg <= 80) jm.classList.add('jm-slim');
    else if (kg >= 110) jm.classList.add('jm-fat');

    jm.classList.add('jm-breathe');
  };

  /* -----------------------------
      자동 증가 tick
  ------------------------------ */
  useEffect(() => {
    let lastTime = performance.now();
    // 초당 4kg 증가
    const increaseRate = 4;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (running.current) {
        setFatness((f) => Math.min(120, f + increaseRate * dt));
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* fatness 변경 시 UI 업데이트 */
  useEffect(() => {
    updateUI();
    // 성공/실패 판정
    if (fatness >= 120 && gameStatus === 'running') {
      running.current = false;
      setGameStatus('failure');
    } else if (fatness <= 70 && gameStatus === 'running') {
      running.current = false;
      setGameStatus('success');
    }
  }, [fatness]);

  /* -----------------------------
      파티클 생성
  ------------------------------ */
  const createParticles = (count = 8) => {
    const jm = jmRef.current;
    const layer = particleLayerRef.current;
    if (!jm || !layer) return;

    const rect = jm.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const x = rect.width * 0.4 + (Math.random() - 0.5) * rect.width * 0.8;
      const y = rect.top + 20 + (Math.random() - 0.5) * 20;

      p.style.left = `${x}px`;
      p.style.top = `${y - rect.top}px`;

      const tx = (Math.random() - 0.5) * 120;
      p.style.setProperty('--tx', `${tx}px`);

      const kg = Math.round(fatness);
      if (kg <= 80)
        p.style.background = 'radial-gradient(circle at 40% 30%, rgba(16,185,129,0.95), rgba(34,197,94,0.7))';
      else if (kg >= 110)
        p.style.background = 'radial-gradient(circle at 40% 30%, rgba(252,165,165,0.95), rgba(239,68,68,0.7))';
      else p.style.background = 'radial-gradient(circle at 40% 30%, rgba(168,85,247,0.95), rgba(139,92,246,0.7))';

      layer.appendChild(p);

      setTimeout(() => p.remove(), 1000 + Math.random() * 400);
    }
  };

  /* -----------------------------
      클릭 액션
  ------------------------------ */
  // 클릭으로 0.5kg 감소
  const doClickAction = (amount = 0.5) => {
    setFatness((f) => Math.max(70, f - amount));

    const jm = jmRef.current;
    if (jm) {
      jm.classList.remove('jm-pop');
      void jm.offsetWidth;
      jm.classList.add('jm-pop');
    }

    createParticles(10);
  };

  /* 스페이스바 처리 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        doClickAction(0.5);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fatness]);

  return (
    <>
      {/* 시작 / 성공 / 실패 오버레이 */}
      {gameStatus === 'idle' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-4">정민이를 줄여라!</h2>
            <p className="text-sm text-gray-600 mb-6">목표: 70kg까지 감량하기!</p>
            <button
              onClick={() => {
                running.current = true;
                setGameStatus('running');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
            >
              시작하기
            </button>
          </div>
        </div>
      )}

      {gameStatus === 'success' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-green-600">성공!</h2>
            <p className="text-sm text-gray-600 mb-6">정민이가 70kg 달성! 🎉</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setFatness(100);
                  setGameStatus('idle');
                  running.current = false;
                }}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                다시하기
              </button>
            </div>
          </div>
        </div>
      )}

      {gameStatus === 'failure' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-red-500">실패</h2>
            <p className="text-sm text-gray-600 mb-6">정민이가 120kg이 되었습니다.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setFatness(100);
                  setGameStatus('idle');
                  running.current = false;
                }}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                다시하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-pink-50 to-indigo-50 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">머라구여? 정민이를 줄이고 싶다구여??</h1>
            <p className="text-sm text-gray-600 mt-2">클릭을 통해 정민이를 70kg까지 줄여주세요!!</p>
          </header>

          <main className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* JM 이미지 */}
              <div className="relative flex-1 flex items-center justify-center">
                <div ref={particleLayerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
                <img
                  ref={jmRef}
                  src="/JM.png"
                  alt="JM"
                  className="jm-img select-none cursor-pointer"
                  onClick={() => doClickAction(1)}
                />
              </div>

              {/* 오른쪽 컨트롤 */}
              <div className="w-full md:w-1/3">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    체중:{' '}
                    <span ref={fatLabelRef} className="font-bold">
                      100kg
                    </span>
                  </label>
                  <div className="w-full h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      ref={fatBarRef}
                      className="h-full bg-gradient-to-r from-green-400 to-red-400 w-0 transition-all"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>70kg</span>
                    <span>120kg</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => doClickAction(1)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow"
                  >
                    클릭해서 정민이 줄이기
                  </button>
                </div>
              </div>
            </div>

            <footer className="text-xs text-gray-500 mt-6 text-center">Small JM</footer>
          </main>
        </div>
      </div>

      {/* ----------------------------- */}
      {/* 글로벌 스타일 (CSS + 키프레임) */}
      {/* ----------------------------- */}
      <style jsx global>{`
        .jm-img {
          width: 220px;
          max-width: 70%;
          transition: transform 450ms cubic-bezier(0.2, 0.9, 0.2, 1), filter 400ms ease,
            width 450ms cubic-bezier(0.2, 0.9, 0.2, 1);
          transform-origin: center center;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.12), 0 6px 12px rgba(15, 23, 42, 0.06);
        }

        /* 가로로만 늘어나게 scaleX 사용 */
        .jm-slim {
          transform: translateY(-6px) scaleX(0.88);
          filter: saturate(1.05) drop-shadow(0 6px 18px rgba(34, 197, 94, 0.12));
        }

        .jm-fat {
          transform: translateY(0) scaleX(1.12);
          filter: saturate(0.9) drop-shadow(0 16px 34px rgba(239, 68, 68, 0.1));
        }

        @keyframes pop {
          0% {
            transform: scaleX(1);
          }
          40% {
            transform: scaleX(1.14);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .jm-pop {
          animation: pop 420ms cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        @keyframes breathe {
          0% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(-4px) scaleX(1.03);
          }
          100% {
            transform: translateY(0) scaleX(1);
          }
        }
        .jm-breathe {
          animation: breathe 3.6s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          pointer-events: none;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          opacity: 0;
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
          background: radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
          box-shadow: 0 4px 18px rgba(99, 102, 241, 0.22);
          animation: particle-fly 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }

        @keyframes particle-fly {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) translateX(var(--tx, 0px)) scale(0.4);
          }
        }

        @media (max-width: 640px) {
          .jm-img {
            width: 160px;
          }
        }
        /* 오버레이 z-index 보정용 */
        .overlay-button {
        }
      `}</style>
    </>
  );
}
