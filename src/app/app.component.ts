import { Component, OnInit } from '@angular/core';
import {UserviceService} from'./uservice.service';
import {SearchByNamePipe} from './search-by-fname.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(private userviceService : UserviceService){


  }
  users= [];
   results = [];
  ngOnInit(){
   
    this.userviceService.getusers().subscribe(data => this.users = data);


  }

  
   
    
  applyfilter( text, text2) {
 this.results=this.users;
    if(!text && !text2){
       
      alert("please enter user name")

    }
    else if(text){
  
      text = text.toLowerCase();
      
      this.users.filter(item =>{
       
      if(item.firstname.indexOf(text) !== -1){
       this.users =[];
        this.users.push(item);
        
   
      }
      else{
        this.users.forEach(item=> {
         
      
          if(item.firstname.toLowerCase().indexOf(text) == -1){
            this.users=[];
          
          }
         
     
       });
      }
      
    });
  }
    else if(text2){
      text2 = text2.toLowerCase(); 
      this.users.filter(item =>{
    if(item.lastname.indexOf(text2) !== -1) {
            this.users =[];
         this.users.push(item);

          
             
    }
    else{
      this.users.forEach(item=> {
       
    
        if(item.lastname.toLowerCase().indexOf(text2) == -1){
          this.users=[];
        
        }
       
   
     });
    }

      });
      
      
    }
   
    
    
  }
  

  clear(){

    this.users=this.results;
    
    return this.users;
          
    }
  deleterow(index:number) {
         this.users.splice(index, 1).pop();
         
    
 }  
 deleteItem(id:number, index:number) {
  this.userviceService.deleteUser(id).subscribe(response =>{
       this.users.splice(index, 1);
  });
}

delete = function(id) {  
  this.userviceService.deleteUser(id)  
  //.subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )   
  }  
    
  
    
  }  


