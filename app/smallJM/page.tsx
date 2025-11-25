'use client';

import Link from 'next/link';
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

    // 더 극적인 가로 변화를 위해 scaleX 사용
    const minScale = 0.5; // 최소 50% 너비
    const maxScale = 2.0; // 최대 200% 너비
    const scaleX = minScale + (maxScale - minScale) * (pct / 100);

    // 105kg부터 붉어지기 시작 (105~120kg 구간에서 0~1)
    let redIntensity = 0;
    if (kg >= 105) {
      redIntensity = Math.min(1, (kg - 105) / 15); // 105~120kg 구간에서 0~1
    }

    // CSS 변수로 현재 스케일과 색상 필터 저장
    jm.style.setProperty('--current-scale', scaleX.toString());
    jm.style.setProperty('--red-intensity', redIntensity.toString());
    jm.style.transform = `scaleX(${scaleX})`;

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
      createExplosion(); // 폭발 애니메이션 실행
      setGameStatus('failure');
    } else if (fatness <= 70 && gameStatus === 'running') {
      running.current = false;
      setGameStatus('success');
    }
  }, [fatness]);

  /* -----------------------------
      폭발 애니메이션
  ------------------------------ */
  const createExplosion = () => {
    const jm = jmRef.current;
    const layer = particleLayerRef.current;
    if (!jm || !layer) return;

    // 숨기기 전에 이미지 복사해서 조각내기
    const rect = jm.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const imageX = rect.left - layerRect.left;
    const imageY = rect.top - layerRect.top;

    // 원본 이미지 즉시 숨김
    jm.style.opacity = '0';

    // 이미지를 9개 조각으로 분할해서 각각 날려보내기
    const pieces = 9; // 3x3 조각
    const pieceWidth = rect.width / 3;
    const pieceHeight = rect.height / 3;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const piece = document.createElement('div');
        piece.className = 'image-piece';

        // 조각 위치 설정
        piece.style.left = `${imageX + col * pieceWidth}px`;
        piece.style.top = `${imageY + row * pieceHeight}px`;
        piece.style.width = `${pieceWidth}px`;
        piece.style.height = `${pieceHeight}px`;

        // 배경 이미지로 해당 조각 부분만 보이게 설정
        piece.style.backgroundImage = `url(/JM.png)`;
        piece.style.backgroundSize = `${rect.width}px ${rect.height}px`;
        piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

        // 폭발 방향 계산 (중심에서 바깥쪽으로)
        const centerX = imageX + rect.width / 2;
        const centerY = imageY + rect.height / 2;
        const pieceX = imageX + col * pieceWidth + pieceWidth / 2;
        const pieceY = imageY + row * pieceHeight + pieceHeight / 2;

        const angle = Math.atan2(pieceY - centerY, pieceX - centerX);
        const distance = 200 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        piece.style.setProperty('--tx', `${tx}px`);
        piece.style.setProperty('--ty', `${ty}px`);
        piece.style.setProperty('--rotation', `${(Math.random() - 0.5) * 720}deg`);

        layer.appendChild(piece);

        // 조각 제거
        setTimeout(() => piece.remove(), 1500);
      }
    }

    // 폭발 효과들
    const centerX = imageX + rect.width / 2;
    const centerY = imageY + rect.height / 2;

    // 큰 폭발 플래시
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    flash.style.left = `${centerX}px`;
    flash.style.top = `${centerY}px`;
    layer.appendChild(flash);
    setTimeout(() => flash.remove(), 400);

    // 폭발 링들
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ring = document.createElement('div');
        ring.className = 'explosion-ring';
        ring.style.left = `${centerX}px`;
        ring.style.top = `${centerY}px`;
        layer.appendChild(ring);
        setTimeout(() => ring.remove(), 1000);
      }, i * 150);
    }

    // 작은 파편들
    for (let i = 0; i < 20; i++) {
      const fragment = document.createElement('div');
      fragment.className = 'explosion-fragment';

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      fragment.style.left = `${centerX}px`;
      fragment.style.top = `${centerY}px`;
      fragment.style.setProperty('--tx', `${tx}px`);
      fragment.style.setProperty('--ty', `${ty}px`);

      const size = 4 + Math.random() * 6;
      fragment.style.width = `${size}px`;
      fragment.style.height = `${size}px`;
      fragment.style.backgroundColor = '#ff6b35';

      layer.appendChild(fragment);
      setTimeout(() => fragment.remove(), 1000);
    }
  };

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
              className="px-6 py-2 mb-4 bg-blue-600 text-white rounded-lg font-semibold"
            >
              시작하기
            </button>
            <Link href="/">
              <p className="text-sm text-gray-500 underline">홈으로 →</p>
            </Link>
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
                  const jm = jmRef.current;
                  if (jm) {
                    // 이미지 복원
                    jm.style.opacity = '1';
                    jm.classList.remove('jm-explode');
                  }
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
                  const jm = jmRef.current;
                  if (jm) {
                    // 이미지 복원
                    jm.style.opacity = '1';
                    jm.classList.remove('jm-explode');
                  }
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
        <div className="w-full max-w-5xl mx-auto">
          <header className="mb-16 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">머라구여? 정민이를 줄이고 싶다구여??</h1>
            <p className="text-sm text-gray-600 mt-2">숨은 게임 - 클릭을 통해 정민이를 70kg까지 줄여주세요!!</p>
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
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 rounded-lg shadow"
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
          width: 320px;
          max-width: 80%;
          height: auto;
          transition: transform 450ms cubic-bezier(0.2, 0.9, 0.2, 1), filter 450ms ease, opacity 100ms ease;
          transform-origin: center center;
          border-radius: 12px;
          --current-scale: 1;
          --red-intensity: 0;
          filter: hue-rotate(calc(var(--red-intensity) * -30deg)) saturate(calc(1 + var(--red-intensity) * 0.3))
            brightness(calc(1 - var(--red-intensity) * 0.4));
        }

        .jm-slim {
          /* 원본 색감 유지 */
        }

        .jm-fat {
          /* 붉고 어둡게 */
        }

        /* 폭발 애니메이션 - 더 극적으로 */
        @keyframes explode {
          0% {
            transform: scaleX(var(--current-scale)) scaleY(1) rotate(0deg);
            filter: brightness(1) contrast(1);
          }
          25% {
            transform: scaleX(calc(var(--current-scale) * 1.5)) scaleY(1.3) rotate(5deg);
            filter: brightness(3) contrast(2);
          }
          50% {
            transform: scaleX(calc(var(--current-scale) * 2)) scaleY(1.8) rotate(-3deg);
            filter: brightness(5) contrast(3) hue-rotate(180deg);
          }
          100% {
            transform: scaleX(0) scaleY(0) rotate(180deg);
            filter: brightness(0) contrast(0);
            opacity: 0;
          }
        }
        .jm-explode {
          animation: explode 600ms cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }

        /* 이미지 조각 폭발 */
        .image-piece {
          position: absolute;
          background-repeat: no-repeat;
          border-radius: 2px;
          pointer-events: none;
          animation: piece-explode 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        @keyframes piece-explode {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          20% {
            transform: translate(calc(var(--tx) * 0.1), calc(var(--ty) * 0.1)) rotate(calc(var(--rotation) * 0.1))
              scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), calc(var(--ty) + 200px)) rotate(var(--rotation)) scale(0.3);
            opacity: 0;
          }
        }

        /* 폭발 플래시 - 더 강렬하게 */
        .explosion-flash {
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, #ffffff 0%, #ffff00 30%, #ff4500 70%, transparent 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: mega-flash 400ms ease-out forwards;
          z-index: 20;
        }

        @keyframes mega-flash {
          0% {
            width: 80px;
            height: 80px;
            opacity: 1;
            box-shadow: 0 0 50px #ffff00;
          }
          30% {
            width: 300px;
            height: 300px;
            opacity: 0.9;
            box-shadow: 0 0 100px #ff4500;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
            box-shadow: 0 0 200px transparent;
          }
        }

        /* 폭발 링 - 더 선명하게 */
        .explosion-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 6px solid #ff4757;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: super-ring-expand 1000ms ease-out forwards;
          box-shadow: 0 0 30px #ff4757, inset 0 0 30px rgba(255, 71, 87, 0.5);
        }

        @keyframes super-ring-expand {
          0% {
            width: 40px;
            height: 40px;
            opacity: 1;
            border-width: 6px;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
            border-width: 0px;
          }
        }

        /* 폭발 파편 */
        .explosion-fragment {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: fragment-boom 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes fragment-boom {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) + 100px)) scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pop {
          0% {
            transform: scaleX(var(--current-scale)) scaleY(1);
          }
          40% {
            transform: scaleX(calc(var(--current-scale) * 1.1)) scaleY(0.95);
          }
          100% {
            transform: scaleX(var(--current-scale)) scaleY(1);
          }
        }
        .jm-pop {
          animation: pop 420ms cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        @keyframes breathe {
          0% {
            transform: scaleX(var(--current-scale)) translateY(0);
          }
          50% {
            transform: scaleX(var(--current-scale)) translateY(-4px);
          }
          100% {
            transform: scaleX(var(--current-scale)) translateY(0);
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
            width: 240px;
          }
        }
      `}</style>
    </>
  );
}
