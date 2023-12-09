from collections import deque
import random
from typing import Optional

random.seed("day06") # make random reproducible

class Node:
    def __init__(self, value: str, left = None, right = None):
        self.value = value
        self.left = left
        self.right = right

    def __str__(self):
        nodes = deque([self])
        s = []

        while len(nodes):
            copy = nodes.copy()
            nodes = deque()

            vals = []
            while len(copy):
                n = copy.popleft()
                if n:
                    vals.append(str(n.value))
                    nodes.append(n.left)
                    nodes.append(n.right)
                else:
                    vals.append("_")

            if next(filter(lambda v: v != "_", vals), "_") != "_":
                s.append(" ".join(vals))

        return "\n".join(s)

    def weight(self):
        weight = self.value

        if self.left:
            weight += self.left.weight()
        if self.right:
            weight += self.right.weight()

        return weight


balanced = []
unbalanced = []

MAX_BALANCES = 100
MAX_UNBALANCED = 25

while len(balanced) < MAX_BALANCES or len(unbalanced) < MAX_UNBALANCED:
    trunk = Node(random.randint(7, 9))
    for i in range(2):
        ornament1 = None
        ornament2 = None

        ornaments = random.choice([0, 1, 2, 2, 2])
        if ornaments == 1:
            if random.choice([True, False]):
                ornament1 = Node(random.randint(1, 2))
            else:
                ornament2 = Node(random.randint(1, 2))
        elif ornaments == 2:
            ornament1 = Node(random.randint(1, 2))
            ornament2 = Node(random.randint(1, 2))

        branch = Node(random.randint(4, trunk.value - 1), ornament1, ornament2)

        if i == 0:
            trunk.left = branch
        else:
            trunk.right = branch

    if trunk.left.weight() == trunk.left.value and trunk.right.weight() == trunk.right.value:
        continue

    left_weight = trunk.left.weight()
    right_weight = trunk.right.weight()
    # print("weights:", left_weight, right_weight)

    if abs(left_weight - right_weight) <= 1:
        # print("blanaced:", trunk)
        if len(balanced) < MAX_BALANCES:
            balanced.append(trunk)
    elif len(unbalanced) < MAX_UNBALANCED:
        # print("unbalanced:", trunk)
        unbalanced.append(trunk)

trees = balanced + unbalanced
trees = random.sample(trees, len(trees))

print("\n\n".join(map(lambda tree: str(tree), trees)))

# weight = list(map(lambda t: t.weight(), unbalanced))
# print(weight)