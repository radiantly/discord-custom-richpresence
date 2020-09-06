const DiscordRPC = require("discord-rpc");

let rpc;

let activity = {};

async function setActivity() {
  if (!rpc) return;

  rpc.setActivity({
    instance: true,
    ...activity,
  });
}

setInterval(setActivity, 15e3);

exports.rpcStart = async rpcDetails => {
  if (rpcDetails.clientId == activity.clientId) {
    activity = rpcDetails;
    return true;
  }
  const testrpc = new DiscordRPC.Client({ transport: "ipc" });
  try {
    activity = rpcDetails;
    testrpc.once("ready", setActivity);
    await testrpc.login({ clientId: rpcDetails.clientId });
    rpc = testrpc;
    return true;
  } catch {
    return false;
  }
};
