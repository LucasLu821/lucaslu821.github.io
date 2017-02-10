var blankX = 300;
var blankY = 300;

var puzzlearea;
var win;

function onload()
{
	puzzlearea = document.getElementById('puzzlearea');

	win = document.getElementById('winner');
	var imgpath = "http://www.getentrepreneurial.com/images2/winner-win.jpg"
	win.innerHTML = '<img src="' + imgpath + '" />';
	win.style.position = "absolute";
	win.style.left = '50px';
	win.style.top = '200px';
	win.style.display = "none";

	var pieces = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<pieces.length; i++)
	{
		pieces[i].setAttribute("class","puzzlepiece");
		pieces[i].setAttribute("id","puzzlepiece"+(i+1));
		pieces[i].setAttribute("onclick","move("+(i+1)+")");
		pieces[i].setAttribute("onMouseOver","mouseOver("+(i+1)+")");
		pieces[i].setAttribute("onMouseOut","mouseOut("+(i+1)+")");
		pieces[i].style.backgroundPosition=(i%4)*(-100)+'px '+parseInt(i/4)*(-100)+'px';
		pieces[i].style.left=(i%4)*(100)+'px';
		pieces[i].style.top=parseInt(i/4)*(100)+'px';
	}
}

function canMove(i)
{
	var current = document.getElementById('puzzlepiece'+i);
	var dis = Math.round(Math.abs(parseInt(current.style.left) - blankX)+
			  Math.abs(parseInt(current.style.top) - blankY));
	// alert("dis="+dis+"blank="+blankX+","+blankY);
	if (dis ==100)
		return true;
	return false;	
}

function move(i)
{
	var current = document.getElementById('puzzlepiece'+i);
	if (canMove(i))
	{
		var tX = blankX; blankX = parseInt(current.style.left); current.style.left = tX+'px';
		var tY = blankY; blankY = parseInt(current.style.top); current.style.top = tY+'px';
		mouseOut(i);
		isWin();
	}
}

function isWin()
{
	var pieces = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<pieces.length; i++)
	{
		if (parseInt(pieces[i].style.left)!= (i%4)*(100))
			return false;
		if (parseInt(pieces[i].style.top)!=parseInt(i/4)*(100))
			return false;
	}
	win.style.display = "block";
}

function shuffle()
{
	win.style.display = "none";
	for (var i=0; i<100; i++)
	{
		move(Math.floor((15)*Math.random()+1));
	}
}

function mouseOut(i)
{
	var current = document.getElementById('puzzlepiece'+i);
	current.setAttribute("class","puzzlepiece");
}

function mouseOver(i)
{
	var current = document.getElementById('puzzlepiece'+i);
	if (canMove(i))
	{
		current.setAttribute("class","movablepiece puzzlepiece");
	}
}

