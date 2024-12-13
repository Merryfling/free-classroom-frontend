export const getFreeTimeSlots = (occupiedSlots: number[][]) => {
  const allSlots = Array.from({ length: 12 }, (_, i) => i + 1);
  const occupied = new Set();
  
  occupiedSlots.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      occupied.add(i);
    }
  });

  const freeSlots = [];
  let currentSlot: number[] = [];

  allSlots.forEach(slot => {
    if (!occupied.has(slot)) {
      if (currentSlot.length === 0) {
        currentSlot = [slot];
      } else if (currentSlot[currentSlot.length - 1] === slot - 1) {
        currentSlot.push(slot);
      } else {
        freeSlots.push([currentSlot[0], currentSlot[currentSlot.length - 1]]);
        currentSlot = [slot];
      }
    } else if (currentSlot.length > 0) {
      freeSlots.push([currentSlot[0], currentSlot[currentSlot.length - 1]]);
      currentSlot = [];
    }
  });

  if (currentSlot.length > 0) {
    freeSlots.push([currentSlot[0], currentSlot[currentSlot.length - 1]]);
  }

  return freeSlots;
};

export const checkForLongFreeSlot = (freeSlots: number[][]) => {
  return freeSlots.some(([start, end]) => {
    const slotLength = end - start + 1;
    return slotLength >= 4;
  });
};