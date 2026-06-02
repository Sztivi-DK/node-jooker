const fs = require('fs');

class ReferenceModel {
    static getReferences() {
        let references = [];
        let a = 1;
        let file = `./contents/references/reference-${a}.txt`;
        while (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf-8');
            let lines = content.split('\n');
            let obj = {
                id: a,
                title: lines[0].trim(),
                intro: lines[1].trim()
            };
            references.push(obj);

            a++;
            file = `./contents/references/reference-${a}.txt`;
        }
        return references;
    }
}

module.exports = ReferenceModel;