import React, {Component} from 'react';
import CheckboxComp from './CheckboxComp'
import RadioComp from './RadioComp'

export default class Skills extends Component{
  constructor(props){
    super(props)
    this.state = {
      otherDisciplines: [],
      location: [],
      primaryDisciplines: 'design-research'
    }
  }

  validate = (otherDisciplines, location) => {
    const errors = {
      otherDisciplines: otherDisciplines.length ? "" : "Please pick at least one option",
      location: location.length ? "" : "Please pick at least one option"
    }
    return errors
  }

  handleCheck = (e, category) => {
    const value = e.target.value;
    const index = this.state[category].indexOf(value);

    index === -1
      ? this.setState(prevState => ({[category]: [...prevState[category], value]}))
      : this.setState(prevState =>{
        return {
          [category]: [
            ...prevState[category].slice(0,index),
            ...prevState[category].slice(index+1)
          ]
        }
      })
  }

  handleRadio = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.submit(this.state,'skills');
    this.props.history.push('/portfolio')
    this.setState({
      otherDisciplines: [],
      location: [],
      primaryDisciplines: 'design-research'
    })
  }

  isSubmitDisabled = errors => {
    return Object.values(errors).some(errMsg => {
      console.log(errMsg);
      return errMsg;
    })
  }

  render(){
    const {otherDisciplines, location, primaryDisciplines} = this.state
    const errors = this.validate(otherDisciplines, location);
    const otherDisciplinesList = [{name: 'other-visual-design', text:'Visual Design'},
                                  {name: 'other-ux-design', text: 'UX Design'},
                                  {name: 'other-frontend-dev', text: 'Front-end Development'}
                                  ]
    const locationList = ['Austin, Texas','New York, New York','Toronto, Canada','Shanghai, China','Somewhere else']
    const primaryDisciplinesList=[
                                {id:"design-research", name:"primaryDisciplines", label:"Design Research"},
                                {id:"visual-design", name:"primaryDisciplines", label:"Visual Design"},
                                {id:"ux-design", name:"primaryDisciplines", label:"UX Design"},
                                {id:"frontend-dev", name:"primaryDisciplines", label:"Front-end Dev"},
                              ]
    return(
      <section>
        <h3>2. Skills and location</h3>
        <form onSubmit={this.submitHandler}>
          <div className="skill-location">
            <div className="skill-location-1">
              <p>Which is your primary design discipline?*</p>
              <ul>
                {primaryDisciplinesList.map((item,i)=>
                  <RadioComp key={i}
                             id={item.id}
                             name={item.name}
                             label={item.label}
                             checked={primaryDisciplines===item.id}
                             changed={e=>this.handleRadio(e, item.name)} />
                )}
              </ul>
            </div>
            <div className="skill-location-2">
              <p>Do you have experience with any other disciplines?</p>
              <ul>
                {otherDisciplinesList.map((item,i) =>
                  <CheckboxComp key={i}
                                name={item.name}
                                text={item.text}
                                change={e=>this.handleCheck(e, 'otherDisciplines')}
                                checked={otherDisciplines.includes(item.name)}
                                category='otherDisciplines'/>
                )}
              </ul>
              <div className="err-msg">{errors.otherDisciplines}</div>
            </div>

            <div className="skill-location-3">
              <p>Where are you interested in working?*</p>
              <p className="subtext">malis veniam sunt sunt irure quid amet labore nisi magna quis noster nisi sunt
                aute dolor elit elit sunt enim</p>
              <ul>
                {locationList.map((item,i)=>
                  <CheckboxComp key={i}
                                name={item}
                                text={item}
                                change={e=>this.handleCheck(e, 'location')}
                                checked={location.includes(item)}
                                category='location'/>
                )}

              </ul>
              <div className="err-msg">{errors.location}</div>
            </div>
          </div>
          <button disabled={this.isSubmitDisabled(errors)}>Next</button>
        </form>


      </section>

    )
  }
}
