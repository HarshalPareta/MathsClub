/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Circle, RotateCcw, Users, Cpu, Trophy, Hash } from 'lucide-react';

type Player = 'X' | 'O';
type SquareValue = Player | null;
type GameMode = 'PvP' | 'PvC';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function App() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<GameMode>('PvC');
  const [winner, setWinner] = useState<SquareValue | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const calculateWinner = useCallback((squares: SquareValue[]) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    if (squares.every(square => square !== null)) {
      return { winner: 'Draw' as const, line: null };
    }
    return null;
  }, []);

  const handleSquareClick = useCallback((index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      
      if (result.winner === 'X') setScores(s => ({ ...s, X: s.X + 1 }));
      else if (result.winner === 'O') setScores(s => ({ ...s, O: s.O + 1 }));
      else setScores(s => ({ ...s, Draws: s.Draws + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  }, [board, winner, isXNext, calculateWinner]);

  // CPU Move Logic
  useEffect(() => {
    if (gameMode === 'PvC' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const availableIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        if (availableIndices.length > 0) {
          // Simple random move for "no AI agent" feel
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          handleSquareClick(randomIndex);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameMode, isXNext, winner, board, handleSquareClick]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const toggleMode = () => {
    setGameMode(prev => prev === 'PvP' ? 'PvC' : 'PvP');
    setScores({ X: 0, O: 0, Draws: 0 });
    resetGame();
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-orange-100 p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Hash className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic font-display">
            Tic Tac Toe <span className="text-orange-500">Neo</span>
          </h1>
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-40">Minimalist Strategy</p>
      </motion.div>

      <div className="w-full max-w-md space-y-8">
        {/* Game Stats & Mode Selection */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={toggleMode}
              className="group flex items-center gap-2 bg-white border-2 border-[#1c1917] px-4 py-2 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              {gameMode === 'PvP' ? <Users className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
              <span>{gameMode} Mode</span>
            </button>

            <button 
              onClick={resetGame}
              className="flex items-center gap-2 bg-orange-500 text-white border-2 border-[#1c1917] px-4 py-2 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ScoreCard label="Player X" value={scores.X} color="bg-orange-50" borderColor="border-orange-200" />
            <ScoreCard label="Draws" value={scores.Draws} color="bg-stone-50" borderColor="border-stone-200" />
            <ScoreCard label={gameMode === 'PvC' ? "CPU O" : "Player O"} value={scores.O} color="bg-blue-50" borderColor="border-blue-200" />
          </div>
        </div>

        {/* Board Container */}
        <div className="relative aspect-square">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-3 grid-rows-3 gap-4 h-full"
          >
            {board.map((square, i) => (
              <motion.button
                key={i}
                id={`square-${i}`}
                whileHover={{ scale: square || winner ? 1 : 1.02 }}
                whileTap={{ scale: square || winner ? 1 : 0.95 }}
                onClick={() => handleSquareClick(i)}
                className={`
                  relative flex items-center justify-center rounded-2xl border-2 transition-colors
                  ${square ? 'bg-white cursor-default' : 'bg-white/50 hover:bg-white cursor-pointer'}
                  ${winningLine?.includes(i) ? 'border-orange-500 bg-orange-50' : 'border-[#1c1917]'}
                  shadow-[6px_6px_0px_0px_rgba(28,25,23,1)]
                `}
              >
                <AnimatePresence mode="wait">
                  {square === 'X' && (
                    <motion.div
                      key="x"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      className="text-orange-500"
                    >
                      <X className="w-12 h-12 md:w-16 md:h-16 stroke-[3]" />
                    </motion.div>
                  )}
                  {square === 'O' && (
                    <motion.div
                      key="o"
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -45 }}
                      className="text-blue-500"
                    >
                      <Circle className="w-10 h-10 md:w-14 md:h-14 stroke-[3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>

          {/* Winner Overlay */}
          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-10 flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.5, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-white border-4 border-[#1c1917] p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(28,25,23,1)] text-center w-full"
                >
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                  <h2 className="text-3xl font-black mb-2 italic">
                    {winner === 'Draw' ? "IT'S A DRAW!" : `${winner} WINS!`}
                  </h2>
                  <p className="text-stone-500 font-medium mb-6">
                    {winner === 'Draw' ? "Great minds think alike." : `${winner === 'X' ? (gameMode === 'PvC' ? 'Humanity' : 'Player X') : (gameMode === 'PvC' ? 'The Machine' : 'Player O')} takes the crown.`}
                  </p>
                  <button 
                    onClick={resetGame}
                    className="w-full bg-[#1c1917] text-white py-4 rounded-2xl font-black text-xl hover:bg-stone-800 transition-colors"
                  >
                    PLAY AGAIN
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Turn Indicator */}
        {!winner && (
          <div className="flex items-center justify-center gap-4">
            <div className={`
              flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1c1917] transition-all
              ${isXNext ? 'bg-orange-500 text-white shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] scale-110' : 'bg-white opacity-40'}
            `}>
              <X className="w-5 h-5 stroke-[3]" />
              <span className="font-bold">Player X</span>
            </div>
            <div className={`
              flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1c1917] transition-all
              ${!isXNext ? 'bg-blue-500 text-white shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] scale-110' : 'bg-white opacity-40'}
            `}>
              <Circle className="w-4 h-4 stroke-[3]" />
              <span className="font-bold">{gameMode === 'PvC' ? 'CPU O' : 'Player O'}</span>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-16 text-stone-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 Neo Strategy Labs
      </footer>
    </div>
  );
}

function ScoreCard({ label, value, color, borderColor }: { label: string, value: number, color: string, borderColor: string }) {
  return (
    <div className={`${color} border-2 ${borderColor} p-3 rounded-2xl text-center`}>
      <p className="text-[10px] uppercase tracking-wider font-bold opacity-50 mb-1">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}

