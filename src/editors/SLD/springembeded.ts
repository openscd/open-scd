import { GraphEdge, GraphNode } from './foundation.js';

function getDistance(n1: GraphNode, n2: GraphNode): number {
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function applyCoulombsLaw(nodes: GraphNode[]): void {
  for (const n1 of nodes) {
    for (const n2 of nodes) {
      if (n1.element !== n2.element) {
        if (n1.element.tagName === 'ConnectivityNode') continue;
        if (n2.element.tagName === 'ConnectivityNode') continue;

        const distance = getDistance(n2, n1);
        const xe = (n2.x - n1.x) / distance;
        const ye = (n2.y - n1.y) / distance;
        const magnitude = distance + 0.1;

        const xforce = (xe * n2.r) / (magnitude * magnitude * 0.5);
        const yforce = (ye * n2.r) / (magnitude * magnitude * 0.5);

        n1.xAcceleration = n1.xAcceleration - xforce / n1.mass;
        n2.xAcceleration = n2.xAcceleration + xforce / n2.mass;

        n1.yAcceleration = n1.yAcceleration - yforce / n1.mass;
        n2.yAcceleration = n2.yAcceleration + yforce / n2.mass;
      }
    }
  }
}

function applyHookesLaw(nodes: GraphNode[], edges: GraphEdge[]): void {
  for (const edge of edges) {
    const n1 = nodes.find(node => edge.node1 === node.element);
    const n2 = nodes.find(node => edge.node2 === node.element);

    if (!n2 || !n1) continue;

    const distance = getDistance(n2, n1);
    const displacement = edge.length - distance;

    const xe = (n2.x - n1.x) / distance;
    const ye = (n2.y - n1.y) / distance;

    const xforce = xe * (edge.stiffness * displacement * 0.5);
    const yforce = ye * (edge.stiffness * displacement * 0.5);

    n1.xAcceleration = n1.xAcceleration - xforce / n1.mass;
    n2.xAcceleration = n2.xAcceleration + xforce / n2.mass;

    n1.yAcceleration = n1.yAcceleration - yforce / n1.mass;
    n2.yAcceleration = n2.yAcceleration + yforce / n2.mass;
  }
}

function adjustRotation(nodes: GraphNode[], edges: GraphEdge[]): void {
  for (const edge of edges) {
    const n1 = nodes.find(node => edge.node1 === node.element);
    const n2 = nodes.find(node => edge.node2 === node.element);

    if (!n2 || !n1) continue;

    const xe = n2.x - n1.x;

    const xforce = 2.0 * xe * 0.5;

    n1.xAcceleration = n1.xAcceleration + xforce / n1.mass;
    n2.xAcceleration = n2.xAcceleration - xforce / n2.mass;
  }
}

function attractToCenter(
  nodes: GraphNode[],
  edges: GraphEdge[],
  repulsion: number
): void {
  for (const node of nodes) {
    const isConnected = edges.some(
      edge => edge.node1 === node.element || edge.node2 === node.element
    );

    const xe = 20 - 1 * node.x;
    const ye = 20 - 1 * node.y;

    const xforce = xe * (repulsion / (isConnected ? 100.0 : 50.0));
    const yforce = ye * (repulsion / (isConnected ? 100.0 : 50.0));

    node.xAcceleration = node.xAcceleration + xforce / node.mass;
    node.yAcceleration = node.yAcceleration + yforce / node.mass;
  }
}

function getSpeed(node: GraphNode): number {
  return Math.sqrt(
    node.xVelocity * node.xVelocity + node.yVelocity * node.yVelocity
  );
}

function updateVelocity(
  nodes: GraphNode[],
  deltaTime: number,
  maxSpeed: number
): void {
  for (const node of nodes) {
    let xVelocity = node.xVelocity + node.xAcceleration * deltaTime;
    let yVelocity = node.yVelocity + node.yAcceleration * deltaTime;

    const speed = getSpeed(node);
    if (speed > maxSpeed) {
      xVelocity = (node.xVelocity * maxSpeed) / speed;
      yVelocity = (node.yVelocity * maxSpeed) / speed;
    }

    node.xVelocity = xVelocity;
    node.yVelocity = yVelocity;

    node.xAcceleration = 0;
    node.yAcceleration = 0;
  }
}

function updatePosition(nodes: GraphNode[], deltaTime: number): void {
  for (const node of nodes) {
    const x = node.x + (isNaN(node.xVelocity) ? 0 : node.xVelocity) * deltaTime;
    const y = node.y + (isNaN(node.yVelocity) ? 0 : node.yVelocity) * deltaTime;

    node.x = x;
    node.y = y;
  }
}

function isStable(nodes: GraphNode[]): boolean {
  return !nodes
    .filter(node => node.element.tagName !== 'Bay')
    .some(node => {
      const speed = getSpeed(node);
      const energy = 0.5 * node.mass * speed * speed;
      if (energy > 0.01) console.log(energy);
      return energy > 0.01;
    });
}

export function doSpringy(nodes: GraphNode[], edges: GraphEdge[]): void {
  let i;
  for (i = 0; i < 500; i++) {
    const e = 0.1 * Math.exp(-i / 10);
    applyCoulombsLaw(nodes);
    applyHookesLaw(nodes, edges);
    adjustRotation(nodes, edges);
    attractToCenter(nodes, edges, 1.0);
    updateVelocity(nodes, e, 1);
    updatePosition(nodes, e);

    if (isStable(nodes)) {
      break;
    }
  }
}
