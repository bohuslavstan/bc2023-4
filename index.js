const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const parser = new XMLParser();
const builder = new XMLBuilder();
const http = require("http");
const hostname = 'localhost';
const port = 8000;
const server = http.createServer((req, res) => {

    fs.readFile("data.xml", (err, data) => {
            const obj = parser.parse(data);

            var maxRate = null;
            obj.exchange.currency.forEach(currency => {
                if (currency.rate > maxRate) {
                    maxRate = currency.rate;
                }
            });

            const xmlStr = builder.build({
                exchange: {
                    maxRate: maxRate.toString()
                }
            });
            
            res.writeHead(200, { 'Content-Type': 'application/xml' });
            res.write(xmlStr);
            res.end();
    });

});

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
