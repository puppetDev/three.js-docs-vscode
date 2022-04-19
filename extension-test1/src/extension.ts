// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	TextDocument,
	Position
} from 'vscode';

function provideHover(document: TextDocument, position: Position) {
	return {
		contents: ['Hover Content']
	};
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// 此行代码仅在激活扩展时执行一次
	console.log('Congratulations, your extension "test-vscode" is now active!');

	// 入口命令已经在package.json文件中定义好了，现在调用registerCommand方法
	// registerCommand中的参数必须与package.json中的command保持一致
	let disposable = vscode.commands.registerCommand('testHello', () => {
		// 把你的代码写在这里，每次命令执行时都会调用这里的代码
		// ...
		// 给用户显示一个消息提示
		vscode.window.showInformationMessage('Hello World!');
	});
	context.subscriptions.push(disposable);
	//获取配置
	const config = vscode.workspace.getConfiguration(
		'myExtension',
	);
	// retrieve values
	const values = config.get('switchTest');
	console.log(values);

	const selector = [];
	for (const language of ['javascript', 'vue']) {
		selector.push({
			language,
			scheme: 'file'
		});
		selector.push({
			language,
			scheme: 'untitled'
		});
	}
	// 注册鼠标悬停提示
	let disposable2 = vscode.languages.registerHoverProvider(selector, {
		provideHover
	});
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}