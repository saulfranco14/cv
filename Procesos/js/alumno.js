/**
 * JS Paises, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Escolaris©
 * @author Ing. Saul Mauricio Franco Rentera
 * @copyright Derechos reservados, México 2008-2012 Registros 03-2008-021510561000-01 03-2008-021510484100-01
 * @version 3.3.5
 * @package js
 * @final
 */

/**
 * Variable publica para la Generación de un TimeStamp para asegurarnos que es unico.
 * Para ver si se esta actualizando el archivo JS, al hacer cambios o no...
 * @var {String}
 */
var marcaTiempo = new Date().getTime();

/**
 * Variable publica que contiene la respuesta del servidor
 * @var {JSON}
 */
 var jsonRespuesta = null;

 /**
  * Variable publica para crear la peticion JSON que se enviara al servidor
  * @var {JSON}
  */

 var peticionJSON = null;

 /**
  * variable publica para contener la peticion JSON que se recibe del servidor
  * @var {JSON}
  */
 var jsonAlumno = null;

 /**
  * variable publica que contiene un Objeto para enviar al servidor.
  * @var {Object}
  */
  var objetoAlumno = null;

  /**
   * variable publica para contener la peticion JSON que se recibe del servidor
   * @var {JSON}
   */
  var jsonCarrera = null;

  /**
   * variable publica que contiene un Objeto para enviar al servidor.
   * @var {Object}
   */
   var objetoCarrera = null;

   /**
    * variable publica para contener la peticion JSON que se recibe del servidor
    * @var {JSON}
    */
   var jsonSesion = null;

   /**
    * variable publica que contiene un Objeto para enviar al servidor.
    * @var {Object}
    */
    var objetoSesion = null;

  /**
   * variable publica que contiene el nombre de la ultima accion realizada
   * @var {String}
   */

   var accion = null;

   /**
   * variable publica que contiene el numero de la columna para busqueda
   * @var {String}
   */

   var columnaBusqueda = null;

    /**
   * variable publica que contiene el criterio pra las busquedas
   * @var {String}
   */

   var criterioBusqueda = null;

   /**
   * constante publica con la url del Gateway que recibe las peticiones al servidor
   * (Si fuera desde un APK o similar, DEBERA incluir la ruta completa: http://www.dominio.com/etc...)
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   const GATEWAY_ALUMNO= "../zend_gateway/index.php";

   /**
   * constante publica que contiene el nombre de la clse a invocar al servidor
   *  Si fuera desde windows 8 desktop, necesitan cambiar la const por var, ya que windows 8 no soporta const
   *  @var {String}
   */

   var CLASE_ALUMNO = 'alumno';

   /**
 * Funcion Listener para llamar el nombre de la sesion del alumno
 * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
 * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @returns {void}
 */
function exitoMiCuenta(jsonRespuesta, estatusRespuesta, jqXHR)
{
    //Checamos primero, si existio un error Personalizado:
    if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
    }
    indice = 0;
    jsonAlumno = jsonRespuesta.result;
    $("#alumno").html(jsonAlumno[0].b);
}


   /**
	* Cuando el documento esta listo, podemos invocar funciones.
	* Si es mas de 1, debera llevar ; al final, de otra manera, no.
	* Mandamos a llamar el metodo de la validacion:
	*/

	$(document).ready(
	   listarAlumno()
	   );

     /**
      * Crear chismoso para el tbody:
      */

      $('#tbodyAlumno').bind('click', function(event){
          if(event.target != "[object HTMLButtonElement]"){
            if(event.target.parentElement == "[object HTMLButtonElement]"){
              seleccionoRegistro(event.target.parentElement.id);
            }
          }else{
            seleccionoRegistro(event.target.id);
          }
        });

      /**
       * Funcion para listar los paises mediante AJAX
       * @return {void}
       */

       function listarAlumno()

      {
        peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'listar',
          'clase' : CLASE_ALUMNO,
          'Params' : ['2']
        });
        accion = "listar";
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }

       /**
        * Funcion Listener para listar las alumno mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (success)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
        	//Checamos primero, si existio un error Personalizado:
        	if(jsonRespuesta.error){
            mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
            return;
          }
          indice = 0;
          jsonAlumno = jsonRespuesta.result;
          $('#tbodyAlumno > tr').remove();
          if(jsonAlumno.length > 0){
            htmlNuevo = '';
            for(indice=0; indice<jsonAlumno.length; indice++){
              objetoAlumno = jsonAlumno[indice];
              htmlNuevo += '<tr>';
                htmlNuevo += '<td>' + objetoAlumno.a + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.b + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.c + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.d + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.e + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.f + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.g + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.h + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.i + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.j + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.k + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.l + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.m + '</td>';
                htmlNuevo += '<td>' + objetoAlumno.n + '</td>';
                htmlNuevo += '<td>';
                  htmlNuevo += '<button id="button_editar_'+ indice +'" type="button" aria-label="Editar" class="btn btn-sm btn-warning"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
                  htmlNuevo += '&nbsp; <br class="visible-xs" />';
                  htmlNuevo += '<button id="button_borrar_'+ indice + '" type="button" aria-label="Borrar" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
                htmlNuevo += '</td>';
                htmlNuevo += '</tr>';
            }
            $('#tbodyAlumno').append(sanitizarHTML(htmlNuevo));
          }else{
            mostrarVentanaModal('No hay Alumnos');
          }
          switch (accion){
          case 'buscar':
            //mostramos el boton de listar todos:
            $('#buttonListarTodos').show();
          break;
          case 'listar':
            //ocultamos el boton de listar todos:
            $('#buttonListarTodos').hide();
          break;
          }
        }


      /**
      * Funcion para mostrar el pais escogido de la lista.
      * @param {int} idBoton El ID del boton pulsado en el tbody
      * @returns {void}
      */

      function seleccionoRegistro(idBoton)
      {
        //partiendo de que llega: button_editar_1, button_editar_2, etc..., button_borrar_1, button_borrar_2, etc...
        var arraycitoIDS = idBoton.split('_');
        var queAccion = arraycitoIDS[1];//es editar o borrar
        var queRegistro = Number(arraycitoIDS[2]);// Un numero desde cero(posicion del array, no ID del registro)...
        switch(queAccion){
          case 'editar':
            editarAlumno(queRegistro);
            break;
          case 'borrar':
            confirmarBorrado(queRegistro);
            break;
          default:
            mostrarVentanaModal('No hay accion seleccionada');
          break;
        }
      }

      /**
    * Funcion para mostrar el formulario para una nueva Mascota.
    * @returns {void}
    */

    function comboSesion()
     {
      peticionJSON = JSON.stringify(
      {
        'Id' : generarID(),
        'method' : 'comboSesion',
        'clase' : CLASE_ALUMNO,
        'Params' : ['2']
      });
      accion = "listar";
      $.ajax({
        method : 'POST',
        timeout : 50000,
        data : peticionJSON,
        dataType : 'json',
        url : GATEWAY_ALUMNO,
        success : function(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          exitolistarCombosSesion(jsonRespuesta, estatusRespuesta, jqXHR);
        },
        error : function(jqXHR, estatusError, textoError)
        {
          mostrarErrorJSON(jqXHR, estatusError, textoError);
        }
      });
    }
    /**
    * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
    * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
    * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
    * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
    */
    function exitolistarCombosSesion(jsonRespuesta, estatusRespuesta, jqXHR)
    {
    // checamos primero, si existio un error personalizaod:
     if (jsonRespuesta.error) {
      mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
      return;
     }
     var indice = 0;
     jsonSesion = jsonRespuesta.result;
     $('#id_sesion > option'). remove();
     if(jsonSesion.length > 0 ){
      for(indice=0; indice<jsonSesion.length; indice++){
      objetoSesion = jsonSesion[indice];
      $('#id_sesion').append('<option value="'+ objetoSesion.a + '">'+ objetoSesion.e   +'</option>');
      }
    }else{
     $('#id_sesion').append('<option value="x">No hay Sesiones </option>');
    }
    if (recuperado) {
     $('#id_sesion').val(objetoSesion.i).attr('selected','selected');
    }
    }

    /**
    * Funcion para mostrar el formulario para una nueva Mascota.
    * @returns {void}
    */

    function comboCarrera()
     {
      peticionJSON = JSON.stringify(
      {
        'Id' : generarID(),
        'method' : 'comboCarrera',
        'clase' : CLASE_ALUMNO,
        'Params' : ['2']
      });
      accion = "listar";
      $.ajax({
        method : 'POST',
        timeout : 50000,
        data : peticionJSON,
        dataType : 'json',
        url : GATEWAY_ALUMNO,
        success : function(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          exitolistarCombosCarrera(jsonRespuesta, estatusRespuesta, jqXHR);
        },
        error : function(jqXHR, estatusError, textoError)
        {
          mostrarErrorJSON(jqXHR, estatusError, textoError);
        }
      });
    }
    /**
    * Funcion Listener para listar los paises mediante AJAX y llenar el combo con los datos
    * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recbidad del servidor
    * @param {string} estatusRespuesta Cadena de texto, con el estatus de la respuesta (succes)
    * @param {object}  jqXHR Objeto XHR, con toda la tarza de la respuesta.
    */
    function exitolistarCombosCarrera(jsonRespuesta, estatusRespuesta, jqXHR)
    {
    // checamos primero, si existio un error personalizaod:
     if (jsonRespuesta.error) {
      mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
      return;
     }
     var indice = 0;
     jsonCarrera = jsonRespuesta.result;
     $('#id_carrera > option'). remove();
     if(jsonCarrera.length > 0 ){
      for(indice=0; indice<jsonCarrera.length; indice++){
      objetoCarrera = jsonCarrera[indice];
      $('#id_carrera').append('<option value="'+ objetoCarrera.a + '">'+ objetoCarrera.b   +'</option>');
      }
    }else{
     $('#id_carrera').append('<option value="x">No hay Carreras</option>');
    }
    if (recuperado) {
     $('#id_carrera').val(objetoCarrera.i).attr('selected','selected');
    }
    }


      /**
      * Funcion para mostrar el pais escogido de la lista y poder editarlo.
      * @param {int} indiceEscogido El indice escogido de la lista de los paises
      * @returns {void}
      */

      function editarAlumno(indiceEscogido)
      {
        objetoAlumno = jsonAlumno[indiceEscogido];
        $('#tabsMenu a[href="#divTabFormularioAlumno"]').tab('show');
        $('#Folio').val(objetoAlumno.a);
        $('#Nombre_Alumno').val(objetoAlumno.b);
        $('#ApellidoPaterno_Alumno').val(objetoAlumno.c);
        $('#ApellidoMaterno_Alumno').val(objetoAlumno.d);
        $('#Fecha_Nacimiento_Alumno').val(objetoAlumno.e);
        $('#Matricula_Alumno').val(objetoAlumno.f);
        $('#Horario_Servicio_Alumno').val(objetoAlumno.g);
        $('#Telefono_Casa_Alumno').val(objetoAlumno.h);
        $('#Telefono_Celular_Alumno').val(objetoAlumno.i);
        $('#Domicilio_Alumno').val(objetoAlumno.j);
        $('#Curp_Alumno').val(objetoAlumno.k);
        $('#RFC_Alumno').val(objetoAlumno.l);
        comboCarrera();
        comboSesion();
        $('#h1TituloFormulario').html(sanitizarHTML('Editar un Alumno'));
      }
      /**
      * Funcion para mostrar el formulario para un nuevo pais.
      * @returns {void}
      */

      function agregarAlumno()
      {
        objetoAlumno = null;
        $('#tabsMenu a[href="#divTabFormularioAlumno"]').tab('show');
        $('#Folio').val(0);
        $('#Nombre_Alumno').val('');
        $('#ApellidoPaterno_Alumno').val('');
        $('#ApellidoMaterno_Alumno').val('');
        $('#Fecha_Nacimiento_Alumno').val('');
        $('#Matricula_Alumno').val('');
        $('#Horario_Servicio_Alumno').val('');
        $('#Telefono_Casa_Alumno').val('');
        $('#Telefono_Celular_Alumno').val('');
        $('#Domicilio_Alumno').val('');
        $('#Curp_Alumno').val('');
        $('#RFC_Alumno').val('');
        comboCarrera();
        comboSesion();
        $('#h1TituloFormulario').html(sanitizarHTML('Registro del Alumno'));
      }

      /**
      * Funcion para guardar un alumno
      * @returns {void}
      */

      function guardarAlumno()
      {
        objetoAlumno = {
          a: $('#Folio').val(),
          b: $('#Nombre_Alumno').val(),
          c: $('#ApellidoPaterno_Alumno').val(),
          d: $('#ApellidoMaterno_Alumno').val(),
          e: $('#Fecha_Nacimiento_Alumno').val(),
          f: $('#Matricula_Alumno').val(),
          g: $('#Horario_Servicio_Alumno').val(),
          h: $('#Telefono_Casa_Alumno').val(),
          i: $('#Telefono_Celular_Alumno').val(),
          j: $('#Domicilio_Alumno').val(),
          k: $('#Curp_Alumno').val(),
          l: $('#RFC_Alumno').val(),
          m: $('#id_carrera').val(),
          n: $('#id_sesion').val()

        };
        if (objetoAlumno.a == 0) {
          //insertar Pais
          accion = 'insertar';
        }else{
          //actualizar pais
          accion ="actualizar";
        }
       peticionJSON = JSON.stringify({
          'Id' : generarID(),
          'method' : accion,
          'clase' : CLASE_ALUMNO,
          'Params' : [objetoAlumno]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoGuardadoAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
      }
      /**
        * Funcion Listener para listar los paises mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */

        function exitoGuardadoAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          // Checamos si existio un error:
          if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            switch(accion){
              case 'insertar':
                if(jsonRespuesta.result > 0){
                  //si se inserto
                  mostrarVentanaModal('Tú Numero de Folio es:   '+ jsonRespuesta.result + '   <br>     Es Importante tu numero de folio, con ello te dare seguimiento a tu proceso. <br> <strong>Gracias por Registrarte</strong>');
                }else{
                  //no inserto
                  mostrarVentanaModal('No se pudo insertar el alumno');
                }
              break;
              case 'actualizar':
                if(jsonRespuesta.result == 1) {
                  //si se actualizo
                  mostrarVentanaModal('Alumno  ' + objetoAlumno.a + '   Actualizado');
                }else{
                  //no se actuzalizo
                  mostrarVentanaModal('No se pudo actualizar el alumno');
                }
              break;
              default:
                //no se que paso
                mostrarVentanaModal('Tipo de respuesta no definida');
              break;
            }
            mostrarListado();
        }

        /**
         * Funcion para solicitar confirmar el borrado de la alergia
         * @param {int} indiceEscogido El indice escogido de la lista de los paises
         * @returns {void}
         */
         function confirmarBorrado(indiceEscogido)
         {
          $('#tabsMenu a[href="#divTabBorrarAlumno"]').tab('show');
          objetoAlumno = jsonAlumno[indiceEscogido];
          htmlNuevo = 'Folio: <strong>' + objetoAlumno.a + '</strong><br/>Matricula: <strong>' + objetoAlumno.f + '</strong>';
          $('#pDatosAlumno').html(sanitizarHTML(htmlNuevo));
         }

         function borrarAlumno()
         {
          objetoAlumno = { a:objetoAlumno.a };
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'borrar',
            'clase' : CLASE_ALUMNO,
            'Params' : [objetoAlumno]
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitoBorradoAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
      }
      /**
        * Funcion Listener para listar los paises mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitoBorradoAlumno(jsonRespuesta, estatusRespuesta, jqXHR)
        {
          //checamoa si existio un error
            if(jsonRespuesta.error){
              mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
              return;
            }
            if(jsonRespuesta.result == 1){
              //si se borro:
              mostrarVentanaModal('Folio   ' + objetoAlumno.a + '   Borrado<br />(recuerde: Este borrado no se puede deshacer).');
            }else{
              //no se borro:
              mostrarVentanaModal('Folio'+ objetoAlumno.a + 'No pudo ser borrado.');

            }
            mostrarListado();
        }
        /**
         * Funcion para mostrar la pantalla de listado de paises
         * @returns {void}
         */
         function mostrarListado()
         {
          $('#tabsMenu a[href="#divTabListaAlumno"]').tab('show');
          listarAlumno();
         }
         /**
         * Funcion para mostrar la pantalla de listado de Busquedas
         * @returns {void}
         */
         function mostrarBusqueda()
         {
          $('#tabsMenu a[href="#divTabBuscarAlumno"]').tab('show');
          $('#inputCriterio').val('');
          $('#selectColumna').val(0).attr('selected','selected');
         }
         /**
         * Funcion para busca los paises mediante AJAX
         * @returns {void}
         */
         function buscarAlumno()
         {
          columnaBusqueda = $('#selectColumna').val();
          criterioBusqueda = $('#inputCriterio').val();
          accion = 'buscar';
          peticionJSON = JSON.stringify({
            'Id' : generarID(),
            'method' : 'buscar',
            'clase' : CLASE_ALUMNO,
            'Params' : [criterioBusqueda, columnaBusqueda, '2']
          });
          $.ajax({
            method : 'POST',
            timeout : 30000,
            data : peticionJSON,
            dataType : 'json',
            url : GATEWAY_ALUMNO,
            success : function(jsonRespuesta, estatusRespuesta, jqXHR)
            {
              exitolistarAlumno(jsonRespuesta, estatusRespuesta, jqXHR);
            },
            error : function(jqXHR, estatusError, textoError)
            {
              mostrarErrorJSON(jqXHR, estatusError, textoError);
            }
          });
          $('#tabsMenu a[href="#divTabListaAlumno"]').tab('show');
         }
         /**
         * Funcion para mandar a crear los PDFs, mediante AJAX
         * @returns {void}
         */
         function crearPDF()
         {
          peticionJSON = JSON.stringify(
        {
          'Id' : generarID(),
          'method' : 'reportePDF',
          'clase' : CLASE_ALUMNO,
          'Params' : [accion,criterioBusqueda,columnaBusqueda]
        });
        $.ajax({
          method : 'POST',
          timeout : 30000,
          data : peticionJSON,
          dataType : 'json',
          url : GATEWAY_ALUMNO,
          success : function(jsonRespuesta, estatusRespuesta, jqXHR)
          {
            exitoCrearPDF(jsonRespuesta, estatusRespuesta, jqXHR);
          },
          error : function(jqXHR, estatusError, textoError)
          {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
          }
        });
         }
         /**
        * Funcion Listener para listar los paises mediante AJAX.
        * @param {object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida
        * @param {String} estatusRespuesta Cadena de texto, con el estatus  de la respuesta (succes)
        * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
        * @returns {void}
        */
        function exitoCrearPDF(jsonRespuesta,estatusRespuesta, jqXHR)
        {
          // Checamos si existio el error:
          if(jsonRespuesta.error){
          mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
          return;
          }
          if(jsonRespuesta.result != '' && (jsonRespuesta.result.substr(jsonRespuesta.result.length - 4)== '.pdf')){
            var urlPDF = '../pdfs/' + jsonRespuesta.result;
            if(window.toStaticHTML){
             //Revisar... pendiente en windows 8 desktop...
            }else{
            // Estamos en un navegador web, de escritorio o movil:
            window.open(urlPDF, '_blank');
            }
          }else{
            // no se puedo crear el pdf:
            mostrarVentanaModal('El pdf, no pudo ser creado.');
          }
        }
