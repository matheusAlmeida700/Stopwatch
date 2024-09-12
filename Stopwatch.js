class Stopwatch {
  //não precisa colocar constructor pois nesse caso não é preciso de nenhuma informação do usuário;
  //porém, ele irá automaticamente criar um constructor padrão;

  //# torna o membro privado, ou seja, ele só pode ser acessado dentro
  //da classe;
  #elapsedTimeInSeconds = 0;
  #intervalId = null;

  start(callback = () => {}) {
    //ação que vai ocorrer periodicamente, no caso, a cada 1000 milisegundos;
    //intervalId vai recuperar a contagem pelo id do setInterval;
    this.#intervalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback();
    }, 1000);
  }

  stop(callback = () => {}) {
    clearInterval(this.#intervalId);
    callback();
  }

  reset(callback = () => {}) {
    this.#elapsedTimeInSeconds = 0;
    callback();
  }

  //simplesmente pega e entrega a informação desejada da forma definida;
  get elapsedTime() {
    return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
  }

  //static = método da classe em si, e não mais do objeto, então usamos "Stopwatch.formatTime" em vez de "this.formatTime";
  static formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    //retorna só o que existe antes da vírgula;
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    //o que não foi suficiente para completar as horas;
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes,
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmoundDigits = 2) {
    let stringNumber = String(originalNumber);
    const zerosRequired = desiredAmoundDigits - stringNumber.length;
    if (zerosRequired <= 0) {
      return stringNumber;
    }

    for (let counter = 0; counter < zerosRequired; counter++) {
      stringNumber = `0${stringNumber}`;
    }

    return stringNumber;
  }
}

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const stopwatchDisplay = document.getElementById("stopwatch-display");

function updateDisplay() {
  //innerText = texto que existe dentro do interior do display;
  stopwatchDisplay.innerText = sw1.elapsedTime;
}

const sw1 = new Stopwatch();

startButton.addEventListener("click", () => {
  sw1.start(updateDisplay);
});

stopButton.addEventListener("click", () => {
  sw1.stop();
});

resetButton.addEventListener("click", () => {
  sw1.reset(updateDisplay);
});
