const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDirs = ['c:/ECCAutomation/tests', 'c:/ECCAutomation/src'];

let updatedCount = 0;

targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir, function (filePath) {
            if (filePath.endsWith('.ts')) {
                let content = fs.readFileSync(filePath, 'utf8');

                // This will find lines that have `await xyz.waitForTimeout(123)` and comment them out.
                // It avoids double commenting if already commented out.
                let newContent = content.replace(/^(\s*)(await\s+[a-zA-Z0-9_\.]+\.waitForTimeout\(\d+\);?)/gm, '$1// $2');

                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated ${filePath}`);
                    updatedCount++;
                }
            }
        });
    }
});

console.log(`Script finished. Updated ${updatedCount} files.`);
