import { expect } from '@open-wc/testing';
import { getOrthogonalPath } from '../../../../src/editors/singlelinediagram/ortho-connector.js';

const gridAlloc: (0 | 1)[][] = [
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1],
];
const gridSize = 64;

describe('orthogonal connectors', () => {
  it('chooses the next possible grid node to the start position', () => {
    expect(
      getOrthogonalPath(
        { x: 4 * gridSize, y: 4 * gridSize + gridSize / 2 },
        { x: 4 * gridSize, y: 0 * gridSize + gridSize / 2 },
        gridSize,
        gridAlloc
      )[1]
    ).to.deep.equal({ x: 3.5 * gridSize, y: 3.5 * gridSize });
  });

  it('return empty path for empty grid allocation', () => {
    expect(
      getOrthogonalPath(
        { x: 4 * gridSize, y: 4 * gridSize + gridSize / 2 },
        { x: 4 * gridSize, y: 0 * gridSize + gridSize / 2 },
        gridSize,
        [[]]
      ).length
    ).to.equal(0);
  });

  it('return empty path in case start position is equal to end position', () => {
    expect(
      getOrthogonalPath({ x: 1, y: 1 }, { x: 1, y: 1 }, gridSize, gridAlloc)
        .length
    ).to.equal(0);
  });

  it('return correct values for path S - N', () => {
    const start = {
      x: 0 * gridSize + gridSize / 2,
      y: 0 * gridSize + gridSize,
    };
    const end = { x: 2 * gridSize + gridSize / 2, y: 2 * gridSize };

    expect(getOrthogonalPath(start, end, gridSize, gridAlloc)).to.deep.equal([
      { x: 0.5 * gridSize, y: 1 * gridSize },
      { x: 0.5 * gridSize, y: 1.5 * gridSize },
      { x: 2.5 * gridSize, y: 1.5 * gridSize },
      { x: 2.5 * gridSize, y: 2 * gridSize },
    ]);
  });

  it('return correct values for another path S - W', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize / 2, y: 0 * gridSize + gridSize },
        { x: 2 * gridSize, y: 2 * gridSize + gridSize / 2 },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 0.5 * gridSize, y: 1 * gridSize },
      { x: 0.5 * gridSize, y: 2.5 * gridSize },
      { x: 1.5 * gridSize, y: 2.5 * gridSize },
      { x: 2 * gridSize, y: 2.5 * gridSize },
    ]);
  });

  it('return correct values for another path S - E', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize / 2, y: 0 * gridSize + gridSize },
        { x: 2 * gridSize + gridSize, y: 2 * gridSize + gridSize / 2 },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 0.5 * gridSize, y: 1 * gridSize },
      { x: 0.5 * gridSize, y: 1.5 * gridSize },
      { x: 3.5 * gridSize, y: 1.5 * gridSize },
      { x: 3.5 * gridSize, y: 2.5 * gridSize },
      { x: 3.0 * gridSize, y: 2.5 * gridSize },
    ]);
  });

  it('return correct values for another path S - S', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize / 2, y: 0 * gridSize + gridSize },
        { x: 2 * gridSize + gridSize / 2, y: 2 * gridSize + gridSize },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 0.5 * gridSize, y: 1 * gridSize },
      { x: 0.5 * gridSize, y: 3.5 * gridSize },
      { x: 2.5 * gridSize, y: 3.5 * gridSize },
      { x: 2.5 * gridSize, y: 3 * gridSize },
    ]);
  });

  it('return correct values for another path E-N', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize, y: 0 * gridSize + gridSize / 2 },
        { x: 2 * gridSize + gridSize / 2, y: 2 * gridSize },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 1 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 1.5 * gridSize },
      { x: 2.5 * gridSize, y: 1.5 * gridSize },
      { x: 2.5 * gridSize, y: 2 * gridSize },
    ]);
  });

  it('return correct values for another path E-W', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize, y: 0 * gridSize + gridSize / 2 },
        { x: 2 * gridSize, y: 2 * gridSize + gridSize / 2 },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 1 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 2.5 * gridSize },
      { x: 2 * gridSize, y: 2.5 * gridSize },
    ]);
  });

  it('return correct values for another path E-E', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize, y: 0 * gridSize + gridSize / 2 },
        { x: 2 * gridSize + gridSize, y: 2 * gridSize + gridSize / 2 },
        gridSize,
        gridAlloc
      )
    ).to.deep.equal([
      { x: 1 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 1.5 * gridSize },
      { x: 3.5 * gridSize, y: 1.5 * gridSize },
      { x: 3.5 * gridSize, y: 2.5 * gridSize },
      { x: 3 * gridSize, y: 2.5 * gridSize },
    ]);
  });

  it('finds shortest path with missing grid', () => {
    expect(
      getOrthogonalPath(
        { x: 0 * gridSize + gridSize - 1, y: 0 * gridSize + gridSize / 2 },
        { x: 2 * gridSize + gridSize / 2, y: 2 * gridSize },
        gridSize
      )
    ).to.deep.equal([
      { x: 1 * gridSize - 1, y: 0.5 * gridSize },
      { x: 2.5 * gridSize, y: 0.5 * gridSize },
      { x: 2.5 * gridSize, y: 1.5 * gridSize },
      { x: 2.5 * gridSize, y: 2 * gridSize },
    ]);
  });

  it('makes sure initial grid allocation is correct', () => {
    expect(
      getOrthogonalPath(
        { x: 2 * gridSize + gridSize / 2, y: 2 * gridSize },
        { x: 0 * gridSize + gridSize - 1, y: 0 * gridSize + gridSize / 2 },
        gridSize
      )
    ).to.deep.equal([
      { x: 2.5 * gridSize, y: 2 * gridSize },
      { x: 2.5 * gridSize, y: 0.5 * gridSize },
      { x: 1.5 * gridSize, y: 0.5 * gridSize },
      { x: 1 * gridSize - 1, y: 0.5 * gridSize },
    ]);
  });
});
