 var alertBox = new AlertHolder();
 var box;
 $(document).ready(function(){
  init();
});
function init()
{
	var	indice=new Pagination($('#history-list'),5);
	indice.build_list($('li'));
	indice.paginationBoton();
	indice.showList();
	box = $('div#mensaje');
	$('a.btn-card').click(function(e)
		{
			e.preventDefault();
			userCard($(this).data('userid'));
		});
	$('a.btn-block').click(function(e)
		{
			e.preventDefault();
			blockUser($(this).data('userid'));
		});
	$('a.btn-unblock').click(function(e)
		{
			e.preventDefault();
			unblockUser($(this).data('userid'));
		});
	$('a.btn-contact').click(function(e)
		{
			e.preventDefault();
			mailUser($(this).data('userid'));
		});
	$('button#mail-btn').click(function(e)
		{
			e.preventDefault();
			sendMail();
		});
	$('button.validate').click(function(e)
		{
			e.preventDefault();
			var entry = $(this).data('key');
			//console.log(e.currentTarget.attributes[1].value);
			validateEntry(entry );//sendMail();
		});
	$('button.preview').click(function(e)
		{
			e.preventDefault();
			var entry = $(this).data('key');
			//console.log(e.currentTarget.attributes[1].value);
			showEntry(entry);//sendMail();
		});
}
/*
/ Función para ver la carta de información de un usuario.
*/
function userCard(u)
{

	var url_req ="/admin/admin/ver_user'";
	dates={
            'usr':u
           }
	var req=new AjaxRq(url_req,buildCard,dates);


}
function buildCard(msg) {
	if(msg.succes!=='false'){
              				msg=msg[0];
              				var openBox="<div id=\"card\" class=\"alert alert-warning alert-dismissible\" role=\"alert\">";
              				var closeBtn="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
							var cardInfo="<div class=\"media-left\"><img src=\"<?=base_url('img/user_img')?>/"+msg.avatar+"\" width=\"120\"></div><div class=\"media-body\">"+
							"<p id=\"usr-info\"> <h4 class=\"media-heading\">"+msg.alias_usuario+"</h4>"+
							"<em>Nombre y Apellido: </em>"+msg.nombre+" "+msg.apellido_1+" "+msg.apellido_2+"<br>"+
							"<em>data de naxeiment: </em>"+msg.dat_nacimiento+"<br><em>Email: </em>"+msg.mail+"</p>";
							var closeDiv="</div></div>";

                  			//$('#usr_rol').html(msg.rol);
                    		$('div#usr-card').html(openBox+closeBtn+cardInfo+closeDiv).slideDown();
            		}else{
              				//lanzar_mensaj("<?=$this->lang->line('s_adm_meu')?>");
            		}
}
function blockUser(u)
{
	var url_req="<?=site_url('administracio/block_user')?>";
    dates={
           		'us':u,
           		'flag':0
           }
    var req=new AjaxRq(url_req,blocked,dates);
}
function unblockUser(u) {
	var url_req="<?=site_url('administracio/block_user')?>";
    dates={
           		'us':u,
           		'flag':1
           }
    var req=new AjaxRq(url_req,unblocked,dates);
}
function blocked(msg) {
    if(msg.succes!=='false')
    {
        var box='#art_'+msg.userId+'>.msg-alert';
        alertBox.alert_success($(box),"<?=$this->lang->line('a_adm_mud')?>");
    }else{
        alertBox.alert_error($(box),"<?$this->lang->line('a_adm_mud')?>");
    }
}
function unblocked (msg) {
    if(msg.succes!=='false')
    {
        var box='#art_'+msg.userId+'>.msg-alert';
        alertBox.alert_success($(box),"<?=$this->lang->line('a_adm_mud')?>");
    }else{
        alertBox.alert_error($(box),"<?$this->lang->line('a_adm_mud')?>");
    }
}
// contactar user.
function mailUser(u)
{
	$('input#user-id').val(u);
	var selector='li#art_'+u+'>h3';
	var name=$(selector).text();
	var firstWord=$('h4#title-mail').text();
	$('h4#title-mail').text(firstWord+' '+name);
	$('#modal-mail').modal('show');
}
function sendMail () {
    var url_req="<?=site_url('administracio/mail_user')?>";
           dates={
                  'us':$('input#user-id').val(),
                  'msj':$('textarea#msj-mail').val()
           }
           var reqM=new AjaxRq(url_req,mailRespose,dates);

           $('#modal-mail').modal('hide');
           alertBox.loading_bar(box);
}
function mailRespose(msg) {

	if(msg.succes!==false){
		var box=$('div#mensaje');
               alertBox.alert_success(box,"<?=$this->lang->line('s_adm_mes')?>");
            }else{
               alertBox.alert_error(box,"<?=$this->lang->line('s_adm_men')?>");

            }
}
function validateEntry(r)
    {

      var url_req= "/admin/admin/validate/"+r;
      if(confirm("Está por confirmar la entrada:" + r)){
      	var req = new AjaxRq(url_req,doneValidate,"");
        alertBox.loading_bar($('div#mensaje'));
      }
   /* var request3 = $.ajax({
            url: url_req,
            type: "GET",
            data: ""
            });



  request3.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
                  });*/
  }
function doneValidate(msg) {
	console.log(this);
        if(msg.success == true){
          var nom="#art_"+msg.id;
          $(nom).find("button.validate").attr("disabled","");
           alertBox.alert_success(box," Entrada validada.");
           //loader de mails
          // send_mass_mail();
           $.get( "/admin/admin/send_mass/"+msg.id, function( data ) {
                      if (data==1) {
                             alertBox.alert_success(box, "Missatges enviats");
                      }else{
                           alertBox.alert_error(box,"<?=$this->lang->line('s_adm_erj')?>");
                      }
                                                         });
        }else{
           alertBox.alert_error(box, "<?=$this->lang->line('s_adm_erj')?>");
        }
        }

  function showEntry(id) {

   url="/entries/entry_list/get_admin/"+id;
   $.get(url, function(data) {
   	if (data.success) {
		var holder = $('div#modal-entry');
		var json = data.entry;
		console.log(holder);
		holder.find("h3#title-e").text(json.title);
		holder.find("em#author-e").text(json.author);
		holder.find("p#description-e").text(json.description);
		holder.find("img#image-e").attr("src","/upload/"+json.image);
		holder.find("span#url-img").text("/upload/"+json.image);
		holder.find("p#text-e").html(json.text);
		//$('div#modal-entry').find("#").text();
		$('#entry-canvas').modal('show');

   	} else {
   $('#entry-canvas').modal('hide');

   	}
//do_mapa();
});
  }

