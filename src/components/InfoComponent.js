import React, {Component} from 'react';
import InputComp from './InputComp'

export default class InfoComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info: {
        fullname: "",
        email: "",
        reemail: "",
        phone: null,
        address: "",
        city: "",
        state: "",
        region: "",
        zip: "",
        extraQuestion: ""
      },
      touched: {
        fullname: false,
        email: false,
        reemail: false,
        phone: false,
        address: false,
        city: false,
        state: false,
        region: false,
        zip: false,
        extraQuestion: false
      }
    }
  }

  changeHandler = (event, field) => {
    let info = {...this.state.info}
    info[field] = event.target.value
    this.setState({info})
  }

  blurHandler = (e, field) => {
    let touched = {...this.state.touched};
    touched[field] = true;
    this.setState({touched})
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.submit(this.state.info,'info')
    this.setState({
      info: {
        fullname: "",
        email: "",
        reemail:"",
        phone: null,
        address: "",
        city: "",
        state: "",
        region: "",
        zip: "",
        extraQuestion: ""
    }
    })
    this.props.history.push('/skills')
  }

  validate = (fullname, email, reemail, phone, address, city, region) => {
    const errors = {
      fullname: /^[a-zA-Z ,.'-]{3,30}$/.test(fullname)
        ? ""
        : "only alphabetic characters",
      email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
        ? ""
        : "invalid email address",
      reemail: reemail === email
        ? ""
        : "emails do not match",
      phone: /[(+]*[0-9]+[()+ .-]*/.test(phone)
        ? ""
        : "numbers only",
      address: /^[\w ,.'-]{8,80}$/.test(address)
        ? ""
        : "invalid address",
      city: /^[a-zA-Z ,.'-]{3,30}$/.test(city)
        ? ""
        : "only alphabetic characters",
      region: /^[a-zA-Z ,.'-]{3,30}$/.test(region)
        ? ""
        : "only alphabetic characters"
    }
    return errors;
  }

  isSubmitDisabled = errors => {
    return Object.values(errors).some(errMsg => {
      console.log(errMsg);
      return errMsg;
    })
  }

  render(){
    const {fullname, email, reemail, phone, address, city, state, region, zip, extraQuestion} = this.state.info;
    const errors = this.validate(fullname, email, reemail,phone,address,city,region)
    const inputList = [{name:'fullname', labelText:'Fullname*'},
                       {name:'phone', labelText:'Phones*'},
                       {name:'email', labelText:'Email*'},
                       {name:'reemail', labelText:'Re-enter email*'},
                       {name:'city', labelText:'City*'},
                       {name:'state', labelText:'State'},
                       {name:'region', labelText:'Country/Region*'},
                       {name:'zip', labelText:'Zip/Portal code'},
                       {name:'extraQuestion', labelText:'How did you know about us'}
                      ]

    const checkValid = (field) => {
      if (!this.state.touched[field]){
        return ""
      } else {
        return errors[field]? "invalid" : "valid"
      }
    }

    return(
    <section>
      <h3>1. Personal information</h3>
      <form onSubmit={this.submitHandler}>
      <div className="form-grid">
          {inputList.map((item,i) =>
             <InputComp key={i}
                        name={item.name}
                        value={this.state.info[item.name]}
                        labelText={item.labelText}
                        change={e=>this.changeHandler(e,item.name)}
                        blur={e=>this.blurHandler(e, item.name)}
                        className={checkValid(item.name)}/>
          )}
          <div className="labeltrick address">
            <textarea id="address"
                      name="address"
                      value={address}
                      onChange={e=>this.changeHandler(e,"address")}
                      onBlur={e=>this.blurHandler(e, 'address')}
                      rows={2} defaultValue={""} />
            <label id="address_label" htmlFor="address">Address*</label>
          </div>

        </div>
        <button disabled={this.isSubmitDisabled(errors)}>Next</button>
        </form>
    </section>
    )
  }
}

async function getPerson(){
  const res = await fetch('http://swapi.co/api/people/1');
  const person = await res.json();
  console.log(person)
}
