import { WebSocketServer } from 'ws';
import { NextApiRequest, NextApiResponse } from 'next';

let wss: WebSocketServer | undefined;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!wss) {
        wss = new WebSocketServer({ noServer: true });
        wss.on('connection', (ws) => {
            console.log('Client connected');
            
            ws.on('message', (message: string) => {
                console.log(`Received: ${message}`);
            });
            
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }
    
    if ((req.socket as any).server.wss) {
        res.status(200).json({ message: 'WebSocket already running' });
        return;
    }
    
    (req.socket as any).server.wss = wss;
    res.status(200).json({ message: 'WebSocket initialized' });
}
