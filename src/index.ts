import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config"
import { Telegraf } from "telegraf"

let token = ""
let ids: string[] = []

if (process.env.TELEGRAM_BOT_TOKEN) {
  token = process.env.TELEGRAM_BOT_TOKEN
}
export const bot = new Telegraf("token")

if (process.env.TELEGRAM_ADMIN_CHAT_ID) {
  const hasMultipleIds = process.env.TELEGRAM_ADMIN_CHAT_ID.includes("|")
  if (hasMultipleIds) {
    ids = process.env.TELEGRAM_ADMIN_CHAT_ID.split("|")
  } else {
    ids = [process.env.TELEGRAM_ADMIN_CHAT_ID]
  }
}

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "ssh-mangaer.db",
  entities: ["src/models/*.ts"],
  synchronize: true,
  logging: true,
})
AppDataSource.initialize()
  .then(() => {
    bot.launch()
  })
  .catch((error) => console.log(error))

bot.start((ctx) => {
  const chatId = ctx.chat.id
  if (!ids.includes(chatId.toString())) {
    ctx.reply("شما دسترسی یه ربات را ندارید.")
  } else {
    ctx.reply("سلام مدیر" + ctx.from.first_name + " " + ctx.from.last_name)
  }
})
