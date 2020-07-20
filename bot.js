// Environment variables setup
require('dotenv').config()

const Telegraf = require('telegraf')
const {
  start,
  actionBack,
  actionPrices,
  priceActionList,
  actionCryptoPrice
} = require('./commands')

const { TELEGRAM_BOT_TOKEN, CRYPTOCOMPARE_API_KEY } = process.env

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

// Start command
bot.start(start)

// Actions
bot.action('action_prices', actionPrices)
bot.action('action_back', actionBack)
bot.action(priceActionList, actionCryptoPrice)

// Start polling
bot.launch()
