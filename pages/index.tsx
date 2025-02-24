import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

export default function Home() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receiveCommand", (data) => {
      setLogs((prev) => [...prev, data]);
    });
  }, []);

  const sendCommand = () => {
    socket.emit("sendCommand", command);
    setCommand("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Advanced Admin Panel</h1>
      <input 
        type="text" 
        className="mt-4 p-2 rounded bg-gray-700 border border-gray-500" 
        placeholder="Enter Command" 
        value={command} 
        onChange={(e) => setCommand(e.target.value)} 
      />
      <button 
        onClick={sendCommand} 
        className="mt-2 p-2 bg-blue-500 hover:bg-blue-700 rounded"
      >Send</button>
      <div className="mt-5 w-96 bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl">Logs</h2>
        {logs.map((log, index) => (
          <p key={index} className="text-sm text-gray-400">{log}</p>
        ))}
      </div>
    </div>
  );
}
