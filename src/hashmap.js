import { Node } from "./node.js";

class HashMap {
    #buckets = [];
    #head = null;
    #loadFactor = 0.75;
    #capacity = 16;
    #entriesCount = 0; 

    constructor() {
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }
        console.log(key,hashCode);
        return hashCode;
    }

    //only problem now is moving the index to the right place
    // or either move it into the growth factor to populate it 
    set(key, value) {
        let index = this.hash(key);

        if(index < 0 || index >= this.#capacity){
            throw new Error("Trying to access index out of bounds");
        } 
              
        if(this.#buckets[index] !== undefined){
            this.#head = this.#buckets[index];
            
            //start traversing the linked list if its not the first node
            while(this.#head !== null){
                //update if the key/value pair is not the first occurence in the bucket
                if(this.#head.key === key ){
                    this.#head.value = value;
                    return;
                } 
                this.#head = this.#head.next;
            }
            //update if there's only one key/value pair in the bucket
            if(this.#head.key === key && this.#head.hashCode === index){
                this.#head.value = value;
                return;
            }

            if(this.handleHashMapGrowth()){
                //store it in new index if load level has been exceeded
                index = this.hash(key);
    
                this.#head = this.#buckets[index];

                if(this.#head === undefined) {
                    this.#buckets[index] = new Node(index, key, value, null);
                    return;
                }
                while(this.#head.next !== null){
                    this.#head = this.#head.next;
                }
                this.#head.next = new Node(index, key, value, null);
            } else {
                this.#head.next = new Node(index, key, value, null);
            }
        } else {
            if(this.handleHashMapGrowth()){
                index = this.hash(key);
                this.#buckets[index] = new Node(index, key, value, null);
            } else {
                this.#buckets[index] = new Node(index, key, value, null);
            }
        }
    }

    get(key) {
        let index = this.hash(key);
        this.#head = this.#buckets[index];

        if(this.#head.key === key){
            return this.#head.value;
        } else {
            while(this.#head.next !== null){
                this.#head = this.#head.next;

                if(this.#head.key === key){
                    return this.#head.value;
                }
            }
            return null;
        }
    }

    has(key){
        let index = this.hash(key);
        this.#head = this.#buckets[index];

        if(this.#head.key === key){
            return true;
        } else {
            while(this.#head.next !== null){
                this.#head = this.#head.next;

                if(this.#head.key === key) {
                    return true;
                }
            }
            return false;
        }
    }
    
    length(){
        let keyCount = 0;

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];
            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                   keyCount++;
                   bucketInd = bucketInd.next;
                }
                keyCount++;
            }
        }
        return keyCount;
    }

    clear() {
        this.#buckets = [];
        this.#capacity = 16;
    }

    keys(){
        let allKeys = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allKeys.push(bucketInd.key);
                    bucketInd = bucketInd.next;
                }
                allKeys.push(bucketInd.key);
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allValues.push(bucketInd.value);
                    bucketInd = bucketInd.next;
                }
                allValues.push(bucketInd.value);
            }
        }
        return allValues;
    }

    entries() {
        let allKeysAndValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allKeysAndValues.push([bucketInd.key, bucketInd.value]);
                    bucketInd = bucketInd.next;
                }
                allKeysAndValues.push([bucketInd.key, bucketInd.value]);
            }
        } 
        return allKeysAndValues;
    }

    handleHashMapGrowth(){
        this.#entriesCount++;
        let loadLevel = Math.round(this.#loadFactor * this.#capacity);

        if(loadLevel < this.#entriesCount){
            this.#capacity *= 2;
            let tmpBucketArr = [];
            let newIndex = undefined;
    
            for(let i = 0; i < this.#buckets.length; i++){
                let node = this.#buckets[i];
    
                if(node === undefined) continue;
    
                //multiple nodes in the bucket
                while(node.next !== null){
                    newIndex = this.hash(node.key);
                   // console.log(node.key,newIndex)
                    tmpBucketArr[newIndex] = new Node(newIndex, node.key, node.value, node.next);
                    node = node.next;
                }
                //only node in the bucket
                newIndex = this.hash(node.key);
               // console.log(node.key,newIndex)
                tmpBucketArr[newIndex] =  new Node(newIndex, node.key, node.value, node.next);
            }
            this.#buckets = tmpBucketArr;
            return true;
        }
        return false;
    }
}

export {HashMap};