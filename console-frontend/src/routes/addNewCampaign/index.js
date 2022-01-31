import './index.css';
import React from 'react'
import withRouter from '../../utils/withRouter'
import CurrencyFormat from 'react-currency-format'
import axios from 'axios'

import { toast } from 'react-toastify';

class AddNewCampaignComp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      publisherId: '123456789',
      bidLimit: 0,
      bidPerConversionType: 0,
      conversionType: 'CPM',
      targeting: 'BR'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrencyFormat = this.handleCurrencyFormat.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
  }

  conversionTypeOptions = [ 'CPM', 'CPC', 'CPI' ]
  targetingOptions = [ 'US', 'BR', 'CA' ]

  publisherOptions = [
    { id: '123456789', value: 'Publisher AAAA' },
    { id: '182917283', value: 'Publisher BBBB' },
    { id: '582739127', value: 'Publisher CCCC' },
    { id: '204829381', value: 'Publisher DDDD' }
  ]

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCurrencyFormat(propName, values) {
    const { value } = values; // formattedValue = $2,223 | value = 2223
    this.setState({[propName]: value})
  }

  async handleSaveEvent() {
    //console.log('state', this.state)

    const result = await this.saveCampaign()
    console.log('Save request result', result)

    const toastConfig = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }

    if(result && result.success) {
      toast.success(`New campaign added!`, toastConfig)
      this.props.router.navigate('/')
    } else {
      toast.error(`Error adding campaign!\n\n${result.message}`, toastConfig)
    }
  }

  async saveCampaign() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/campaign`
      const result = await axios.post(url, this.state)
    
      return { success: true, messsage: '' }
    } catch(err) {
      return { success: false, messsage: err.message }
    }
  }

  render() {
    return (
      <form action="#" method="POST">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-12 sm:col-span-4">
            <label htmlFor="publisherId" className="block text-sm font-medium text-gray-700">
              Publisher
            </label>
            <select
              id="publisherId"
              name="publisherId"
              value={this.state.publisherId}
              onChange={this.handleInputChange}
              autoComplete="publisherId-name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {this.publisherOptions.map((options) => (
                <option value={options.id} key={options.id}>{options.value}</option>
              ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="bidLimit" className="block text-sm font-medium text-gray-700">
              BID Limit
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">R$</span>
              </div>
              <CurrencyFormat
                name="bidLimit"
                id="bidLimit" 
                value={this.state.bidLimit} 
                thousandSeparator={true}
                onValueChange={(values) => this.handleCurrencyFormat('bidLimit', values)} 
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0,00"
                aria-describedby="bidLimit-currency" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="bidLimit-currency">
                  BRL
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="bidLimit" className="block text-sm font-medium text-gray-700">
              BID per Conversion Type
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">R$</span>
              </div>
              <CurrencyFormat
                name="bidPerConversionType"
                id="bidPerConversionType" 
                value={this.state.bidPerConversionType} 
                thousandSeparator={true}
                onValueChange={(values) => this.handleCurrencyFormat('bidPerConversionType', values)} 
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0,00"
                aria-describedby="bidPerConversionType-currency" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="bidPerConversionType-currency">
                  BRL
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="conversionType" className="block text-sm font-medium text-gray-700">
              Conversion Type
            </label>
            <select
              id="conversionType"
              name="conversionType"
              value={this.state.conversionType}
              onChange={this.handleInputChange}
              autoComplete="conversionType-name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {this.conversionTypeOptions.map((options) => (
                <option value={options} key={options}>{options}</option>
              ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="targeting" className="block text-sm font-medium text-gray-700">
              Targeting
            </label>
            <select
              id="targeting"
              name="targeting"
              value={this.state.targeting}
              onChange={this.handleInputChange}
              autoComplete="targeting-name"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {this.targetingOptions.map((options) => (
                <option value={options} key={options}>{options}</option>
              ))}
            </select>
          </div>
          <div className="col-span-12 sm:col-span-6 text-right align-right content-right justify-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={this.handleSaveEvent}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(AddNewCampaignComp)