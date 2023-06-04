const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js'); 

contextBridge.exposeInMainWorld("axios", {
  openAI: (numQuestions, topic ) => ipcRenderer.invoke('axios.openAI', numQuestions, topic),
  supaBase: (method, id, data) => ipcRenderer.invoke('axios.supaBase', method, id, data)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});

