﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

import {areEqual} from "../../Compare";
import {Type} from "../../Types";
import {Functions} from "../../Functions";
import {EnumeratorBase} from "../Enumeration/EnumeratorBase";
import {LinkedNodeList} from "../LinkedNodeList";
import {ObjectPool} from "../../Disposable/ObjectPool";
import {IMap} from "./IDictionary";
import {IKeyValuePair} from "../../KeyValuePair";
import {IEnumerator} from "../Enumeration/IEnumerator";
import {ILinkedNode} from "../ILinkedListNode";
import {Selector} from "../../FunctionTypes";
import DictionaryBase from "./DictionaryBase";
import __extendsImport from "../../../extends";
// noinspection JSUnusedLocalSymbols
const __extends = __extendsImport;

const VOID0:any = void 0;


export interface IHashEntry<TKey, TValue>
extends ILinkedNode<IHashEntry<TKey, TValue>>, IKeyValuePair<TKey,TValue>
{

}
// LinkedList for Dictionary
class HashEntry<TKey, TValue>
implements IHashEntry<TKey, TValue>
{
	constructor(
		public key:TKey,
		public value:TValue,
		public previous?:IHashEntry<TKey, TValue>|null,
		public next?:IHashEntry<TKey, TValue>|null)
	{

	}
}

type HashEntryLinkedList<TKey,TValue> = LinkedNodeList<IHashEntry<TKey,IHashEntry<TKey,TValue>>>;

var linkedListPool:ObjectPool<LinkedNodeList<any>>;
function linkedNodeList():LinkedNodeList<any>;
function linkedNodeList(recycle?:LinkedNodeList<any>):void;
function linkedNodeList(recycle?:LinkedNodeList<any>):LinkedNodeList<any>|void
{
	if(!linkedListPool)
		linkedListPool
			= new ObjectPool<LinkedNodeList<any>>(20, ()=>new LinkedNodeList<any>(), r=>r.clear());
	if(!recycle) return linkedListPool.take();
	linkedListPool.add(recycle);
}

// static utility methods
function callHasOwnProperty(target:any, key:string)
{
	return Object.prototype.hasOwnProperty.call(target, key);
}

const NULL = "null", GET_HASH_CODE = "getHashCode";
function getHashString(obj:any):string
{
	if(obj===null) return NULL;
	if(obj===VOID0) return Type.UNDEFINED;

	// See IHashable.
	if(Type.hasMemberOfType(obj, GET_HASH_CODE, Type.FUNCTION))
	{
		return (<any>obj).getHashCode();
	}

	return (typeof obj.toString==Type.FUNCTION)
		? obj.toString()
		: Object.prototype.toString.call(obj);
}


export class Dictionary<TKey, TValue> extends DictionaryBase<TKey, TValue>
{
	// Retains the order...
	private _entries:LinkedNodeList<IHashEntry<TKey, TValue>>;
	private _buckets:IMap<LinkedNodeList<IHashEntry<TKey, IHashEntry<TKey, TValue>>>>;

	constructor(
		private _keyComparer:Selector<TKey,any> = Functions.Identity)
	{
		super();
		this._entries = linkedNodeList();
		this._buckets = {};
	}

	protected getCount():number
	{
		return this._entries.unsafeCount;
	}


	private _getBucket(
		hash:string,
		createIfMissing?:boolean):HashEntryLinkedList<TKey,TValue>|null
	{
		if(hash===null || hash===VOID0 || !createIfMissing && !this.getCount())
			return null;

		var buckets = this._buckets;
		var bucket = callHasOwnProperty(buckets, hash) ? buckets[hash] : VOID0;

		if(createIfMissing && !bucket)
			buckets[hash]
				= bucket
				= linkedNodeList();

		return bucket;
	}

	private _getBucketEntry(
		key:TKey,
		hash?:string,
		bucket?:HashEntryLinkedList<TKey,TValue>|null):IHashEntry<TKey,IHashEntry<TKey,TValue>>|null
	{
		if(key===null || key===VOID0 || !this.getCount())
			return null;

		var _          = this,
		    comparer   = _._keyComparer,
		    compareKey = comparer(key);

		if(!bucket) bucket = _._getBucket(hash || getHashString(compareKey));

		return bucket
			&& bucket.find(e=>comparer(e.key)===compareKey);
	}

	protected _getEntry(key:TKey):IHashEntry<TKey,TValue>|null
	{
		var e = this._getBucketEntry(key);
		return e && e.value;
	}

	getValue(key:TKey):TValue
	{
		var e = this._getEntry(key);
		return e ? e.value : VOID0;
	}

	protected _setValueInternal(key:TKey, value:TValue):boolean
	{
		var _           = this,
		    buckets     = _._buckets,
		    entries     = _._entries,
		    comparer    = _._keyComparer,
		    compareKey  = comparer(key),
		    hash        = getHashString(compareKey),
		    bucket      = _._getBucket(hash),
		    bucketEntry = bucket && _._getBucketEntry(key, hash, bucket);

		// Entry exits? Delete or update
		if(bucketEntry)
		{
			var b = <HashEntryLinkedList<TKey,TValue>>bucket;
			if(value===VOID0)
			{
				let x = b.removeNode(bucketEntry),
				    y = entries.removeNode(bucketEntry.value);

				if(x && !b.count)
				{
					delete buckets[hash];
					linkedNodeList(b);
					bucket = null;
				}

				if(x!==y) throw "Entries and buckets are out of sync.";

				if(x) return true;
			}
			else
			{
				// We don't expose the internal hash entries so replacing the value is ok.
				var old = bucketEntry.value.value;
				bucketEntry.value.value = value;
				return !areEqual(value, old);
			}

		}
		else if(value!==VOID0)
		{
			if(!bucket) bucket = _._getBucket(hash, true);
			if(!bucket) throw new Error(`"${hash}" cannot be added to lookup table.`);
			let entry = new HashEntry(key, value);
			entries.addNode(entry);
			bucket.addNode(new HashEntry(key, entry));
			return true;
		}

		return false;
	}

	protected _clearInternal():number
	{
		const _ = this;
		var buckets = _._buckets;

		// Ensure reset and clean...
		for(let key in buckets)
		{
			if(buckets.hasOwnProperty(key))
			{
				let bucket = buckets[key];
				delete buckets[key];
				linkedNodeList(bucket);
			}
		}

		return _._entries.clear();
	}

	/*
	 * Note: super.getEnumerator() works perfectly well,
	 * but enumerating the internal linked node list is much more efficient.
	 */
	getEnumerator():IEnumerator<IKeyValuePair<TKey, TValue>>
	{
		const _ = this;
		var ver:number, currentEntry:IHashEntry<TKey, TValue>|null;

		return new EnumeratorBase<IKeyValuePair<TKey, TValue>>(
			() =>
			{
				ver = _._version;
				currentEntry = _._entries.first;
			},
			(yielder) =>
			{
				if(currentEntry)
				{
					_.assertVersion(ver);
					var result = {key: currentEntry.key, value: currentEntry.value};
					currentEntry = currentEntry.next || null;
					return yielder.yieldReturn(result);
				}
				return yielder.yieldBreak();
			}
		);
	}


	protected getKeys():TKey[]
	{
		const _ = this;
		var result:TKey[] = [];
		var e:any = _._entries.first;
		while(e)
		{
			result.push(e.key);
			e = e.next;
		}
		return result;
	}

	protected getValues():TValue[]
	{
		const _ = this;
		var result:TValue[] = [];
		var e:any = _._entries.first;
		while(e)
		{
			result.push(e.value);
			e = e.next;
		}
		return result;
	}

}

export default Dictionary;