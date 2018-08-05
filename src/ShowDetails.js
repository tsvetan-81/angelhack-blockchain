import React, { Component } from 'react';

class ShowTasks extends Component{
    constructor(props) {
        super(props);
		
		this.state = {
			show: false,
			table: []
		}
		
		this.createTable = this.createTable.bind(this);
    } 
	
	//create the tbale to be displayed for an array of task details.
	createTable() {
		let arr = this.props.det;
		//arr = [[id,ipfsHash,address],...]
		let tempArr = []		
		//Outer loop - arr.length = no of tasks = no of rows!
		for (let i=0; i<arr.length; i++) {
			let details	= []
			details.push(<td key="{i+0.1}">{arr[i][0]}</td>); //id
            details.push(<td key="{i+0.2}">{arr[i][1]}</td>); //timestamp
            details.push(<td key="{i+0.3}">{arr[i][2]}</td>); //temp
            details.push(<td key="{i+0.4}">{arr[i][3]}</td>); //long
            details.push(<td key="{i+0.5}">{arr[i][4]}</td>); //lat
			
			tempArr.push(details)
			console.log(tempArr);
				//once done, add details to the table array of state.
            this.setState({ table: tempArr});
            this.setState({ show: true});
		} //for loop
	}
	
	componentWillMount() {
		this.createTable();
		//just call it once on display!
	}
	
	render() {
		
		return (        
          <div>     
			<table border = "1">
			  <tbody>
				 <tr>
			       <th>Vaccine ID</th>
				    <th> timestamp</th>			   
				   <th>temperature</th>
				   <th>longitude</th>
				   <th>latitude</th>
				</tr>
				{this.state.show ? this.state.table.map((task,index) => {return <tr key={index}>{task}</tr> }) : <tr></tr> }
			  </tbody>
			</table>
          </div>
        );
    }
}

export default ShowTasks;