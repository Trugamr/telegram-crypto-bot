const axios = require('axios')
const url = require('url')

const { CRYPTOCOMPARE_API_KEY } = process.env

// Commands
// start
const startMessage =
  'Welcome, this 🤖 BOT provides information about various crypto currencies.'
const startOptions = {
  parse_mode: 'markdown',
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Crypto Prices', callback_data: 'action_prices' }], // First Row
      [{ text: 'CoinMarketCap', url: 'https://coinmarketcap.com/' }] // Second Row
    ]
  }
}

exports.start = ctx => {
  ctx.reply(`*${startMessage}*`, startOptions)
}

// Actions
// action_prices
const pricesMessage = `Select one of the listed crypto currencies`
const pricesOptions = {
  parse_mode: 'markdown',
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC', callback_data: 'action_price_BTC' },
        { text: 'ETH', callback_data: 'action_price_ETH' }
      ],
      [
        { text: 'BCH', callback_data: 'action_price_BCH' },
        { text: 'LTC', callback_data: 'action_price_LTC' }
      ],
      [{ text: 'Back to Menu', callback_data: 'action_back' }]
    ]
  }
}
exports.actionPrices = ctx => {
  ctx.deleteMessage()
  ctx.reply(`*${pricesMessage}*`, pricesOptions)
}

// action_back
exports.actionBack = ctx => {
  ctx.deleteMessage()
  ctx.reply(`*${startMessage}*`, startOptions)
}

// Crypto prices actions
exports.priceActionList = [
  'action_price_BTC',
  'action_price_ETH',
  'action_price_BCH',
  'action_price_LTC'
]
exports.actionCryptoPrice = async ctx => {
  const symbol = ctx.match.split('_')[2]
  const currency = 'INR'

  try {
    const response = await axios({
      method: 'GET',
      url: `https://min-api.cryptocompare.com/data/pricemultifull`,
      headers: { authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}` },
      params: {
        fsyms: symbol,
        tsyms: currency
      }
    })
    const cryptoData = response.data.DISPLAY[symbol][currency]

    const {
      TOSYMBOL,
      PRICE,
      OPENDAY,
      HIGHDAY,
      LOWDAY,
      SUPPLY,
      MKTCAP
    } = cryptoData

    const message = `
Symbol:  ${symbol} → ${TOSYMBOL} ${currency}
Price:  ${PRICE},
Open:  ${OPENDAY},
High:  ${HIGHDAY},
Low:  ${LOWDAY},
Supply:  ${SUPPLY},
Market Cap:  ${MKTCAP}
    `

    ctx.deleteMessage()
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Back to Prices', callback_data: 'action_prices' }]
        ]
      }
    })
  } catch (error) {
    console.log(`FAILED TO GET DATA FOR ${symbol}: `, error)
  }
}
