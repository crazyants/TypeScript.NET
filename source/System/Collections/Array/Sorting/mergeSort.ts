/*!
 * @author Sebastian Belmar / https://github.com/sebabelmar/
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */


import {Primitive} from "../../../Primitive";
import {ArgumentNullException} from "../../../Exceptions/ArgumentNullException";

/**
 * Merge sort O(n log (n))
 * Warning: Uses recursion.
 * @param target
 * @returns {number[]}
 */
export function mergeSort<T extends Primitive>(target:T[]):T[]
{
	if(!target) throw new ArgumentNullException("target");
	return target.length<2 ? target : sort(target, 0, target.length);
}

function sort<T extends Primitive>(
	target:T[],
	start:number,
	end:number,
	temp?:T[]):T[]
{
	if(end - start>1)
	{
		// Step 1: Sort the left and right parts.
		var middle = Math.floor((start + end)/2);
		sort(target, start, middle, temp);
		sort(target, middle, end, temp);

		// Step 2: Copy the original array
		if(temp)
		{
			for(let i = 0, len = target.length; i<len; i++)
			{
				temp[i] = target[i];
			}
		} else {
			temp = target.slice();
		}

		// Step 3: Create variables to traverse
		var k = start, i = start, j = middle;

		// Step 4: Merge: Move from the temp to target integers in order
		while(i<middle && j<end)
		{
			target[k++]
				= temp[i]>temp[j]
				? temp[j++]
				: temp[i++];
		}

		// Step 5: Finalize merging in case right side of the array is bigger.
		while(i<middle)
		{
			target[k++] = temp[i++];
		}

	}

	return target
}