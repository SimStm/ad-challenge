import './index.css';
import axios from 'axios'
import React from 'react'

import { toast } from 'react-toastify'

export default class ListCampaigns extends React.Component {
  activeCampaigns = []
  
  constructor(props) {
    super(props)

    console.log('props', props)
  }
  
  async getActiveCampaigns() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/campaign`
      const result = await axios.get(url)
    
      this.activeCampaigns = (result.data.data ?? [])
    } catch(err) {
      this.activeCampaigns = []
      toast.error(`Error listing current campaigns!\n\n${err.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    this.setState({ activeCampaigns : this.activeCampaigns })

    console.log('state', this.state)
  }
  
  async componentDidMount() {
    await this.getActiveCampaigns()
  }

  formatToCurrency(amount) {
    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount)
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-400 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      Publisher ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      Campaign BID Limit
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      BID per Conversion Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      Conversion Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      Targeting
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                      Total Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.activeCampaigns.map((campaign, campaignIdx) => (
                    <tr key={campaignIdx} className={campaignIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">{campaign.publisherId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{(campaign.bidLimit < 0 ? 'Not set' : this.formatToCurrency(campaign.bidLimit))}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{this.formatToCurrency(campaign.bidPerConversionType)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{campaign.conversionType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 font-bold">{campaign.targeting}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{campaign.performance.totalClicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}