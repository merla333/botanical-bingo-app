'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const plantSquares = [
  'Moss growing on a street sign',
  'Dandelion bursting through concrete',
  "St Johns wort in an alley",
  'Licorice fern in a tree crevice',
  'Camassia blooming near a bus stop',
  'Plantain between bricks',
  'Volunteer sunflower near a mailbox',
  'English ivy climbing a fence',
  'Oxalis in a sidewalk crack',
  'Tree roots busting pavement',
  'Pothos in a cafe window',
  'Free space 🍃',
  'Sword fern near a dumpster',
  'Lichen on a telephone pole',
  'Laurel hedge swallowing a sign',
  'Grasses pushing up a curb',
  'Red clover by a bike rack',
  'Mushroom in a mulch pile',
  'Rose bush in a neglected lot',
  'Creeping Jenny spilling from a pot',
  'Urban wildflower mix',
  'Mimosa tree leaf litter',
  'Overwatered succulent at work',
  'Monstera print in public space'
];

const getSavedState = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bingoState');
    return saved ? JSON.parse(saved) : [12]; // Always pre-select free space
  }
  return [12];
};

const saveState = (state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bingoState', JSON.stringify(state));
  }
};

const checkBingo = (selected) => {
  const winPatterns = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];
  return winPatterns.some((pattern) => pattern.every((i) => selected.includes(i)));
};

export default function Bingo() {
  const [selected, setSelected] = useState(getSavedState);
  const [won, setWon] = useState(false);

  useEffect(() => {
    saveState(selected);
    setWon(checkBingo(selected));
  }, [selected]);

  const toggleCell = (index) => {
    if (index === 12) return; // Free space always marked
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-4 font-sans">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-6 leading-tight">
        🌿 Portland Plantcore Bingo 🌿
      </h1>
      <div className="grid grid-cols-5 gap-1 md:gap-2 max-w-xs md:max-w-xl mx-auto">
        {plantSquares.map((item, index) => (
          <Card
            key={index}
            onClick={() => toggleCell(index)}
            className={`text-center p-1 md:p-2 cursor-pointer rounded-xl transition-all duration-200 text-xs md:text-sm ${
              selected.includes(index)
                ? 'bg-green-300 border-green-600'
                : 'bg-white border-gray-300'
            } ${index === 12 ? 'font-bold' : ''}`}
          >
            <CardContent className="h-16 md:h-20 flex items-center justify-center text-center">
              {item}
            </CardContent>
          </Card>
        ))}
      </div>

      {won && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-950 bg-opacity-90 text-white text-xl md:text-2xl font-bold text-center p-4">
          {"Youre one botanical bitch! 🍃"}
        </div>
      )}

      <div className="flex justify-center mt-4 md:mt-6">
        <Button variant="outline" onClick={() => setSelected([12])}>
          Reset Card
        </Button>
      </div>
    </div>
  );
}
