#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

// 发起命令行交互
inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Your project name ?'
    }
]).then(answers => {
    console.log(answers);

    // 模板目录
    const tempPath = path.join(__dirname,'templates');

    // 目标目录
    const distDir = process.cwd();

    // 将模板文件写入目标目录
    fs.readdir(tempPath,(error,files) => {
        if(error) throw error;
        files.forEach((file) => {
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(tempPath,file),answers,(err,result) => {
                if(err) throw err;

                fs.writeFileSync(path.join(distDir,file),result);
            })
        })
    })
})