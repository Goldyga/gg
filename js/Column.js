function addAlertCreateCard() {
    var pageWindow = $('#window');
    var alerArea = $('<div id="alert" class="alert"></div>');
    var textAlertPart1 = $('<h1>Card Name</h1>');
    var textAlertPart2 = $('<p>Enter card name</p>');
    var inputAlert = $('<input id="inputName" type="text"></input>');
    var buttonAlertCan = $('<button id="cancelBtn" class="cancel-btn">Cancel</button>');
    var buttonAlertOk = $('<button id="okBtn">OK</button>');

    alerArea.appendTo(pageWindow);
    textAlertPart1.appendTo(alerArea);
    textAlertPart2.appendTo(alerArea);
    inputAlert.appendTo(alerArea);
    buttonAlertCan.appendTo(alerArea);
    buttonAlertOk.appendTo(alerArea);
}

function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Add card</button>');
		
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			addAlertCreateCard();
			$('#okBtn').click(function() {
				var cardName = $('#inputName');
				event.preventDefault();
				$.ajax({
				    url: baseUrl + '/card',
				    method: 'POST',
				    data: {
				    	name: cardName.val(),
				    	bootcamp_kanban_column_id: self.id
	    			},
		    		success: function(response) {
		        		var card = new Card(response.id, cardName.val());
		        		self.createCard(card);
		        		$('#alert').remove();
		    		}
				});
			});
			$('#cancelBtn').click(function() {
      			$('#alert').remove();
    		});
		});
			
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	    var self = this;
	    $.ajax({
	      	url: baseUrl + '/column/' + self.id,
	      	method: 'DELETE',
	      	success: function(response){
	        	self.element.remove();
	      	}
	    });
 	}		
};