import { useEffect, useRef } from 'react'
import { useTaskStore } from '../store/useTaskStore'

const WORK_SECONDS = 25 * 60
const BREAK_SECONDS = 5 * 60

export function useTimer() {
  const { timerState, setTimer, startTimer, pauseTimer, resetTimer } = useTaskStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Tick del timer
  useEffect(() => {
    if (!timerState.isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      useTaskStore.setState((state) => {
        const secondsLeft = state.timerState.secondsLeft - 1

        // Llegó a 0 → cambiar modo y reproducir sonido
        if (secondsLeft <= 0) {
          playAlertSound()
          const nextMode = state.timerState.mode === 'work' ? 'break' : 'work'
          return {
            timerState: {
              ...state.timerState,
              isRunning: false,
              mode: nextMode,
              secondsLeft: nextMode === 'work' ? WORK_SECONDS : BREAK_SECONDS,
            },
          }
        }

        return {
          timerState: { ...state.timerState, secondsLeft },
        }
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [timerState.isRunning])

  // Formatear tiempo MM:SS
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Alerta de sonido con Web Audio API
  const playAlertSound = () => {
    try {
      const ctx = new AudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, ctx.currentTime)
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 1.5)
    } catch {
      console.warn('Audio no disponible')
    }
  }

  const handleStart = () => startTimer()
  const handlePause = () => pauseTimer()
  const handleReset = () => resetTimer()
  const handleSetTask = (taskId: string | null) => setTimer({ taskId })

  return {
    mode: timerState.mode,
    secondsLeft: timerState.secondsLeft,
    isRunning: timerState.isRunning,
    taskId: timerState.taskId,
    timeFormatted: formatTime(timerState.secondsLeft),
    handleStart,
    handlePause,
    handleReset,
    handleSetTask,
  }
}