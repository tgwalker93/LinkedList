<template>
  <div>
    <h2 style="margin-top: 100px; margin-below: 10px">Add, Edit, Delete, or Read from the Linked List below.</h2>
    <p>What would you like to do?<p>
    
    <form @submit.prevent>
  
      <div class="form-group">
        <div>
        <button type="button" class="btn btn-primary" v-on:click="add=true; edit=false; deleteNode=false; read=false; resetResult()"> Add </button>
        <button type="button" class="btn btn-primary" v-on:click="add=false; edit=true; deleteNode=false; read=false; resetResult()"> Edit </button>
        <button type="button" class="btn btn-primary" v-on:click="add=false; edit=false; deleteNode=true; read=false; resetResult()"> Delete </button>
        <button type="button" class="btn btn-primary" v-on:click="add=false; edit=false; deleteNode=false; read=true; resetResult()"> Read</button>
        </div>
        <br/>

  
        <!-- Add -->
        <input type="text" class="form-control"  v-show="add" @keypress="typing=true" placeholder="Node Name" v-model="addName">
        <!-- End Add -->

        <!-- Edit -->
        <input type="text" class="form-control"  style="margin-bottom:10px;" v-show="edit" @keypress="typing=true" placeholder="Node Name" v-model="editName">
        <input type="text" class="form-control" v-show="edit"  @keypress="typing=true" placeholder="Node Index" v-model="editIndex">

        <!-- End Edit -->


        <!-- Delete -->
        <input type="text" class="form-control" v-show="deleteNode"  @keypress="typing=true" placeholder="Node Index" v-model="deleteIndex">       

        <!-- End Delete -->

        <!-- Read -->
        <input type="text" class="form-control" v-show="read" @keypress="typing=true" placeholder="Node Index" v-model="readIndex">
           
        <!-- End Read -->


        <!-- <span class="help-block small text-center" v-show="typing">Hit enter or click button to submit</span> -->
        <br/>
        <button type="button" class="btn btn-primary" v-show="typing" v-on:click="submit()"> Submit</button>

    
      </div>


    </form>

      <div>
        <h1 id="resultBox"></h1>
      </div>
    <div>

    </div>
    <br/>

  </div>
  
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";
  
  export default {
    data() {
      return {
        typing: false,
        add: false,
        edit: false,
        deleteNode: false,
        read: false,
        addName: "",
        editName: "",
        editIndex: "",
        deleteIndex:"",
        readIndex:"",
        currentNode: "",
        operation: ""
      }
  
    },
  
    methods: {
      name: 'CreateLinkedList',
      submit(event) {
        if (event) event.preventDefault();
        if(this.add) {
          this.operation = "add";
          this.linkedListAPI();

        
        }
        if(this.edit) {
          this.operation = "edit";          
          this.linkedListAPI();          
    

        }
        if(this.deleteNode) {
          this.operation = "delete";          
          this.linkedListAPI();          
         

        }
        if(this.read){
          this.operation = "read";         
          this.linkedListAPI();          
          
        }

      },
      resetResult(){
        document.getElementById("resultBox").innerHTML="";
      },
      linkedListAPI() {

        switch(this.operation){
          case "add":
        let url = '/api/add';
        let param = {
          name: this.addName,
          index: this.addIndex || null,
          done: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          
          this.typing = false;
          this.add = false;
          this. addName=""  
          document.getElementById("resultBox").innerHTML+= "You've added to the linked list successfully.";      
        }).catch((error) => {
          console.log(error);
  
        })
          break;
          case "edit":
        let url2 = '/api/edit';
        let param2 = {
          name: this.editName,
          index: this.editIndex || null,
          done: 0
      };
        axios.post(url2, param2).then((response) => {
          console.log(response);

          this.typing = false;
          this.edit= false;
          this.editName = "";
          this.editIndex = "";
          if(response.data === false) {
            document.getElementById("resultBox").innerHTML+= "Node not found.";
           }else {
          document.getElementById("resultBox").innerHTML+= "Node edited successfully."   
           } 
        }).catch((error) => {
          console.log(error);
  
        })
          break;
          case "delete":
        let url3 = '/api/delete';
        let param3 = {
          index: this.deleteIndex,
          done: 0
      };
        console.log(param3);
        axios.post(url3, param3).then((response) => {
          console.log(response);

          this.typing = false;
          this.deleteNode = false;
          this.deleteIndex = "";
           if(response.data === false) {
            document.getElementById("resultBox").innerHTML+= "Node not found.";             
           }else {
            document.getElementById("resultBox").innerHTML+= "Node Deleted successfully.";     
           }          
        }).catch((error) => {
          console.log(error);
  
        })
          break;
          case "read":
        let url4 = '/api/read';
        let param4 = {
          index: this.readIndex,
          done: 0
      };
        axios.post(url4, param4).then((response) => {
          console.log(response);

          this.typing = false;
          this.read = false;
          this.readIndex = "";
          if(response.data !== false) {
          document.getElementById("resultBox").innerHTML="Node found: " + response.data;
          }else {
            document.getElementById("resultBox").innerHTML="Node not found.";
          }
          this.currentNode = response.data;
        }).catch((error) => {
          console.log(error);
  
        })
          break;

        }
  
  
      },
  
    }
  
  
  }
</script>
<style>

</style>

