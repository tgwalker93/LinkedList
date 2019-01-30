'use strict'

var express = require('express')

var linkedListRoutes = express.Router()


function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.size = function () {
    return length;
  };

  this.head = function () {
    return head;
  };

  this.add = function (element) {
    var node = new Node(element);
    if (head === null) {
      head = node;
    } else {
      var currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.remove = function (element) {
    var currentNode = head;
    var previousNode;
    if (currentNode.element === element) {
      head = currentNode.next;
    } else {
      while (currentNode.element !== element) {
        if (currentNode == null) {
          return false;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }

    length--;
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.indexOf = function (element) {
    var currentNode = head;
    var index = -1;

    while (currentNode) {
      index++;
      if (currentNode.element === element) {
        return index;
      }
      currentNode = currentNode.next;
    }

    return -1;
  };

  this.elementAt = function (index) {
    var currentNode = head;
    var count = 0;
    while (count < index) {
      count++;
      if(currentNode==null){
        return false;
      }
      currentNode = currentNode.next
    }
    if(currentNode === null){
      return false;
    }
    return currentNode.element;
  };


  this.addAt = function (index, element) {
    var node = new Node(element);

    var currentNode = head;
    var previousNode;
    var currentIndex = 0;

    if (index > length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        if (currentNode == null) {
          return false;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if(node === undefined || previousNode == undefined){
        return false;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    length++;
  }

  this.edit = function (index, element) {
    var node = new Node(element);

    var currentNode = head;
    var previousNode;
    var currentIndex = 0;

    if (index > length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        if (currentNode == null) {
          return false;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if (node === undefined || previousNode == undefined) {
        return false;
      }
      node.next = null;      
      previousNode.next = node;
    }
    length++;
  } 
  this.removeAt = function (index) {
    var currentNode = head;
    var previousNode;
    var currentIndex = 0;
    if (index < 0 || index >= length) {
      return null
    }
    if (index === 0) {
      head = currentNode.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        if (currentNode == null) {
          return false;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next
    }
    length--;
    return currentNode.element;
  }

}

var linkedList = new LinkedList();






// add a node
linkedListRoutes.route('/add').post(function (req, res) {
  linkedList.add(req.body.name);
  res.json(linkedList.head().element);



})

// delete a node
linkedListRoutes.route('/delete').post(function (req, res, next) {

  if(linkedList.elementAt(req.body.index)===false){
    res.json(false);
  }else {
    res.json(linkedList.removeAt(req.body.index));
  }



})

// edit a node
linkedListRoutes.route('/edit').post(function (req, res, next) {

  if (linkedList.elementAt(req.body.index) === false) {
    res.json(false);
  } else {

    res.json(linkedList.edit(req.body.index, req.body.name));
  }

})


// read a node
linkedListRoutes.route('/read').post(function (req, res, next) {
  
  res.json(linkedList.elementAt(req.body.index));
})

module.exports = linkedListRoutes
