$( document ).ready(function() {
	var sw_btn = $("#sw_proj_btn");
	var ml_btn = $("#ml_proj_btn");
	var isLoadMore = false;

	generateProjects();

	sw_btn.click(()=>{
		if(!sw_btn.hasClass("active")){
			sw_btn.addClass("active");
			ml_btn.removeClass("active");

			$('#Sw_project_content').removeClass("d-none");
			$('#Ml_project_content').addClass("d-none");

			isLoadMore = false;
			adjustProjectContainer(sw_projects, false);
		}
	});

	ml_btn.click(()=>{
		if(!ml_btn.hasClass("active")){
			ml_btn.addClass("active");
			sw_btn.removeClass("active");

			$('#Ml_project_content').removeClass("d-none");
			$('#Sw_project_content').addClass("d-none");

			isLoadMore = false;
			adjustProjectContainer(ml_projects, false);
		}
	});

	$("#loadMoreBtn").click(()=>{
		if(sw_btn.hasClass("active")){
			isLoadMore ^= true;
			let sentence = (isLoadMore)?"Load Less": "Load More";
			adjustProjectContainer(sw_projects, isLoadMore);

			$("#loadMoreBtn").html(sentence);
		}
		else{
			isLoadMore ^= true;
			let sentence = (isLoadMore)?"Load Less": "Load More";
			adjustProjectContainer(ml_projects, isLoadMore);

			$("#loadMoreBtn").html(sentence);
		}
	});

	$('.navbar-nav>li>a').on('click', function(){
	    $('.navbar-collapse').collapse('hide');
	});

	$(window).resize(function() {
	    clearTimeout(window.resizedFinished);
	    window.resizedFinished = setTimeout(function(){
	    	if(sw_btn.hasClass("active")){
				adjustProjectContainer(sw_projects, isLoadMore);
			}
			else{
				adjustProjectContainer(ml_projects, isLoadMore);
			}
	    }, 250);
	});

	setTimeout(function() {
        $(document).trigger('afterready');
    }, 200);


});

$(document).bind('afterready', function() {
    // call your code here that you want to run after all $(document).ready() calls have run
	adjustProjectContainer(sw_projects, false);
});

function spinner_toggle(isActive){

	if(isActive)
		$("#spinner").removeClass("d-none");
	else
		$("#spinner").addClass("d-none");

}


function generateProjects(){

	var content = "";
	for (let i=sw_projects.length-1; i>=0; i--){

		content += '<div class="col-lg-4 col-md-6 d-flex align-items-stretch">';
        content += '<div class="card mt-3 position-relative padding-btm-61">';
        content += '<img class="card-img-top p-3" src="'+sw_projects[i].img+'" alt="Card image cap">';
        content += '<div class="card-body">';
        content += '<h5 class="card-title font-bebas-regular colour-orange fs-20">'+sw_projects[i].title+'</h5>';
        content += '<p class="card-text font-hel font-15">'+sw_projects[i].desc+'</p>';
        content += '<div class="card-footer position-absolute bottom-0 start-0"><a href="'+sw_projects[i].href+'" class="btn btn-primary font-hel fs-15"> <i class="bi bi-github"></i> Github</a>';
        content += '</div></div></div></div>';
	}

	$('#Sw_project_content').html(content);

	content = "";
	for (let i=ml_projects.length-1; i>=0; i--){

		content += '<div class="col-lg-4 col-md-6 d-flex align-items-stretch">';
        content += '<div class="card mt-3 position-relative padding-btm-61">';
        content += '<img class="card-img-top p-3" src="'+ml_projects[i].img+'" alt="Card image cap">';
        content += '<div class="card-body">';
        content += '<h5 class="card-title font-bebas-regular colour-orange fs-20">'+ml_projects[i].title+'</h5>';
        content += '<p class="card-text font-hel font-15">'+ml_projects[i].desc+'</p>';
        content += '<div class="card-footer position-absolute bottom-0 start-0"><a href="'+ml_projects[i].href+'" class="btn btn-primary font-hel fs-15"> <i class="bi bi-github"></i> Github</a>';
        content += '</div></div></div></div>';
	}

	$('#Ml_project_content').html(content);

	spinner_toggle(false);
}

function adjustProjectContainer(project, isShow){
	var container_width = $('#Project_container').width();
	var content_div = (project == sw_projects)?$('#Sw_project_content .card'):$('#Ml_project_content .card');
	var card_width = (project == sw_projects)?content_div.width():content_div.width();

	var num_of_card_per_row = Math.floor(container_width/card_width);
	let rows = (isShow)?Math.ceil(project.length/num_of_card_per_row):3;
	let i=0;
	let count=0;
	var total_height = 0;

	do{
		total_height += content_div[i].offsetHeight;
		i+=num_of_card_per_row;
		count++;

	}while(count<rows && i<project.length);

	// $('#Project_container').css("height", total_height + rows * 16 + "px");

	$( "#Project_container" ).animate({
	    height: total_height + rows * 16 + "px"
	  }, 500);

}