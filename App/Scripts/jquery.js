$(document).ready(function(){

	var listo = [];

	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	};

	$('#newTaskForm').hide();

	var advanceTask = function (task) {
		var modified = task.innerText.trim();
		for(var i = 0; i < listo.length; i++) {
			if (listo[i].task === modified) {
				if (listo[i].id === 'new') {
					listo[i].id = 'inProgress';
				} else if (listo[i].id === 'inProgress') {
					listo[i].id = 'archived';
				} else {
					listo.splice(i, 1);
				}
				save();
				break;
			};
		};
		task.remove();
	};

	var addTask = function(task) {
		if(task){
			task = new Task(task);
			listo.push(task);
			save ();
			$('#newItemInput').val('');
			$('#newList').append('<a href="#finish" class="taskItem" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	};
	//Open and closes the new task form with newListItem and Cancel button.
	$('#saveNewItem').on('click', function (e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});
	//Opens Form
	$('#newListItem').on('click', function () {
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
		$('#newItemInput').focus();
	});
	//Closes Form
	$('#cancel').on('click', function (e) {
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});
	//function to move the actual list item
	$(document).on('click', '#item', function(e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);

	});
	//Function will move from inProgress to Archived
	$(document).on('click', '#inProgress', function (e){
		e.preventDefault();
		var task = this;
		task.id = "archived";
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
	});
	//Create a way to delete items on the list
	$(document).on('click', '#archived', function (e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
	});
	//Saves teh array listo to local storage
	var save = function () {
		localStorage["listo"] = JSON.stringify(listo);
	};
	//--------------------LOCAL STORAGE----------------------//

	//Gets teh array listo stored on local storage and populates each list according to task id
	var populateLists = function () {
		var storedList = JSON.parse(localStorage.getItem("listo"));
		for (var i = 0; i < storedList.length; i++) {
			if (storedList[i].id === 'new') {
				$('#newList').append('<ahref="#finish" class="taskItem" id="item"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></i></span></li></a>');
			} else if (storedList[i].id === 'inProgress') {
				$('#currentList').append('<a href="finish" class="taskItem" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></i></span></li></a>');
			} else {
				$('#archivedList').append('<a href="finish" class="taskItem" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-remove"></i></span></li></a>');
			}
		}
	}
	//Checks local storage for the array "listo" on page load and will call populate lists if listo is found//
	if (localStorage.getItem("listo")) {
		listo = JSON.parse(localStorage["listo"]);
		populateLists();
	}
	//JQuery Watcher
	$('.container').bind('DOMSubtreeModified', function (e) {
		if (e.target.innerHTML.length > 0) {
			$('.list-group-item').mouseenter(function () {
				$(this).find('.arrow').animate({marginRight: '0px' }, 0);
			}).mouseleave(function () {
				$(this).find('.arrow').stop().css('marginRight', '20px');
			}).click(function () {
				$(this).find('.arrow').stop().css('marginRight', '20px');
			});
		}
	});

	function GetClock(){
		d = new Date();
		nhour  = d.getHours();
		nmin   = d.getMinutes();
		nsec   = d.getSeconds();
		if(nhour ==  0) {ap = " AM";nhour = 12;} 
		else if(nhour <= 11) {ap = " AM";} 
		else if(nhour == 12) {ap = " PM";} 
		else if(nhour >= 13) {ap = " PM";nhour -= 12;} 			
		if(nmin <= 9) {nmin = "0" +nmin;}
		if(nsec <= 9) {nsec = "0" +nsec;}
		document.getElementById('clockbox').innerHTML=""+nhour+":"+nmin+":"+nsec+ap+"";
		setTimeout(GetClock(), 1000);
	}
			window.onload=GetClock;
//All of my code goes here!!!!

});