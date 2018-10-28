let api = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
let apiKey = 'api-key= YOUR KEY'; // insert your own key
let fqDesk = '&fq=news_desk:(%22Obits%22%20%22Obituaries%22%20%22Obituary%22)';
let fqPersons= '%20AND%20persons.contains:(\"'
let fqEnd = '\")';
//let fl = '&fl=snippet,%20keywords';
//let page = '&page=';

let name;

let inp;
let submit;
let yes;
let no;
let breath = false;
// let thanatoggle = false;
let next = 0;

//let grave;

function setup() {
  noCanvas();
  inp = createInput('enter your first name');
  inp.input(nameCheck);
  submit = createButton('take a deep breath and click here');
  submit.mousePressed(breathTest);
  createP('');
}

function draw(){
  if (breath){
    createElement('h2', 'Are you dead, ' + name + ' ?')
    yes = createButton('yes');
    yes.mousePressed(obitScanYes);
    no = createButton('no');
    no.mousePressed(obitScanNo);
    breath = false;
  }
}

function nameCheck(){
	name = this.value(); 
}

function breathTest(){
	breath = true;
  next = 0;
}

function obitScanYes(){
	let url = api + apiKey + fqDesk + fqPersons + name + fqEnd;
  loadJSON(url, charonYes)
}

function obitScanNo(){
	let url = api + apiKey + fqDesk + fqPersons + name + fqEnd;
  loadJSON(url, charonNo)
}

function charonYes(data){
  var obits = data.response.docs;
  if (data.response.meta.hits > 0){
    createElement('h1', 'correct.');
  	createP(obits[next].snippet);
    next++;
  } 
  else {
  	createElement('h1', 'well, not according to the NYT.');  
  }
}

function charonNo(data){
  var obits = data.response.docs;
  if (data.response.meta.hits > 0){
    createElement('h1', 'wrong.');
  	createP(obits[next].snippet);
    next++;
  } 
  else {
  	createElement('h1', '...for now.');  
  }
}
