# calculator

## The Odin Project - JS Foundation Final Project

LIVE SITE [HERE](https://hello-damiro.github.io/calculator)

In compliance with the Odin Project JS foundation course. Took roughly 3 days to complete. _Completed March 29 2023._

**Day 1:** Prepared environment and initial files. Design and conceptualize calculator on figma. Struggled with key press effect with CSS grid. Started with JS and designed pseudo code.

**Day 2:** Struggled with the algorithm. Learned that one should focus on the challenge at hand and do not complicate things.

**Day 3:** Eureka moment on JS. Sequence of code execution is primal. Should learn how to design better procedural pseudos. Deleted unused assets and finalized layout.

</br>

## Screeshot

![Screenshot](https://github.com/hello-damiro/calculator/blob/main/assets/screenshot.png?raw=true)

</br>

## Pseudo Code

1. Capture key presses and put it on array `pressedKeysArray`
2. Process `pressedKeysArray` and reiterate through array and combine integers and seperate it with the operands in between integers, put this into a new array `equationArray`
3. When user press `=`, calculate variables from `equationArray`

</br>

## Project Instructions

1. Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console. _add, subtract, multiply, divide_
2. A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.
3. Create a new function operate that takes an `operator` and 2 numbers and then calls one of the above functions on the numbers.
4. Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
    - Do not worry about wiring up the JS just yet.
    - There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.
    - Add a “clear” button.
5. Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.
6. Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then `operate()` on them when the user presses the “=” key.
    - You should already have the code that can populate the display, so once `operate()` has been called, update the display with the ‘solution’ to the operation.
    - This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
7. Gotchas: watch out for and fix these bugs if they show up in your code:
    - Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, `12 + 7 - 5 * 3 =` should yield `42`.
    - **Your calculator should not evaluate more than a single pair of numbers at a time.** Example: you press a number button (`12`), followed by an operator button (`+`), a second number button (`7`), and finally a second operator button (`-`). Your calculator should then do the following: first, evaluate the first pair of numbers (`12 + 7`), second, display the result of that calculation (`19`), and finally, use that result (`19`) as the first number in your new calculation, along with the next operator (`-`).
    - You should round answers with long decimals so that they don’t overflow the screen.
    - Pressing `=` before entering all of the numbers or an operator could cause problems!
    - Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
    - Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

## Extra Credit

-   Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a `.` button and let users input decimals! Make sure you don’t let them type more than one though: `12.3.56.5`. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
-   Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons
-   Add a “backspace” button, so the user can undo if they click the wrong number.
-   Add keyboard support! You might run into an issue where keys such as (`/`) might cause you some trouble. Read the [MDN documentation for event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to help solve this problem.
