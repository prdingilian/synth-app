const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0;
gainNode.connect(audioContext.destination);
const filterNode = audioContext.createBiquadFilter();
filterNode.frequency.value = 10000;
filterNode.type = "lowpass";
filterNode.Q.value = 7;
const oscillators = [];

export let createOsc = (id, type) => {
  if (findOscIndex(id) === -1) {
    let osc = audioContext.createOscillator();
    osc.connect(filterNode);
    filterNode.connect(gainNode);
    osc.frequency.value = 444;
    osc.type = type;
    osc.start();
    oscillators.push({ id: id, osc: osc });
  }
};

export let removeOsc = (id) => {
  let index = findOscIndex(id);
  if (index !== -1) {
    oscillators[index].osc.disconnect();
    oscillators.splice(index, 1);
  }
};

export let changeOscShape = (id, value) => {
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
};

export let changeOscDetune = (id, value) => {
  let index = findOscIndex(id);
  if (index !== -1) {
    oscillators[index].osc.detune.value = value;
  }
};

export let changeOscFrequency = (id, value) => {
  if (oscillators[findOscIndex(id)]) {
    oscillators[findOscIndex(id)].osc.frequency.value = value;
  }
};

export let createAmp = () => {
  gainNode.gain.value = 0.1;
};

export let removeAmp = () => {
  gainNode.gain.value = 0;
};

export let createFilter = () => {
  filterNode.frequency.value = 4500;
};

export let removeFilter = () => {
  filterNode.frequency.value = 10000;
};

export let changeFilterFrequency = (value) => {
  filterNode.frequency.value = value;
};

export let changeFilterResonance = (value) => {
  filterNode.Q.value = value;
};

export let changeGain = (value) => (gainNode.gain.value = value / 100);

let findOscIndex = (id) => oscillators.findIndex((entry) => entry.id === id);
