const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            files.push(name);
        }
    }
    return files;
}

const testsDir = path.join(__dirname, 'tests');
const allFiles = getFiles(testsDir);
const specFiles = allFiles.filter(f => f.endsWith('.spec.ts'));

const csvContent = 'File Name,Relative Path\n' + specFiles.map(f => `"${path.basename(f)}","${path.relative(__dirname, f)}"`).join('\n');

fs.writeFileSync(path.join(__dirname, 'testcases.csv'), csvContent);
console.log(`Successfully wrote ${specFiles.length} test case files to testcases.csv`);
