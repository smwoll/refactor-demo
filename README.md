# Refactoring Demo

This is a simple refactoring demo for a team presentation.

## Subdirectories

- `tangled`: Contains the demo "messy" functional app.
- `cleaned-functional`: Contains the refactored app in a functional approach.
- `cleaned-oop`: Contains the refactored app in an object-oriented approach.

## Pens

- [Tangled Example](https://codepen.io/smwoll/pen/GgKOmLO)
- [Cleaned Up Functional Example](https://codepen.io/smwoll/pen/wBwPeEb)
- [Cleaned Up OOP Example](https://codepen.io/smwoll/pen/MYgOvoo)

## State Data

The app's state data is a JSON file fetched from GH for the examples. This is intended to make all the code easy to copy into a codepen for examples and easy distribution.

## Install and Run

This is a vite app, see [Vite - Getting Started](https://vite.dev/guide/) for more info. In any of the example directories:

```bash
npm install
npm run dev
```

## Exercise

### Assumptions / Requirements

1. We have to fetch the states data
2. We must reset the app state/selections when toggling between “modes”

### Possible improvements

1. Fix memory leaks
2. Clean up functions
   1. Make functions more pure - they do one thing, cleaner code
3. Reduce setup, only set up states once as needed
   1. Store commonly used elements in vars
4. Lift up state
   1. Use vars for state
   2. Use a higher level data attribute to track state, can style from that vs updating and toggling classes per element
5. Use event delegation, reducing the number of event listeners

### Questions to Ask

1. What are the steps in the application? What is the "order of events?"
2. What state are we concerned with?
3. Are there ways we can "do less?" Anything that can be set up or done once rather than multiple times?
4. Can any logic be unified or simplified?
5. Are there any memory leaks? Are there opportunities to clean up after ourselves or reduce event listener usage?
