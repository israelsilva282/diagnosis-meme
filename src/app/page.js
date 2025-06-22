'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const randomSuffixes = ['123', '_dope', '_666', '_xd', '_brabo', '_1999', '_007', '_topzera'];
const diagnoses = ['febre', 'gripe', 'ansiedade', 'preguiça', 'tá tudo bem', 'dor de meme', 'falta de wi-fi'];


const getRandomSuffix = () => randomSuffixes[Math.floor(Math.random() * randomSuffixes.length)];
const getRandomNumber = () => Math.floor(Math.random() * 9000 + 1000);

export default function Home() {
  const [input, setInput] = useState('febre');
  const [output, setOutput] = useState('');
  const [altName, setAltName] = useState('');
  const [blockButton, setBlockButton] = useState(true)
  const [count, setCount] = useState(5)

  const handleGenerate = () => {
    if (!input) return;
    const count = getRandomNumber();
    const suffix = getRandomSuffix();
    const generated = `${input}${suffix}`;
    setOutput(`Já existe um usuário ${input}.`);
    setAltName(`Agora você é ${generated} (já existe também 😎)\nVocê é o número ${count} tentando ser ${input} hoje.`);
  };

  useEffect(() => {
    setTimeout(() => {
      setBlockButton(false)
    }, 5000)
  }, [])

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000);
    }
  }, [count])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono p-4">
      <motion.h1
        className="text-5xl mb-8 text-center text-pink-500 drop-shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ repeat: 2, duration: 0.1, ease: 'linear' }}
      >
        Diagnóstico
      </motion.h1>


      <motion.select
        className="px-6 py-3 text-black rounded-full text-lg focus:outline-none focus:ring-4 ring-pink-500 mb-4 w-full max-w-md text-center bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {diagnoses.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </motion.select>

      <motion.div
        className="mt-4 text-center text-lg text-gray-300 whitespace-pre-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {count === 0 ? 'Pode clicar' : `Espere ${count} segundos até poder clicar no botao.`}
      </motion.div>

      <motion.button
        onClick={handleGenerate}
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full font-bold text-white shadow-lg my-24"
        animate={{ rotate: 360 }}
        transition={{ repeat: 10, duration: 0.5, ease: 'linear' }}
        disabled={blockButton}
      >
        Gerar diagnóstico
      </motion.button>

      {output && (
        <motion.div
          className="mt-8 text-center text-xl text-green-400 whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {output}
        </motion.div>
      )}

      {altName && (
        <motion.div
          className="mt-4 text-center text-lg text-gray-300 whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {altName}
        </motion.div>
      )}
    </main>
  );
}
