<h1 align="center">
  <span style="font-size: 100px;">🧩</span>
  <br>
  <br>
  Hitori
</h1>

<h4 align="center">A Hitori puzzle solver</h4>

<p align="center">
  <a href="https://travis-ci.org/sondregj/hitori">
    <img alt="Travis Build Status" src="https://img.shields.io/travis/sondregj/hitori.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/hitori">
  	<img alt="npm (latest)" src="https://img.shields.io/npm/v/hitori/latest.svg?style=flat-square">
  </a>

  <a href="https://npmjs.com/hitori">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/hitori.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/hitori">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/sondregj/hitori.svg?style=flat-square">
  </a>

  <a href="https://github.com/sondregj/hitori">
    <img alt="License" src="https://img.shields.io/github/license/sondregj/hitori.svg?style=flat-square">
  </a>

  <a href="https://github.com/carloscuesta/gitmoji">
  <img alt="Gitmoji" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square">
  </a>
</p>

A simple Hitori solver, implemented with TypeScript.

## Progress

- [x] Models
- [x] Solver
- [x] Tests
- [ ] Documentation

## Usage

```javascript
import { HitoriBoard, solve } from 'hitori'

const board = HitoriBoard.from2DArray([
    [1, 4, 2, 5, 3],
    [4, 3, 1, 4, 6],
    [3, 5, 5, 3, 5],
    [4, 2, 4, 6, 1],
    [6, 4, 2, 1, 2],
])

const solved = solve({ board })
```

## License

MIT © 2019 Sondre Gjellestad
