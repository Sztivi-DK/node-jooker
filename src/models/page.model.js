class PageModel {
    static getHomeContent() {
        return this._getPageContent('home');
    }
     
    static _getPageContent(page) {
        const fs = require('fs');
        return fs.readFileSync('./contents/pages/'+page+'.html', 'utf-8');
    }
}

module.exports = PageModel;