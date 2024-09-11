export default function generateConfig(days=1){
  let config = {}
  let date = new Date().getTime()-24*60*60*1000*(days-1)
  date=new Date(date).toISOString().substring(0,10);
  let start = date+"T05:00:00Z";
  let today = new Date().toISOString().substring(0,10)+"T05:00:00Z";
  let end = new Date(today).getTime()+24*60*60*1000;
  end=new Date(end).toISOString();
  config.start=start;
  config.end=end;
  return config;
}