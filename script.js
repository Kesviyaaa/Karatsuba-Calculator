class Karatsuba {
  /** Function to multiply two numbers **/
  multiply(x, y) {
    const size1 = this.getSize(x);
    const size2 = this.getSize(y);
    /** Maximum of lengths of number **/
    let N = Math.max(size1, size2);

    /** for small values directly multiply **/
    if (N < 10) return x * y;

    /** max length divided, rounded up **/
    N = Math.floor(N / 2) + (N % 2);

    /** multiplier **/
    const m = Math.pow(10, N);

    /** compute sub expressions **/
    const b = Math.floor(x / m);
    const a = x - (b * m);
    const d = Math.floor(y / m);
    const c = y - (d * m);

    /** compute sub expressions **/
    const z0 = this.multiply(a, c);
    const z1 = this.multiply(a + b, c + d);
    const z2 = this.multiply(b, d);

    return z0 + ((z1 - z0 - z2) * m) + (z2 * Math.pow(10, 2 * N));
  }

  /** Function to calculate length or number of digits in a number **/
  getSize(num) {
    let ctr = 0;
    while (num !== 0) {
      ctr++;
      num = Math.floor(num / 10);
    }
    return ctr;
  }
}

let currentInput = ''; // Used to store the input numbers
let isSecondNumber = false; // Flag to check if we are inputting the second number

// Append numbers to the input fields
function appendNumber(number) {
  if (currentInput.length < 10) {
    currentInput += number.toString();
    updateDisplay();
  }
}

// Update the input field based on which one is being edited
function updateDisplay() {
  const num1Field = document.getElementById('num1');
  const num2Field = document.getElementById('num2');

  if (!isSecondNumber) {
    num1Field.value = currentInput;
  } else {
    num2Field.value = currentInput;
  }

  // Show the second number input field when the first number is entered
  if (num1Field.value.length > 0) {
    num2Field.style.display = "inline-block"; // Make num2 visible after num1 is filled
  }
}

// Clear the current input
function clearInput() {
  currentInput = '';
  isSecondNumber = false;
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('result').classList.remove('error');
  document.getElementById('num2').style.display = "none"; // Hide second number input initially
}

// Perform the multiplication using Karatsuba algorithm
function calculateProduct() {
  const num1 = parseInt(document.getElementById('num1').value);
  const num2 = parseInt(document.getElementById('num2').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.innerHTML = 'Please enter valid numbers.';
    resultDiv.classList.add('error');
  } else {
    const karatsuba = new Karatsuba();
    const product = karatsuba.multiply(num1, num2);
    resultDiv.innerHTML = `Product: ${product}`;
    resultDiv.classList.remove('error');
  }
}
