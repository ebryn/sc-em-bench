# SC versus Ember

Admitedly naive bench marks for the purpose of understanding the difference between the two object models... Comment at
will on how I might not have got the test right...

Inital Observations:

Ember is 1.5 times as fast at operating bindings

Ember seems to be about 10 times faster operating accessors

Ember is around twice as fast at creating an anonymous object view #extend#create

Ember is slower at using object#create to create anonymous objects

Ember #extend appears to grown linearly in time as more properties are passed, where as SC bonces all over the place
no doubt due to some GC nonsense.

.joe


### SproutCore

``` bash
Time to operate a binding 10000 times: 835
Time to call get 10000 times on a primitive: 89
Time to call get 10000 times on a computed: 89
Benchmarking Creating an anonymous class with no extension
Took 1656 ms to create 10000 anonymous classes with no extension
Benchmarking Creating an anonymous class with properties
0, 0.1471
1, 0.0719
2, 0.2048
3, 0.0699
4, 0.092
5, 0.151
6, 0.089
7, 0.1805
8, 0.0962
9, 0.1918
10, 0.2368
11, 0.2522
12, 0.2893
13, 0.288
14, 0.1602
15, 0.0918
16, 0.159
17, 0.1615
18, 0.0945
19, 0.1663
Benchmarking Creating an anonymous class with properties inline
0, 0.0041
1, 0.0046
2, 0.0048
3, 0.0054
4, 0.0062
5, 0.007
6, 0.0074
7, 0.0075
8, 0.0084
9, 0.0089
10, 0.0097
11, 0.0096
12, 0.0103
13, 0.0109
14, 0.0112
15, 0.0117
16, 0.0147
17, 0.0154
18, 0.0175
19, 0.0169


### Ember

``` bash
Time to operate a binding 10000 times: 531
Time to call get 10000 times on a primitive: 14
Time to call get 10000 times on a computed: 18
Benchmarking Creating an anonymous class with no extension
Took 746 ms to create 10000 anonymous classes with no extension
Benchmarking Creating an anonymous class with properties
0, 0.1239
1, 0.1273
2, 0.1306
3, 0.1334
4, 0.1345
5, 0.1367
6, 0.1405
7, 0.1427
8, 0.1443
9, 0.1462
10, 0.1494
11, 0.1563
12, 0.1579
13, 0.1598
14, 0.1674
15, 0.1687
16, 0.1815
17, 0.1858
18, 0.1892
19, 0.1931
Benchmarking Creating an anonymous class with properties inline
0, 0.0064
1, 0.0098
2, 0.012
3, 0.0143
4, 0.0163
5, 0.0183
6, 0.0194
7, 0.0215
8, 0.0236
9, 0.0246
10, 0.0265
11, 0.0288
12, 0.0319
13, 0.0325
14, 0.036
15, 0.0383
16, 0.0466
17, 0.0493
18, 0.0522
19, 0.0562