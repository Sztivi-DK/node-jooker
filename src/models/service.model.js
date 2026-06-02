const fs = require('fs');

class ServiceModel {
    static getServices() {
        let content = fs.readFileSync('./contents/services.txt', 'utf-8');
        let lines = content.split('\n');
        let nonEmptyLines = lines.filter(item => item.trim() != '');
        let items = nonEmptyLines.map(item => {
            const parts = item.trim().split(';');
            const obj = {
                name: parts[0],
                description: parts[1]
            };
            return obj;
        });
        return items;
    }
}

module.exports = ServiceModel;