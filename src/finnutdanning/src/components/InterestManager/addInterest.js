import React,{Component} from 'react';
import {withAuthorization} from '../Session';

const INITIAL_STATE={
    interest:"",
    mapping:["","","","",""],
};

class AddInterest extends Component{
    constructor(props){
        super(props);
        this.state={
            interest:"",
            mapping:["","","","",""],
        };
        this.submit=this.submit.bind(this);
        this.interestChange=this.interestChange.bind(this);
        this.mapChange=this.mapChange.bind(this);
    }

    //Fjerner tomme elementer fra listen og skriver til firebase
    submit(event){
        const {mapping}=this.state;
        var mappingfilter=mapping.filter(elem=>elem!=="");
        event.preventDefault();
        this.props.firebase.interest(this.state.interest).set({
            hits:0,
            studies: mappingfilter,
        }).then(()=>this.setState({...INITIAL_STATE}))
            .catch(error=>console.log(error))
    }

    //Lagrer verdi i inputfelt for navn på interesse
    interestChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    //Lagrer verdi i inputfelt for studieretning
    mapChange(event,index){
        const mapping=[...this.state.mapping];
        mapping[index]=event.target.value;
        this.setState({mapping});
    }

    //Mapper arrays i state og gir input-felt for disse som fylles ut.
    InputMap(mapping){
        return(
            <div className="interestMappings">
        {mapping.map((mapp,index)=>
            <input name="mapping" type="text" onChange={(event)=>this.mapChange(event,index)} value={this.state.mapping[index]} placeholder="Studieretning"/>
        )}
            </div>)
    }

    render(){
        const {mapping}=this.state;
        const inputMap=this.InputMap(mapping);
        const isValid=mapping[0]!==""||mapping[1]!==""||mapping[2]!==""||mapping[3]!==""||mapping[4]!=="";
        return(
            <div className="addInterestFields">
                <form onSubmit={this.submit}>
                    <label>Interesse:</label><br/>
                    <input name="interest" type="text" onChange={this.interestChange} value={this.state.interest} placeholder="Interesse"/><br/>
                    <label>Studieretninger: </label><br/>
                    {inputMap}
                    <button disabled={!isValid}>Legg til</button>
                </form>
            </div>
        )
    }
}

const condition=authUser=>! !authUser; {/*authUser.role===ROLES.COUNSELOR||authUser.role===ROLES.EMPLOYEE;*/}
export default withAuthorization(condition)(AddInterest);