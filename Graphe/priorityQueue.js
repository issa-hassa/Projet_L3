class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
class priorityQueue{
    constructor(){
        this.elements = [];
        //this.taille = 0;

    }
    isEmpty() {
      return this.container.length === 0;
    }
    isFull() {
      return this.container.length >= this.maxSize;
    }
    enqueue(element,priority){
       
        let queueElement = new QueueElement(element, priority);
        let contain = false;
         for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].priority > queueElement.priority) {
                this.elements.splice(i, 0, queueElement);
                contain = true;
                break;
            }
        }
        /* if the input element has the highest priority push it to end of the queue */
        if (!contain) {
            this.elements.push(queueElement);
        }
    }
    dequeueFunction() {
        /* returns the removed element from priority queue. */
        if (this.isPriorityQueueEmpty()) {
            return undefined;
        }
        return this.elements.shift().element;
    }
    contains(n){
        for (const e of this.elements) {
            if(e.element ===n) return true;
        }
        return false;
    }
    isPriorityQueueEmpty() {
        /* Checks the length of the queue */
        return this.elements.length === 0;
    }

}