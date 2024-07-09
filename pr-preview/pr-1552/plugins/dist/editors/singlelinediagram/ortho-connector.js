function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
function isChangedDirection(a, b) {
    if (a.path.length === 0)
        return false;
    const commingX2 = a.point.x;
    const commingX1 = a.path[a.path.length - 1].x;
    const commingHorizontal = commingX2 - commingX1 ? false : true;
    const goingHorizontal = a.point.x - b.point.x ? false : true;
    return commingHorizontal !== goingHorizontal;
}
function filterUnchangedDirection(path) {
    return path.filter((p, i, v) => {
        if (i === 0 || i === v.length - 1)
            return true;
        const commingDirection = v[i].x - v[i - 1].x !== 0 ? 'horizontal' : 'vertical';
        const goingDirection = v[i + 1].x - v[i].x !== 0 ? 'horizontal' : 'vertical';
        return commingDirection === goingDirection ? false : true;
    });
}
function calculateMinimumDistance(adjacent, edgeWeigh, parentNode) {
    const sourceDistance = parentNode.dist;
    const changingDirection = isChangedDirection(parentNode, adjacent);
    const extraWeigh = changingDirection ? Math.pow(edgeWeigh + 1, 2) : 0;
    if (sourceDistance + edgeWeigh + extraWeigh < adjacent.dist) {
        adjacent.dist = sourceDistance + edgeWeigh + extraWeigh;
        const shortestPath = [...parentNode.path];
        shortestPath.push(parentNode.point);
        adjacent.path = shortestPath;
    }
}
function getLowestDistanceGraphNode(unsettledNodes) {
    let lowestDistance = Number.MAX_SAFE_INTEGER;
    let lowestDistanceNode = null;
    for (const node of unsettledNodes)
        if (node.dist < lowestDistance) {
            lowestDistance = node.dist;
            lowestDistanceNode = node;
        }
    return lowestDistanceNode;
}
function dijkstra(graph, start) {
    start.dist = 0;
    const settledNodes = new Set();
    const unsettledNodes = new Set();
    unsettledNodes.add(start);
    while (unsettledNodes.size != 0) {
        const currentNode = getLowestDistanceGraphNode(unsettledNodes);
        unsettledNodes.delete(currentNode);
        for (const adjacent of currentNode.adjacent) {
            const adjacentNode = graph.find(node => node.point.x === adjacent.point.x && node.point.y === adjacent.point.y);
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
function findClosestGraphNode(graph, point) {
    const distFromGraphNodes = graph.map(node => Math.abs(point.x - node.point.x) + Math.abs(point.y - node.point.y));
    const minDistance = Math.min(...distFromGraphNodes);
    const index = distFromGraphNodes.indexOf(minDistance);
    return graph[index];
}
function addStartNode(graph, start) {
    const closestToStart = findClosestGraphNode(graph, start)?.point;
    if (!closestToStart)
        return undefined;
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
function getPath(graph, start, end) {
    const startNode = addStartNode(graph, start);
    const closestToEnd = findClosestGraphNode(graph, end);
    if (!startNode || !closestToEnd)
        return [];
    dijkstra(graph, startNode);
    const shortestPath = closestToEnd.path.concat(closestToEnd.point);
    return filterUnchangedDirection(shortestPath).concat([end]);
}
function findGraphNode(graph, x, y) {
    return graph.find(node => node.point.x === x && node.point.y === y);
}
function findAdjacent(graph, currentNode, gridSize, type) {
    let dX1;
    let dY1;
    if (type === 'prevX') {
        dX1 = currentNode.point.x - gridSize;
        dY1 = currentNode.point.y;
    }
    else if (type === 'prevY') {
        dX1 = currentNode.point.x;
        dY1 = currentNode.point.y - gridSize;
    }
    else if (type === 'nextX') {
        dX1 = currentNode.point.x + gridSize;
        dY1 = currentNode.point.y;
    }
    else {
        dX1 = currentNode.point.x;
        dY1 = currentNode.point.y + gridSize;
    }
    if (findGraphNode(graph, dX1, dY1)) {
        return {
            point: findGraphNode(graph, dX1, dY1).point,
            edgeWeight: gridSize,
        };
    }
    return null;
}
function createGraph(allocation, gridSize) {
    const graph = [];
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
        const adjacents = (['prevX', 'prevY', 'nextX', 'nextY']
            .map(type => findAdjacent(graph, node, gridSize, type))
            .filter(adjacent => adjacent));
        node.adjacent = adjacents;
    }
    return graph;
}
function emptyAllocation(start, end, gridSize) {
    const maxX = start.x > end.x ? start.x : end.x;
    const maxY = start.y > end.y ? start.y : end.y;
    const emptyGrid = [];
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
function trimStartEnd(start, end, gridSize) {
    //FIXME: Dirty hack to speed up the algorithm
    const minCoordX = Math.min(Math.floor(start.x / gridSize), Math.floor(end.x / gridSize));
    const minCoordY = Math.min(Math.floor(start.y / gridSize), Math.floor(end.y / gridSize));
    const dCoordX = minCoordX > 1 ? minCoordX - 1 : 0;
    const dCoordY = minCoordY > 1 ? minCoordY - 1 : 0;
    const deltaX = dCoordX * gridSize;
    const deltaY = dCoordY * gridSize;
    return [
        { x: start.x - deltaX, y: start.y - deltaY },
        { x: end.x - deltaX, y: end.y - deltaY },
    ];
}
function fullPath(path, start, end, trimmedStart, trimmedEnd) {
    if (start === trimmedStart && end === trimmedEnd)
        return path;
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
export function getOrthogonalPath(start, end, gridSize, gridAllocation) {
    if (start.x === end.x && start.y === end.y)
        return [];
    let trimmedStart = start;
    let trimmedEnd = end;
    if (!gridAllocation) {
        [trimmedStart, trimmedEnd] = trimStartEnd(start, end, gridSize);
        gridAllocation = emptyAllocation(trimmedStart, trimmedEnd, gridSize);
    }
    const graph = createGraph(gridAllocation, gridSize);
    const shortesPath = getPath(graph, trimmedStart, trimmedEnd);
    return fullPath(shortesPath, start, end, trimmedStart, trimmedEnd);
}
//# sourceMappingURL=ortho-connector.js.map