const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const cleanMessages = require("../helpers/cleaner");
const getLocations = require("../helpers/getLocations");

module.exports = (bot, I18n) => {
  const locationsScene = new Scene("locations");

  locationsScene.enter(async (ctx) => {
    cleanMessages(ctx);
    ctx.session.message_filter.push((await ctx.message).message_id);

    let message = ctx.i18n.t("mainMenuLocations");

    ctx.session.locationsMenuMarkup = [
      [`${ctx.i18n.t("LocationsMenuBuy")}`],
      [`${ctx.i18n.t("mainMenuBack")}`],
    ];

    const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: ctx.session.locationsMenuMarkup,
        resize_keyboard: true,
        // one_time_keyboard: true
      },
    });

    ctx.session.message_filter.push((await msg).message_id);
  });

  locationsScene.hears(I18n.match("LocationsMenuBuy"), async (ctx) => {
    cleanMessages(ctx);
    ctx.session.message_filter.push((await ctx.message).message_id);

    const locations = await getLocations();

    if (!_.isEmpty(locations)) {
      locations.map(async (el) => {
        if (!_.isEmpty(el.location)) {
            //TODO: need to implement it18n for rus and uzb
          bot.telegram.sendMessage(
            ctx.chat.id,
            `${ctx.i18n.t("LocationsMenuBuy")}`,
            {
              parse_mode: "HTML",
              reply_markup: {
                keyboard: ctx.session.locationsMenuMarkup,
                resize_keyboard: true,
                // one_time_keyboard: true
              },
            }
          );
        }
      });
    } else {
      //
    }
    const msg = bot.telegram.sendMessage(
      ctx.chat.id,
      `${ctx.i18n.t("LocationsMenuBuy")}`,
      {
        parse_mode: "HTML",
        reply_markup: {
          keyboard: ctx.session.locationsMenuMarkup,
          resize_keyboard: true,
          // one_time_keyboard: true
        },
      }
    );
    ctx.session.message_filter.push((await msg).message_id);
  });

  locationsScene.hears(I18n.match("mainMenuBack"), (ctx) => {
    return ctx.scene.enter("mainMenu", {
      start: ctx.i18n.t("mainMenu"),
    });
  });

  return locationsScene;
};
