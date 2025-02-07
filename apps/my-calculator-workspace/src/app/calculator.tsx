import React, { useState } from 'react';
import styled from 'styled-components';

/** --- Styled Components --- **/

const Container = styled.div`
  width: 320px;
  margin: 50px auto;
  background-color: #000;
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  font-family: sans-serif;
`;

const ExpressionDisplay = styled.div`
  text-align: right;
  color: #888;
  padding: 10px;
  font-size: 1rem;
  min-height: 1.2em;
`;

const Display = styled.div`
  background-color: #000;
  color: #fff;
  text-align: right;
  padding: 20px;
  font-size: 2rem;
  border-bottom: 1px solid #333;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  background-color: #000;
`;

interface ButtonProps {
  color?: string;
  wide?: boolean;
}
const Button = styled.button<ButtonProps>`
  background-color: ${({ color }) => color || '#333'};
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  grid-column: ${({ wide }) => (wide ? 'span 2' : 'span 1')};
  &:hover {
    opacity: 0.9;
  }
`;

/** --- Calculator Logic --- **/

export function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [expression, setExpression] = useState<string>('');
  const [freshInput, setFreshInput] = useState<boolean>(true);
  // If true, the next digit typed replaces the currentValue instead of appending.

  // To force errors in the app for e2e testing
  const [bugMode, setBugMode] = useState<boolean>(false);

  // Pressing a number
  const handleNumberClick = (num: string) => {
    setCurrentValue((prev) => {
      // If we're starting fresh (just did an operation or pressed operator),
      // or if the current value is "0," replace it entirely
      if (freshInput || prev === '0') {
        setFreshInput(false);
        return num;
      }
      // Otherwise, append
      return prev + num;
    });
  };

  // Pressing an operator (+, -, ×, ÷)
  const handleOperatorClick = (op: string) => {
    if (operator && previousValue !== null) {
      // We already have an operator: compute a running total first
      const result = computeResult(
        operator,
        parseFloat(previousValue),
        parseFloat(currentValue)
      );
      setPreviousValue(String(result));
      setExpression(`${result} ${op}`);
    } else {
      // No existing operator: store current as previous
      setPreviousValue(currentValue);
      setExpression(`${currentValue} ${op}`);
    }
    // Next digit press starts fresh
    setFreshInput(true);
    // Set the operator, reset currentValue so we display 0
    setOperator(op);
  };

  // Pressing =
  const handleEquals = () => {
    if (!operator || previousValue === null) return;

    const result = computeResult(
      operator,
      parseFloat(previousValue),
      parseFloat(currentValue)
    );
    setCurrentValue(String(result));
    setExpression(`${previousValue} ${operator} ${currentValue} =`);
    setPreviousValue(null);
    setOperator(null);

    // Next digit press starts fresh
    setFreshInput(true);
  };

  // Pressing AC (all clear)
  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setExpression('');
    setFreshInput(true);
  };

  // Toggle sign ±
  const handlePlusMinus = () => {
    setCurrentValue((prev) => {
      if (prev.startsWith('-')) return prev.slice(1);
      if (prev === '0') return '0'; // no effect on "0"
      return '-' + prev;
    });
  };

  // Percentage
  const handlePercent = () => {
    setCurrentValue((prev) => String(parseFloat(prev) / 100));
  };

  // Decimal
  const handleDecimal = () => {
    setCurrentValue((prev) => {
      if (!prev.includes('.')) {
        return prev + '.';
      }
      return prev;
    });
  };

  // Helper to compute result
  const computeResult = (op: string, a: number, b: number) => {
    let result = 0;
    switch (op) {
      case '+':
        result = a + b;
        // ------------------------------------------
        // If bugMode is ON and it's an ADD operation,
        // add 1 more to the result.
        // ------------------------------------------
        if (bugMode) {
          result += 1;
        }
        break;
      case '-':
        result = a - b;
        break;
      case '×':
        result = a * b;
        break;
      case '÷':
        result = b === 0 ? 0 : a / b;
        break;
      default:
        result = b;
    }
    return result;
  };

  return (
    <Container>
      {/* Shows the expression, e.g. "5 + 5 =" */}
      <ExpressionDisplay data-testid="expression">
        {expression}
      </ExpressionDisplay>
      {/* Shows the main number */}
      <Display data-testid="result">{currentValue}</Display>

      <Keypad>
        <Button data-testid="function-ac" color="#a6a6a6" onClick={handleClear}>
          AC
        </Button>

        <Button
          data-testid="function-plus-minus"
          color="#a6a6a6"
          onClick={handlePlusMinus}
        >
          ±
        </Button>

        <Button
          data-testid="function-percent"
          color="#a6a6a6"
          onClick={handlePercent}
        >
          %
        </Button>

        <Button
          data-testid="operator-÷"
          color="#f1a33c"
          onClick={() => handleOperatorClick('÷')}
        >
          ÷
        </Button>

        <Button data-testid="digit-7" onClick={() => handleNumberClick('7')}>
          7
        </Button>

        <Button data-testid="digit-8" onClick={() => handleNumberClick('8')}>
          8
        </Button>

        <Button data-testid="digit-9" onClick={() => handleNumberClick('9')}>
          9
        </Button>

        <Button
          data-testid="operator-×"
          color="#f1a33c"
          onClick={() => handleOperatorClick('×')}
        >
          ×
        </Button>

        <Button data-testid="digit-4" onClick={() => handleNumberClick('4')}>
          4
        </Button>

        <Button data-testid="digit-5" onClick={() => handleNumberClick('5')}>
          5
        </Button>

        <Button data-testid="digit-6" onClick={() => handleNumberClick('6')}>
          6
        </Button>

        <Button
          data-testid="operator--"
          color="#f1a33c"
          onClick={() => handleOperatorClick('-')}
        >
          -
        </Button>

        <Button data-testid="digit-1" onClick={() => handleNumberClick('1')}>
          1
        </Button>

        <Button data-testid="digit-2" onClick={() => handleNumberClick('2')}>
          2
        </Button>

        <Button data-testid="digit-3" onClick={() => handleNumberClick('3')}>
          3
        </Button>

        <Button
          data-testid="operator-+"
          color="#f1a33c"
          onClick={() => handleOperatorClick('+')}
        >
          +
        </Button>

        <Button
          data-testid="digit-0"
          wide
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>

        <Button data-testid="decimal" onClick={handleDecimal}>
          .
        </Button>

        <Button data-testid="operator-=" color="#f1a33c" onClick={handleEquals}>
          =
        </Button>
      </Keypad>
    </Container>
  );
}
