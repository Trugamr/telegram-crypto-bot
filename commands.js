const axios = require('axios')

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
exports.actionPrices = ctx => {
  const priceMessage = `Select one of the listed crypto currencies`
  ctx.deleteMessage()
  ctx.reply(`*${priceMessage}*`, {
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
  })
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
exports.actionCryptoPrice = ctx => {
  const currency = ctx.match.split('_')[2]
}
