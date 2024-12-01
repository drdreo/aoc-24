# Advent of Code 2024

## Running A Solution

Provide your solution in the `day-X/a.ts` file.

Copy and paste your unique actual data set into the `day-X/a.data.txt` file. To run your solution against this data set,
run: `deno run day-X/a.ts`.

You can copy and paste the sample data given in the problem into the `day-X/a.data.sample.txt` file, and run it with the
command: `deno run day-X/a.ts --dataset=sample`.

If you want to provide an additional data set, you can create a file following the format:
`day-X/a.data.{DATA_SET_NAME}.txt`. You can then run your solution against this data set with the command:
`deno run day-X/a.ts --dataset={DATA_SET_NAME}`.

Usually, each day is split into two parts, in this template, we call it "part A" and "part B". A `day-X/b.ts` file has
been provided for you for the second half of each day, as well as a matching set of `data.txt` files. The same rules apply for
providing sample and additional data sets for part B.

Usually part B builds on the solution for part A. Obviously, if it makes sense, you can just continue to create your
solution in the 'part A' files and work on from there, ignoring the 'part B' files.
