import LinkedList from './linkedList.js'

const newLinkedList = new LinkedList()
// console.log(newLinkedList.getValue())
newLinkedList.append('First Data')
newLinkedList.append('Second Data')
newLinkedList.append('Third Data')
newLinkedList.append('Fourth Data')

// console.log(newLinkedList.insertAt('Random Insert Data', 3))

console.log(newLinkedList.removeAt(0))
console.log(newLinkedList.head)
