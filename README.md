# P5.js experiments simulation a Calder mobile structure
This code attempts to recreate a randomly generated 2d representations of mobile structures inspired by the work of Alexander Calder. 

<img src="./examples/ex1.png" width="400">   <img src="./examples/ex2.png" width="400">

The code randomly generates nodes with branches and leaves. Leaves are represented with circles with varying radius. 

Each circle radius is proportional to its weight and the weight calculation is influenced by the horizontal support angle and how it is connected to its vertical support.

The code relies on the Node class and each node has two child nodes. Each of the child node may either be another node branch or a terminal leaf. 

The creation and vizualization of nodes relies on code recursion.
