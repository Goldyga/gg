function addAlertCreateCol() {
    var pageWindow = $('#window');
    var alerArea = $('<div id="alert" class="alert"></div>');
    var textAlertPart1 = $('<h1>Column Name</h1>');
    var textAlertPart2 = $('<p>Enter column name</p>');
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

var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
  .click(function() {
    addAlertCreateCol();
    $('#okBtn').click(function() {
        var columnName = $('#inputName');
        $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
              name: columnName.val()
        },
        success: function(response){
          var column = new Column(response.id, columnName.val());
          board.createColumn(column);
          $('#alert').remove();
        }
      });
    });
    $('#cancelBtn').click(function() {
      $('#alert').remove();
    });
});	
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }