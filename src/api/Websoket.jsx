export const  WebSocketProvider = ({url},callback)=>{
  const Websoket = new WebSocket(url);
  Websoket.addEventListener('open',()=>{
    callback({ data : [] ,message : { sususce : 'WebSoket Cannectd => ***'}})
    if(Websoket && Websoket.readyState === Websoket.OPEN){
      Websoket.send(JSON.stringify({"method" : "subscribe"}))
    }
  })
  Websoket.addEventListener('message',(event)=>{
    callback(JSON.parse(event.data))
  })

  Websoket.addEventListener('error',()=>{
    return console.error({message : { error : 'WebSoket Error => ***//**'}})
  })

  Websoket.addEventListener('close',()=>{
    return console.error({message : { error : 'WebSoket Discannectd => ***'}})
  })
  
}

