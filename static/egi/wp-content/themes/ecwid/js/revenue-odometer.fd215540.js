function syncOdometer(){$.getJSON("/wp-content/plugins/ecwid-revenue-odometer/",{},function(e){revenue.step=-1*e.step,revenue.value=-1*e.value,od=new Odometer({el:elOdometer,value:revenue.value,format:"(,ddd).dd",duration:1e3}),odometerCycle=0,odometer()})}function odometer(){3==odometerCycle?syncOdometer():setTimeout(function(){odometerCycle++,revenue.value=revenue.value+3*revenue.step,od.update(revenue.value),odometer()},2995)}var elOdometer=document.querySelector(".hpc-revenue-counter"),revenue={step:32,value:4e9},isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),odometerCycle=0,isBot=function(){return 1*window.navigator.userAgent.indexOf("HeadlessChrome")>-1};window.addEventListener("load",function(){isBot()||syncOdometer()});