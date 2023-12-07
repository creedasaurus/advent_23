# Figured I would include this in the repo. feel free to make a larger challenge file to test yourself

from random import randrange

f = open("letters_more.txt", "a")
for i in range(0, 100_000_000):
    f.write(str(randrange(1, 250)) + ' ')
