import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

// Parse command line arguments (--file, --symbol)
function parseArgs() {
    const args = process.argv.slice(2);
    let filePath = '';
    let symbolName = '';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--file' && args[i + 1]) {
            filePath = args[i + 1];
        } else if (args[i] === '--symbol' && args[i + 1]) {
            symbolName = args[i + 1];
        }
    }

    if (!filePath || !symbolName) {
        console.error('❌ Usage: npx ts-node scripts/slice-context.ts --file <file_path> --symbol <symbol_name>');
        process.exit(1);
    }

    return { filePath: path.resolve(filePath), symbolName };
}

// Slice exact code block using TypeScript AST
function sliceSymbol(filePath: string, symbolName: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
    }

    const code = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
        filePath,
        code,
        ts.ScriptTarget.Latest,
        true
    );

    let extractedCode = '';
    const imports: string[] = [];

    function visit(node: ts.Node) {
        // 1. Collect import statements for context
        if (ts.isImportDeclaration(node)) {
            imports.push(node.getText(sourceFile));
        }

        // 2. Extract specific Method, Function, or Class
        if (
            (ts.isMethodDeclaration(node) ||
                ts.isFunctionDeclaration(node) ||
                ts.isClassDeclaration(node)) &&
            node.name?.getText(sourceFile) === symbolName
        ) {
            extractedCode = node.getText(sourceFile);
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (!extractedCode) {
        console.error(`⚠️ Symbol '${symbolName}' not found in ${filePath}`);
        process.exit(1);
    }

    // Build minimal sliced context output
    const relativePath = path.relative(process.cwd(), filePath);
    const markdownOutput = `
### ✂️ Context Slice: \`${symbolName}\`
**Source File:** \`${relativePath}\`

#### Relevant Imports:
\`\`\`typescript
${imports.join('\n')}
\`\`\`

#### Target Symbol Code:
\`\`\`typescript
${extractedCode}
\`\`\`
`;

    console.log('\n--- SLICED CONTEXT START ---');
    console.log(markdownOutput);
    console.log('--- SLICED CONTEXT END ---\n');
}

// Execute
const { filePath, symbolName } = parseArgs();
sliceSymbol(filePath, symbolName);
