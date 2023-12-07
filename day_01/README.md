# Advent of Code Day_01

Do you have any idea how many letters Santa gets each year before Christmas? Millions of people around the world send letters to Santa every year letting him know what they would like for Christmas. However, the logistics of not only reading those letters, but estimating labor, ordering materials, storing products, and loading up presents at the appropriate time in an efficient order requires a lot of planning.

**Problem**: In order to prepare for this Christmas season, some of the head elves would like a report on how many letters are coming from each country. The elves physically receiving the letters have been inputting the country code of the letter into a file named *"letters.txt"*. You need to read this file, and then report how many letters have been sent from each country.

**Challenge**: A *"letters_challenge.txt"* has also been included if you'd like some extra credit. There is a lot more data in this file, so it may need to be handled a bit differently so as not to overload your memory. (Note: github has limitations on file size. Feel free to use the python script to make a larger file).

**Example**:

input: letters.txt
```
1 2 34 53  1 53 6 ...
```

output: output.txt
```
1:  2
2:  1
6:  1
34: 1
53: 2
```

**Notes**:
Answer does not need to be sorted. Use any language you like. Post/link results and source code in channel (feel free to add comments and/or ask for help). If you post the answer, you can "hide" it in discord by having two "pipes" on either side.
Ex: ```||Result||```

---

### Results

Just for SCIENCE - I did this with my basic solution of reading the entire file in, then counting. Then I did it again but using the
node read stream api.

Example runs with basic solution:

```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --filename letters_ultra.txt
Unique values 249
35.52 user 2.88 system 0:22.66 elapsed 169% CPU -- 5260592 kb memory
```
```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --filename letters_ultra.txt
Unique values 249
41.92 user 2.82 system 0:22.39 elapsed 199% CPU -- 5451328 kb memory
```

Example runs with read stream api:

```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt
Unique values 249
5.85 user 0.29 system 0:05.94 elapsed 103% CPU -- 96048 kb memory
```
```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt
Unique values 249
5.84 user 0.27 system 0:05.93 elapsed 103% CPU -- 94192 kb memory
```
```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt
Unique values 249
6.22 user 0.31 system 0:06.33 elapsed 103% CPU -- 96064 kb memory
```

Example with a different chunk size:

```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt --chunksize 10240
Unique values 249
6.05 user 0.23 system 0:06.07 elapsed 103% CPU -- 50224 kb memory
```
```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt --chunksize 10240
Unique values 249
6.03 user 0.27 system 0:06.14 elapsed 102% CPU -- 51152 kb memory
```

And more:

```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt --chunksize 131072
Unique values 249
5.96 user 0.32 system 0:06.09 elapsed 103% CPU -- 106176 kb memory
```
```
❯ gtime -f '%U user %S system %E elapsed %P CPU -- %M kb memory' node index.js --stream --filename letters_ultra.txt --chunksize 131072
Unique values 249
5.88 user 0.36 system 0:06.03 elapsed 103% CPU -- 109104 kb memory
```
