function getTerminals(connectivityNode: Element): Element[] {
  const substation = connectivityNode.closest('Substation');
  if (!substation) return [];

  const path = connectivityNode.getAttribute('pathName') ?? '';
  const name = connectivityNode.getAttribute('name');
  const [substationName, voltageLevelName, bayName, _] = path.split('/');

  return Array.from(substation.getElementsByTagName('Terminal')).filter(
    terminal =>
      terminal.getAttribute('connectivityNode') === path &&
      terminal.getAttribute('substationName') === substationName &&
      terminal.getAttribute('voltageLevelName') === voltageLevelName &&
      terminal.getAttribute('bayName') === bayName &&
      terminal.getAttribute('cNodeName') === name
  );
}

function numberConnections(connectivityNode: Element): number {
  const substation = connectivityNode.closest('Substation');
  if (!substation) return 0;

  return getTerminals(connectivityNode).length;
}

function getDesitantion(terminal: Element): Element | null {
  const root = terminal.closest('Substation');
  const path = terminal.getAttribute('connectivityNode');

  const connNode = root?.querySelector(`ConnectivityNode[pathName="${path}"]`);

  const bay = connNode?.parentElement;
  if (!bay) return null;

  const isBus = Array(bay).some(
    bay =>
      bay.children.length === 1 &&
      bay.children[0].tagName === 'ConnectivityNode'
  );
  if (isBus) return bay;

  const terminals = getTerminals(connNode);

  if (terminals.length === 2) return terminals[terminals.indexOf(terminal)];

  if (terminals.length > 2) return connNode;

  return null;
}

export function getEdges(root: Element): GraphEdge[] {
  const edges: GraphEdge[] = [];

  Array.from(root.getElementsByTagName('Terminal'))
    .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
    .forEach(terminal => {
      const destination = getDesitantion(terminal);
      const source = terminal.parentElement;
      if (destination && source)
        edges.push({ node1: source, node2: destination });
    });

  return edges;
}

export function getNodes(root: Element): GraphNode[] {
  const nodes: GraphNode[] = [];

  let x = 10;
  let y = 10;
  Array.from(root.getElementsByTagName('ConductingEquipment')).forEach(item =>
    nodes.push({ element: item, fixed: false, x: x++, y: y })
  );

  x = 10;
  y = 13;
  Array.from(root.getElementsByTagName('Bay'))
    .filter(
      bay =>
        bay.children.length === 1 &&
        bay.children[0].tagName === 'ConnectivityNode'
    )
    .forEach(item =>
      nodes.push({ element: item, fixed: false, x: x + 10, y: y++ })
    );

  x = 10;

  Array.from(root.getElementsByTagName('ConnectivityNode'))
    .filter(
      connectivityNode =>
        connectivityNode.getAttribute('name') !== 'grounded' &&
        numberConnections(connectivityNode) > 2
    )
    .forEach(item =>
      nodes.push({ element: item, fixed: false, x: x++, y: 20 })
    );

  return nodes;
}

export type GraphNode = {
  element: Element;
  fixed: boolean;
  y: number;
  x: number;
};

export type GraphEdge = {
  node1: Element;
  node2: Element;
  xStart?: number;
  yStart?: number;
  xEnd?: number;
  yEnd?: number;
};

function getDistance(n1: GraphNode, n2: GraphNode): number {
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function calculateForce(
  n1: GraphNode,
  n2: GraphNode,
  isConnected: boolean
): number[] {
  const distance = getDistance(n1, n2);
  const xe = (n2.x - n1.x) / distance;
  const ye = (n2.y - n1.y) / distance;

  // Calculate forces based on Colomb
  const r = 0.1; //
  const xForceColomb = (r / Math.pow(distance, 2)) * xe;
  const yForceColomb = (r / Math.pow(distance, 2)) * ye;

  if (!isConnected) return [xForceColomb, yForceColomb];

  // Calculate forces from Hook for connected two nodes
  const s = 0.2; //
  const l = 0.1; //
  const xForceHook = s * (distance - l) * xe;
  const yForceHook = s * (distance - l) * ye;

  return [xForceColomb + xForceHook, yForceColomb + yForceHook];
}

export function doSpringEmbedded(nodes: GraphNode[], edges: GraphEdge[]): void {
  const changerate = 0.001;

  const xForces: number[] = [];
  const yForces: number[] = [];

  let iteration = 0;

  while (iteration < 10000) {
    // reset force arrays
    xForces.length = 0;
    yForces.length = 0;

    for (const n1 of nodes) {
      let sumxforce = 0;
      let sumyforce = 0;
      for (const n2 of nodes) {
        const isConnected = edges.some(
          edge =>
            (edge.node1 === n1.element && edge.node2 === n2.element) ||
            (edge.node1 === n2.element && edge.node2 === n1.element)
        );
        let [xforce, yforce] = [0, 0];
        if (n1 !== n2) [xforce, yforce] = calculateForce(n1, n2, isConnected);

        sumxforce = sumxforce + xforce;
        sumyforce = sumyforce + yforce;
      }

      xForces.push(sumxforce);
      yForces.push(sumyforce);
    }

    for (const n of nodes) {
      n.x = n.x + changerate * xForces[nodes.indexOf(n)];
      n.y = n.y + changerate * yForces[nodes.indexOf(n)];
    }

    iteration++;
  }
}

export function updateEdges(nodes: GraphNode[], edges: GraphEdge[]): void {
  edges.forEach(edge => {
    const node1 = nodes.find(node => node.element === edge.node1);
    const node2 = nodes.find(node => node.element === edge.node2);

    if (node1 && node2) {
      edge.xStart = node1?.x;
      edge.yStart = node1?.y;
      edge.xEnd = node2?.x;
      edge.yEnd = node2?.y;
    }
  });
}
