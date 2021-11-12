const timer = ms => new Promise(res => setTimeout(res, ms))

//===============//
// BOTTOM SCREEN //
//===============//

//Brightness
const BrightnessTop = document.getElementById('BrightnessTop');
const Brightnessbottom = document.getElementById('Brightnessbottom');
var brightness = 0.4

let changeBright = () => {
	brightness -= 0.1
	if (brightness < 0) { brightness = 0.4 }
	BrightnessTop.style = "background: rgba(0,0,0," + brightness + ")"
	Brightnessbottom.style = "background: rgba(0,0,0," + brightness + ")"
}

//Sync top and bottom screen in settings
const DSsettings = document.getElementById('DSsettings');
const Dsdownload = document.getElementById('Dsdownload');
const DSpicto = document.getElementById('DSpicto');
const DSTopLift = document.getElementById('DSTopLift');

async function syncScreenSettings() {
	if (!DSTopLift.checked) {
		await timer(1750)
	}
	changeBannerAtext("Settings", "Change system settings here. Select the setting you'd like to change.")
	DSTopLift.checked = DSsettings.checked
	await timer(250)
	openRoots()
}

async function syncScreensDownload() {
	if (!DSTopLift.checked) {
		await timer(1750)
	}
	changeBannerAtext("DS Download Play", "Download software via DS Download Play. Though, there isn't much point is there?")
	DSTopLift.checked = Dsdownload.checked
	await timer(250)
	openRoots()
}

async function syncScreenPicto() {
	if (!DSTopLift.checked) {
		await timer(1750)
	}
	changeBannerAtext("PictoChat Online", "Unfortunatly, PictoChat Online isn't available right now.")
	DSTopLift.checked = DSpicto.checked
	await timer(250)
	openRoots()
}

//Fade root setting menus
const fadeToggles = document.querySelectorAll(".DsFader");
const DsOpenIcon = document.querySelectorAll(".DsOpenIcon");
const DSBannerLift = document.getElementById('DSBannerLift');

function fadeRoots(head, text) {
	fadeToggles.forEach(div => {
		div.style = "z-index: 5"
	})
	DSBannerLift.checked = true
	changeBannerBtext(head, text)
}

function openRoots() {
	DsOpenIcon.forEach(r => {
		r.checked = false
	})
	fadeToggles.forEach(div => {
		div.style = "z-index: -1"
	})
	DSBannerLift.checked = false
}

//============//
// TOP SCREEN //
//============//

//Edit Banner text
const DsBAh = document.querySelector('#DsBa h');
const DsBAp = document.querySelector('#DsBa p');

function changeBannerAtext(heading, desript) {
	DsBAh.innerText = heading
	DsBAp.innerText = desript
}

const DsBBh = document.querySelector('#DsBb h');
const DsBBp = document.querySelector('#DsBb p');

function changeBannerBtext(heading, desript) {
	DsBBh.innerText = heading
	DsBBp.innerText = desript
}

//Draw DS CALANDER
const DsCalandList = document.getElementById('DsCalandList');
const DsMonth = document.getElementById('DsMonth');
const DSRibbonDate = document.getElementById('DSRibbonDate');

let createDSCalander = () => {
	const DaysofWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
	
	var year = new Date().getFullYear()
	var monthIndex = new Date().getMonth() + 1
  var monthLength = new Date(year, monthIndex, 0).getDate() + 1
	var dayIndex = new Date().getDate()
	var firstDayofMonth = new Date(year + "-" + monthIndex + "-01").getDay()
	
	//For each square in the clander
	for (let i = 0; i < 42; i++) {
		var Unit = document.createElement("li");
		var style = ""
		Unit.innerText = "ㅤ"
		
		//Lable top row
		if (i < DaysofWeek.length) {
			Unit.innerText = DaysofWeek[i]
			style += "--bcolor: black; background: #6D6D6D; color: white;"
		}
		
		//Label days
		if (i > 6 + firstDayofMonth && i < 6 + firstDayofMonth + monthLength) {
			Unit.innerText = i - (6 + firstDayofMonth)
		}
		
		//Style
		if (i % 7 == 0) { style += "background: #FFA6EF;"}
		if ((i + 1) % 7== 0) { style += "background: #86AEFF;"}
		//Style top row
		if (i == 0) { style += "background: #D70000;"}
		if (i == 6) { style += "background: #0045C7;"}
		//Style today
		if (Unit.innerText == dayIndex) { Unit.id = "DStoday"}
		
		Unit.style = style
		DsCalandList.appendChild(Unit)
	}
	
	//Set header text
	DsMonth.innerText = monthIndex + "/" + year
	
	//Set ribbon date
	DSRibbonDate.innerText = monthIndex + "/" + year.toString().substring(2)
}

createDSCalander()

//Draw DS CLOCK
const DsClockCanva = document.getElementById('DsClockCanva');
const Clockctx = DsClockCanva.getContext('2d');
const DSRibbonTime = document.getElementById('DSRibbonTime');

let drawDsClockFace = (ctx) => {
	const NumCoords = [
		[24, 8],
		[8, 24],
		[68, 8],
		[8, 68],
		[24, 84],
		[84, 24],
		[68, 84],
		[84, 68],
	]
	
	// Create Num dots
	ctx.fillStyle = '#7D7D7D';
	NumCoords.forEach(coords => {
		ctx.fillRect(coords[0], coords[1], 4, 4);
	})
	
	//Create letters
	ctx.fillStyle = '#B6B6B6';
	//3
	ctx.fillRect(81, 38, 12, 20)
	ctx.clearRect(81 + 0, 38 + 4, 4, 4)
	ctx.clearRect(81 + 4, 38 + 4, 4, 4)
	ctx.clearRect(81 + 0, 38 + 12, 4, 4)
	ctx.clearRect(81 + 4, 38 + 12, 4, 4)
	//6
	ctx.fillRect(42, 72, 12, 20)
	ctx.clearRect(42 + 4, 72 + 4, 4, 4)
	ctx.clearRect(42 + 8, 72 + 4, 4, 4)
	ctx.clearRect(42 + 4, 72 + 12, 4, 4)
	//9
	ctx.fillRect(3, 38, 12, 20)
	ctx.clearRect(3 + 4, 38 + 4, 4, 4)
	ctx.clearRect(3 + 4, 38 + 12, 4, 4)
	ctx.clearRect(3, 38 + 12, 4, 4)
	//12
	ctx.fillRect(40, 3, 4, 20)
	ctx.fillRect(45, 3, 12, 20)
	ctx.clearRect(45 + 4, 3 + 4, 4, 4)
	ctx.clearRect(45 + 0, 3 + 4, 4, 4)
	ctx.clearRect(45 + 4, 3 + 12, 4, 4)
	ctx.clearRect(45 + 8, 3 + 12, 4, 4)
	
	//Draw timer hand
	ctx.fillStyle = '#FF5D75';
	ctx.fillRect(47, 46 - 13, 2, 13)
}
let drawDsClockFull = (ctx) => {
	//Clear Canvas
	ctx.clearRect(0, 0, DsClockCanva.width, DsClockCanva.height);
	
	//Redraw face
	drawDsClockFace(ctx)
	
	//Code from W3
	var radius = DsClockCanva.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.90
	
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	
	var width = 1
	//hour
	ctx.strokeStyle = "#7D7D7D";
	if (hour % 15 == 0) { width = 1.5 } else { width = 1 }
	
	hour = hour%12;
	hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
	for (let i = 0; i < 20; i++) {
		drawHand(ctx, hour, radius*0.5, width);
	}
	//minute
	if (minute % 15 == 0) { width = 1.5 } else { width = 1 }
	
	minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
	for (let i = 0; i < 20; i++) {
		drawHand(ctx, minute, radius*0.85, width);
	}
	// second
	ctx.strokeStyle = "#65869E";
	if (second % 15 == 0) { width = 1.5 } else { width = 1 }
	
	second = (second*Math.PI/30);
	for (let i = 0; i < 20; i++) {
		drawHand(ctx, second, radius*0.85, width);
	}
	
	//Translate back
	ctx.translate(radius / -0.9, radius / -0.9);
	
	//Draw clock center
	ctx.fillStyle = '#4D4D4D';
	ctx.fillRect(46, 46, 4, 4)
}
let drawHand = (ctx, pos, length, width) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

let UpdateFace = () => {
	drawDsClockFull(Clockctx)
}

var run = setInterval(UpdateFace, 1000);

let i = 0
let UpdateRibbonClock = () => {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	
	//update Ribbon clock
	var formattedHour = ("0" + hour).slice(-2);
	var formattedMinute = ("0" + minute).slice(-2);
	var tick = "  ";
	if (i % 2 == 0) {tick = " : "}
	
	DSRibbonTime.innerText = formattedHour + tick + formattedMinute
	
	i++
}

var run2 = setInterval(UpdateRibbonClock, 500);