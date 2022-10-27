// Write a function that takes in an n x m 2D array(that can be square-shaped when n == m)
// and returns a 1D array of all the array's elements in zig zag order.

// Zigzag order starts at the top left corner of the 2D array, goes down by one element,
// and proceeds in a zig zag pattern all the way to the bottom right corner.

// Sample input:
//              array = [[1,  3,  4, 10],
//                       [2,  5,  9, 11],
//                       [6,  8, 12, 15],
//                       [7, 13, 14, 16],
//                      ]

// Sample output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

//naive approach: initial thoughts are that we can use four pointers, one in each array.
//We can then use a while(length of array) to check if any of the pointers are equal to
//v + 1, where v is the value of the first index we start on, in this case that's
//array[0][0] = 1; We push the value of the first index to a results array, then
//we increment the pointer on the first index by one. Finally, whichever pointer is on
//the index of the value equal to v + 1, we'll then push that value to the results index
//and increment the pointer on that index by one and repeat the process. The loop is done
//once we've traversed through the entire input array. By using this method I think we
//can achieve a linear time complexity of O(n) where n is the size of the input array.
//The space complexity will also be linear O(n) also basing n on the size of the input
//array.

//After working at this approach for a while, I ran into some complications involving
//how to declare a pointer per nested array. I attempted a for loop to declare a pointer
//for each nested array at each index, but to no avail. The below alternative seems much
//more sound, albeit how complicated the logic and code might be.

//With the below approach, we declare these variables at the outset and run a while loop
//that will keep us within the bounds of the 2D array. Within that loop, we will check
//whether isGoingDown is true or false. Depending on what its value is, we will go "up"
//or traverse the 2D array going down. Then we traverse in the given directiion, pushing
//each of the values at each of these indeces until we traverse the entire 2D array. The
//runtime for this approach is actually the same as stated above, since we're really only
//ever running one loop.

//O(n) time | O(n) space complexity

function zigzagTraverse(array) {
  const height = array.length - 1;
  const width = array[0].length - 1;
  const result = [];
  let row = 0;
  let col = 0;
  let goingDown = true;

  while (!isOutOfBounds(row, col, height, width)) {
    result.push(array[row][col]);
    if (goingDown) {
      if (col === 0 || row === height) {
        goingDown = false;
        if (row === height) {
          col++;
        } else {
          row++;
        }
      } else {
        row++;
        col--;
      }
    } else {
      if (row === 0 || col === width) {
        goingDown = true;
        if (col === width) {
          row++;
        } else {
          col++;
        }
      } else {
        row--;
        col++;
      }
    }
  }
  return result;
}

function isOutOfBounds(row, col, height, width) {
  return row < 0 || row > height || col < 0 || col > width;
}
