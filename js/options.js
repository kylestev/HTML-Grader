$(function() {
    var count = 0;

    for (var i in localStorage) {
        if (i.indexOf("sel_") == 0) {
            var sp = getFromStorage(i);
            addTag(unescape(sp[0]), unescape(sp[1]), i.substring(4));
            console.log(i)
            count++;
        }
    }
});

function addTag() {
    addTag("", "");
}

function addTag(name, req, count) {
    if (count == undefined) {
        count = Math.floor(Math.random() * 15000);
    }
    
	var tags = $('#tags');
	var row = "row" + (tags.children().size() + 1);
	var wat = tags.append("<tr style='display:none' id='" + row + "'>" +
	"<td><input type='hidden' value='" + count + "' name='index' /><input type='text' name='tagname' value='" + name + "' /></td>" +
	"<td><input type='text' name='numreq' value='" + req + "' /></td>" +
	"<td><button onclick='deleteRow(\"" + row + "\")'>Delete</button></td>" +
	"</tr>");
	$('#' + row).fadeIn();
}

function deleteRow(str) {
    var row = $('#' + str);
    localStorage.removeItem("sel_" + getRowIndex(row));
	row.fadeOut('600', function() {
	   row.remove();
	});
}

function save() {
	var rows = $('#tags tr');
	var row = rows;
    
	for (var i = 0; i < rows.length; i++) {
        var index = getRowIndex(row);
		var name = getRowName(row);
		var numreq = getRowReq(row);
        localStorage["sel_" + index] = escape(name) + ";" + escape(numreq);
		row = row.next();
	}
    
    alert("Settings saved successfully!");
}

function getRowName(row) {
    return row.find('input[name="tagname"]').val();
}

function getRowReq(row) {
    return row.find('input[name="numreq"]').val();
}

function getRowIndex(row) {
    console.log(row.find('input[name="index"]').val());
    return row.find('input[name="index"]').val();
}

function getFromStorage(id) {
    return localStorage[id].split(";");
}
