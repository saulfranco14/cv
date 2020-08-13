
$(document).ready(function(){
  var date_input=$('input[name="Fecha_Nacimiento_Alumno"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'yyyy/mm/dd',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
})
