var https = require("https");
var fs = require("fs");

for (let ind = 1901; ind <= 1905; ind++) {
  console.log(ind);
  if (!fs.existsSync(ind)) {
    fs.mkdirSync("" + ind);
  }
  ["VARC", "DILR", "QA"].forEach(sec => {
    let blist = "";
    https.get(
      `https://www.time4education.com/moodle/aimcatsolutions/json/${ind}_${sec}.txt`,
      response => {
        response.setEncoding("utf8");
        response.on("data", data => {
          // console.log(data);
          blist += data;
        });

        response.on("error", error => {
          console.log("BULLSHIT");
        });

        response.on("end", done => {
          console.log(ind);
          fs.writeFile(`./${ind}/${ind}_${sec}.json`, blist, err => {
            if (err) throw err;
          });
          console.log("EVERYTHING LOADED");
        });
      }
    );
  });
}
