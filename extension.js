// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function getPosition() {
  const activeEditor = vscode.window.activeTextEditor;
  const position = activeEditor.selection.active;
  const lineNumber = position.line + 1; // Ajoutez 1 car les lignes sont indexées à partir de 0
  const columnNumber = position.character + 1; // Ajoutez 1 car les colonnes sont indexées à partir de 0

  // Affichez la position dans la console (ou utilisez-la comme vous le souhaitez)
  console.log(
    `Position du curseur : Ligne ${lineNumber}, Colonne ${columnNumber}`
  );
  return position;
}
/**
 * @param {vscode.Position} position
 */
async function setPosition(position) {
  await vscode.commands.executeCommand("cursorTop");
  await vscode.commands.executeCommand("cursorMove", {
    to: "down",
    by: "line",
    value: position.line,
  });
  vscode.commands.executeCommand("cursorMove", {
    to: "right",
    by: "character",
    value: position.character,
  });
}
/**
 * @param {string} tag
 */
async function findTag(tag) {
  const document = vscode.window.activeTextEditor.document;
  if (!document) {
    console.log("error: no doc", document);
    return;
  }

  let findLineStart = 0;
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i).text;
    if (line.startsWith("<" + tag)) {
      findLineStart = i;
      break;
    }
  }
  let findLineEnd = 0;
  for (let i = findLineStart; i < document.lineCount; i++) {
    const line = document.lineAt(i).text;
    if (line.startsWith("</" + tag)) {
      findLineEnd = i;
      break;
    }
  }
  console.log("find line start", findLineStart);
  console.log("find line end", findLineEnd);
  return { findLineStart: findLineStart, findLineEnd: findLineEnd };
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  const scriptTemplateSplit = vscode.commands.registerCommand(
    "vuesplitingroup.scriptTemplateSplit",
    async function () {
      // The code you place here will be executed every time your command is executed
      try {
        const position = await getPosition();
        await vscode.commands.executeCommand("cursorTop");
        await vscode.commands.executeCommand("editor.unfoldAll");
        const findLineScript = await findTag("script");
        const findLineTemplate = await findTag("template");
        if (
          findLineScript.findLineStart <= position.line &&
          position.line <= findLineScript.findLineEnd
        ) {
          console.log("script");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineTemplate.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await vscode.commands.executeCommand(
            "workbench.action.splitEditorInGroup"
          );
          await vscode.commands.executeCommand("editor.unfoldAll");
          await vscode.commands.executeCommand("cursorTop");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineScript.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await setPosition(position);
        } else {
          console.log("template");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineScript.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await vscode.commands.executeCommand(
            "workbench.action.splitEditorInGroup"
          );
          await vscode.commands.executeCommand("editor.unfoldAll");
          await vscode.commands.executeCommand("cursorTop");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineTemplate.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await setPosition(position);
        }
      } catch (error) {
        vscode.window.showErrorMessage(
          "An error has occurred : " + error.message
        );
      }
      // Display a message box to the user
    }
  );

  const styleTemplateSplit = vscode.commands.registerCommand(
    "vuesplitingroup.styleTemplateSplit",
    async function () {
      // The code you place here will be executed every time your command is executed
      try {
        const position = await getPosition();
        await vscode.commands.executeCommand("cursorTop");
        await vscode.commands.executeCommand("editor.unfoldAll");
        const findLineStyle = await findTag("style");
        const findLineTemplate = await findTag("template");
        if (
          findLineStyle.findLineStart <= position.line &&
          position.line <= findLineStyle.findLineEnd
        ) {
          console.log("style");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineTemplate.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await vscode.commands.executeCommand(
            "workbench.action.splitEditorInGroup"
          );
          await vscode.commands.executeCommand("editor.unfoldAll");
          await vscode.commands.executeCommand("cursorTop");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineStyle.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await setPosition(position);
        } else {
          console.log("template");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineStyle.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await vscode.commands.executeCommand(
            "workbench.action.splitEditorInGroup"
          );
          await vscode.commands.executeCommand("editor.unfoldAll");
          await vscode.commands.executeCommand("cursorTop");
          await vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "line",
            value: findLineTemplate.findLineStart,
          });
          await vscode.commands.executeCommand("editor.foldLevel1");
          await setPosition(position);
        }
      } catch (error) {
        vscode.window.showErrorMessage(
          "An error has occurred : " + error.message
        );
      }
      // Display a message box to the user
    }
  );

  const scriptTemplateStyleJoin = vscode.commands.registerCommand(
    "vuesplitingroup.scriptTemplateStyleJoin",
    async function () {
      // The code you place here will be executed every time your command is executed
      try {
        await vscode.commands.executeCommand("editor.unfoldAll");
        await vscode.commands.executeCommand(
          "workbench.action.joinEditorInGroup"
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          "An error has occurred : " + error.message
        );
      }
      // Display a message box to the user
    }
  );

  context.subscriptions.push(
    scriptTemplateSplit,
    styleTemplateSplit,
    scriptTemplateStyleJoin
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
