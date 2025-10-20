import {Component} from 'react'
import './index.css'

class Email extends Component {
  state = {
    inputValue: '',
    emailsList: initaialEmailsList,
  }

  inputValue = event => {
    this.setState({inputValue: event.taget.value})
  }

  getData = () => {}

  render() {
    const {initaialEmailsList} = this.props
    const {id, accountId, folder, subject, body, from, to, date, aiCategory} =
      initaialEmailsList

    return (
      <div className='container'>
        <h1 className='heading'>AI Email Onebox</h1>
        <div className='input-container'>
          <input type='search' onChange={this.inputValue} />
          <button className='accountId' onClick={this.getData}>
            {' '}
            accountId
          </button>
          <button className='accountId'>folder</button>
          {emailsList.map(eachItem => {
            eachItem.includes(inputValue)
          })}
        </div>
      </div>
    )
  }
}

export default Email
