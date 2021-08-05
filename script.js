var y=new XMLHttpRequest();

y.open('GET','https://restcountries.eu/rest/v2/all',true);

y.send();

y.onload=function(){
    var data=JSON.parse(this.response);
    for(var i=0;i<250;i++){
        try{
        var cname=data[i].name;
        var lang=data[i].latlng; 
        if(lang.length==0)throw new Error('Longitude for this place is not defined');
        weatherdata(cname,...lang); 
        }catch(e){
            console.log('Error has been handled'+cname+''+e.message);
        }
    }
}

function weatherdata(name,lat,lang){
    var req=new XMLHttpRequest();
    var url='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lang+'&appid=f2cf72c169668e6bc2c4f1dc2698c954';
    req.open('GET',url,true);
    req.send();
    req.onload=function(){
        var data=JSON.parse(this.response);
        console.log(`${name} : ${data.main.temp}`);
    }
}  