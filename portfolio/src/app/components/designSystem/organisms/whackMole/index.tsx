'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ANIMATION_DURATION, HOLE_COUNT, MAX_MOLES_PER_STEP, TOTAL_STEPS, WAIT_DURATION } from './constants';
import { MoleHole } from './moleHole';
import type { MoleStateType, WhackMoleType } from './types';

const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) {
    return 'LEGENDARY!';
  }

  if (percentage >= 80) {
    return 'EXCELLENT!';
  }

  if (percentage >= 70) {
    return 'GREAT JOB!';
  }

  if (percentage >= 60) {
    return 'GOOD WORK!';
  }

  if (percentage >= 50) {
    return 'NOT BAD!';
  }

  return 'KEEP TRYING!';
};

const generateMoleSequence = (totalSteps: number, totalHoles: number, maxMolesPerStep: number): number[][] => {
  const sequence: number[][] = [];

  for (let stepIndex = 0; stepIndex < totalSteps; stepIndex += 1) {
    const molesInCurrentStep = Math.floor(Math.random() * maxMolesPerStep) + 1;

    const holeIndices = Array.from({ length: totalHoles }, (_, holeIndex) => {
      return holeIndex;
    });

    for (let currentHole = holeIndices.length - 1; currentHole > 0; currentHole -= 1) {
      const randomHole = Math.floor(Math.random() * (currentHole + 1));

      // @ts-expect-error type error
      [holeIndices[currentHole], holeIndices[randomHole]] = [holeIndices[randomHole], holeIndices[currentHole]];
    }

    sequence.push(holeIndices.slice(0, molesInCurrentStep));
  }

  return sequence;
};

const WhackMole: WhackMoleType = () => {
  const [moleState, setMoleState] = useState<MoleStateType>({
    hit: new Set(),
    visible: new Set()
  });

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const stepIndexRef = useRef(0);
  const totalMoleHeadsCount = useRef(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isGameStarted) {
      return;
    }

    const moleSequence = generateMoleSequence(TOTAL_STEPS, HOLE_COUNT, MAX_MOLES_PER_STEP);

    totalMoleHeadsCount.current = moleSequence.reduce((total, step) => {
      return total + step.length;
    }, 0);

    const showMole = (): void => {
      if (stepIndexRef.current >= TOTAL_STEPS) {
        setIsGameStarted(false);

        return;
      }

      const currentStep = moleSequence[stepIndexRef.current] ?? [];

      setMoleState({
        hit: new Set(),
        visible: new Set(currentStep)
      });

      stepIndexRef.current += 1;

      timeoutIdRef.current = setTimeout(() => {
        setMoleState((prev) => {
          return {
            ...prev,
            visible: new Set()
          };
        });

        timeoutIdRef.current = setTimeout(showMole, WAIT_DURATION * 1000);
      }, ANIMATION_DURATION * 1000);
    };

    showMole();

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return (): void => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [isGameStarted]);

  const handleMoleClick = useCallback((index: number): void => {
    setMoleState((prev) => {
      if (prev.hit.has(index)) {
        return prev;
      }

      return {
        hit: new Set([...prev.hit, index]),
        visible: new Set(
          [...prev.visible].filter((idx) => {
            return idx !== index;
          })
        )
      };
    });

    setHitCount((prev) => {
      return prev + 1;
    });
  }, []);

  const handleStartGame = (): void => {
    setIsGameStarted(true);
    setHitCount(0);
    stepIndexRef.current = 0;
    setMoleState({
      hit: new Set(),
      visible: new Set()
    });
  };

  return (
    <div className='bg-primary relative flex items-center justify-center overflow-hidden rounded-lg'>
      {!isGameStarted && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'>
          <div className='font-pixel flex flex-col rounded-lg bg-white p-6 shadow-lg'>
            <div className='mb-4 text-center'>
              {stepIndexRef.current === 0 ? (
                <h2 className='text-lg font-semibold text-amber-700'>WHACK-A-MOLE</h2>
              ) : (
                <>
                  <h2 className='mb-2 text-lg font-semibold text-amber-700'>
                    {getPerformanceMessage(Math.round((hitCount / totalMoleHeadsCount.current) * 100))}
                  </h2>
                  <div className='text-sm text-black'>{`Hits: ${hitCount}/${totalMoleHeadsCount.current}`}</div>
                </>
              )}
            </div>
            <button
              className='button cursor-pointer rounded-lg border-b-[1px] border-amber-700 bg-amber-600 px-5 py-3 [box-shadow:0_10px_0_0_#92400e,0_15px_0_0_#92400e41] transition-all duration-150 select-none active:translate-y-2 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#92400e,0_0px_0_0_#92400e41]'
              onClick={handleStartGame}
              type='button'
            >
              <span className='font-pixel text-sm font-semibold text-white'>START</span>
            </button>
          </div>
        </div>
      )}
      <div className='flex flex-col items-center bg-lime-200 p-4'>
        <div className='font-pixel mb-3 flex w-full items-center justify-between text-xs'>
          <div className='font-semibold text-amber-700'>{`Score: ${hitCount}`}</div>
          <button
            className='cursor-pointer rounded-lg bg-amber-700 px-2 py-1 text-white'
            onClick={() => {
              setIsGameStarted(false);
              setMoleState({
                hit: new Set(),
                visible: new Set()
              });
            }}
            type='button'
          >
            END
          </button>
        </div>
        <div className='grid size-56 grid-cols-3 gap-3'>
          {Array.from({ length: HOLE_COUNT }, (_, index) => {
            return (
              <MoleHole
                index={index}
                isHit={moleState.hit.has(index)}
                isVisible={moleState.visible.has(index)}
                key={index}
                onMoleClick={handleMoleClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { WhackMole };
