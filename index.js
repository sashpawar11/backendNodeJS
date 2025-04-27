import http from 'http'
import fs from 'fs'
import url from 'url'

const httpServer = http.createServer((req, res) => {
    
    const urlPath = url.parse(req.url, true);
    console.log(urlPath);
    

    const log = `${Date.now().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })}: New Request Received : ${req.url}\n`
    
    fs.appendFile('logs.txt', log,(err, data) => {

        switch (urlPath.pathname) {
            case '/': res.end('Homepage');
                break;
            case '/about': res.end('About');
                break;
            case '/contact': res.end(`Hello there, ${urlPath.query.name}, From: ${urlPath.query.state}`)
                break;
            default: res.end('404 Page not Found');
        }
    })
})


httpServer.listen(8000, () => {
    console.log("Server started");
})