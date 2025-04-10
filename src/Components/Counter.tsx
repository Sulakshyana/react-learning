import { useState } from "react";
 function Counter (){
     const [count, setcount]=useState(0);
     const MinCount = -10;
     const MaxCount = 10
     function  addcount(){
         setcount(prevcount=>{
            if (prevcount<MaxCount){
           return prevcount+1;
     }else{
        return prevcount;
        window.alert("you cannot add more than 10 todos")
     }
    }
    );
     }
     function subtractcount(){
         setcount(prevcount=>{
            if (prevcount > MinCount){
                return prevcount-1;
            }else{
            window.alert("Sorry! You cannot go below -10 todos");
            return prevcount;
            }
        }
            
        );
    }
     return(
         <div>
         <div className="row justify-content-end">
         <div className="col-4 d-flex justify-content-end mx-2">
         <h3 className="justify-content-center">Completed Task {count}</h3>
         </div>
         <div className="col-4 d-flex justify-content-end mx-2">
             <button className="me-2"  onClick={addcount}><i className="bi bi-plus-lg fs-2"></i></button>
             <button onClick={subtractcount}><i className="bi bi-dash-lg fs-2"></i></button>
             </div>
         </div>
         </div>
     );
 }
 
 export default Counter;