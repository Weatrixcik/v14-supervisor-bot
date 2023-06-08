
let sunucu = "Deneme"
module.exports = {
  apps: [
    {
      name: sunucu+"-Supervisor",
      namespace: "Weatrix",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Bots/Main"
    }
  ]
};
