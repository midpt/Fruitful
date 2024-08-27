export default {
	myVar1: [],
	myVar2: {},
	mdl1_multiSelOptList:[],	
	mdl1_multiSelRes:'',
	myPging:0,


	myFun1 () {
		//	write code here
		//	this.myVar1 = [1,2,3]
	
	},

	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
		let a="as]k [sdk"
		a.replace(/[/[\[\]\"]/g,"")
		return a;
	},
	//---called when a user clicks +button to open a Modal Mdl1 to add new fruit
	//-- Also to create Fruit_Types Option Lists
	sel1_optList: async()=>{
		let fTypes=[];
		await	FetchDrpDwn_qry.run()
			.then(r=>r.reduce(function(drpList,curItm){
			//--Loop till all the rows are done
			//  Look for column Fruit_Types 
			//  if the item in the required column not already accumulator in drpList, then add the item to it
			if ( !drpList.includes(curItm.Fruit_Types) && curItm.Fruit_Types !=='' ){
				let newrow={label:curItm.Fruit_Types, value:curItm.Fruit_Types};
				drpList.push(newrow);
			}
			return drpList;
		},[]))
			.then(res=>{
			fTypes=res
		})
			.then(()=> showModal('Mdl1'))
			.then(()=>Mdl1_Sel1.setOptions(fTypes))
			.then(()=>Mdl1_Sel1.setSelectedOption({label:'Apple', value:'Apple'}))
			.then(()=>JSObject1.sel2_optList())
			.then(()=>JSObject1.sel3_optList())
		//.then(()=>JSObject1.multiSel_optList())

		return fTypes;
	},

	// Called by function sel1_optList()
	//---called when a user clicks +button to open a Modal Mdl1. 
	// This also create Country dropdown Sel2 List
	sel2_optList: async()=>{
		let ctry=[];
		await	FetchDrpDwn_qry.run()
			.then(r=>r.reduce(function(drpLst,curItm){
			//--Loop till all the rows are done
			//  Look for column Fruit_Types 
			//  if the item in the required column not already accumulator in drpList, then add the item to it
			if ( !drpLst.includes(curItm.Country) && curItm.Country !==''   ){
				let newrow={label:curItm.Country, value:curItm.Country.toUpperCase()};
				drpLst.push(newrow);
			}
			return drpLst;
		},[]))
			.then(res=>{
			ctry=res
		})

			.then(()=>Mdl1_Sel2.setOptions(ctry))
			.then(()=>Mdl1_Sel2.setSelectedOption({label:'usa', value:'USA'}))
		return ctry;
	},	

	// Called by function sel1_optList()
	//---called when a user clicks +button to open a Modal Mdl1. 
	//  This also to create Grading dropdown Sel2
	sel3_optList: async()=>{
		let grd=[];
		await	FetchDrpDwn_qry.run()
			.then(r=>r.reduce(function(drpList,curItm){
			//--Loop till all the rows are done
			//  Look for column Fruit_Types 
			//  if the item in the required column not already accumulator in drpList, then add the item to it
			if ( !drpList.includes(curItm.Grading) && curItm.Grading !==''){
				let newrow={label:curItm.Grading, value:curItm.Grading};
				drpList.push(newrow);
			}
			return drpList;
		},[]))
			.then(res=>{
			grd=res
		})

			.then(()=>Mdl1_Sel3.setOptions(grd))
			.then(()=>Mdl1_Sel3.setSelectedOption({label:'Good', value:'GOOD'}))
		return grd;
	},		

	
	//----NOT used !!!
	multiSel_optList: async()=>{
		let sson=[];
		this.mdl1_multiSelOptList=[];
		await	FetchDrpDwn_qry.run()
			.then(r=>r.reduce(function(drpList,curItm){
			//--Loop till all the rows are done
			//  Look for column Fruit_Types 
			//  if the item in the required column not already accumulator in drpList, then add the item to it
			if ( !drpList.includes(curItm.Season) && curItm.Season!=''){
				let newrow={'label':curItm.Season.toString(), 'value':curItm.Season.toString()};
				drpList.push(newrow);
			}
			return drpList;
		},[]))
			.then(res=>{
			sson=res
		})
			.then(()=>this.mdl1_multiSelOptList=sson)
		//	.then(()=>Mdl1_MultiSel.setSelectedOptions([{label:'Jan',value:'Jan'},{label:'Feb',value:'Feb'}]))
		//	.then(()=>showAlert('selectedOptionValue='+Mdl1_MultiSel.selectedOptionValues))


		//.then(()=>Mdl1_MultiSel.selectedOptionLabels(['Jan','Feb','Mar','Apr']))
		// .then(()=>Mdl1_MultiSel.selectedOptionValues(['Jan','Feb','Mar','Apr']))


		return this.mdl1_multiSelOptList;
	},			


	//---called by MultiSelect  Mdl1_MultiSel  
	//  When Mdl1_MultiSel  OptionChange Event takes place
	// Purpose is to remove [] "
	makeMultiSel2Str: async()=>{
		let res=Mdl1_MultiSel.selectedOptionValues;
		let jsn=JSON.stringify(res);
		//--remove [] "
		this.mdl1_multiSelRes=jsn.replace(/[\]\[\"]/g, "");
		//this.mdl1_multiSelRes='\"'+this.mdl1_multiSelRes+'\"'
		showAlert(this.mdl1_multiSelRes)
	},

	makeImgUrl(){
	     if (Mdl1_ImgInput.text.indexOf('d/') !=-1){
				  let stpos=Mdl1_ImgInput.text.indexOf('d/')+2
					let endpos=Mdl1_ImgInput.text.lastIndexOf('/v')
					let urlID=Mdl1_ImgInput.text.substring(stpos,endpos)
					let fullUrl='https://drive.google.com/thumbnail?id='+urlID+'&sz=w180';//+sz;
				  Mdl1_Image.setImage(fullUrl);
				 
				 return fullUrl;
					
			 }
	},
	
	//----when a user select a table row, show the fruit image
	tblRowSelectShwImg(){
		let selRowImgUrl=Table1.selectedRow.Image
		     if (selRowImgUrl.indexOf('d/') !=-1){
				  let stpos=selRowImgUrl.indexOf('d/')+2
					let endpos=selRowImgUrl.lastIndexOf('/v')
					let urlID=selRowImgUrl.substring(stpos,endpos)
					let fullUrl='https://drive.google.com/thumbnail?id='+urlID+'&sz=w180';//+sz;
				  Main_Img.setImage(fullUrl);
				 return fullUrl;
			 }else{ 
				  //----no valide url found show defualt no image
				  let urlID='12cWGofliO-FPvx7Cm3bIA9aXn7Vpjs2F'
				  let fullUrl='https://drive.google.com/thumbnail?id='+urlID+'&sz=w180';
				  Main_Img.setImage(fullUrl);
	
			 }
		
		
	},
	
 //---Not use---
	nxt: async()=>{
		//Table1.pageOffset, Table1.pageSize  	Table1.pageOffset Table1.pageNo
	//	IcnButt_previous.setDisabled(false);
		let totalRec= await FetchDrpDwn_qry.data[0].TotalRec;
		let totalRecViewedViaNxt=0;
		let totalPg=0;
		totalPg=Math.ceil((totalRec)/(Table1.pageSize))
	////	if(Table1.pageNo < totalPg ){
		//	this.myPging++;
		//	await Fetch_qry.run();
	//		totalRecViewedViaNxt=Table1.pageSize * (Table1.pageNo-1)+Table1.tableData.length;
	//		totalRecViewedViaNxt =>totalRec? IcnButt_next.setDisabled(true):IcnButt_next.setDisabled(false)	;
	//	 }
	//	Table1.setSelectedRowIndex(20);
		//totalRecViewedViaNxt=Table1.pageSize * (Table1.pageNo-1)+Table1.tableData.length;
		//if(totalRecViewedViaNxt =>totalRec ) IcnButt_next.setDisabled(true)	;
		
		showAlert('Table1.totalRecordsCount='+Table1.totalRecordsCount+'  pageSize='+Table1.pageSize+'\n pageOffset='+Table1.pageOffset+' pageNum='+Table1.pageNo+' \ntableData.length='+Table1.tableData.length+' Fetch_qry.data.length='+Fetch_qry.data.length+' totalRecViewedViaNxt='+totalRecViewedViaNxt);
		
		return totalRecViewedViaNxt
		
	},
	
	//--NOT use
	prev: async()=>{
		//Table1.pageOffset, Table1.pageSize  	Table1.pageOffset Table1.pageNo
	//	IcnButt_next.setDisabled(false);
		let totalRec= await FetchDrpDwn_qry.data[0].TotalRec;
		let totalRecViewedViaNxt=0;
		//totalRecViewedViaNxt=Table1.pageSize * (Table1.pageNo-1)+Table1.tableData.length;
		if(Table1.pageNo >1 )Table1.pageNo--;
		if( Table1.pageNo <= 1) IcnButt_previous.setDisabled(true)	;
		
	//	showAlert('Table1.totalRecordsCount='+Table1.totalRecordsCount+'  pageSize='+Table1.pageSize+'\n pageOffset='+Table1.pageOffset+' pageNum='+Table1.pageNo+' \ntableData.length='+Table1.tableData.length+' Fetch_qry.data.length='+Fetch_qry.data.length+' totalRecViewedViaNxt='+totalRecViewedViaNxt);
		
		return totalRecViewedViaNxt		
	},

	
	
	
}