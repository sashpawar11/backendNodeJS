import http from 'http'
import fs from 'fs'


const httpServer = http.createServer((req, res) => {
    
    const log = `${Date.now().toLocaleString()} : New Request Received : ${req.method}`
    
    fs.appendFile('logs.txt', log,(err, data) => {

        switch (req.url) {
            case '/': res.end('Homepage');
                break;
            case '/about': res.end('About');
                break;
            default: res.end('404 Page not Found');
        }
    })
})


httpServer.listen(8000, () => {
    console.log("Server started");
})