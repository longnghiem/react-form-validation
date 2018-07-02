import React, {Component} from 'react';

export default class Portfolio extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolio:'',
      touched: false
    }
  }

  blurHandler = e => {
    let touched = {...this.state.touched}
    touched: true;
    this.setState({touched})
  }

  changeHandler = e => {
    let portfolio = {...this.state.portfolio}
    portfolio = e.target.value
    this.setState({portfolio})
  }

  validate = (portfolio) => {
    const error = {
      portfolio: /https?:\/\/[^\s]+/.test(portfolio)
        ? ""
        : "invalid link"
    }
  }

  render(){
    const error = this.validate(this.state.portfolio)
    const checkValid = () => {
      if (!this.state.touched){
        return ""
      } else {
        return error? "invalid" : "valid"
      }
    }


    return(
    <section>
      <h3>3. Portfolio</h3>
      <form>
        <p>tamen quid eram tempor sint malis dolor culpa quem quem quem export tamen sint
          dolore legam cillum amet multos fore nulla noster fugiat noster quae illum quis
          fore quem duis</p>
        <div className="labeltrick portfolio">
          <input id="portfolio"
                 name="portfolio"
                 onBlur={e => this.blurHandler(e)}
                 onChange={e=>this.changeHandler(e)}
                 value={this.state.portfolio}/>
               <label htmlFor="portfolio" className={checkValid()}>Portfolio link*</label>
        </div>
        <textarea type="text" placeholder="Anything else (another link, availability, ect.)?" id="anything-else" rows={4} pattern="^[a-zA-Z ,.'-]+$" defaultValue={""} />
        <button type="submit">Submit</button>
        </form>
    </section>

  )
  }
}
