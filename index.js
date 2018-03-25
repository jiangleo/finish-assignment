const superagent = require('superagent');
const cheerio = require('cheerio');

const teams = ['A','B','C','D','E','F','G','H','I','J','K', "L", "M",  "N", "O"]
// const teams = ['B']

const querys = ["", "?q=is:pr+is:closed"]

const msgReg = /(\d+)[\-\_\s]/;

const keywords = /[四|lesson\s4|lesson4]/;

const promiseTeamTexts = teams.map((abc, scope) => {
    let promisePair = querys.map(q => {
        const url = `https://github.com/Guigulive/Team-${abc}/pulls${q}`;
        return getResponse(url)
    })
    
    let promiseTeam = Promise.all(promisePair).then(responses => {
    
        let team = [];
    
        responses.forEach((res) => {
            let $ = cheerio.load(res.text);
            $(".link-gray-dark.v-align-middle.no-underline")
            .map((_,node) => {
                const text = $(node).text().trim();
                const matched = text.match(msgReg);
                const finished = keywords.test(text)
    
                if(matched && finished) {
                    const id = parseInt(matched[1]);
                    const start = scope + 1;
                    const end = start * 10;
                    if(id && start < id && id <= end) {
                        team[id] =  id + (matched[2] || "");
                    }
                }
            })
            
        })
        
        
        return team.filter(v => v);
    })
    
    return promiseTeam
})


Promise.all(promiseTeamTexts).then(TeamTexts => {
    
    // console.log(TeamTexts)
    console.log(`==============`)
    console.log(`截止到${(new Date()).toLocaleString()}，第四已交作业同学如下：`)
    console.log(TeamTexts.map((texts,index)=> teams[index]+ "-"+ texts.length + ": " + texts.join(' ， ')))
    console.log(`==============`)

}).catch((e)=>{
    console.log(e)
})


function getResponse (reptileUrl)  {
    return new Promise((resolve, reject) => {
        superagent.get(reptileUrl).accept('text/html').end(function (err, res) {
            // 抛错拦截
            if(err){
                reject(err)
            } else {
                resolve(res)
            }
        });
    
    })
}


