//author ketian
//ririhedou@gmail.com

module.exports =
{
    readSqautting : readSqautting
}

//Define a struture that contains the domain, squat_from, type
const Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}))
const Item = Struct('suspicious_domain', 'squat_from', 'type', 'url')

const fs = require('fs');

function readSqautting(filename)
{
    var lines = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
    var domain_structure_arr = new Array();

    for (var i in lines)
        { console.log(lines[i].length);
          var arr = lines[i].split(",");

          //do some data cleaning
          arr[0] = arr[0].replace('(u\'','').replace('\'','');
          arr[1] = arr[1].replace('\'','').replace('\'','').replace(' ','');
          var url = 'http://' + arr[1];

          arr[3] = arr[3].replace('u\'','').replace('\'','').replace('\'','').replace(' ','');

          domain_structure_arr.push(Item(String(arr[1]), arr[0], arr[3], url));
        }

    for (var j in domain_structure_arr)
    {
       console.log(domain_structure_arr[j]);
    }

    return domain_structure_arr;
};


//var filepath = '/home/ketian/Desktop/squatting_domains/domain_collect/_home_datashare_dns_history_20170906_4chan.org.out'
//filepath ='/home/ketian/Desktop/squatting_domains/domain_collect/_home_datashare_dns_history_20170906_bloomberg.com.out'
//readSqautting(filepath);