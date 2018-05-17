var CARDS_COUNT=36;
var BACK_IMAGE = "Images/question.jpg";
cardsImage = new Array(36);
cardsClicked = new Array (2);
cardsNumbers = new Array(2);
var clicks=0;
var numoves=0;
var correctCounter=0;
var startIMG=document.getElementById("startIMG");
var active=false;
startIMG.setAttribute("onclick","Reset()");
var showWin=document.getElementById("showWin");
showWin.style.display = "none";
var audioFlip=document.getElementById("audioFlip");
var audioStart=document.getElementById("audioStart");
var audioEnd = document.getElementById("audioEnd");
var audioCorrect = document.getElementById("audioCorrect");
var tblBoard = document.getElementById("tblBoard");

function InitArrays()
{
    for (var i = 0; i < CARDS_COUNT; i++)
    {
        cardsImage[i] = "Images/" + i + ".jpg";

    }

}


function CreateCardCell(cardIndex)
{
  cardIndex=cardIndex-(cardIndex/2)+1;

  if((cardIndex-0.5)%2===0||(cardIndex-0.5)%2==1)
  {
  cardIndex=cardIndex-0.5;
  }
  var td = document.createElement("td");
  var img = document.createElement("img");
  img.setAttribute("src",BACK_IMAGE);
  img.style.width="50px";
  img.style.height="50px";
  img.setAttribute("onclick",  "FlipCard(this, " + cardIndex + ")");
  td.appendChild(img);
  return td;
}


function FlipCard(img, cardIndex)
{
    audioFlip.play();
    img.setAttribute("src", cardsImage[cardIndex]);
    if(clicks==2)
    {
    if(cardsNumbers[0]==cardsNumbers[1])
    {
    Green(cardsClicked,cardsNumbers);
    clicks=0;
    }
    }
    CardClicked(img,cardIndex);
    img.setAttribute("src", cardsImage[cardIndex]);
    if(clicks==2)
    {
    if(cardsNumbers[0]==cardsNumbers[1])
    {
        if(correctCounter<18)
        {
         audioCorrect.play();   
        }
    Green(cardsClicked,cardsNumbers);
    clicks=0;
    correctCounter++;
    if(correctCounter==18)
    {
    audioEnd.play();
    active=false;
    document.getElementById("Mmoves").innerHTML=numoves+1;
    document.getElementById("Mtime").innerHTML=document.getElementById("timer").innerHTML;
    showWin.style.display = "block";
    }
    }
     if(cardsNumbers[0]!=cardsNumbers[1])
     {
        Red(cardsClicked,cardsNumbers);
        window.setTimeout(Delay, 500);
       clicks=0;
     }
     numoves++;
     moves.innerHTML = " " + numoves;
    }
    
    

}

function Delay(time)
{
cardsClicked[0].setAttribute("src",BACK_IMAGE);
cardsClicked[1].setAttribute("src",BACK_IMAGE);
}

function Red(cardsClicked,cardsNumbers)
{
    cardsClicked[0].setAttribute("src","Images/" + cardsNumbers[0] + "red.jpg");
    cardsClicked[1].setAttribute("src","Images/" + cardsNumbers[1] + "red.jpg");
}

function Green(cardsClicked,cardsNumbers)
{
    cardsClicked[0].setAttribute("src","Images/" + cardsNumbers[0] + "green.jpg");
    cardsClicked[1].setAttribute("src","Images/" + cardsNumbers[1] + "green.jpg");
}


function CreateBoard()
{
    var arrCheck = new Array(36);

    for (var i = 0; i < arrCheck.length; i++)
    {
        arrCheck[i] = false;
    }
    for (var l=0;l<6;l++)
    {
        var tr= document.createElement("tr");
        for(var x=0;x<6;x++)
        {
            var rnd = Math.floor((Math.random() * 36));

            while(arrCheck[rnd]==true)
            {
                rnd = Math.floor((Math.random() * 36));
            }
            arrCheck[rnd] = true;
            var td = CreateCardCell(rnd);
            tr.appendChild(td);
            tblBoard.appendChild(tr);
        }   
     }
}



function CardClicked(img,cardIndex)
{
    clicks++;
    if(clicks==1)
    {
    cardsClicked[0]=img;
    cardsNumbers[0]=cardIndex;
    }
    if(clicks==2)
    {
        cardsClicked[1]=img;
        cardsNumbers[1]=cardIndex;
    }

    
}

function startTimer()
{
    if(active==true)
    {
        var timer = document.getElementById("timer").innerHTML;
        var arr= timer.split(":");
        var hour= arr[0];
        var min=arr[1];
        var sec=arr[2];
        if(sec ==59)
        {
            if(min==59)
            {
                hour++;
                min=0;
                if(hour<10) hour="0"+hour;
            }
            else
            {
            min++;    
            }
            if(min<10) min="0" + min;
            sec=0 + "0";
            
        }
        else
        {
            sec++;
            if(sec<10) sec ="0" + sec;
        }
        
        document.getElementById("timer").innerHTML= " " + hour + ":" + min + ":" + sec;
        setTimeout(startTimer,1000);
        
    }
}

function Reset()
{
    audioStart.play();
    correctCounter=0;
    numoves=0;
    moves.innerHTML = " " + numoves;
    if(active==false)
    {
        document.getElementById("timer").innerHTML = " 00" + ":" + "00" + ":" + "00";
        active=true;
        startTimer();
    }
    else
    {
        active==false;
        document.getElementById("timer").innerHTML = " 00" + ":" + "00" + ":" + "00";
    }
    showWin.style.display = "none";
    while ( tblBoard.rows.length > 0 )
   {
    tblBoard.deleteRow(0);
   }
    CreateBoard();
}


InitArrays();
CreateBoard();
