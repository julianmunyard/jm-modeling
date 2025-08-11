'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect, useCallback } from 'react';

type Shot = { src: string; alt?: string };

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showContact, setShowContact] = useState(false);
  
  const shots: Shot[] = useMemo(
    () => [
      { src: '/jm-mike/1I4A0111.jpg', alt: 'Look 1' },
      { src: '/jm-mike/1I4A0211.jpg', alt: 'Look 2' },
      { src: '/jm-mike/1I4A0271.jpg', alt: 'Look 3' },
      { src: '/jm-mike/1I4A0303.jpg', alt: 'Look 4' },
      { src: '/jm-mike/1I4A0363.jpg', alt: 'Look 5' },
      { src: '/jm-mike/1I4A0453.jpg', alt: 'Look 6' },
      { src: '/jm-mike/1I4A0507.jpg', alt: 'Look 7' },
      { src: '/jm-mike/1I4A0925.jpg', alt: 'Look 8' },
      { src: '/jm-mike/1I4A9779.jpg', alt: 'Look 9' },
      { src: '/jm-mike/1I4A0088.jpg', alt: 'Look 10' },
      { src: '/jm-mike/1I4A0103.jpg', alt: 'Look 11' },
      { src: '/jm-mike/000014720036.jpg', alt: 'Look 12' },
      { src: '/jm-mike/1I4A2488.JPG', alt: 'Look 13' },
      { src: '/jm-mike/DSCF2961.JPG', alt: 'Look 14' },
      { src: '/jm-mike/DSCF3008.JPG', alt: 'Look 15' },
      { src: '/jm-mike/IMG_0519.PNG', alt: 'Look 16' },
      { src: '/jm-mike/IMG_20250324_0006.JPG', alt: 'Look 18' },
      { src: '/jm-mike/R0000797 2.jpg', alt: 'Look 19' },
      { src: '/jm-mike/R0000818 2.jpg', alt: 'Look 20' },
      { src: '/jm-mike/test for texture adder 2.PNG', alt: 'Look 21' },
    ],
    []
  );

  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? shots.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex, shots.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === shots.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex, shots.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevious, handleNext, handleClose]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  return (
    <>
      <main>
        <header className="hero">
          <h1>julian munyard</h1>
          <h2>modeling</h2>
          <div style={{ position: 'relative', marginTop: '12px' }}>
            <button 
              onClick={() => setShowContact(!showContact)}
              style={{
                background: 'none',
                border: '1px solid #000',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#000';
              }}
            >
              contact ↓
            </button>
            {showContact && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                background: '#fff',
                border: '1px solid #000',
                borderRadius: '4px',
                padding: '12px',
                minWidth: '200px',
                zIndex: 100,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <a 
                  href="https://www.instagram.com/julianmunyard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    color: '#000',
                    textDecoration: 'none',
                    padding: '4px 0',
                    fontSize: '14px',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  instagram 
                </a>
                <a 
                  href="mailto:julian.munyard@gmail.com"
                  style={{
                    display: 'block',
                    color: '#000',
                    textDecoration: 'none',
                    padding: '4px 0',
                    fontSize: '14px',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  julian.munyard@gmail.com
                </a>
              </div>
            )}
          </div>
        </header>

        <section className="grid">
          {shots.map((s, i) => (
            <figure 
              key={i} 
              className="card"
              onClick={() => setSelectedIndex(i)}
            >
              <div className="image-wrapper">
                <Image
                  src={s.src}
                  alt={s.alt ?? `look ${i + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={i < 3}
                />
              </div>
            </figure>
          ))}
        </section>

        <footer className="foot">
          © {new Date().getFullYear()} julian munyard
        </footer>
      </main>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="lightbox" onClick={handleClose}>
          <button 
            className="lightbox-close" 
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
          
          <button 
            className="lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          
          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shots[selectedIndex].src}
              alt={shots[selectedIndex].alt ?? `look ${selectedIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          
          <button 
            className="lightbox-next" 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next"
          >
            ›
          </button>
          
          <div className="lightbox-counter">
            {selectedIndex + 1} / {shots.length}
          </div>
        </div>
      )}
    </>
  );
}