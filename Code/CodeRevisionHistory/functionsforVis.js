var $ = jQuery.noConflict();

// "Array.prototype" allows us to add aditional methods to the Array object. Here we add "insert" and "delete" methods

// "insert" method lets us add an element at any index
// e.g.
// [a,b,d].insert('c', 2); // [a,b,c,d]
Array.prototype.insert = function(element, index) {
	this.splice(index, 0, element);
}

// "remove" method lets us remove elements within index range
// e.g.
// [a,b,c,d].remove(0, 2); // [d]
Array.prototype.delete = function(startIndex, endIndex) {
	return this.splice(startIndex, (endIndex - startIndex) + 1);
}

function addlink(author1, author2, revisedlength)
{
	var temp = _.find(author_relation, function(eachrelation)
		{
			return ((eachrelation.source === author1 && eachrelation.target === author2)||
				(eachrelation.source === author2 && eachrelation.target === author1));
		});
	if(typeof temp === "undefined")
	{
		author_relation.push(
			{
				source: author1,
				target: author2,
				count: revisedlength
			});
	}
	else
	{
		_.find(author_relation, function(eachrelation)
			{
				if((eachrelation.source === author1 && eachrelation.target === author2)||
				(eachrelation.source === author2 && eachrelation.target === author1))
					eachrelation.count += revisedlength;
			});
	}
}

function constructSegment(authorId, segStr, segID, parentSegID, offset, startIndex, endIndex, type, permanentFlag) {
	return {
		sindex: startIndex,
		eindex: endIndex,
		segStr: segStr,
		permanentFlag: permanentFlag,
		segID: segID,
		parentSegID: parentSegID,
		offset: offset,
		authorId: authorId,
		type: type
	};
}

function analyzeEachEditInChangelog(entry, authorId, currentSegID ) 
{
	var type = entry.ty,
	insertStartIndex = null,
	deleteStartIndex = null,
	deleteEndIndex = null;

	if (type === 'mlti') {
		_.each(entry.mts, function(ent) {
			segmentsArray = analyzeEachEditInChangelog(ent, authorId, currentSegID);
		});
	} else if (type === 'rplc') {
        // console.log("this is rplc");
		_.each(entry.snapshot, function(ent) {
			segmentsArray = analyzeEachEditInChangelog(ent, authorId, currentSegID);
		});
	} else if (type === 'rvrt') {
        // console.log("this is rvrt");
		segmentsArray = [];
		_.each(entry.snapshot, function(ent) {
			segmentsArray = analyzeEachEditInChangelog(ent, authorId, currentSegID);
		});
	} else if (type === 'is' || type === 'iss') {
        // console.log("this is insert");
		insertStartIndex = entry.ibi - 1;
		segmentsArray = buildSegmentsWhenInsert(entry.s, insertStartIndex, authorId, segmentsArray );
	} else if (type === 'ds' || type === 'dss') {
        // console.log("this is delete");
		deleteStartIndex = entry.si - 1;
		deleteEndIndex = entry.ei - 1;
		segmentsArray = buildSegmentsWhenDelete(deleteStartIndex, deleteEndIndex, authorId,  segmentsArray );
	}
	else {
        	// all other types such as AS (formatting)
        }
        return segmentsArray;
}

function buildSegmentsWhenInsert(entryStr, startIndex, authorId, segmentsArray ) 
{
	var effectedSegment = null;
	var segmentLocation = null;

	if(segmentsArray != null)
    { // it shouldn't be, it could be empty, but not null
        // console.log(segmentsArray);
		effectedSegment = _.find(segmentsArray, function(eachSegment, index) 
		{
	        	if (eachSegment.sindex < startIndex && startIndex <= eachSegment.eindex) {
	        		segmentLocation = index;
	        		return eachSegment;
	        	}
	        	else if (startIndex === eachSegment.sindex) {
	        		segmentLocation = index;
	        		return eachSegment;                    
	        	}
	        	else if (startIndex === (eachSegment.eindex + 1) ){
	        		if (index === (segmentsArray.length - 1) ){
	        			segmentLocation = index;
	        			return eachSegment;
	        		}
	        		else {
	        		}
	        	}
	        	else {
	            	// do nothing, keep looking
	            }    
		});
	}
    // console.log(effectedSegment);

		// meaning, the segmentsArray is empty
		if (effectedSegment === undefined) 
		{
			currentSegID += 1;
			if (segmentsArray.length === 0) 
			{
            	if (entryStr.length === 0)
            	{ 
                    return segmentsArray;
            	// When an author inserts nothing right at the begining, 
            	// just leave it
            	}
            	else
            	{
            		var currentSeg =  constructSegment(authorId, entryStr, currentSegID,  currentSegID, 0, startIndex, (startIndex + entryStr.length - 1), "new segment because of no previous segment", false);
                    // console.log(currentSeg);    
            	}
            	segmentsArray.insert(currentSeg,segmentsArray.length);
            }
            // has something in the array but couldn't find the effected, because the comment insert at the end+1
            else
            {
            	var currentSeg =  constructSegment(authorId, entryStr, currentSegID,  currentSegID, 0,(segmentsArray[(segmentsArray.length-1)].eindex+1), ((segmentsArray[(segmentsArray.length-1)].eindex+1) + entryStr.length - 1), "new segment at the end because of couldn't find previous segment", false);                	
            	// console.log(currentSeg); 
                segmentsArray.insert(currentSeg,segmentsArray.length);
            }
        } 

        else 
        {
        	if(effectedSegment.sindex === startIndex)
        	{
        		if (startIndex === 0){
        			if (effectedSegment.permanentFlag === true){
        				 currentSegID += 1;
        				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = true, when effectedSegment.sindex === startIndex and startIndex === 0", false);
        				// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, segmentLocation );

        				for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
        					segmentsArray[i].sindex += entryStr.length;
        					segmentsArray[i].eindex += entryStr.length;
        				}

                        //self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                    else {
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID) {

                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                        }
                        else {
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = false,  authorId != , when effectedSegment.sindex === startIndex and startIndex === 0", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, segmentLocation );

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                        for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        	segmentsArray[i].sindex += entryStr.length;
                        	segmentsArray[i].eindex += entryStr.length;
                        }
                    }
                }
                else if ( ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segmentsArray.length-1 ))){
                	if (effectedSegment.permanentFlag === true){
                		 currentSegID += 1;
                		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, permanentflag = true, when ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segmentsArray.length-1 ))", false);
                		// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, (segmentLocation+1) );

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                    else {
                    	if(effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, differentAuthor, permanentflag=false, when ((effectedSegment.eindex+1) ===  startIndex )&& (segmentLocation === (segmentsArray.length-1 ))", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation+1) );

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                }
        		// start Index =  effected . startIndex, effectedSegment in the middle
        		else{
        			if(effectedSegment.permanentFlag === true && segmentsArray[segmentLocation-1].permanentFlag === true){
        				 currentSegID += 1;
        				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment insert between two permanentflag== true", false);
        				// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, segmentLocation );
        				for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
        					segmentsArray[i].sindex += entryStr.length;
        					segmentsArray[i].eindex += entryStr.length;
        				}
                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                    else if (effectedSegment.permanentFlag === true && segmentsArray[segmentLocation-1].permanentFlag === false){
                    	if (segmentsArray[segmentLocation-1].authorId === authorId && segmentsArray[segmentLocation-1].parentSegID === segmentsArray[segmentLocation-1].segID){
                    		segmentsArray[segmentLocation-1].segStr += entryStr;
                    		segmentsArray[segmentLocation-1].eindex += entryStr.length;
                    		for (var i = segmentLocation; i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment after a temporary segment with differentAuthor, before a permanent segment", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                    else if (effectedSegment.permanentFlag === false && segmentsArray[segmentLocation-1].permanentFlag === true){
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                    		for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment, after a permanent, before a temporary but differentAuthor", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}

                            //self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                    else{
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr = entryStr + effectedSegment.segStr;
                    		effectedSegment.eindex += entryStr.length;
                    		for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else if (segmentsArray[segmentLocation-1].authorId === authorId && segmentsArray[segmentLocation-1].parentSegID === segmentsArray[segmentLocation-1].segID) {
                        	segmentsArray[segmentLocation-1].segStr += entryStr;
                        	segmentsArray[segmentLocation-1].eindex += entryStr.length;
                        	for (var i = segmentLocation; i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment, between two temporary but differentAuthor", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, segmentLocation );
                        	for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                }
            }

            else if (startIndex === (effectedSegment.eindex + 1)){
            	if (segmentLocation ===  (segmentsArray.length-1)){
            		if (effectedSegment.permanentFlag === true){
            			 currentSegID += 1;
            			var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, not the same author when segmentLocation ===  (segmentsArray.length-1)", false);
            			// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, (segmentLocation+1) );

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                    else{
                    	if (effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, not the same author when segmentLocation ===  (segmentsArray.length-1)", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation+1) );

	            			// self edit v.s. other edit
	            			if (effectedSegment.authorId != authorId) {
	            				addlink(effectedSegment.authorId, authorId, entryStr.length);
	            			}
	            		}
	            	}
	            }	
	            else{
	            	if (effectedSegment.permanentFlag === true && segmentsArray[segmentLocation+1].permanentFlag === true){
	            		 currentSegID += 1;
	            		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
	            		// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, (segmentLocation+1) );

	            		for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
	            			segmentsArray[i].sindex += entryStr.length;
	            			segmentsArray[i].eindex += entryStr.length;
	            		}

                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                    else if (effectedSegment.permanentFlag === true && segmentsArray[segmentLocation+1].permanentFlag === false){
                    	if( segmentsArray[segmentLocation+1].authorId === authorId && segmentsArray[segmentLocation+1].parentSegID === segmentsArray[segmentLocation+1].segID){
                    		segmentsArray[segmentLocation+1].segStr = entryStr + segmentsArray[segmentLocation+1].segStr;
                    		segmentsArray[segmentLocation+1].eindex += entryStr.length;
                    		for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation+1) );

                        	for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}
                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                    else if (effectedSegment.permanentFlag === false && segmentsArray[segmentLocation+1].permanentFlag === true) {
                    	if( effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;

                    		for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else{
                        	 currentSegID += 1;
                        	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new segment and found the effected segment, between two permanentFlag === true", false);
                        	// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation+1) );

                        	for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}

                            // self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                    else {
                    	if(effectedSegment.authorId ===authorId && segmentsArray[segmentLocation+1].authorId != authorId && effectedSegment.parentSegID === effectedSegment.segID){

                    		effectedSegment.segStr += entryStr;
                    		effectedSegment.eindex += entryStr.length;

                    		for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                        }
                        else if (effectedSegment.authorId != authorId && segmentsArray[segmentLocation+1].authorId === authorId && segmentsArray[segmentLocation+1].parentSegID === segmentsArray[segmentLocation+1].segID) {
                        	segmentsArray[(segmentLocation+1)].segStr = entryStr + segmentsArray[segmentLocation+1].segStr;
                        	segmentsArray[(segmentLocation+1)].eindex += entryStr.length;
                        	for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                        else if (effectedSegment.authorId != authorId && segmentsArray[segmentLocation+1].authorId != authorId) {
            				// create the new segment and update
            				 currentSegID += 1;
            				var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, startIndex + entryStr.length - 1, "new segment between two temporary but differentAuthor segments", false);
            				// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation+1) );
            				for (var i = (segmentLocation + 2); i < segmentsArray.length; i++) {
            					segmentsArray[i].sindex += entryStr.length;
            					segmentsArray[i].eindex += entryStr.length;
            				}
            				addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                        else {
                        	effectedSegment.segStr += entryStr;
                        	effectedSegment.eindex += entryStr.length;

                        	for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}
                            //self edit v.s. other edit
                            if (effectedSegment.authorId != authorId) {
                            	addlink(effectedSegment.authorId, authorId, entryStr.length);
                            }
                        }
                    }
                }

            }
            else if (effectedSegment.sindex < startIndex && startIndex <= effectedSegment.eindex) 
            {
            	if (effectedSegment.permanentFlag === true) 
            	{
            		if (effectedSegment.sindex === effectedSegment.eindex) 
            		{
            			 currentSegID += 1;
            			var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of the found permanent effected segment", false);
            			// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, (segmentLocation) );
            			for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
            				segmentsArray[i].sindex += entryStr.length;
            				segmentsArray[i].eindex += entryStr.length;
            			}
                        //self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }

                    else 
                    {
                    	var strBeforeStartIndex = effectedSegment.segStr.substring(0, startIndex - effectedSegment.sindex);
                    	var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                    	 currentSegID += 1;
                    	var segBefore =  constructSegment(effectedSegment.authorId, strBeforeStartIndex,  currentSegID, effectedSegment.segID, 0,    effectedSegment.sindex, (startIndex - 1), "from buildSegmentsWhenInsert Before when permanentFlag = true", false);
                    	// console.log(segBefore);
                        segmentsArray.insert(segBefore, segmentLocation);

                    	 currentSegID += 1;
                    	var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of the found permanent effected segment", false);
                    	// console.log(currentSeg);
                        segmentsArray.insert(currentSeg, (segmentLocation + 1) );

                    	 currentSegID += 1;
                    	var offset = startIndex - effectedSegment.sindex;
                    	var segAfter =  constructSegment(effectedSegment.authorId, strAfterStartIndex,  currentSegID, effectedSegment.segID, offset,    (startIndex + entryStr.length ), (effectedSegment.eindex + entryStr.length), "from buildSegmentsWhenInsert After when permanentFlag = true", false);
                        // console.log(segAfter);
                    	segmentsArray.insert(segAfter, (segmentLocation + 2) );

                    	segmentsArray.delete( (segmentLocation + 3 ), (segmentLocation + 3 ));

                    	for (var i = (segmentLocation + 3); i < segmentsArray.length; i++) {
                    		segmentsArray[i].sindex += entryStr.length;
                    		segmentsArray[i].eindex += entryStr.length;
                    	}

                		//self edit v.s. other edit
                		if (effectedSegment.authorId != authorId) {
                			addlink(effectedSegment.authorId, authorId, entryStr.length);
                		}
                	}
                }
                else{
                	if(effectedSegment.authorId === authorId && effectedSegment.parentSegID === effectedSegment.segID){
                		if (effectedSegment.sindex === effectedSegment.eindex){
                			effectedSegment.segStr = entryStr + effectedSegment.segStr;
                			effectedSegment.eindex += entryStr.length;
                			for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                				segmentsArray[i].sindex += entryStr.length;
                				segmentsArray[i].eindex += entryStr.length;
                			}
                        }

                        else{
                        	var strBeforeStartIndex = effectedSegment.segStr.substring(0, startIndex - effectedSegment.sindex);
                        	var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                        	effectedSegment.segStr = strBeforeStartIndex + entryStr + strAfterStartIndex;
                        	effectedSegment.eindex += entryStr.length;

                        	for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                        		segmentsArray[i].sindex += entryStr.length;
                        		segmentsArray[i].eindex += entryStr.length;
                        	}
                        }
                    }
                    else{
                    	if (effectedSegment.sindex === effectedSegment.eindex){
                    		 currentSegID += 1;
                    		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex, (startIndex + entryStr.length - 1), "new insert segment in the middle of a one-charactor, temporary, differentAuthor effected segment", false);
                    		// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation) );

                    		for (var i = (segmentLocation + 1); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                    	}
                    	else {
                    		var strBeforeStartIndex = effectedSegment.segStr.substring(0, (startIndex - effectedSegment.sindex));
                    		var strAfterStartIndex = effectedSegment.segStr.substring(startIndex - effectedSegment.sindex);

                    		 currentSegID += 1;
                    		var segBefore =  constructSegment(effectedSegment.authorId, strBeforeStartIndex,  currentSegID, effectedSegment.parentSegID, effectedSegment.offset,    effectedSegment.sindex, (startIndex - 1), "from buildSegmentsWhenInsert Before when permanentFlag = false, differentAuthor", false);
                    		// console.log(segBefore);
                            segmentsArray.insert(segBefore, segmentLocation);

                    		 currentSegID += 1;
                    		var currentSeg =  constructSegment(authorId, entryStr,  currentSegID,  currentSegID, 0,    startIndex , (startIndex + entryStr.length - 1), "new insert segment in the middle of the found temporary, differentAuthor effected segment", false);
                    		// console.log(currentSeg);
                            segmentsArray.insert(currentSeg, (segmentLocation + 1) );

                    		 currentSegID += 1;
                    		var offset = startIndex - effectedSegment.sindex;
                    		var segAfter =  constructSegment(effectedSegment.authorId, strAfterStartIndex,  currentSegID, effectedSegment.parentSegID, offset + effectedSegment.offset,    (startIndex + entryStr.length ), (effectedSegment.eindex + entryStr.length), "from buildSegmentsWhenInsert After when permanentFlag = false, differentAuthor", false);
                    		// console.log(segAfter);
                            segmentsArray.insert(segAfter, (segmentLocation + 2) );

                    		segmentsArray.delete( (segmentLocation+3), (segmentLocation+3) );

                    		for (var i = (segmentLocation + 3); i < segmentsArray.length; i++) {
                    			segmentsArray[i].sindex += entryStr.length;
                    			segmentsArray[i].eindex += entryStr.length;
                    		}
                    	}
                        // self edit v.s. other edit
                        if (effectedSegment.authorId != authorId) {
                        	addlink(effectedSegment.authorId, authorId, entryStr.length);
                        }
                    }
                }
            }
            else{
        		// shouldn't happen
        	}
        }
        // console.log(segmentsArray);
        return segmentsArray;
    }

function buildSegmentsWhenDelete(deleteStartIndex, deleteEndIndex, authorId, segmentsArray ) 
{
    // var deleteSegmentLocation = null;
    var effectedSegmentOfDelete = null;

        // delete start === delete end, only deleting 1 character
    if (deleteStartIndex === deleteEndIndex) 
    {
       var deleteIndex = deleteStartIndex;

       if(segmentsArray != null)
       {
          effectedSegmentOfDelete = _.find(segmentsArray, function(eachSegment, index) 
          {
            if (eachSegment.sindex === deleteIndex ) 
            {
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1);
                    	}

                    	if (eachSegment.sindex === eachSegment.eindex) {
                    		
                    		// delete the whole segment
                    		segmentsArray.delete(index, index);

                    		// updates all the following segments's start and end index
                    		for (var i = index; i <= (segmentsArray.length-1); i++){
                    			segmentsArray[i].sindex -= 1;
                    			segmentsArray[i].eindex -= 1;
                    		}

                    		// deleteSegmentLocation = index;
                    		return eachSegment;
                    	}
                    	else {

                    		var strAfterDelete = eachSegment.segStr.substring(1); // = substring(1)

                    		if (eachSegment.permanentFlag === true) {

	                    		// create a new segment with offset
                                currentSegID += 1;
                                var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.segID, 1,    eachSegment.sindex, (eachSegment.eindex - 1), " segAfter when eleteStartIndex === deleteEndIndex, permanentflag = true", false);
                                segmentsArray.insert(segAfter, index);

	                    		// delete the whole segment
	                    		segmentsArray.delete((index + 1), (index + 1));

	                    		// updates all the following segments's start and end index
	                    		for (var i = (index+1); i <= (segmentsArray.length-1); i++){
	                    			segmentsArray[i].sindex -= 1;
	                    			segmentsArray[i].eindex -= 1;
	                    		}
	                    		return eachSegment;
	                    	}
	                    	else {
                    			// segmentsArray[index].segStr = strAfterDelete;
                    			// segmentsArray[index].eindex -= 1;

                                // create a new segment with offset
                                currentSegID += 1;
                                var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.parentSegID, 1+eachSegment.offset,    eachSegment.sindex, (eachSegment.eindex - 1), " segAfter when eleteStartIndex === deleteEndIndex, permanentflag = true", false);
                                segmentsArray.insert(segAfter, index);

                                // delete the whole segment
                                segmentsArray.delete((index + 1), (index + 1));

                                // updates all the following segments's start and end index
                                for (var i = (index+1); i <= (segmentsArray.length-1); i++){
                                	segmentsArray[i].sindex -= 1;
                                	segmentsArray[i].eindex -= 1;
                                }
                                return eachSegment;
                            }
                        }
                    }
                    else if (eachSegment.eindex === deleteIndex )
                    {
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1);
                    	}
                    	
                    	if (eachSegment.sindex === eachSegment.eindex) 
                        {
                    		// updates all the following segments's start and end index
                    		for (var i = index; i <= (segmentsArray.length-1); i++){
                    			segmentsArray[i].sindex -= 1;
                    			segmentsArray[i].eindex -= 1;
                    		}

                    		// delete the whole segment
                    		segmentsArray.delete( (index + 1 ), (index+1));
                    		return eachSegment;
                    	}
                    	else{
                    		var strBeforeDelete = eachSegment.segStr.substring(0, (deleteIndex - eachSegment.sindex)); // = substring(0,end-1)

                    		if (eachSegment.permanentFlag === true) {

	                    		// create a new segment with offset
                                currentSegID += 1;
                                var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.segID, 0,    eachSegment.sindex, (eachSegment.eindex - 1), " segBefore when eleteStartIndex === deleteEndIndex, in eachSegment.sindex != eachSegment.eindex, permanentflag = true", false);
                                segmentsArray.insert(segBefore, index);

	                    		// delete the whole segment
	                    		segmentsArray.delete( (index + 1 ), (index+1));

	                    		// updates all the following segments's start and end index
	                    		for (var i = (index+1); i <= (segmentsArray.length-1); i++){
	                    			segmentsArray[i].sindex -= 1;
	                    			segmentsArray[i].eindex -= 1;
	                    		}
	                    		return eachSegment;
	                    	}
	                    	else {
                                // create a new segment with offset
                                currentSegID += 1;
                                var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.parentSegID, eachSegment.offset,    eachSegment.sindex, (eachSegment.eindex - 1), " segBefore when eleteStartIndex === deleteEndIndex, in eachSegment.sindex != eachSegment.eindex, permanentflag = true", false);
                                segmentsArray.insert(segBefore, index);

                                // delete the whole segment
                                segmentsArray.delete( (index + 1 ), (index+1));

                    			// updates all the following segments's start and end index
                    			for (var i = (index+1); i <= (segmentsArray.length-1); i++){
                    				segmentsArray[i].sindex -= 1;
                    				segmentsArray[i].eindex -= 1;
                    			}
                    			return eachSegment;
                    		}
                    	}
                    }
                    else if (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex){
                    	// self edit v.s. other edit
                    	if (eachSegment.authorId != authorId) {
                    		addlink(eachSegment.authorId, authorId,1);
                    	}

                		var strBeforeDelete = eachSegment.segStr.substring(0, (deleteIndex - eachSegment.sindex)); // = substring(0,end-1)
                		var strAfterDelete = eachSegment.segStr.substring(deleteIndex - eachSegment.sindex + 1); //

                		if (eachSegment.permanentFlag === true) {

                    		// create two new segments, one with offset 0, another with offeset 
                         currentSegID += 1;
                         var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.segID, 0,    eachSegment.sindex, (deleteIndex - 1), "segBefore when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                         segmentsArray.insert(segBefore, index);

                    		// create a new segment with offset
                         currentSegID += 1;
                         var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.segID, (deleteIndex - eachSegment.sindex + 1 ),    deleteIndex, (eachSegment.eindex - 1), "segAffter when when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                         segmentsArray.insert(segAfter, (index+1) );

                    		// delete the whole segment
                    		segmentsArray.delete( (index + 2 ), (index+2));

                    		// updates all the following segments
                    		for (var i = (index+2); i <= (segmentsArray.length-1); i++){
                    			segmentsArray[i].sindex -= 1;
                    			segmentsArray[i].eindex -= 1;
                    		}
                    		return eachSegment;
                    	}
                    	else {
                            // create two new segments, one with offset 0, another with offeset 
                            currentSegID += 1;
                            var segBefore  =  constructSegment(eachSegment.authorId, strBeforeDelete,  currentSegID, eachSegment.parentSegID, eachSegment.offset,    eachSegment.sindex, (deleteIndex - 1), "segBefore when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                            segmentsArray.insert(segBefore, index);

                            // create a new segment with offset
                            currentSegID += 1;
                            var segAfter  =  constructSegment(eachSegment.authorId, strAfterDelete,  currentSegID, eachSegment.parentSegID, (deleteIndex - eachSegment.sindex + 1 + eachSegment.offset),    deleteIndex, (eachSegment.eindex - 1), "segAffter when when eachSegment.sindex === eachSegment.eindex, in (eachSegment.sindex < deleteIndex && deleteIndex < eachSegment.eindex), permanentflag = true", false);
                            segmentsArray.insert(segAfter, (index+1) );

                            // delete the whole segment
                            segmentsArray.delete( (index + 2 ), (index+2));

                            // updates all the following segments
                            for (var i = (index+2); i <= (segmentsArray.length-1); i++){
                            	segmentsArray[i].sindex -= 1;
                            	segmentsArray[i].eindex -= 1;
                            }
                            return eachSegment;
                        }
                    }
                    else {
                        // do nothing, keep looking
                    }
                });
}
else
{
    console.log("This should never happen, segmentsArray is null,  buildSegmentsWhenDelete when deleteStartIndex === deleteEndIndex");
}
}
    else 
    { 
    // when deleteStartIndex != deleteEndIndex

        	var deleteStartSegmentLocation = null;
        	var effectedSegmentOfDeleteStart = null;
        	var deleteEndSegmentLocation = null;
        	var effectedSegmentOfDeleteEnd = null;

        	if(segmentsArray != null )
        	{
        		effectedSegmentOfDeleteStart = _.find(segmentsArray, function(eachSegment, index) {
        			if (eachSegment.sindex <= deleteStartIndex && deleteStartIndex <= eachSegment.eindex) {
        				deleteStartSegmentLocation = index;
        				return eachSegment;
        			}
        			else {
        		        // do nothing, keep looking
        		    }
        		});

        		if (typeof effectedSegmentOfDeleteStart === "undefined"){
        			console.log(deleteStartIndex);
        			console.log(segmentsArray);
        			console.log("error 1");
        		}

        		effectedSegmentOfDeleteEnd = _.find(segmentsArray, function(eachSegment, index) {
        			if (eachSegment.sindex <= deleteEndIndex && deleteEndIndex <= eachSegment.eindex) {
        				deleteEndSegmentLocation = index;
        				return eachSegment;
        			}

        			else {
        		        // do nothing, keep looking
        		    }
        		});

        		if (typeof effectedSegmentOfDeleteEnd === "undefined" ){
        			console.log(deleteStartIndex);
        			console.log(deleteEndIndex);
        			console.log(segmentsArray);
        			console.log("BUG 1, because of the footnote insert and delete");

        			deleteEndSegmentLocation = segmentsArray.length-1;
        			effectedSegmentOfDeleteEnd = segmentsArray[segmentsArray.length-1];
        			deleteEndIndex = effectedSegmentOfDeleteEnd.eindex;
        		}

        		// delete within the same segment
        		if (deleteStartSegmentLocation === deleteEndSegmentLocation) {

                    // self edit v.s. other edit
                    if (effectedSegmentOfDeleteStart.authorId != authorId){
                    	addlink(effectedSegmentOfDeleteStart.authorId, authorId, deleteEndIndex - deleteStartIndex + 1);    
                    }

                    if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteStart.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						var strAfterDelete = effectedSegmentOfDeleteStart.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ); 

						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create two new segments, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle within a segment when permanentFlag is true", false);
				    		segmentsArray.insert(segBefore, deleteStartSegmentLocation);

				    		// seg after
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete in the middle within a segment when permanentFlag is true", false);
				    		segmentsArray.insert(segAfter, (deleteStartSegmentLocation+1) );

				    		// delete the old segment from current revision
				    		segmentsArray.delete( (deleteStartSegmentLocation + 2), (deleteStartSegmentLocation+2));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+2); i <= (segmentsArray.length-1); i++){
				    			segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create two new segments, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle within a segment when permanentFlag is true", false);
                            segmentsArray.insert(segBefore, deleteStartSegmentLocation);

                            // seg after
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 + effectedSegmentOfDeleteStart.offset),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete in the middle within a segment when permanentFlag is true", false);
                            segmentsArray.insert(segAfter, (deleteStartSegmentLocation+1) );

                            // delete the old segment from current revision
                            segmentsArray.delete( (deleteStartSegmentLocation + 2), (deleteStartSegmentLocation+2));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+2); i <= (segmentsArray.length-1); i++){
                            	segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteStart.eindex){
                    	var strAfterDelete = effectedSegmentOfDeleteStart.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ); 

                    	if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create a new segment with offset
				    		 currentSegID += 1;

				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 ),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from start to somewhere in the middle within a segment when permanentFlag is true", false);                               

				    		segmentsArray.insert(segAfter, (deleteStartSegmentLocation) );

				    		// delete the whole segment
				    		segmentsArray.delete( (deleteStartSegmentLocation + 1 ), (deleteStartSegmentLocation+1));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+1); i <= (segmentsArray.length-1); i++){
				    			segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;

                            var segAfter  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteStart.sindex + 1 + effectedSegmentOfDeleteStart.offset),    deleteStartIndex, (effectedSegmentOfDeleteStart.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from start to somewhere in the middle within a segment when permanentFlag is true", false);                               

                            segmentsArray.insert(segAfter, (deleteStartSegmentLocation) );

                            // delete the whole segment
                            segmentsArray.delete( (deleteStartSegmentLocation + 1 ), (deleteStartSegmentLocation+1));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+1); i <= (segmentsArray.length-1); i++){
                            	segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteStart.eindex){

						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						
						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create two new segments, one with offset 0, another with offeset 
				    		 currentSegID += 1;

				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle to the end within a segment when permanentFlag is true", false);

				    		segmentsArray.insert(segBefore, deleteStartSegmentLocation);
				    		
				    		// delete the old segment from current revision
				    		segmentsArray.delete( (deleteStartSegmentLocation+1), (deleteStartSegmentLocation + 1 ));

				    		// updates all the following segments
				    		for (var i = (deleteStartSegmentLocation+1); i <= (segmentsArray.length-1); i++){
				    			segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    			segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
				    		}
				    	}
				    	else {
                            // create two new segments, one with offset 0, another with offeset 
                             currentSegID += 1;

                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle to the end within a segment when permanentFlag is true", false);

                            segmentsArray.insert(segBefore, deleteStartSegmentLocation);
                            
                            // delete the old segment from current revision
                            segmentsArray.delete( (deleteStartSegmentLocation+1), (deleteStartSegmentLocation + 1 ));

                            // updates all the following segments
                            for (var i = (deleteStartSegmentLocation+1); i <= (segmentsArray.length-1); i++){
                            	segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            	segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
                            }
                        }
                    }
                    else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteStart.eindex){
                    	segmentsArray.delete(deleteStartSegmentLocation, deleteStartSegmentLocation);
        				// updates all the following segments
        				for (var i = deleteStartSegmentLocation; i <= (segmentsArray.length-1); i++){
        					segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
        					segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
        				}
        			}
        			else {
        				console.log("shouldn't happen in buildSegmentsWhenDelete, deleteStartSegmentLocation === deleteEndSegmentLocation");
        			}
        		}
        		// not within one segment, across multiple segments
        		else {
                    // self edit v.s. other edit
                    var otherEditCount = 0;

                    for (var i = (deleteStartSegmentLocation + 1); i<= deleteEndSegmentLocation-1; i++){
                    	if (segmentsArray[i].authorId != authorId){
                    		otherEditCount += segmentsArray[i].eindex - segmentsArray[i].sindex + 1;
                    	}
                    }

                    // if (effectedSegmentOfDeleteStart.authorId === authorId){
                    // 	 adjustStatisticData(authorId, "self", (selfEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1) );    
                    // 	 adjustStatisticData(authorId, "other", otherEditCount );    
                    // }
                    // else
                    // {
                    // 	 adjustStatisticData(authorId, "self", (effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1) );    
                    // 	 adjustStatisticData(authorId, "other", (otherEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1) );    
                    // }

                    // if (effectedSegmentOfDeleteEnd.authorId === authorId)
                    // {
                    // 	 adjustStatisticData(authorId, "self", (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1) );    
                    // }
                    // else
                    // { 
                    // 	 adjustStatisticData(authorId, "other", (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1) );    
                    // }
                    if (effectedSegmentOfDeleteStart.authorId != authorId)
                    {
                    	addlink(effectedSegmentOfDeleteStart.authorId, authorId, otherEditCount + effectedSegmentOfDeleteStart.eindex - deleteStartIndex + 1);
                    }
                    if (effectedSegmentOfDeleteEnd.authorId != authorId)
                    {
                    	addlink(effectedSegmentOfDeleteEnd.authorId, authorId, deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1);
                    }



                    if(deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteEnd.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						var strAfterDelete = effectedSegmentOfDeleteEnd.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1); 

						if (effectedSegmentOfDeleteStart.permanentFlag === true) {
				    		// create a new segment, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle across many segments when permanentFlag is true", false);
				    		segmentsArray.insert(segBefore, deleteStartSegmentLocation);
				    		// delete the old segment from current revision
				    		segmentsArray.delete((deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));

				    	}
				    	else {
                            // create a new segment, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete in the middle across many segments when permanentFlag is true", false);
                            segmentsArray.insert(segBefore, deleteStartSegmentLocation);
                            // delete the old segment from current revision
                            segmentsArray.delete((deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
                        }

                        if (effectedSegmentOfDeleteEnd.permanentFlag === true) {
				    		// create a new segment with offset
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.segID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
				    		segmentsArray.insert(segAfter, deleteEndSegmentLocation );
				    		// delete the old segment from current revision
				    		segmentsArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation+ 1 ));
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 + effectedSegmentOfDeleteEnd.offset),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
                            segmentsArray.insert(segAfter, deleteEndSegmentLocation );
                            // delete the old segment from current revision
                            segmentsArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation+ 1 ));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segmentsArray.length-1); i++){
							segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}

						if (deleteEndSegmentLocation === (deleteStartSegmentLocation+1)){
						}
						else{
							segmentsArray.delete( (deleteStartSegmentLocation+1), (deleteEndSegmentLocation-1));
						}
					}

					else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex < effectedSegmentOfDeleteEnd.eindex){

						var strAfterDelete = effectedSegmentOfDeleteEnd.segStr.substring(deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 );

						if (effectedSegmentOfDeleteEnd.permanentFlag === true) {
				    		// create a new segment with offset
				    		 currentSegID += 1;
				    		var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.segID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
				    		segmentsArray.insert(segAfter, deleteEndSegmentLocation );
				    		// delete the old segment from current revision
				    		segmentsArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation + 1 ));
				    	}
				    	else {
                            // create a new segment with offset
                             currentSegID += 1;
                            var segAfter  =  constructSegment(effectedSegmentOfDeleteEnd.authorId, strAfterDelete,  currentSegID, effectedSegmentOfDeleteEnd.parentSegID, (deleteEndIndex - effectedSegmentOfDeleteEnd.sindex + 1 + effectedSegmentOfDeleteEnd.offset),    deleteStartIndex, (effectedSegmentOfDeleteEnd.eindex - 1 - deleteEndIndex + deleteStartIndex), "segAfter of delete from the beginning of a segment to the middle of any segment across when permanentFlag is true", false);
                            segmentsArray.insert(segAfter, deleteEndSegmentLocation );
                            // delete the old segment from current revision
                            segmentsArray.delete( (deleteEndSegmentLocation + 1), (deleteEndSegmentLocation + 1 ));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segmentsArray.length-1); i++){
							segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segmentsArray.delete( deleteStartSegmentLocation, (deleteEndSegmentLocation-1));
					}
					else if (deleteStartIndex > effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteEnd.eindex){
						var strBeforeDelete = effectedSegmentOfDeleteStart.segStr.substring(0, (deleteStartIndex - effectedSegmentOfDeleteStart.sindex)); // = substring(0,end-1)
						if (effectedSegmentOfDeleteStart.permanentFlag === true) {

				    		// create a new segment, one with offset 0, another with offeset 
				    		 currentSegID += 1;
				    		var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.segID, 0,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle of a segment to the end of any segment across when permanentFlag is true", false);
				    		segmentsArray.insert(segBefore, deleteStartSegmentLocation);
				    		// delete the old segment from current revision
				    		segmentsArray.delete( (deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
				    	}
				    	else {
                            // create a new segment, one with offset 0, another with offeset 
                             currentSegID += 1;
                            var segBefore  =  constructSegment(effectedSegmentOfDeleteStart.authorId, strBeforeDelete,  currentSegID, effectedSegmentOfDeleteStart.parentSegID, effectedSegmentOfDeleteStart.offset,    effectedSegmentOfDeleteStart.sindex, (deleteStartIndex - 1), "segBefore of delete from middle of a segment to the end of any segment across when permanentFlag is true", false);
                            segmentsArray.insert(segBefore, deleteStartSegmentLocation);
                            // delete the old segment from current revision
                            segmentsArray.delete( (deleteStartSegmentLocation + 1), (deleteStartSegmentLocation + 1));
                        }

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segmentsArray.length-1); i++){
							segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segmentsArray.delete((deleteStartSegmentLocation+1), deleteEndSegmentLocation);
					}
					else if (deleteStartIndex === effectedSegmentOfDeleteStart.sindex && deleteEndIndex === effectedSegmentOfDeleteEnd.eindex){

						// updates all the following segments
						for (var i = (deleteEndSegmentLocation+1); i <= (segmentsArray.length-1); i++){
							segmentsArray[i].sindex -= (deleteEndIndex - deleteStartIndex + 1 );
							segmentsArray[i].eindex -= (deleteEndIndex - deleteStartIndex + 1 );
						}
						segmentsArray.delete( (deleteStartSegmentLocation), (deleteEndSegmentLocation));
					}
					else {
						console.log("This should never happen, segmentsArray is null,  buildSegmentsWhenDelete");
					}
				}
			}
			else{
				console.log("This should never happen, segmentsArray is null,  buildSegmentsWhenDelete when deleteStartIndex === deleteEndIndex");
			}
		}
		return segmentsArray;
	}