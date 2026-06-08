import { act } from 'react'
import { render, screen } from '@testing-library/react'
import { useTimer } from '../src/hooks/useTimer'
import { useTaskStore } from '../src/store/useTaskStore'

describe('useTimer hook', () => {
  beforeAll(() => {
    globalThis.AudioContext = (class {
      currentTime = 0
      destination = null
      createOscillator() {
        return {
          connect: () => {},
          start: () => {},
          stop: () => {},
          frequency: { setValueAtTime: () => {} },
        }
      }
      createGain() {
        return {
          connect: () => {},
          gain: {
            setValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
          },
        }
      }
    } as unknown) as typeof globalThis.AudioContext
  })

  beforeEach(() => {
    vi.useFakeTimers()
    act(() => {
      useTaskStore.setState({
        timerState: {
          mode: 'work',
          secondsLeft: 25 * 60,
          isRunning: false,
          taskId: null,
        },
      })
    })
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  function renderTimer() {
    function TestComponent() {
      const { mode, secondsLeft, isRunning, timeFormatted, handleStart, handlePause } = useTimer()

      return (
        <>
          <span data-testid="mode">{mode}</span>
          <span data-testid="secondsLeft">{secondsLeft}</span>
          <span data-testid="isRunning">{isRunning ? 'true' : 'false'}</span>
          <span data-testid="timeFormatted">{timeFormatted}</span>
          <button type="button" onClick={handleStart}>start</button>
          <button type="button" onClick={handlePause}>pause</button>
        </>
      )
    }

    render(<TestComponent />)
  }

  it('inicia en 25:00 (1500 segundos) en modo work', () => {
    renderTimer()

    expect(screen.getByTestId('mode').textContent).toBe('work')
    expect(screen.getByTestId('secondsLeft').textContent).toBe('1500')
    expect(screen.getByTestId('timeFormatted').textContent).toBe('25:00')
    expect(screen.getByTestId('isRunning').textContent).toBe('false')
  })

  it('cambia a modo break (5 min) al llegar a 0', () => {
    act(() => {
      useTaskStore.setState({
        timerState: {
          mode: 'work',
          secondsLeft: 1,
          isRunning: false,
          taskId: null,
        },
      })
    })

    act(() => {
      renderTimer()
    })

    act(() => {
      screen.getByRole('button', { name: /start/i }).click()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('mode').textContent).toBe('break')
    expect(screen.getByTestId('secondsLeft').textContent).toBe('300')
    expect(screen.getByTestId('timeFormatted').textContent).toBe('05:00')
    expect(screen.getByTestId('isRunning').textContent).toBe('false')
  })

  it('cambia isRunning correctamente al pausar y reanudar', () => {
    act(() => {
      renderTimer()
    })

    act(() => {
      screen.getByRole('button', { name: /start/i }).click()
    })
    expect(screen.getByTestId('isRunning').textContent).toBe('true')

    act(() => {
      screen.getByRole('button', { name: /pause/i }).click()
    })
    expect(screen.getByTestId('isRunning').textContent).toBe('false')

    act(() => {
      screen.getByRole('button', { name: /start/i }).click()
    })
    expect(screen.getByTestId('isRunning').textContent).toBe('true')
  })
})
