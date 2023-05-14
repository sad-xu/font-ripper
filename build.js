process.env.NODE_ENV = "production";
process.env.GENERATE_SOURCEMAP = "false";

const rewire = require("rewire");
const defaults = rewire("react-scripts/scripts/build.js");
const config = defaults.__get__("config");
// const chalk = require('chalk')

// 进度展示
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const green = (text) => {
//   return chalk.green.bold(text)
// }
// config.plugins.push(
//   new ProgressBarPlugin({
//     format: `${green(`打包${shouldAnalyze ? '并分析' : ''}中...`)} ${green(
//       '[:bar]'
//     )}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`
//   })
// )
