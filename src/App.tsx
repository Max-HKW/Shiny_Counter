/**
 * Node modules
 */
import { useEffect } from "react";

/**
 * Styles
 */
import "./App.css";

/**
 * Hooks
 */
import useCounter from "./hooks/useCounter";

/**
 * Assets
 */
import { RotateCcw } from "lucide-react";

function App() {
  const { counterValue, decrement, increment, reset } = useCounter();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "i") {
        increment();
      }

      if (event.key === "d") {
        decrement();
      }

      if (event.key === "r") {
        reset();
      }
    };
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="counter__container">
      <div className="counter__header">
        <h1>Shiny Count</h1>
      </div>
      <div className="counter__subtitle">Dark Shiny Hunter</div>

      <div className="counter__value">{counterValue}</div>
      <div className="counter__divider"></div>

      <div className="counter__actions">
        <button onClick={decrement} aria-label="Decrementa">
          <span className="counter__minus"></span>
        </button>

        <button className="counter__reset" onClick={reset} aria-label="Reset">
          <RotateCcw />
        </button>

        <button onClick={increment} aria-label="Incrementa">
          <span className="counter__plus--horizontal"></span>
          <span className="counter__plus--vertical"></span>
        </button>
      </div>
    </div>
  );
}

export default App;
