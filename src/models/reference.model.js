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
    static getReferenceById(id) {
        let file = `./contents/references/reference-${id}.txt`;
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf-8');
            let lines = content.split('\n');
            let obj = {
                id: id,
                title: lines[0].trim(),
                intro: lines[1].trim(),
                content: []
            };
            for (let i= 2; i < lines.length; i++) {
                let line = lines[i].trim();
                if (line) {
                    obj.content.push(line);
                }
            }
            return obj;
        }
        return null;
    }
}

module.exports = ReferenceModel;