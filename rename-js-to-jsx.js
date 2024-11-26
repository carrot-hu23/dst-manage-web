const fs = require('fs');
const path = require('path');

function renameFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (fullPath !== path.resolve(__dirname, 'src/utils')) {
                renameFiles(fullPath); // 递归处理子目录
            }
        } else if (file.endsWith('.js')) {
            const newFile = fullPath.replace(/\.js$/, '.jsx');
            fs.renameSync(fullPath, newFile);
            console.log(`Renamed: ${fullPath} -> ${newFile}`);
        }
    });
}

renameFiles(path.resolve(__dirname, 'src'));
