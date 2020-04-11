#!/usr/bin/env node

const program = require('commander');//cmd控制台交互
const ora = require('ora');//进度条
const chalk = require('chalk');//给提示文案着色
const download = require('download-git-repo');//拉去github项目
const fs = require('fs');

// 提示样式
const success = chalk.blueBright;
const error = chalk.bold.red;

const templateUrl = 'direct:https://github.com/chang229/vue.git';//github项目地址

// 替换模板package.json文件的name字段
const changePackage = () => {
    fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
        if (err) throw err;
        let _data = JSON.parse(data.toString());
        _data.name = program.init;
        _data.version = '1.0.0';
        let str = JSON.stringify(_data, null, 4);
        fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
            if (err) throw err;
        })
    });
};

program.version('0.1.0')
  .option('-i, init [name]', '初始化项目')
  .parse(process.argv);

// 拉取项目代码
if (program.init && typeof program.init === "string") {
    const spinner = ora('正在拉取模板...').start();
    download(templateUrl, program.init, { clone: true }, function (err) {
        if (!err) {
            spinner.succeed(success('拉取成功'));
            // 更改 package.json 中的 name 和版本号
            changePackage()
        } else {
            console.log(err);
            spinner.fail('拉取失败');
        }
    });
} else {
    console.error(error('请在init后输入目录名'));
}