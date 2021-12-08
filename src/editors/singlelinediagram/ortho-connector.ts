interface Point {
  x: number;
  y: number;
}

interface Adjacent {
  point: Point;
  edgeWeight: number;
}

interface GraphNode {
  point: Point;
  adjacent: Adjacent[];
  dist: number;
  path: Point[];
}

function distance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function isChangedDirection(a: GraphNode, b: GraphNode): boolean {
  if (a.path.length === 0) return false;

  const commingX2 = a.point.x;
  const commingX1 = a.path[a.path.length - 1].x;
  const commingHorizontal = commingX2 - commingX1 ? false : true;

  const goingHorizontal = a.point.x - b.point.x ? false : true;

  return commingHorizontal !== goingHorizontal;
}

function filterUnchangedDirection(path: Point[]): Point[] {
  return path.filter((p, i, v) => {
    if (i === 0 || i === v.length - 1) return true;

    const commingDirection =
      v[i].x - v[i - 1].x !== 0 ? 'horizontal' : 'vertical';
    const goingDirection =
      v[i + 1].x - v[i].x !== 0 ? 'horizontal' : 'vertical';

    return commingDirection === goingDirection ? false : true;
  });
}

function calculateMinimumDistance(
  adjacent: GraphNode,
  edgeWeigh: number,
  parentNode: GraphNode
) {
  const sourceDistance = parentNode.dist;

  const changingDirection = isChangedDirection(parentNode, adjacent);
  const extraWeigh = changingDirection ? Math.pow(edgeWeigh + 1, 2) : 0;

  if (sourceDistance + edgeWeigh + extraWeigh < adjacent.dist) {
    adjacent.dist = sourceDistance + edgeWeigh + extraWeigh;
    const shortestPath: Point[] = [...parentNode.path];
    shortestPath.push(parentNode.point);
    adjacent.path = shortestPath;
  }
}

function getLowestDistanceGraphNode(
  unsettledNodes: Set<GraphNode>
): GraphNode | null {
  let lowestDistance = Number.MAX_SAFE_INTEGER;
  let lowestDistanceNode: GraphNode | null = null;

  for (const node of unsettledNodes)
    if (node.dist < lowestDistance) {
      lowestDistance = node.dist;
      lowestDistanceNode = node;
    }

  return lowestDistanceNode;
}

function dijkstra(graph: GraphNode[], start: GraphNode): Point[] {
  start.dist = 0;

  const settledNodes: Set<GraphNode> = new Set();
  const unsettledNodes: Set<GraphNode> = new Set();

  unsettledNodes.add(start);

  while (unsettledNodes.size != 0) {
    const currentNode = getLowestDistanceGraphNode(unsettledNodes)!;
    unsettledNodes.delete(currentNode);

    for (const adjacent of currentNode.adjacent) {
      const adjacentNode = graph.find(
        node =>
          node.point.x === adjacent.point.x && node.point.y === adjacent.point.y
      );
      const edgeWeight = adjacent.edgeWeight;
      if (adjacentNode && !settledNodes.has(adjacentNode)) {
        calculateMinimumDistance(adjacentNode, edgeWeight, currentNode);
        unsettledNodes.add(adjacentNode);
      }
    }
    settledNodes.add(currentNode);
  }

  return [];
}

function findClosestGraphNode(
  graph: GraphNode[],
  point: Point
): GraphNode | undefined {
  const distFromGraphNodes = graph.map(
    node => Math.abs(point.x - node.point.x) + Math.abs(point.y - node.point.y)
  );

  const minDistance = Math.min(...distFromGraphNodes);
  const index = distFromGraphNodes.indexOf(minDistance);

  return graph[index];
}

function addStartNode(graph: GraphNode[], start: Point): GraphNode | undefined {
  const closestToStart = findClosestGraphNode(graph, start)?.point;
  if (!closestToStart) return undefined;

  const startNode = {
    point: start,
    adjacent: [
      { point: closestToStart, edgeWeight: distance(start, closestToStart) },
    ],
    dist: Number.MAX_SAFE_INTEGER,
    path: [],
  };
  graph.push(startNode);

  return startNode;
}

function getPath(graph: GraphNode[], start: Point, end: Point): Point[] {
  const startNode = addStartNode(graph, start);
  const closestToEnd = findClosestGraphNode(graph, end);

  if (!startNode || !closestToEnd) return [];

  dijkstra(graph, startNode);
  const shortestPath = closestToEnd.path.concat(closestToEnd.point);

  return filterUnchangedDirection(shortestPath).concat([end]);
}

function findGraphNode(
  graph: GraphNode[],
  x: number,
  y: number
): GraphNode | undefined {
  return graph.find(node => node.point.x === x && node.point.y === y);
}

function findAdjacent(
  graph: GraphNode[],
  currentNode: GraphNode,
  gridSize: number,
  type: string
): Adjacent | null {
  let dX1: number;
  let dY1: number;

  if (type === 'prevX') {
    dX1 = currentNode.point.x - gridSize;
    dY1 = currentNode.point.y;
  } else if (type === 'prevY') {
    dX1 = currentNode.point.x;
    dY1 = currentNode.point.y - gridSize;
  } else if (type === 'nextX') {
    dX1 = currentNode.point.x + gridSize;
    dY1 = currentNode.point.y;
  } else {
    dX1 = currentNode.point.x;
    dY1 = currentNode.point.y + gridSize;
  }

  if (findGraphNode(graph, dX1!, dY1!)) {
    return {
      point: findGraphNode(graph, dX1!, dY1!)!.point,
      edgeWeight: gridSize,
    };
  }

  return null;
}

function createGraph(allocation: number[][], gridSize: number): GraphNode[] {
  const graph: GraphNode[] = [];
  for (let row = 0; row < allocation.length; row++)
    for (let col = 0; col < allocation[row].length; col++)
      if (allocation[row][col] === 0)
        graph.push({
          point: {
            x: col * gridSize + gridSize / 2,
            y: row * gridSize + gridSize / 2,
          },
          adjacent: [],
          dist: Number.MAX_SAFE_INTEGER,
          path: [],
        });

  for (const node of graph) {
    const adjacents = <Adjacent[]>(
      ['prevX', 'prevY', 'nextX', 'nextY']
        .map(type => findAdjacent(graph, node, gridSize, type))
        .filter(adjacent => adjacent)
    );
    node.adjacent = adjacents;
  }

  return graph;
}

function emptyAllocation(
  start: Point,
  end: Point,
  gridSize: number
): (0 | 1)[][] {
  const maxX = start.x > end.x ? start.x : end.x;
  const maxY = start.y > end.y ? start.y : end.y;

  const emptyGrid: (0 | 1)[][] = [];
  for (let i = 0; i <= Math.ceil(maxY / gridSize) + 1; i++) {
    emptyGrid[i] = [];
    for (let j = 0; j <= Math.ceil(maxX / gridSize) + 1; j++) {
      emptyGrid[i][j] = 0;
    }
  }

  emptyGrid[Math.floor(start.y / gridSize)][Math.floor(start.x / gridSize)] = 1;
  emptyGrid[Math.floor(end.y / gridSize)][Math.floor(end.x / gridSize)] = 1;

  return emptyGrid;
}

//FIXME: This is a dirty trick to improve performance of the algorithm
function trimStartEnd(start: Point, end: Point, gridSize: number): Point[] {
  //FIXME: Dirty hack to speed up the algorithm
  const minCoordX = Math.min(
    Math.floor(start.x / gridSize),
    Math.floor(end.x / gridSize)
  );
  const minCoordY = Math.min(
    Math.floor(start.y / gridSize),
    Math.floor(end.y / gridSize)
  );

  const dCoordX = minCoordX > 1 ? minCoordX - 1 : 0;
  const dCoordY = minCoordY > 1 ? minCoordY - 1 : 0;

  const deltaX = dCoordX * gridSize;
  const deltaY = dCoordY * gridSize;

  return [
    { x: start.x - deltaX, y: start.y - deltaY },
    { x: end.x - deltaX, y: end.y - deltaY },
  ];
}

function fullPath(
  path: Point[],
  start: Point,
  end: Point,
  trimmedStart: Point,
  trimmedEnd: Point
): Point[] {
  if (start === trimmedStart && end === trimmedEnd) return path;

  const deltaX = start.x - trimmedStart.x;
  const deltaY = start.y - trimmedStart.y;

  return path.map(point => {
    return { x: point.x + deltaX, y: point.y + deltaY };
  });
}

/** Finds the shortest orthogonal path between start and end based on grid and dijkstra path finding algorithm
 * @param start - the position in px of the start point
 * @param end - the position in px of the end point
 * @param gridSize - grid size of the grid to rout in the orthogonal path
 * @param gridAllocation - optional [][] matrix to define allocated grid cells
 * @returns - Array of positions in px building the orthogonal path
 */
export function getOrthogonalPath(
  start: Point,
  end: Point,
  gridSize: number,
  gridAllocation?: (0 | 1)[][]
): Point[] {
  if (start.x === end.x && start.y === end.y) return [];

  let trimmedStart = start;
  let trimmedEnd = end;

  if (!gridAllocation) {
    [trimmedStart, trimmedEnd] = trimStartEnd(start, end, gridSize);
    gridAllocation = emptyAllocation(trimmedStart, trimmedEnd, gridSize);
  }

  const graph: GraphNode[] = createGraph(gridAllocation!, gridSize);

  const shortesPath = getPath(graph, trimmedStart, trimmedEnd);

  return fullPath(shortesPath, start, end, trimmedStart, trimmedEnd);
}
