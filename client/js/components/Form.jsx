import React, { Component, PropTypes } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)
  }
  handleFormSubmit(e) {
    e.preventDefault()
    this.props.onFormSubmit(this.refs)
  }
  render() {
    const { formType, fields } = this.props

    return (
      <form onSubmit={this.handleFormSubmit.bind(this)} className="form">
        {
          fields.map(field => {
            const {inputType, type, label, placeholder} = field
            return (
              <fieldset key={type} className="form-fieldset">
                <label htmlFor={type} className="form-label">{label}</label>
                <input type={inputType} className="form-input" ref={type} id={type} name={type}
                       placeholder={placeholder || ""}/>
              </fieldset>
            )
          })
        }
        <button className="btn btn-blue" type="submit">{formType}</button>
      </form>
    )
  }

}

export default Form