// Environment variables setup
require('dotenv').config()

const Telegraf = require('telegraf')
const {
  start,
  actionBack,
  actionPrices,
  priceActionList,
  actionCryptoPrice,
  botInfo,
  removeKeyboard
} = require('./commands')

const { TELEGRAM_BOT_TOKEN, CRYPTOCOMPARE_API_KEY } = process.env

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

// Start command
bot.start(start)

// Message listeners
bot.hears('Credits', ctx => ctx.reply('This BOT was made by @trugamr'))
bot.hears('API', ctx => ctx.reply('This bot uses cryptocompare API'))
bot.hears('Remove Keyboard', removeKeyboard)

// Actions
bot.action('action_prices', actionPrices)
bot.action('action_back', actionBack)
bot.action('action_info', botInfo)
bot.action(priceActionList, actionCryptoPrice)

// Start polling
bot.launch()
