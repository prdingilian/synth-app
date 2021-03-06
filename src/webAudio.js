const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
audioContext.suspend();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0;
gainNode.connect(audioContext.destination);
const filterNode = audioContext.createBiquadFilter();
filterNode.frequency.value = 10000;
filterNode.type = "lowpass";
filterNode.Q.value = 7;
const delayNode = audioContext.createDelay();
delayNode.delayTime.value = 0.1;
const delayFeedback = audioContext.createGain();
delayFeedback.gain.value = 0.5;
delayNode.connect(delayFeedback);
delayFeedback.connect(delayNode);
delayNode.connect(audioContext.destination);
const oscillators = [];

export function createOsc(id, type) {
  if (findOscIndex(id) === -1) {
    let osc = audioContext.createOscillator();
    osc.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(delayNode);
    osc.frequency.value = 0;
    osc.type = type;
    osc.start();
    oscillators.push({ id: id, osc: osc });
  }
}

export function removeOsc(id) {
  let index = findOscIndex(id);
  if (index !== -1) {
    oscillators[index].osc.disconnect();
    oscillators.splice(index, 1);
  }
}

export function changeOscShape(id, value) {
  let index = findOscIndex(id);
  if (index !== -1) {
    removeOsc(id);
    switch (parseInt(value)) {
      case 0:
        createOsc(id, "sine");
        break;
      case 25:
        createOsc(id, "triangle");
        break;
      case 50:
        createOsc(id, "square");
        break;
      case 75:
        createOsc(id, "sawtooth");
        break;
      default:
        break;
    }
  }
}

export function changeOscDetune(id, value) {
  let index = findOscIndex(id);
  if (index !== -1) {
    oscillators[index].osc.detune.value = value;
  }
}

export function changeOscFrequency(id, value, portamentoTime) {
  if (oscillators[findOscIndex(id)]) {
    oscillators[findOscIndex(id)].osc.frequency.linearRampToValueAtTime(value, audioContext.currentTime + portamentoTime);
    // oscillators[findOscIndex(id)].osc.frequency.value = value;
  }
}

export function createAmp() {
  audioContext.resume();
  gainNode.gain.value = 0.05;
}

export function removeAmp() {
  audioContext.suspend();
  gainNode.gain.value = 0;
}

export function createFilter() {
  filterNode.frequency.value = 4500;
}

export function removeFilter() {
  filterNode.frequency.value = 10000;
}

export function changeFilterFrequency(value) {
  filterNode.frequency.linearRampToValueAtTime(value, audioContext.currentTime + 0.2);
}

export function changeFilterResonance(value) {
  filterNode.Q.value = value;
}

export function changeGain(value) {
  gainNode.gain.value = value / 100;
}

export function changeDelayTime(value) {
  delayNode.delayTime.value = value;
}

export function changeDelayFeedback(value) {
  delayFeedback.gain.value = value;
}

function findOscIndex(id) {
  return oscillators.findIndex((entry) => entry.id === id);
}
