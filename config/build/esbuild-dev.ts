import ESBuild from 'esbuild';
import path from 'path';
import config from './esbuild-config';
import express from 'express';
import {EventEmitter} from 'events';

const PORT = Number(process.env.PORT) || 3000;

const app = express();
const emitter = new EventEmitter();

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')))

app.get('/subscribe', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write('');

    emitter.on('refresh', () => {
        res.write('data: message \n\n')
    })
})

function sendMessage() {
    emitter.emit('refresh', '123123')
}

app.listen(PORT, () => console.log('server started on http://localhost:' + PORT))

ESBuild.build({
    ...config,
    watch: {
        onRebuild(err, result) {
            if(err) {
                console.log(err)
            } else {
                console.log('build...')
                sendMessage()
            }
        }
    }
}).then((result) => {
    console.log(result)
}).catch(err => {
    console.log(err);
})
