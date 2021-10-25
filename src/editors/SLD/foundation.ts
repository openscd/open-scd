export type GraphNode = {
  element: Element;
  mass: number;
  r: number;
  xVelocity: number;
  yVelocity: number;
  xAcceleration: number;
  yAcceleration: number;
  y: number;
  x: number;
};

export type GraphEdge = {
  node1: Element;
  node2: Element;
  length: number;
  stiffness: number;
  xStart?: number;
  yStart?: number;
  xEnd?: number;
  yEnd?: number;
};

export interface Point {
  x: number | undefined;
  y: number | undefined;
}

export interface SldElement {
  element: Element;
  pos: Point;
}

export function getPosition(element: Element): (number | undefined)[] {
  const xAttr = element.getAttributeNS(
    'http://www.iec.ch/61850/2003/SCLcoordinates',
    'x'
  );
  const yAttr = element.getAttributeNS(
    'http://www.iec.ch/61850/2003/SCLcoordinates',
    'y'
  );

  return [
    xAttr ? parseInt(xAttr) : undefined,
    yAttr ? parseInt(yAttr) : undefined,
  ];
}

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

  if (terminals.length === 2) {
    const index = terminals.indexOf(terminal) === 0 ? 1 : 0;
    const destinationTerminal = terminals[index];
    const parent = destinationTerminal.parentElement;
    return parent ? parent : null;
  }

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
        edges.push({
          node1: source,
          node2: destination,
          length: 2.0,
          stiffness: 20.0,
        });
    });

  return edges;
}

function getxPosition(element: Element): number | undefined {
  const x = element.getAttributeNS(
    'http://www.iec.ch/61850/2003/SCLcoordinates',
    'x'
  );

  const xNum = x ? parseInt(x) : undefined;
  if (!xNum) return xNum;

  const parent = element.parentElement;
  if (!parent) return xNum;

  const parentPos = getxPosition(parent);
  return parentPos ? xNum + parentPos : xNum;
}

function getyPosition(element: Element): number | undefined {
  const y = element.getAttributeNS(
    'http://www.iec.ch/61850/2003/SCLcoordinates',
    'y'
  );

  const yNum = y ? parseInt(y) : undefined;
  if (!yNum) return yNum;

  const parent = element.parentElement;
  if (!parent) return yNum;

  const parentPos = getyPosition(parent);
  return parentPos ? yNum + parentPos : yNum;
}

function testElement(element: Element): boolean {
  return (
    element.tagName === 'Bay' ||
    (element.tagName === 'ConductingEquipment' &&
      element.getAttribute('name')!.includes('QB'))
  );
}

function initNode(
  element: Element,
  initX: number,
  initY: number,
  initMass: number,
  r: number
): GraphNode {
  const xPos = testElement(element) ? getxPosition(element) : undefined;
  const yPos = testElement(element) ? getyPosition(element) : undefined;

  const mass = xPos && yPos ? Infinity : initMass;
  const x = xPos && yPos ? xPos : initX;
  const y = xPos && yPos ? yPos : initY;

  return {
    element,
    mass,
    r,
    xVelocity: 0,
    yVelocity: 0,
    xAcceleration: 0,
    yAcceleration: 0,
    x,
    y,
  };
}

export function getNodes(root: Element): GraphNode[] {
  const nodes: GraphNode[] = [];

  let initX = 0;
  let initY = 0;

  Array.from(root.getElementsByTagName('ConductingEquipment')).forEach(item =>
    nodes.push(initNode(item, initX++, initY++, 1.0, 2.0))
  );

  Array.from(root.getElementsByTagName('Bay'))
    .filter(
      bay =>
        bay.children.length === 1 &&
        bay.children[0].tagName === 'ConnectivityNode'
    )
    .forEach(item => nodes.push(initNode(item, initX++, initY++, 1.0, 2.0)));

  Array.from(root.getElementsByTagName('ConnectivityNode'))
    .filter(
      connectivityNode =>
        connectivityNode.getAttribute('name') !== 'grounded' &&
        numberConnections(connectivityNode) > 2
    )
    .forEach(item => nodes.push(initNode(item, initX++, initY++, 0.1, 0.01)));

  return nodes;
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
