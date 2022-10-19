---
title: Linear Algebra and RRTs for N-Dimensional Path-Finding
date: "2022-10-18"
---

<script>
	import c_vs_nc from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/convex_vs_nonconvex.jpg';
	import ab_example from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/ab_example.png';
	import gen from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/2d_general.png';
	import applied from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/2d_applied.png';
	import graphed from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/2d_res_graphed.png';
	import nd_form from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/nd_formula.png';
	import rrt_r from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/rrt_run.png';
	import rrt_g from '$lib/blog_images/applying-linear-algebra-and-rrts-for-n-dimensional-path-finding/rrt_goal_run.png';
</script>

There are many path-finding algorithms for a whole slew of applications. Many are commonly discussed such as breadth-first search, depth-first search, Dijkstra's, A*, Bellman-Ford, and more. Some more optimal and efficient than others, but all crucial to the advancement of path-finding and graph traversal in the field of computer science. These algorithms permeated into other areas where we now use them in our everyday lives, with tools such as GPS navigation while driving or even looking up a file on our computers. However, as powerful as they are, these algorithms are hard, and many inefficient, to implement outside of a 2-dimensional space. Some applications, such as mapping a road, are just fine remaining in 2-dimensions, but there are many problems that need to be solved that have n-dimensions exceeding just 2. 

Rapidly-exploring Random Trees (RRTs) fill this void. A RRT is a search algorithm that efficiently searches nonconvex, n-dimensional spaces by branching out and exploring that space. That's a lot to define. First, what does searching a nonconvex, n-dimensional space look like and mean? 

N-dimensional spaces are spaces that have an undefined dimension. In designing algorithms to accomodate more than just a single dimension we are creating a solution that is modular and scalable.  A convex set in geometry and linear algebra is a subset of the euclidean space in which a line XY connecting points X and Y in the set lies entirely within that set. More simply, you are at a point A and you need to get to a point B. If you can walk from A to B in a straight line then this is a convex set. Inversely, a nonconvex set is one where a valid path from A to B is not possible with just a straight line.
<img src={c_vs_nc} alt="Convex vs. Non-Convex">

Now that we know we are dealing with getting from point A to point B in a nonconvex set, how do we go about implementing RRT to get a valid path?

# Getting the Next Point
Before we can go about finding a path from point A to point B we have to be able to go from one point to the next. We can start by defining a valid 2-dimensional solution and then rebuilding it as an n-dimensional model.

### 2-D Point Creation
We are going to assume that our result is valid, and this is because following the creation of a point in our algorithm we will ensure its validity. Knowing that we want to get from A to B and that we are in a convex set we likely won't be able to travel the full distance from our current position to the goal position. We will choose a portion of this distance and refer to it as `delta_q`, meaning that if a distance from our current point to the next point is greater than `delta_q` then that distance will be reduced to a distance of `delta_q`. An example of A and B in a cartesian space may look like:
<img src={ab_example} alt="AB Example">

We will say that our start position is A = (0,0) and our goal position is B = (6,4), and we will treat these not as ordered coordinate pairs but as vectors. How do we get from A to a distance, at most, `delta_q` away from A on the path to B? There are several things that we need to compute first:
1. `V` , a new vector from B - A.
2. `||V||`, The euclidean norm of `V`. Note that the norm of a vector in a normed vector space is also the magnitude.
3. The unit vector of our new vector.

Now that we know what we need to compute for we can apply it in a general formula:

<img src={gen} alt="2D General">

Applying this to our current points A and B with a value of `delta_q = 2` we get:

<img src={applied} alt="2D Applied">
Which, when applied to our graph, looks like:

<img src={graphed} alt="2D Results Graphed">

This means that our next point is the purple point on the path from A to B.

### Expanding to n-Dimensions
Now that we have our working formula it is relatively easy to expand it to n-dimensions. We are already working with vectors which are n-dimensional. By opening up the formula to accept n-dimensions with our goal point being vector G and our starting point being vector S we get:
<img src={nd_form} alt="N-Dimensional Formula">

### Observations
It is important to note that this formula is only applied when the euclidean distance from our starting point to our goal point exceeds the value of `delta_q`, whatever we may set that to. Also, you may have noticed that this only creates points in a straight line along the path from our start point to the end point. How does this help us in a nonconvex space?

# Introducing Randomness

RRTs work by navigating some percentage of time towards a random, valid point rather than the goal point. This allows for the search to branch out and become an exploring tree rather than just a straight line, therefore accomodating nonconvex spaces.

Let's say that we set a random exploration goal of 20%. This means that 20% of the time the algorithm will explore other points in the space and the remaining 80% of the time it will be working its way towards the goal point. Regardless of whether we are navigating towards a random point or a goal point we will still be utilizing the 'Next Point' formula above, just in that instance the goal point may be random instead of the true end goal. 

Depending on your goal, space, and other factors you can introduce randomness into your algorithm at different levels. Your use case may require more exploration while other may require less. Picking an exploration percentage requires intimate knowledge of your space as well as a fair bit of trial and error.

# Building a RRT

We have our formulas and needed variables, now let's implement a RRT in pseudo-code.

```
Auxiliary Functions (the implementation of these vary by use-case):
 - get_random_valid_vertex(): Returns a random, valid vertex.
 - random(): returns a random value between 0 and 1.
 - check_path_validity(path): Returns whether or not a path is valid.
 - euclidean_norm(x): Returns the euclidean norm of x.
 - get_nearest_point(nodes, q_rand): Returns the nearest point and path.
 - get_path(x, y): Returns a path from x to y.
 - Node(): Holds a point and path

// A function to implement our 'Next Point' formula from above.
func next_point(from_vector, to_vector, delta_q):
	new_vec = to_vector - from_vector
	euclidean_dist = euclidean_norm(new_vector)
	if euclidean_distance > delta_q:
		new_vec = ((new_vec / euclidean_dist) * delta_q) + from_point
	return new_vec

// Our RRT implementation.
func rrt(starting_point, goal_point, num_samples, nodes, delta_q):
	for 1 to number_of_samples:
		q_rand = get_random_valid_vertex()
		// Using 50% as the randomness percentage for exploration.
		if random() < 0.5:
			q_rand = goal_point
		near_point = get_nearest_point(point_list, q_rand)
		next_path = path(next_point(near_point, q_rand, delta_q))
		if check_path_validity(next_path) is True:
			add Node with point and path to nodes

			if point is within acceptable distance to goal point:
				break
	return nodes
```

Once fully implemented, this RRT can successfully search a given space. It can even be modified to solely explore without having a given goal point. Here is a picture of the algorithm searching a space and finding a goal while avoiding obstacles.
<img src={rrt_r} alt="RRT Run">
<img src={rrt_g} alt="RRT Goal Run">

# Real World Applications

RRT is commonly applied in motion planning for robotics and autonomous driving where there are numerous dimensions to consider. Linear algebra can be applied to get distances between not only physical objects, but also any sort of reading that you choose to apply it to. Linear algebra, for example, is the basis of artificial intelligence, neural networks, and machine learning. Efficiency in algorithms is what enables further jumps in science not only in areas like autonomous driving, but also in gene and disease research.

# RRT Variations and Concluding Remarks

The RRT implementation introduced here is not optimal, it is the base implementation. Numerous other RRT variations have been introduced over the years that build upon RRT and optimize it to another level of efficiency.

* A*-RRT searches low-dimensional spaces for solutions before moving to higher-dimensions.
* Informed RRT* utilizes an admissable ellipsoidal heuristic for more efficiency.
* RRT with Dynamics utilizes motion dynamics as dimensions to determine feasible motion paths while moving.
* Parallelized RRT utilizes parallelization to search for valid paths in less time.

These are just several examples of how RRT can not only be implemented, but optimized. Being able to traverse multiple dimensions of input and data for optimal paths and states has helped us advance the field of robotics and autonomous driving. What further optimizations can be made, and where will it take us next?

<style>
	img {
		max-width: 80vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>