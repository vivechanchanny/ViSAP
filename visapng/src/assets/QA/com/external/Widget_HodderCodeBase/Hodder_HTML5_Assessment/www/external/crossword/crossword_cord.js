// Each cell on the crossword grid is null or one of these
function CrosswordCell(letter){
    this.character = letter; // the actual letter for the cell on the crossword
    // If a word hits this cell going in the "across" direction, this will be a CrosswordCellNode
    this.across = null; 
    // If a word hits this cell going in the "down" direction, this will be a CrosswordCellNode
    this.down = null;
}

// You can tell if the Node is the start of a word (which is needed if you want to number the cells)
// and what word and clue it corresponds to (using the index)
function CrosswordCellNode(is_start_of_word, index){
    this.is_start_of_word = is_start_of_word;
    this.index = index; // use to map this node to its word or clue
}
	this.ln = 0;
function WordElement(word, index){
   /* this.word = word; // the actual word
    this.index = index; */// use to map this node to its word or clue
    
    this.word = word.answer; // the actual word
    this.index = parseInt(index); // use to map this node to its word or clue
    this.direction= word.orientation;
    this.position= parseInt(word.position);
    this.startx= parseInt(word.startx);
    this.starty= parseInt(word.starty);
    this.clue = word.clue;
    
}

function Crossword(words_in, clues_in){
    var GRID_ROWS = 50;
    var GRID_COLS = 50;
    // This is an index of the positions of the char in the crossword (so we know where we can potentially place words)
    // example {"a" : [{'row' : 10, 'col' : 5}, {'row' : 62, 'col' :17}], {'row' : 54, 'col' : 12}], "b" : [{'row' : 3, 'col' : 13}]} 
    // where the two item arrays are the row and column of where the letter occurs
    var char_index = {};	
    //var word_index = {};
    CrosswordUtils.nodesPosition ={};
	imfinity_utils.log("Crossword words_in",word_elements)
    // these words are the words that can't be placed on the crossword
    var bad_words;

    this.getSquareGrid = function(max_tries){
 		
	  for(var tries = 0; tries < word_elements.length; tries++){      
		var word_element = word_elements[tries];		
		placeWordAt(word_element.word, word_element.position,word_element.starty, word_element.startx, word_element.direction);
		 			
    }
       imfinity_utils.log("grid grid :: ",grid)
       return grid;
      
 
    }
	
	var placeWordAt = function(word, index_of_word_in_input_list, row, col, direction){
    	CrosswordUtils.nodesPosition[word] =[];
    	

        if(direction == "across"){
        	if(col+word.length > CrosswordUtils.MAX_COL_INDEX){
				CrosswordUtils.MAX_COL_INDEX = col+word.length;
			}
			if(col < CrosswordUtils.MIN_COL_INDEX){
				CrosswordUtils.MIN_COL_INDEX = col;
			}
			
            for(var c = col, i = 0; c < col + word.length; c++, i++){
                addCellToGrid(word, index_of_word_in_input_list, i, row, c, direction);
            }
        } else if(direction == "down"){
        	if(row+word.length > CrosswordUtils.MAX_ROW_INDEX){
				CrosswordUtils.MAX_ROW_INDEX = row+word.length;
			}
			if(row < CrosswordUtils.MIN_ROW_INDEX){
				CrosswordUtils.MIN_ROW_INDEX = row;
			}
			
            for(var r = row, i = 0; r < row + word.length; r++, i++){
                addCellToGrid(word, index_of_word_in_input_list, i, r, col, direction);
            }			
        } else {
            throw "Invalid Direction";	
        }
    }
    
    var addCellToGrid = function(word, index_of_word_in_input_list, index_of_char, r, c, direction){
        var character = word.charAt(index_of_char);
        if(grid[r][c] == null){
            grid[r][c] = new CrosswordCell(character);

            // init the char_index for that character if needed
            if(!char_index[character]) char_index[character] = [];

            // add to index
            char_index[character].push({"row" : r, "col" : c});
           
        }
		 CrosswordUtils.nodesPosition[word].push({"value":character,"row" : r, "col" : c});
        var is_start_of_word = index_of_char == 0;
        grid[r][c][direction] = new CrosswordCellNode(is_start_of_word, index_of_word_in_input_list);

    }	
    
     this.getLegend = function(grid){
       /* var groups = {"across" : [], "down" : []};
        var position = 1;
        for(var r = 0; r < grid.length; r++){	
            for(var c = 0; c < grid[r].length; c++){
                var cell = grid[r][c];
                var increment_position = false;
                // check across and down
                for(var k in groups){
                    // does a word start here? (make sure the cell isn't null, first)
                    if(cell && cell[k] && cell[k]['is_start_of_word']){
                        var index = cell[k]['index']-1;
                        groups[k].push({"position" : position, "index" : index, "clue" : clues_in[index], "word" : words_in[index]});
                        increment_position = true;
                    }
                }

                if(increment_position) position++;
            }
        }
        return groups;*/
       
       var groups = {"across" : [], "down" : []};
      for(var r = 0; r < word_elements.length; r++){	 
      	if(word_elements[r].direction == "across"){
      		 groups["across"].push({"position" : word_elements[r].position,"clue" : word_elements[r].clue, "word" : word_elements[r].answer});
                       
      	}else{
      		groups["down"].push({"position" : word_elements[r].position,"clue" : word_elements[r].clue,"word" : word_elements[r].answer});
      	}
      	
      }
      
       return groups; 
    }	
   
   
    if(words_in.length < 2) throw "A crossword must have at least 2 words";
    /*if(words_in.length != clues_in.length) throw "The number of words must equal the number of clues";*/	

    // build the grid;
    var grid = new Array(GRID_ROWS);
    for(var i = 0; i < GRID_ROWS; i++){
        grid[i] = new Array(GRID_COLS);	
    }

    // build the element list (need to keep track of indexes in the originial input arrays)
    var word_elements = [];	
    
    for(var i = 0; i < words_in.length; i++){
        word_elements.push(new WordElement(words_in[i], i));
    }
    
}

var CrosswordUtils = {
    PATH_TO_PNGS_OF_NUMBERS : "interface/numbers/",
	handleEvaluate : function(){
		
	},
	startingNodes : [],
	nodesPosition : [],
	MAX_COL_INDEX: 0,
	MAX_ROW_INDEX:0,
	MIN_COL_INDEX: 50,
	MIN_ROW_INDEX:50,
    toHtml : function(grid, show_answers){
  	
        if(grid == null) return;
        var html = [];
        html.push("<table class='crossword'>");
        var label = 1;
      	
        for(var r = CrosswordUtils.MIN_ROW_INDEX; r <CrosswordUtils.MAX_ROW_INDEX; r++){
            html.push("<tr id='tr"+r+"'>");
           // for(var c = 0; c < grid[r].length; c++){
            for(var c = CrosswordUtils.MIN_COL_INDEX; c <CrosswordUtils.MAX_COL_INDEX; c++){
                var cell = grid[r][c];
                var is_start_of_word = false;
                if(cell == null){
                    //var char = "&nbsp;";
					 var character = "";
                    var css_class = "no-border";
                } else {
                    var character = cell['character'];
                    var css_class = "word";
                    var is_start_of_word = (cell['across'] && cell['across']['is_start_of_word']) || (cell['down'] && cell['down']['is_start_of_word']);
                }
				
                if(is_start_of_word) {
                    var img_url = CrosswordUtils.PATH_TO_PNGS_OF_NUMBERS + label + ".png";
                    html.push("<td class='" + css_class + "' title='" + r + "," + c + "' style=\"background-image:url('" + img_url + "')\"> <input type='text' maxlength='1' id='" + r + "-" + c + "'>");
                   	var obj= {};
                   	obj.number = label;
                   	if(cell.across && cell.across.is_start_of_word == true){                   		
                   		obj.direction = "across";
                   	}else if(cell.down && cell.down.is_start_of_word == true){
                   		obj.direction = "down";
                   	}
                   	 CrosswordUtils.startingNodes.push(obj);
                    label++;			
				 } else if(cell != null){                
					html.push("<td class='" + css_class + "' title='" + r + "," + c + "'><input type='text'   maxlength='1' id='" + r + "-" + c + "'>");				   
                }
				else{
						html.push("<td class='" + css_class + "' title='" + r + "," + c + "'>");	
				}

                if(show_answers) {
                    html.push(character);
                } else {
                  //  html.push("&nbsp;");	
					html.push("");						
                }
            }
            html.push("</tr>");
        }
        html.push("</table>");
        CrosswordUtils.MIN_ROW_INDEX = 50;
      	CrosswordUtils.MAX_ROW_INDEX = 0;
      	CrosswordUtils.MIN_COL_INDEX = 50;
      	CrosswordUtils.MAX_COL_INDEX = 00;
        
        return html.join("\n");
    }
    
	
	
}

