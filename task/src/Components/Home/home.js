/****** import statements ********/
import React from 'react';
import './custom.css';


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
        //static header columns
        header:[
          { 0:'text'},{ 1:'num1'}, {2: 'num2'}, {3:'sum'}, {4:'dropdown'}
        ],
        //row enteries
        enteries: [
          { 0:'ffgf', 1: 62, 2:123, 3: '', 4:'' },
          { 0:'', 1: '', 2: '', 3: '', 4:'' },
          { 0:'', 1: '', 2: '', 3: '', 4:'' },
        ]
    };

    //binding 'this' with functions
    this.addCol = this.addCol.bind(this)
    this.addRow = this.addRow.bind(this)
  }


  /***** for updating content in header *****/
  headerChange(index, dataType, value) {
    //mapping header state into newstate
    const newState = this.state.header.map((item, i) => {
      if (i === index) { //if indexes matches
        return {...item, [dataType]: value};
      }
      //return new header
      return item;
    });
    //updating state of initial header to new header
    this.setState({header: newState});
  }
  

  /***** for updating content in rows *****/
  handleChange(index, dataType, value) {
    //mapping enteries state into newstate
    const newState = this.state.enteries.map((item, i) => {
      if (i === index) { //if indexes matches
        return {...item, [dataType]: value};
      }
      //return new enteries
      return item;
    });
    //updating state of initial eneteries to new enteries
    this.setState({enteries: newState});
  }


  /***** adding new rows *****/
  addRow(){
    //initial enteries
    var current = this.state.enteries   
    //calculate total rows in current 'enteries'
    var count = this.state.enteries.length
    //getting results of previous row
    var lastState = this.state.enteries[count-1];
    //number of elements in previous row
    var elements = Object.keys(lastState).length
    //creating new row 
    var newState ={}
    for (var i = 0; i < elements; i++) {  
        newState[i]=""
    }
    //adding new row in initial 'enteries'
    current.push(newState)
    //updating state to new state
    this.setState({enteries: current})
  }


  /******* adding new columns ********/
  addCol(){

    //updating 'header' columns
    //getting initial header 
    var current = this.state.header
    //setting new column
    var newState={}
    //new column set to empty
    newState[current] = ''  
    //adding new column in initial 'header '
    current.push(newState)
    //updating state of 'header'
    this.setState({header: current})


    //updating rows
    //mapping 'enteries' 
    let update = this.state.enteries.map((obj,i)=>{
      //get number of elements in rows
      var number = Object.keys(obj).length
      //assign new colum to rows
      return Object.assign( obj,{ [number]: " "}) 
    });
    //updating state of 'enteries' to new
    this.setState({enteries: update})
  }

 
  render() {

  //checking logs
  console.clear();
  console.log(JSON.stringify(this.state.header));
  console.log(JSON.stringify(this.state.enteries));

  /******* HTML Starts ********/
  return (
    <table className="table table-bordered  exl">
      <thead>
        <tr>
          {this.state.header.map((row, index) => {
            return (
              <th><input onChange={(e) => this.headerChange(index, index, e.target.value)} type='text' className='form-control' value={this.state.header[index][index]}/></th>
            ); 
          }) }
          <th> <input type='button' onClick={this.addCol} className='form-control add-col' 
                  value="Add Column"/> </th>
        </tr>  
      </thead>
      <tbody>
        {this.state.enteries.map((row,index) => {  
          return (
            <tr>
              {Object.keys(row).map((col,j) => {

                if(col == 0){
                  return <td key={j}>
                    <input onChange={(e) => this.handleChange(index, j, e.target.value)} 
                        type='text' className='form-control' 
                        value={this.state.enteries[index][col]}/>
                    </td>
                }

                if(col == 1){
                  return <td key={j}>
                    <input onChange={(e) => this.handleChange(index, j, e.target.value)} 
                        type='number' className='form-control' 
                        value={this.state.enteries[index][col]}/>
                    </td>
                }

                if(col == 2){
                  return <td key={j}>
                    <input onChange={(e) => this.handleChange(index, j, e.target.value)} 
                        type='number' className='form-control' 
                        value={this.state.enteries[index][col]}/>
                    </td>
                }

                if(col == 3){
                  return <td key={j}>
                    <input onChange={(e) => this.handleChange(index, j, e.target.value)} 
                        type='number' className='form-control' 
                        value={parseInt(this.state.enteries[index][1], 10) + parseInt(this.state.enteries[index][2], 10)}/>
                    </td>
                }

                if(col == 4){
                  return <td key={j}>
                    <select onChange={(e) => this.handleChange(index, j, e.target.value)}>
                      <option value="1"> 1</option>
                      <option value="2"> 2</option>
                      <option value="3"> 3</option>
                    </select>
                  </td>
                }
                if(col > 4){
                  return <td key={j}>
                    <input onChange={(e) => this.handleChange(index, j, e.target.value)} 
                        type='text' className='form-control' 
                        value={this.state.enteries[index][col]}/>
                    </td>
                }
              })  }
            </tr>
          ); })}
            <tr>
              <td> 
                <input type="button" className="add-row" onClick={this.addRow} 
                  value="Add Rows"/> 
              </td>
            </tr>
      </tbody>
    </table>
    );
  }
}



 
