var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    decimalBtn = document.getElementById('decimal'),
    display = document.getElementById('display'),
    sqrtButton = document.getElementById('sqrt'),
    moduleButton = document.getElementById('module'),

    MemoryCurrentNumber = 0,
    MemoryNewNumber = false, // флаг, который будет обозначать ввели мы новое число или нет
    MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function(e) {
    numberPress(e.target.textContent);
  })
};

for (let i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {
    operationPress(e.target.textContent);
  })
};

for (let i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e){
    clear(e.srcElement.id);
  })
};

decimalBtn.addEventListener('click', decimal);

sqrtButton.addEventListener('click', square);

moduleButton.addEventListener('click', module)

function numberPress (number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    };
  };
};

function operationPress (op) {

  let localOperationMemory = display.value; // локальная переменная памяти, в которую сохраняется введенное число в момент, когда вводится операция =-+/

  if (MemoryNewNumber && MemoryPendingOperation !== "=") { // когда MemoryNewNumber уже true
    display.value = MemoryCurrentNumber; // тогда бери значение из дисплея и вбивай его в переменную памяти текущего числа
  }  else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber = Math.round((MemoryCurrentNumber + parseFloat(localOperationMemory))*1000000)/1000000;
    }
    else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber = Math.round((MemoryCurrentNumber - parseFloat(localOperationMemory))*1000000)/1000000;
    }
    else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber = Math.round((MemoryCurrentNumber * parseFloat(localOperationMemory))*1000000)/1000000;
    }
    else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber = Math.round((MemoryCurrentNumber / parseFloat(localOperationMemory))*1000000)/1000000;
    }
    else if (MemoryPendingOperation === 'Xy') {
      if (MemoryCurrentNumber < 0) {
        MemoryCurrentNumber*= -1;
        MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
        MemoryCurrentNumber*= -1;
      } else {
        MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
      }
    }
    else if (MemoryPendingOperation === '%') {
      MemoryCurrentNumber = Math.round((MemoryCurrentNumber / 100 * (parseFloat(localOperationMemory)))*1000000)/1000000;
    }
    else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    };

    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  };
};

function decimal (argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.' === -1)) { // проверяем существует ли точка в строке (если ее нет, значение равно -1)
      localDecimalMemory += '.';
    };
  };

  display.value = localDecimalMemory;

};

function clear (id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
};

function square() {
  var localSquareMemory = display.value;
  if (localSquareMemory < 0) {
      MemoryCurrentNumber = 'Error';
  } else {
      MemoryCurrentNumber = Math.sqrt(parseFloat(localSquareMemory));
  }
  display.value = MemoryCurrentNumber;
  MemoryNewNumber = false;
};

function module() {
  var localModuleMemory = display.value;
  localModuleMemory = -localModuleMemory;
  display.value = localModuleMemory;
};



