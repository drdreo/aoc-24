# ts-aoc-starter

## Running A Solution

Provide your solution in the `day-X/a.ts` file.

Copy and paste your unique actual data set into the `day-X/a.data.txt` file. To run your solution against this data set, run: `nx day-X-a` or `nx X-a` or `nx X`.

You can copy and paste the sample data given in the problem into the `day-X/a.data.sample.txt` file, and run it with the command: `nx day-X-a-sample` or `nx X-a-sample` or `nx X-sample`.

If you want to provide an additional data set, you can create a file following the format: `day-X/a.data.{DATA_SET_NAME}.txt`. You can then run your solution against this data set with the command: `nx day-X-a-{DATA_SET_NAME}` or `nx X-a-{DATA_SET_NAME}`.

Usually, each day is split into two parts, in this template, we call it "part A" and "part B". A `day-X/b.ts` file has been provided for you for the second half of each day, as well as a matching set of `data.txt` files. You can run these with the command: `nx day-X-b` or `nx X-b` (note that `nx X` will always only run 'part A'). The same rules apply for providing sample and additional data sets for part B.

Usually part B builds on the solution for part A. Obviously, if it makes sense, you can just continue to create your solution in the 'part A' files and work on from there, ignoring the 'part B' files.
