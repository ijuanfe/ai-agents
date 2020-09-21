let maze = [[2, 1, 1], [2, 3, 3], [2, 3, 1], [1, 1, 1]]
// let maze = [[3, 5, 2], [1, 8, 4], [2, 3, 1], [3, 2, 5]]
let start = [3, 0]
let goal = [0, 2]
const OPERATORS = ["U", "D", "L", "R"] // Priotity in case

let problem = { maze, goal }
let queue = []

rootNode = {pos: start, cost: 0, parent: null, action: null}
// Node structure: {pos: [x, y], cost: number, parent: node, action: string}

// Check if a given node is a solution
function testGoal(node, problem) {
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}

// Expand node: testGoal + add the next possible nodes to the queue
function expandNode(node, problem) {

  if (testGoal(node, problem)) {
    return node
  } else {
    posX = node.pos[0];
    posY = node.pos[1];
    costMatrix = problem.maze;

    // Keep track of accumulated costs: node.cost (current node) + costMatrix[next][node]
    if (posX > 0 && avoidReturning(node, [posX - 1, posY])) {
      queue.push({pos: [posX - 1, posY], cost: node.cost + costMatrix[posX - 1][posY], parent: node, action: "U"});
    }
    if (posX < costMatrix.length - 1 && avoidReturning(node, [posX + 1, posY])) {
      queue.push({pos: [posX + 1, posY], cost: node.cost + costMatrix[posX + 1][posY], parent: node, action: "D"});
    }
    if (posY > 0 && avoidReturning(node, [posX, posY - 1])) {
      queue.push({pos: [posX, posY - 1], cost: node.cost + costMatrix[posX][posY - 1], parent: node, action: "L"});
    }
    if (posY < costMatrix[0].length - 1 && avoidReturning(node, [posX, posY + 1])) {
      queue.push({pos: [posX, posY + 1], cost: node.cost + costMatrix[posX][posY + 1], parent: node, action: "R"});
    }
    return expandNode(lowestCost(), problem);
  }
}

// Avoid returning to the previous state
function avoidReturning(node, nextPos) {

  if (node.parent != null) {
    parentPosX = node.parent.pos[0];
    parentPosY = node.parent.pos[1];
    nextPosX = nextPos[0];
    nextPosY = nextPos[1];

    if (parentPosX == nextPosX && parentPosY == nextPosY) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

// Check which node has the lowest cost in the queue
function lowestCost() {

  posLowestCost = 0;
  lowestCostAux = queue[0].cost;

  for (var i = 1; i < queue.length; i++) {
    if (queue[i].cost < lowestCostAux) {
      lowestCostAux = queue[i].cost;
      posLowestCost = i;
    }
  }
  lowestCostNode = queue[posLowestCost];
  queue.splice(posLowestCost, 1); // Remove lowest cost node from queue
  return lowestCostNode;
}

// Build the route used to find the solution recursively through parent nodes
function routeSolution(node, solution) {

  if (node.parent == null) {
    solution.push("Position: [" + node.pos + "], Move: root node");
    solution.reverse();
  } else {
    solution.push("Position: [" + node.pos + "], Move: " + node.action);
    routeSolution(node.parent, solution);
  }
}

// Main function
function solve(problem, rootNode) {
    let solution = [];
    let cost = 0;
    // START CODE HERE
    solutionNode = expandNode(rootNode, problem);
    cost = solutionNode.cost;
    routeSolution(solutionNode, solution)
    // END CODE HERE
    return { solution, cost }
}

console.log(solve(problem, rootNode));
